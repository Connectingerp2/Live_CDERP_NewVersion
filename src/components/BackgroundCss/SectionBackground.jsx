// SectionBackground — reusable decorated background wrapper, single file.
// Server Component: no "use client", no hooks, no external CSS file → 0 KB client JavaScript.
//
// USAGE
// -----
//   import SectionBackground from "@/components/SectionBackground";
//
//   export default function CoursesPage() {
//     return (
//       <SectionBackground>
//         <CoursesSection />
//       </SectionBackground>
//     );
//   }
//
// Wrap ANY section this way — hero, pricing, footer, whatever needs the
// aurora/grid/dots/curves decoration. Pass a className if you need to
// control width/padding/min-height on the wrapper itself:
//
//   <SectionBackground className="min-h-screen px-6 py-20">
//     ...
//   </SectionBackground>
//
// NOTE ON THE <style> TAG
// ------------------------
// This uses a plain <style> element (not styled-jsx) so it works with zero
// dependencies in both Server and Client Components. Because it's rendered
// inline, if you use <SectionBackground> many times on the same page the
// CSS gets duplicated once per instance. For a single hero/section per page
// that's a non-issue. If you'll render it a lot on one page, move the CSS
// block into a global stylesheet (e.g. globals.css) instead — the class
// names are already scoped enough (sb-*) to avoid collisions.

const styles = `
.sb-bg {
  position: relative;
  overflow: hidden;
  background: #fff;
}

.sb-content {
  position: relative;
  z-index: 1;
}

.sb-bg::before {
  content: "";
  position: absolute;
  inset: -20%;
  pointer-events: none;
  filter: blur(60px);
  background:
    radial-gradient(28% 26% at 18% 12%, rgba(79, 142, 247, 0.20), transparent 70%),
    radial-gradient(24% 24% at 78% 8%, rgba(160, 92, 232, 0.16), transparent 70%),
    radial-gradient(26% 24% at 30% 92%, rgba(76, 192, 110, 0.14), transparent 70%),
    radial-gradient(26% 26% at 88% 86%, rgba(247, 154, 74, 0.16), transparent 70%);
}

.sb-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(100, 116, 139, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 116, 139, 0.10) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.35) 40%, transparent 78%);
  mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.35) 40%, transparent 78%);
}

.sb-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(51, 65, 85, 0.30) 1.4px, transparent 1.4px);
  background-size: 20px 20px;
  -webkit-mask-image:
    radial-gradient(20% 26% at 86% 16%, #000 25%, transparent 75%),
    radial-gradient(16% 22% at 8% 78%, #000 25%, transparent 75%);
  mask-image:
    radial-gradient(20% 26% at 86% 16%, #000 25%, transparent 75%),
    radial-gradient(16% 22% at 8% 78%, #000 25%, transparent 75%);
}

.sb-curves {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.8;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 900' preserveAspectRatio='none'%3E%3Cpath d='M-40 200 C 300 80 600 320 900 190 S 1380 140 1500 240' fill='none' stroke='%234f8ef7' stroke-opacity='.22' stroke-width='2'/%3E%3Cpath d='M-40 240 C 300 120 620 360 920 230 S 1390 180 1500 280' fill='none' stroke='%23a05ce8' stroke-opacity='.15' stroke-width='2'/%3E%3Cpath d='M-40 760 C 340 880 700 620 1040 740 S 1420 820 1520 700' fill='none' stroke='%23f79a4a' stroke-opacity='.20' stroke-width='2'/%3E%3Cpath d='M-40 800 C 340 920 720 660 1060 780 S 1430 860 1520 740' fill='none' stroke='%234cc06e' stroke-opacity='.14' stroke-width='2'/%3E%3C/svg%3E");
}

.sb-oring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  border: 2px dashed rgba(79, 142, 247, 0.30);
}
.sb-o1 { width: 260px; height: 260px; right: -80px; top: -90px; }
.sb-o1::after {
  content: "";
  position: absolute;
  inset: 34px;
  border-radius: 50%;
  border: 2px dashed rgba(160, 92, 232, 0.25);
}
.sb-o2 { width: 300px; height: 300px; left: -110px; bottom: -120px; border-color: rgba(247, 154, 74, 0.28); }
.sb-o2::after {
  content: "";
  position: absolute;
  inset: 40px;
  border-radius: 50%;
  border: 2px dashed rgba(76, 192, 110, 0.24);
}

.sb-sq {
  position: absolute;
  pointer-events: none;
  border-radius: 22%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.25);
}
.sb-s1 { width: 52px; height: 52px; left: 9%; top: 22%; transform: rotate(14deg); }
.sb-s2 { width: 38px; height: 38px; right: 12%; top: 30%; transform: rotate(-12deg); }
.sb-s3 { width: 44px; height: 44px; left: 30%; bottom: 14%; transform: rotate(-18deg); }
.sb-s4 { width: 32px; height: 32px; right: 26%; bottom: 20%; transform: rotate(20deg); }

.sb-spark { position: absolute; border-radius: 50%; pointer-events: none; }
.sb-k1 { width: 12px; height: 12px; left: 22%; top: 14%; background: #4f8ef7; opacity: 0.5; box-shadow: 0 0 0 6px rgba(79, 142, 247, 0.12); }
.sb-k2 { width: 10px; height: 10px; right: 34%; top: 18%; background: #a05ce8; opacity: 0.5; box-shadow: 0 0 0 6px rgba(160, 92, 232, 0.12); }
.sb-k3 { width: 11px; height: 11px; left: 14%; bottom: 32%; background: #4cc06e; opacity: 0.5; box-shadow: 0 0 0 6px rgba(76, 192, 110, 0.12); }
.sb-k4 { width: 13px; height: 13px; right: 10%; bottom: 36%; background: #f79a4a; opacity: 0.5; box-shadow: 0 0 0 6px rgba(247, 154, 74, 0.12); }

@media (max-width: 640px) {
  .sb-s2, .sb-s4, .sb-k2 { display: none; }
  .sb-o1 { width: 180px; height: 180px; right: -70px; top: -70px; }
  .sb-o2 { width: 200px; height: 200px; left: -90px; bottom: -90px; }
  .sb-sq { transform: scale(0.8) rotate(14deg); }
}
`;

export default function SectionBackground({ children, className = "max-w-[1800px] w-full mx-auto" }) {
  return (
    <div className={`sb-bg ${className}`}>
      <style>{styles}</style>
      <span className="sb-grid" aria-hidden="true" />
      <span className="sb-dots" aria-hidden="true" />
      <span className="sb-curves" aria-hidden="true" />
      <span className="sb-oring sb-o1" aria-hidden="true" />
      <span className="sb-oring sb-o2" aria-hidden="true" />
      <span className="sb-sq sb-s1" aria-hidden="true" />
      <span className="sb-sq sb-s2" aria-hidden="true" />
      <span className="sb-sq sb-s3" aria-hidden="true" />
      <span className="sb-sq sb-s4" aria-hidden="true" />
      <span className="sb-spark sb-k1" aria-hidden="true" />
      <span className="sb-spark sb-k2" aria-hidden="true" />
      <span className="sb-spark sb-k3" aria-hidden="true" />
      <span className="sb-spark sb-k4" aria-hidden="true" />
      <div className="sb-content">{children}</div>
    </div>
  );
}