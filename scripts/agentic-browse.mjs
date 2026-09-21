#!/usr/bin/env node
/**
 * Agentic browsing / audit script.
 *
 * Crawls a list of routes against a running build, captures console errors,
 * failed requests, layout overflow at mobile width and basic paint timings.
 * Use it to verify that a change did not break rendering or responsiveness.
 *
 * Usage:
 *   npm run build && npm start                 # in one shell
 *   node scripts/agentic-browse.mjs            # in another
 *   node scripts/agentic-browse.mjs --base=https://www.example.com --routes=/,/courses
 *
 * Requires Playwright (dev only):  npx playwright install chromium
 * Set CHROMIUM_PATH to use an already-installed Chromium instead.
 */

import { chromium } from "playwright";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  })
);

const BASE = args.base || "http://localhost:3000";
const ROUTES = (args.routes ||
  "/,/courses,/courses/sap,/courses/it,/courses/hr,/aboutus,/placements,/contactus,/blogs,/sitemap")
  .split(",")
  .map((r) => r.trim())
  .filter(Boolean);

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1366, height: 900 },
];

const results = [];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.name === "mobile" ? 3 : 1,
    isMobile: viewport.name === "mobile",
    hasTouch: viewport.name === "mobile",
  });

  for (const route of ROUTES) {
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) =>
      failedRequests.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText}`)
    );

    let status = 0;
    try {
      const response = await page.goto(BASE + route, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      status = response?.status() ?? 0;
      await page.waitForTimeout(1500);
    } catch (err) {
      consoleErrors.push(`navigation: ${err.message}`);
    }

    // Horizontal overflow: the most common responsiveness defect.
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        if (rect.right > docWidth + 2 || rect.left < -2) {
          offenders.push(
            (el.tagName.toLowerCase() +
              (el.id ? `#${el.id}` : "") +
              (typeof el.className === "string" && el.className
                ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}`
                : "")).slice(0, 120)
          );
        }
        if (offenders.length >= 10) break;
      }
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: docWidth,
        offenders,
      };
    });

    const timings = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      return {
        ttfb: nav ? Math.round(nav.responseStart) : null,
        domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
        fcp: fcp ? Math.round(fcp.startTime) : null,
        domNodes: document.getElementsByTagName("*").length,
      };
    });

    results.push({
      viewport: viewport.name,
      route,
      status,
      ...timings,
      horizontalOverflow: overflow.scrollWidth > overflow.clientWidth + 2,
      overflowOffenders: overflow.offenders,
      consoleErrors,
      failedRequests,
    });

    await page.close();
  }

  await context.close();
}

await browser.close();

let problems = 0;
for (const r of results) {
  const issues = [];
  if (r.status !== 200) issues.push(`status ${r.status}`);
  if (r.horizontalOverflow) issues.push(`horizontal overflow (${r.overflowOffenders.join(", ")})`);
  if (r.consoleErrors.length) issues.push(`${r.consoleErrors.length} console error(s)`);
  if (r.failedRequests.length) issues.push(`${r.failedRequests.length} failed request(s)`);

  const head = `[${r.viewport}] ${r.route} — TTFB ${r.ttfb}ms, FCP ${r.fcp}ms, DOM ${r.domNodes} nodes`;
  if (issues.length) {
    problems += 1;
    console.log(`FAIL ${head}`);
    for (const issue of issues) console.log(`     - ${issue}`);
    for (const e of r.consoleErrors.slice(0, 5)) console.log(`     ! ${e}`);
    for (const f of r.failedRequests.slice(0, 5)) console.log(`     ! ${f}`);
  } else {
    console.log(`PASS ${head}`);
  }
}

console.log(`\n${results.length - problems}/${results.length} checks passed.`);
process.exit(problems ? 1 : 0);
