// CoursesSection — "Explore Our Courses" 4-card grid.
// Server Component: NO "use client", NO hooks, 0 KB of client JavaScript.
// Styling is a single scoped <style> block (all classes prefixed "cs-")
// so it can NEVER collide with or be overridden by other page CSS —
// this replaces the old CSS Modules import, which was accidentally
// global because the file was named ".css" instead of ".module.css".
import Image from "next/image";
import Link from "next/link";
import SectionBackground from "../BackgroundCss/SectionBackground";

/* ---------- inline SVG icons (stroke inherits currentColor) ---------- */

const I = {
    chart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 20V12M12 20V4M19 20v-6" />
        </svg>
    ),
    code: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
        </svg>
    ),
    brain: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4a3 3 0 0 0-3 3v10a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z" />
            <path d="M9 8H7a3 3 0 0 0 0 6h2M15 8h2a3 3 0 0 1 0 6h-2" />
        </svg>
    ),
    people: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3.5 19c.6-3 2.9-4.5 5.5-4.5S13.9 16 14.5 19M15.5 5.6a3.2 3.2 0 0 1 0 4.8M17.5 14.8c1.7.6 2.7 1.9 3 4.2" />
        </svg>
    ),
    grad: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m2 9 10-5 10 5-10 5L2 9Z" />
            <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
        </svg>
    ),
    cloud: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 18a4.5 4.5 0 1 1 .8-8.9A5.5 5.5 0 0 1 18.4 11 3.5 3.5 0 0 1 17.5 18H7Z" />
        </svg>
    ),
    db: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
            <path d="M5 5.5V18.5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V5.5M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
        </svg>
    ),
    cert: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="9" r="5" />
            <path d="m9.5 13.5-1.5 7 4-2.5 4 2.5-1.5-7" />
        </svg>
    ),
    tools: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" />
            <path d="M8 7.5 10.5 16M16 7.5 13.5 16M8.5 6h7" />
        </svg>
    ),
    doc: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" />
        </svg>
    ),
    growth: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 20h16M6 16l4-4 3 3 5-6" /><path d="M14 9h4v4" />
        </svg>
    ),
    arrow: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    ),
};

/* ---------------------------- card data ---------------------------- */
/* theme colors now travel as plain data (c/c2/tint) instead of CSS-module
   class refs, and are applied per-card via inline CSS custom properties. */

const COURSES = [
    {
        key: "sap",
        theme: { c: "#1a63e8", c2: "#4f8ef7", tint: "#eaf1fe" },
        badge: I.chart,
        img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784893311/sap-3d_yfep0b.webp",
        alt: "3D illustration of a SAP analytics dashboard with a database and gear",
        title: "SAP Courses",
        desc: "Master SAP modules and enterprise solutions with practical training from industry experts.",
        features: [
            { icon: I.grad, text: "Industry expert trainers" },
            { icon: I.chart, text: "Real-time project training" },
            { icon: I.cert, text: "Globally recognized certification" },
        ],
        cta: "Explore SAP Courses",
        href: "/sap-courses-in-pune",
    },
    {
        key: "it",
        theme: { c: "#1e9e46", c2: "#4cc06e", tint: "#e9f7ee" },
        badge: I.code,
        img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784893311/it-3d_twrle4.webp",
        alt: "3D illustration of a laptop with code and server blocks",
        title: "IT Courses",
        desc: "Build strong foundations in programming, databases, cloud computing and more.",
        features: [
            { icon: I.code, text: "Hands-on coding practice" },
            { icon: I.cloud, text: "Cloud & DevOps training" },
            { icon: I.db, text: "100% Placement assistance" },
        ],
        cta: "Explore IT Courses",
        href: "/it-course-with-ai-in-pune",
    },
    {
        key: "ai",
        theme: { c: "#7c2fd6", c2: "#a05ce8", tint: "#f3ecfc" },
        badge: I.brain,
        img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784893310/ai-3d_m9lndh.webp",
        alt: "3D illustration of an AI chip with a brain and circuits",
        title: "AI Courses",
        desc: "Learn AI, ML, Data Science and GenAI to build intelligent solutions and future-proof your career.",
        features: [
            { icon: I.brain, text: "AI/ML practical projects" },
            { icon: I.tools, text: "Latest tools & technologies" },
            { icon: I.cert, text: "Career growth support" },
        ],
        cta: "Explore AI Courses",
        href: "/data-science-with-ai-course-in-pune",
    },
    {
        key: "hr",
        theme: { c: "#e8720c", c2: "#f79a4a", tint: "#fdf0e4" },
        badge: I.people,
        img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784893311/hr-3d_ag0beh.webp",
        alt: "3D illustration of a briefcase with a person badge",
        title: "HR Courses",
        desc: "Develop HR expertise in talent management, payroll, compliance and leadership.",
        features: [
            { icon: I.people, text: "HR management skills" },
            { icon: I.doc, text: "Compliance & legislation" },
            { icon: I.growth, text: "Leadership development" },
        ],
        cta: "Explore HR Courses",
        href: "/hr-training-course-in-pune",
    },
];

/* ---------------------------- component ---------------------------- */

export default function CoursesSection() {
    return (
        <div className="relative left-1/2 -translate-x-1/2 w-screen">
            <SectionBackground>
                <section className="cs-section max-w-[1800px] w-full mx-auto" aria-label="Our courses">
                    <span className="cs-blob cs-b1" aria-hidden="true" />
                    <span className="cs-blob cs-b2" aria-hidden="true" />
                    <span className="cs-blob cs-b3" aria-hidden="true" />
                    <span className="cs-blob cs-b4" aria-hidden="true" />
                    <span className="cs-ring cs-r1" aria-hidden="true" />
                    <span className="cs-ring cs-r2" aria-hidden="true" />
                    <span className="cs-line cs-l1" aria-hidden="true" />
                    <span className="cs-line cs-l2" aria-hidden="true" />
                    <span className="cs-plus cs-p1" aria-hidden="true">+</span>
                    <span className="cs-plus cs-p2" aria-hidden="true">+</span>
                    <span className="cs-plus cs-p3" aria-hidden="true">+</span>
                    <span className="cs-plus cs-p4" aria-hidden="true">+</span>

                    <h2 className="text-3xl md:text-5xl cs-heading">
                        <span className="cs-h-dark text-3xl md:text-5xl">What We</span>{" "}
                        <span className="cs-h-blue text-3xl md:text-5xl">Offer</span>
                    </h2>
                    <span className="cs-heading-rule" aria-hidden="true" />

                    <div className="cs-grid">
                        {COURSES.map((c) => (
                            <article
                                key={c.key}
                                className="cs-card"
                                style={{ "--c": c.theme.c, "--c2": c.theme.c2, "--tint": c.theme.tint }}
                            >
                                <span className="cs-ribbon" aria-hidden="true" />
                                <span className="cs-badge">{c.badge}</span>

                                <div className="cs-figure">
                                    <Image
                                        src={c.img}
                                        alt={c.alt || "figure image"}
                                        width={440}
                                        height={388}
                                        sizes="(max-width: 480px) 30vw, (max-width: 900px) 22vw, 140px"
                                        className="cs-img"
                                    />
                                </div>

                                <h3 className="cs-title">{c.title}</h3>
                                <p className="cs-desc">{c.desc}</p>
                                <span className="cs-rule" aria-hidden="true" />

                                <ul className="cs-features">
                                    {c.features.map((f) => (
                                        <li key={f.text}>
                                            <span className="cs-fIcon">{f.icon}</span>
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={c.href} className="cs-cta">
                                    {c.cta}
                                    <span className="cs-ctaArrow">{I.arrow}</span>
                                </Link>
                            </article>
                        ))}
                    </div>

                    {/* Scoped styles — every selector is prefixed "cs-" so this can
                be dropped into any page without touching existing CSS. */}
                    <style>{`
                .cs-section {
                    position: relative;
                    padding: 40px 16px;
                    overflow: hidden;
                }

                .cs-section::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background-image: radial-gradient(rgba(51, 65, 85, 0.4) 1.5px, transparent 1.5px);
                    background-size: 22px 22px;
                    -webkit-mask-image:
                        radial-gradient(26% 34% at 84% 10%, #000 30%, transparent 78%),
                        radial-gradient(22% 30% at 10% 92%, #000 30%, transparent 78%),
                        radial-gradient(14% 20% at 40% 4%, #000 30%, transparent 78%);
                    mask-image:
                        radial-gradient(26% 34% at 84% 10%, #000 30%, transparent 78%),
                        radial-gradient(22% 30% at 10% 92%, #000 30%, transparent 78%),
                        radial-gradient(14% 20% at 40% 4%, #000 30%, transparent 78%);
                }

                .cs-blob { position: absolute; border-radius: 50%; pointer-events: none; }
                .cs-b1 { width: 14px; height: 14px; left: 6%; top: 18%; background: #4f8ef7; opacity: 0.55; }
                .cs-b2 { width: 11px; height: 11px; right: 8%; top: 12%; background: #a05ce8; opacity: 0.55; }
                .cs-b3 { width: 12px; height: 12px; left: 34%; bottom: 10%; background: #4cc06e; opacity: 0.55; }
                .cs-b4 { width: 15px; height: 15px; right: 22%; bottom: 14%; background: #f79a4a; opacity: 0.5; }

                .cs-ring { position: absolute; border-radius: 50%; border: 2.5px solid rgba(79, 142, 247, 0.28); pointer-events: none; }
                .cs-r1 { width: 180px; height: 180px; left: -60px; bottom: -60px; }
                .cs-r2 { width: 150px; height: 150px; right: -46px; top: -50px; border-color: rgba(124, 47, 214, 0.28); }

                .cs-line { position: absolute; pointer-events: none; height: 3px; border-radius: 2px; }
                .cs-l1 { width: 120px; left: 12%; top: 8%; background: linear-gradient(90deg, transparent, rgba(79, 142, 247, 0.6), transparent); transform: rotate(-20deg); }
                .cs-l2 { width: 100px; right: 14%; bottom: 8%; background: linear-gradient(90deg, transparent, rgba(247, 154, 74, 0.6), transparent); transform: rotate(-20deg); }

                .cs-plus { position: absolute; pointer-events: none; color: rgba(79, 142, 247, 0.5); font: 700 22px/1 sans-serif; }
                .cs-p1 { left: 24%; top: 12%; }
                .cs-p2 { right: 30%; top: 22%; font-size: 17px; color: rgba(160, 92, 232, 0.5); }
                .cs-p3 { left: 8%; bottom: 30%; font-size: 18px; color: rgba(76, 192, 110, 0.5); }
                .cs-p4 { right: 6%; bottom: 38%; color: rgba(247, 154, 74, 0.55); }

                .cs-heading {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    margin: 0;
                    font-size: clamp(1.5rem, 3.4vw, 2.4rem);
                    font-weight: 900;
                    letter-spacing: -0.01em;
                    line-height: 1.15;
                }

                .cs-h-dark { color: #14204a; }
                .cs-h-blue { color: #2f5bff; }

                .cs-heading-rule {
                    position: relative;
                    z-index: 1;
                    display: block;
                    width: 74px;
                    height: 4px;
                    border-radius: 3px;
                    background: #2f5bff;
                    margin: 12px auto clamp(24px, 4vw, 40px);
                }

                .cs-grid {
                    position: relative;
                    z-index: 1;
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: clamp(14px, 2.2vw, 24px);
                }

                @media (max-width: 1100px) {
                    .cs-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
                }

                .cs-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, var(--c), var(--c2) 70%);
                    border-bottom: 2.5px solid var(--c);
                    border-radius: 18px;
                    padding: 12px 14px 14px;
                    overflow: hidden;
                    box-shadow: 0 6px 16px -10px rgba(15, 23, 42, 0.14);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }

                .cs-card::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 108px;
                    background: color-mix(in srgb, var(--c2) 45%, #fff);
                    clip-path: polygon(42% 0, 100% 0, 100% 100%, 6% 100%);
                    opacity: 0.55;
                }

                @media (hover: hover) {
                    .cs-card:hover {
                        transform: translateY(-6px);
                        box-shadow: 0 20px 40px -16px color-mix(in srgb, var(--c) 35%, rgba(15, 23, 42, 0.2));
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .cs-card, .cs-cta, .cs-ctaArrow { transition: none !important; }
                    .cs-card:hover { transform: none; }
                }

                .cs-ribbon {
                    position: absolute;
                    left: -10%; right: -10%;
                    top: 34px; bottom: -12%;
                    background: linear-gradient(180deg, #fdfeff, #f7fafd 30%, #fff);
                    border-radius: 30px;
                    transform: rotate(-5deg);
                    transform-origin: 100% 0;
                    box-shadow: 0 -8px 20px rgba(15, 23, 42, 0.1);
                    pointer-events: none;
                }

                .cs-badge {
                    position: absolute;
                    top: 12px; left: 12px;
                    z-index: 2;
                    width: 34px; height: 34px;
                    display: grid;
                    place-items: center;
                    background: #fff;
                    border-radius: 11px;
                    color: var(--c);
                    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.14);
                }

                .cs-badge svg { width: 18px; height: 18px; }

                .cs-figure {
                    position: relative;
                    z-index: 1;
                    margin: 42px auto 6px;
                    width: min(100%, 140px);
                    aspect-ratio: 440 / 388;
                }

                .cs-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    filter: drop-shadow(0 14px 18px color-mix(in srgb, var(--c) 22%, transparent));
                }

                .cs-title, .cs-desc, .cs-rule, .cs-features, .cs-cta {
                    position: relative;
                    z-index: 1;
                }

                .cs-title {
                    margin: 0 0 4px;
                    font-size: 1.02rem;
                    font-weight: 800;
                    color: var(--c);
                    letter-spacing: -0.01em;
                }

                .cs-desc {
                    margin: 0;
                    font-size: 0.78rem;
                    line-height: 1.45;
                    color: #334155;
                }

                .cs-rule {
                    display: block;
                    width: 30px;
                    height: 2px;
                    border-radius: 2px;
                    background: var(--c);
                    margin: 7px 0;
                }

                .cs-features {
                    list-style: none;
                    margin: 0 0 10px;
                    padding: 0;
                    display: grid;
                    gap: 6px;
                    flex-grow: 1;
                }

                .cs-features li {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 0.74rem;
                    font-weight: 600;
                    color: #1e293b;
                }

                .cs-fIcon {
                    flex: none;
                    width: 22px; height: 22px;
                    display: grid;
                    place-items: center;
                    border-radius: 7px;
                    background: var(--tint);
                    color: var(--c);
                }

                .cs-fIcon svg { width: 13px; height: 13px; }

                .cs-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    padding: 8px 12px;
                    border-radius: 999px;
                    background: linear-gradient(180deg, var(--c2), var(--c));
                    color: #fff;
                    font-size: 0.78rem;
                    font-weight: 700;
                    text-decoration: none;
                    box-shadow: 0 5px 12px -4px color-mix(in srgb, var(--c) 55%, transparent);
                    transition: filter 0.2s ease;
                }

                .cs-cta:hover { filter: brightness(1.08); }

                .cs-cta:focus-visible {
                    outline: 3px solid color-mix(in srgb, var(--c) 45%, transparent);
                    outline-offset: 2px;
                }

                .cs-ctaArrow {
                    flex: none;
                    width: 22px; height: 22px;
                    display: grid;
                    place-items: center;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.22);
                    transition: transform 0.2s ease;
                }

                .cs-ctaArrow svg { width: 12px; height: 12px; }

                .cs-cta:hover .cs-ctaArrow { transform: translateX(3px); }

                @media (max-width: 640px) {
                    .cs-section { padding: 20px 8px; }
                    .cs-heading { font-size: 1.3rem; }
                    .cs-heading-rule { width: 56px; height: 3px; margin: 9px auto 20px; }
                    .cs-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
                    .cs-card { padding: 10px; border-radius: 14px; border-bottom-width: 2px; }
                    .cs-ribbon { top: 26px; transform: rotate(-4deg); border-radius: 22px; }
                    .cs-badge { top: 8px; left: 8px; width: 28px; height: 28px; border-radius: 9px; }
                    .cs-badge svg { width: 15px; height: 15px; }
                    .cs-figure { margin: 32px auto 4px; width: min(100%, 108px); }
                    .cs-title { font-size: 0.88rem; margin: 0 0 3px; }
                    .cs-desc { font-size: 0.68rem; line-height: 1.4; }
                    .cs-rule { margin: 6px 0; height: 2px; width: 24px; }
                    .cs-features { gap: 5px; margin: 0 0 8px; }
                    .cs-features li { font-size: 0.66rem; gap: 6px; }
                    .cs-fIcon { width: 19px; height: 19px; border-radius: 6px; }
                    .cs-fIcon svg { width: 11px; height: 11px; }
                    .cs-cta { padding: 7px 10px; font-size: 0.68rem; min-height: 34px; }
                    .cs-ctaArrow { width: 18px; height: 18px; }
                    .cs-ctaArrow svg { width: 10px; height: 10px; }
                }

                @media (max-width: 360px) {
                    .cs-grid { grid-template-columns: 1fr; max-width: 240px; margin: 0 auto; }
                }

                @media (min-width: 641px) and (max-width: 1100px) {
                    .cs-figure { width: min(100%, 130px); }
                }
            `}</style>
                </section>
            </SectionBackground>
        </div>
    );
}