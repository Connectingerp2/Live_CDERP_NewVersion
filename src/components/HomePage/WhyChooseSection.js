import { useState, useMemo, useCallback, memo } from "react";
import '../../styles/HomePage/WhyChooseSection.css';

/* ---- all 9 points shown in the right-hand scrollable list ---- */
const ITEMS = [
    {
        id: "expert",
        title: "Industry Expert Trainers",
        desc: "Learn directly from seasoned industry professionals who bring real-world expertise and practical insights into every session.",
        accent: "#ff5ee0",
    },
    {
        id: "live",
        title: "Live Instructor-Led Classes",
        desc: "Join interactive live sessions led by expert instructors, allowing real-time doubt resolution and hands-on guidance.",
        accent: "#b18cff",
    },
    {
        id: "handson",
        title: "Hands-on Practical Training",
        desc: "Strengthen your skills with practical, hands-on exercises designed to simulate real industry work environments.",
        accent: "#5cb2ff",
    },
    {
        id: "curriculum",
        title: "Latest Industry Curriculum",
        desc: "Stay ahead with a curriculum that's regularly updated to match the latest tools, trends, and industry demands.",
        accent: "#8f8bff",
    },
    {
        id: "placement",
        title: "100% Placement Assistance",
        desc: "Get dedicated placement support with resume building, mock interviews, and direct connections to hiring partners.",
        accent: "#c45eff",
    },
    {
        id: "flexible",
        title: "Flexible Learning Modes",
        desc: "Choose from multiple learning formats, weekday or weekend batches, so you can learn at your own convenience.",
        accent: "#ff5ecf",
    },
    {
        id: "batch",
        title: "Small Batch Size",
        desc: "Benefit from small batch sizes that ensure personalized attention and better interaction with trainers.",
        accent: "#ff5ee0",
    },
    {
        id: "interview",
        title: "Interview & Soft Skills Training",
        desc: "Build confidence with dedicated interview preparation and soft skills training to help you crack interviews with ease.",
        accent: "#b18cff",
    },
    {
        id: "fees",
        title: "Affordable Course Fees",
        desc: "Access high-quality, industry-relevant training at course fees designed to be affordable without compromising on quality.",
        accent: "#5cb2ff",
    },
];

/* ---- inline icons (stroke-based, inherit currentColor) ---- */
const Icons = {
    expert: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="32" cy="24" r="14" />
            <path d="M32 15l3 6.5 7 1-5 5 1.2 7-6.2-3.5-6.2 3.5 1.2-7-5-5 7-1z" strokeWidth="3" />
            <path d="M24 36l-6 20 14-8 14 8-6-20" />
        </g>
    ),
    live: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="18" width="34" height="26" rx="4" />
            <path d="M42 26l14-8v28l-14-8" />
            <circle cx="25" cy="31" r="1" fill="currentColor" stroke="none" />
        </g>
    ),
    handson: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 12a12 12 0 0 0-16.9 13.4L10 38.5V50h11.5l13.1-13.1A12 12 0 0 0 40 12z" />
            <circle cx="35" cy="17" r="2.5" fill="currentColor" stroke="none" />
        </g>
    ),
    curriculum: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 16c-5-4-13-5-20-3v34c7-2 15-1 20 3 5-4 13-5 20-3V13c-7-2-15-1-20 3z" />
            <path d="M32 16v34" strokeWidth="3" />
        </g>
    ),
    placement: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="10" y="20" width="44" height="32" rx="5" />
            <path d="M24 20v-5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v5M10 33h44" />
        </g>
    ),
    flexible: (
        <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="32" cy="34" r="20" />
            <path d="M32 22v12l9 6" />
            <path d="M24 8h16M32 8v6" strokeWidth="3.5" />
        </g>
    ),
    batch: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="22" r="8" />
            <circle cx="44" cy="26" r="6.5" />
            <path d="M10 52c0-9 6-15 14-15s14 6 14 15M38 52c0-7 4.5-12 10-12s10 5 10 12" />
        </g>
    ),
    interview: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 14h34v22H26l-9 8v-8h-7z" />
            <circle cx="47" cy="38" r="6" />
            <path d="M47 44v6M41 50h12" strokeWidth="3" />
        </g>
    ),
    fees: (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M34 10h18v18L28 52 10 34z" />
            <circle cx="44" cy="20" r="3" fill="currentColor" stroke="none" />
        </g>
    ),
};

/* ---- wheel sector paths (precomputed, 900x900 viewBox; ring 200→406) ----
   Geometry, colors and positions are unchanged from the original wheel;
   only the label text + icon per sector have been swapped to 6 of the 9 points. */
const SECTORS = [
    { // top — Hands-on Practical Training
        d: "M 283.0 99.8 A 18 18 0 0 1 292.4 75.8 A 406 406 0 0 1 607.6 75.8 A 18 18 0 0 1 617.0 99.8 L 543.9 253.2 A 18 18 0 0 1 520.9 263.0 A 200 200 0 0 0 379.1 263.0 A 18 18 0 0 1 356.1 253.2 Z",
        cx: 450, iconX: 427, iconY: 80, textY: 152, color: "#c45eff", label: ["Hands-on", "Practical", "Training"], icon: "handson",
    },
    { // upper-right — Placement Assistance
        d: "M 669.8 130.2 A 18 18 0 0 1 695.2 126.4 A 406 406 0 0 1 852.8 399.4 A 18 18 0 0 1 836.8 419.6 L 667.3 432.9 A 18 18 0 0 1 647.4 417.9 A 200 200 0 0 0 576.5 295.1 A 18 18 0 0 1 573.5 270.3 Z",
        cx: 712, iconX: 689, iconY: 246, textY: 317, color: "#ff5ecf", label: ["100%", "Placement", "Assistance"], icon: "placement",
    },
    { // lower-right — Industry Expert Trainers
        d: "M 836.8 480.4 A 18 18 0 0 1 852.8 500.6 A 406 406 0 0 1 695.2 773.6 A 18 18 0 0 1 669.8 769.8 L 573.5 629.7 A 18 18 0 0 1 576.5 604.9 A 200 200 0 0 0 647.4 482.1 A 18 18 0 0 1 667.3 467.1 Z",
        cx: 712, iconX: 689, iconY: 548, textY: 620, color: "#ff5ee0", label: ["Industry", "Expert", "Trainers"], icon: "expert",
    },
    { // bottom — Small Batch Size
        d: "M 617.0 800.2 A 18 18 0 0 1 607.6 824.2 A 406 406 0 0 1 292.4 824.2 A 18 18 0 0 1 283.0 800.2 L 356.1 646.8 A 18 18 0 0 1 379.1 637.0 A 200 200 0 0 0 520.9 637.0 A 18 18 0 0 1 543.9 646.8 Z",
        cx: 450, iconX: 427, iconY: 686, textY: 758, color: "#b18cff", label: ["Small Batch", "Size"], icon: "batch",
    },
    { // lower-left — Flexible Learning Modes
        d: "M 230.2 769.8 A 18 18 0 0 1 204.8 773.6 A 406 406 0 0 1 47.2 500.6 A 18 18 0 0 1 63.2 480.4 L 232.7 467.1 A 18 18 0 0 1 252.6 482.1 A 200 200 0 0 0 323.5 604.9 A 18 18 0 0 1 326.5 629.7 Z",
        cx: 188, iconX: 165, iconY: 535, textY: 606, color: "#5cb2ff", label: ["Flexible", "Learning", "Modes"], icon: "flexible",
    },
    { // upper-left — Affordable Course Fees
        d: "M 63.2 419.6 A 18 18 0 0 1 47.2 399.4 A 406 406 0 0 1 204.8 126.4 A 18 18 0 0 1 230.2 130.2 L 326.5 270.3 A 18 18 0 0 1 323.5 295.1 A 200 200 0 0 0 252.6 417.9 A 18 18 0 0 1 232.7 432.9 Z",
        cx: 188, iconX: 165, iconY: 246, textY: 317, color: "#8f8bff", label: ["Affordable", "Course Fees"], icon: "fees",
    },
];

/* ---- static defs (never change) — hoisted out of the render body ---- */
const WheelDefs = memo(function WheelDefs() {
    return (
        <defs>
            {SECTORS.map((s, i) => (
                <radialGradient key={i} id={`wcg${i}`} gradientUnits="userSpaceOnUse" cx="450" cy="450" r="406">
                    <stop offset="49%" stopColor={s.color} stopOpacity="0.05" />
                    <stop offset="80%" stopColor={s.color} stopOpacity="0.16" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0.44" />
                </radialGradient>
            ))}
            <radialGradient id="wcHub" cx="35%" cy="28%" r="95%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f1edfb" />
                <stop offset="100%" stopColor="#ddd4f2" />
            </radialGradient>
            <linearGradient id="wcHubRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a06bff" />
                <stop offset="100%" stopColor="#ff5ecf" />
            </linearGradient>
        </defs>
    );
});

/* ---- static orbit ring + dots (never change) — hoisted out of the render body ---- */
const WheelOrbit = memo(function WheelOrbit() {
    return (
        <>
            <circle cx="450" cy="450" r="438" fill="none" stroke="#8a6cff" strokeOpacity="0.38" strokeWidth="1.5" strokeDasharray="3 9" />
            <circle cx="450" cy="450" r="418" fill="none" stroke="#8a6cff" strokeOpacity="0.10" strokeWidth="1" />
            {[[669, 71], [888, 450], [669, 829], [231, 829], [12, 450], [231, 71]].map(([x, y], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="9" fill="#b18cff" opacity="0.25" />
                    <circle cx={x} cy={y} r="4.5" fill="#efe8ff" className="wc-dot" style={{ animationDelay: `${i * 0.5}s` }} />
                </g>
            ))}
        </>
    );
});

/* ---- static hub (never changes) ---- */
const WheelHub = memo(function WheelHub() {
    return (
        <>
            <circle cx="450" cy="450" r="134" fill="none" stroke="url(#wcHubRing)" strokeWidth="2" opacity="0.7" />
            <circle cx="450" cy="450" r="118" fill="url(#wcHub)" style={{ filter: "drop-shadow(0 0 30px rgba(170,110,255,0.5)) drop-shadow(0 4px 14px rgba(0,0,0,0.4))" }} />
            <text x="450" y="450" textAnchor="middle" fill="#191033" fontSize="32" fontWeight="900" letterSpacing="2.5">KEYPOINTS</text>
            <circle cx="427" cy="481" r="6.5" fill="#c45eff" />
            <circle cx="450" cy="481" r="6.5" fill="#ff5ecf" />
            <circle cx="473" cy="481" r="6.5" fill="#5cb2ff" />
        </>
    );
});

/* ---- sectors: only this part depends on hoveredId ----
   Perf fix: the blurred "wc-neon" glow path is only mounted for the
   ACTIVE sector instead of all 6 at once. Visually identical (the other
   5 were opacity:0 anyway) but removes 5 permanently-live blur filters
   from the paint pipeline on every frame/render. */
function WheelSectors({ hoveredId }) {
    return (
        <>
            {SECTORS.map((s, i) => {
                const isActive = s.icon === hoveredId;
                return (
                    <g key={i} className={`wc-sector${isActive ? " wc-sector--active" : ""}`}>
                        {isActive && (
                            <path d={s.d} fill="none" stroke={s.color} strokeWidth="7" className="wc-neon" />
                        )}
                        <path d={s.d} fill={`url(#wcg${i})`} stroke={s.color} strokeWidth="2.5" style={{ filter: `drop-shadow(0 0 9px ${s.color}77)` }} />
                        <svg x={s.iconX} y={s.iconY} width="46" height="46" viewBox="0 0 64 64" color="#ffffff" style={{ filter: `drop-shadow(0 0 6px ${s.color}aa)` }}>{Icons[s.icon]}</svg>
                        <text x={s.cx} y={s.textY} textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="700" letterSpacing="0.4" style={{ paintOrder: "stroke", stroke: "rgba(10,3,24,.45)", strokeWidth: 3 }}>
                            {s.label.map((line, li) => (
                                <tspan key={li} x={s.cx} dy={li === 0 ? 0 : 27}>{line}</tspan>
                            ))}
                        </text>
                    </g>
                );
            })}
        </>
    );
}

const WheelSVG = memo(function WheelSVG({ hoveredId }) {
    return (
        <svg
            className="wc-wheel"
            viewBox="0 0 900 900"
            role="img"
            aria-label="Keypoints wheel: Hands-on Practical Training, Placement Assistance, Industry Expert Trainers, Small Batch Size, Flexible Learning Modes, Affordable Course Fees"
        >
            <WheelDefs />
            <WheelOrbit />
            <WheelSectors hoveredId={hoveredId} />
            <WheelHub />
        </svg>
    );
});

/* ---- decorative background (never changes, so it's memoized once) ---- */
const SectionBackground = memo(function SectionBackground() {
    return (
        <>
            <svg className="wc-bg wc-bg-dots" width="340" height="300" viewBox="0 0 340 300" aria-hidden="true">
                <defs>
                    <pattern id="wcDots" width="17" height="17" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.6" fill="#8a63ff" />
                    </pattern>
                    <radialGradient id="wcDotsFade" cx="0%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                    <mask id="wcDotsMask"><rect width="340" height="300" fill="url(#wcDotsFade)" /></mask>
                </defs>
                <rect width="340" height="300" fill="url(#wcDots)" mask="url(#wcDotsMask)" />
            </svg>
            <svg className="wc-bg wc-bg-waves" width="760" height="320" viewBox="0 0 760 320" fill="none" aria-hidden="true">
                <defs>
                    <linearGradient id="wcWave" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b6cff" stopOpacity="0.55" />
                        <stop offset="55%" stopColor="#8a4dff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c44dff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0, 14, 28, 42, 56].map((o) => (
                    <path key={o} d={`M -20 ${268 - o} C 160 ${318 - o} 300 ${168 - o} 470 ${208 - o} S 720 ${118 - o} 790 ${58 - o}`} stroke="url(#wcWave)" strokeWidth="1.4" />
                ))}
            </svg>
        </>
    );
});

export default function WhyChooseSection() {
    const [hoveredId, setHoveredId] = useState(null);

    // stable handler factory so list items don't get a new function prop on every render
    const makeHoverHandlers = useMemo(() => {
        const enterCache = new Map();
        const leave = () => setHoveredId(null);
        return (id) => {
            if (!enterCache.has(id)) enterCache.set(id, () => setHoveredId(id));
            return { onMouseEnter: enterCache.get(id), onMouseLeave: leave };
        };
    }, []);

    return (
        <div className="relative left-1/2 -translate-x-1/2 w-screen">
            <section className="wc max-w-[1800px] w-full mx-auto" aria-labelledby="wc-heading">
                <SectionBackground />

                <h2 id="wc-heading" className="wc-h">
                    Why Choose <span className="wc-grad">Connecting Dots ERP?</span>
                </h2>
                <div className="wc-underline" aria-hidden="true" />

                <div className="wc-grid">
                    <div className="wc-wheelwrap">
                        <WheelSVG hoveredId={hoveredId} />
                    </div>

                    <ol className="wc-list">
                        {ITEMS.map((it) => {
                            const handlers = makeHoverHandlers(it.id);
                            return (
                                <li
                                    key={it.id}
                                    className="wc-item"
                                    style={{ "--accent": it.accent }}
                                    onMouseEnter={handlers.onMouseEnter}
                                    onMouseLeave={handlers.onMouseLeave}
                                >
                                    <span className="wc-tile" aria-hidden="true">
                                        <svg width="24" height="24" viewBox="0 0 64 64" color="var(--accent)">{Icons[it.id]}</svg>
                                    </span>
                                    <div>
                                        <h3 className="wc-t">{it.title}</h3>
                                        <p className="wc-d">{it.desc}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>
        </div>
    );
}