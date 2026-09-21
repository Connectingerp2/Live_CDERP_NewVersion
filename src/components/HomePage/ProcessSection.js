"use client";

/**
 * TrainingProcessSection — Tailwind conversion.
 *
 * Visual output, layout, colors, and behavior are unchanged from the
 * original styled-jsx version. Two mechanical changes were made to make a
 * clean Tailwind conversion possible:
 *
 * 1. Hover-highlight (which trace is "hot") and scroll-reveal state used to
 *    be driven by imperative `classList.toggle` calls on refs. That's been
 *    replaced with React state (`hoverIndex`, `isLive`, `revealedSteps`)
 *    that drives conditional Tailwind classes instead — same visual result,
 *    idiomatic Tailwind/React instead of manual DOM class manipulation.
 * 2. The three `@keyframes` (cd-flowmove, cd-hubpulse, cd-hubspin) can't be
 *    expressed as Tailwind utilities on their own — Tailwind's
 *    `animate-[name_duration_timing_iteration]` syntax needs the keyframes
 *    declared somewhere. Ideally that's `theme.extend.keyframes` in
 *    tailwind.config.js; since that file isn't part of this component, the
 *    three keyframes are declared in a small global <style> block instead.
 *    That's the only non-Tailwind CSS left in the file.
 *
 * WIDTH CHANGE: the desktop diagram is a fixed-size SVG/HTML canvas
 * (DESIGN_W x DESIGN_H) that gets uniformly scaled down to fit whatever
 * width its wrapper measures via ResizeObserver — so narrowing the section
 * is just a matter of narrowing that wrapper's max-width. Everything
 * (lines, icons, text, the logo block) scales down together as a single
 * transform, so it stays crisp and proportioned instead of reflowing or
 * getting cramped. The desktop cap was reduced from 1180px to 960px so the
 * whole diagram renders smaller and reads more clearly instead of
 * stretching edge-to-edge.
 */

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PhoneCall, UserPlus, Presentation, Target, Linkedin, Briefcase } from "lucide-react";
import AmbientBlueBackground from "../BackgroundCss/AnimatedBlueBg";
import Container from "../StandardContainer";

const STEPS = [
    {
        num: "01",
        title: "Free Counselling Call",
        desc: "Begin with a free counselling call to understand your goals and map out the right learning path.",
        color: "#8b2fd6",
        grad: ["#a855f7", "#6d28d9"],
        icon: <PhoneCall strokeWidth={1.8} />,
    },
    {
        num: "02",
        title: "Registration",
        desc: "Complete your registration and get onboarded into our industry-focused training programs.",
        color: "#2f6bf7",
        grad: ["#3b82f6", "#1d4ed8"],
        icon: <UserPlus strokeWidth={1.8} />,
    },
    {
        num: "03",
        title: "Online and Offline Classes",
        desc: "Learn through flexible online and offline classes led by experienced industry trainers.",
        color: "#10b981",
        grad: ["#34d399", "#059669"],
        icon: <Presentation strokeWidth={1.8} />,
    },
    {
        num: "04",
        title: "Practice on real time Project Scenario",
        desc: "Work on live projects and real-time scenarios to build practical, job-ready experience.",
        color: "#f97316",
        grad: ["#fb923c", "#ea580c"],
        icon: <Target strokeWidth={1.8} />,
    },
    {
        num: "05",
        title: "Resume building, LinkedIn, & Mock Interview preparation",
        desc: "Get your resume and LinkedIn profile polished, along with mock interviews to sharpen your skills.",
        color: "#ec2f79",
        grad: ["#f472b6", "#db2777"],
        icon: <Linkedin strokeWidth={1.8} />,
    },
    {
        num: "06",
        title: "100% Placement Assistance",
        desc: "Get dedicated placement assistance and connect with top hiring companies.",
        color: "#7c3aed",
        grad: ["#a855f7", "#6d28d9"],
        icon: <Briefcase strokeWidth={1.8} />,
    },
];

const ROW_Y = [118, 266, 414, 562, 710, 858];
const HUB = { x: 1070, y: 476 };

const TRACES = [
    "M756 118 H940 l40 40 V406 l40 40 H1028",
    "M756 266 H890 l40 40 V422 l40 40 H1028",
    "M756 414 H882 l56 56 H1028",
    "M756 562 H876 l80 -80 H1028",
    "M756 710 H890 l40 -40 V530 l40 -40 H1028",
    "M756 858 H940 l40 -40 V546 l40 -40 H1028",
];

const PORTS = [446, 462, 470, 482, 490, 506];
const BUS_X = 1028;

const TRACE_DOTS = [
    [980, 158, 0], [980, 406, 0],
    [930, 306, 1], [930, 422, 1],
    [938, 470, 2],
    [956, 482, 3],
    [930, 670, 4], [930, 530, 4],
    [980, 818, 5], [980, 546, 5],
];

const COMPANIONS = [
    { d: "M850 104 H952 l40 40 V392", c: "#8b2fd6" },
    { d: "M880 252 H902 l40 40 V410", c: "#2f6bf7" },
    { d: "M880 400 H894 l56 56", c: "#10b981" },
    { d: "M862 548 H876 l60 -60", c: "#f97316" },
    { d: "M880 724 H902 l40 -40 V542", c: "#ec2f79" },
    { d: "M850 872 H952 l40 -40 V584", c: "#7c3aed" },
];

const COMPANION_PADS = [
    [992, 392, "#8b2fd6"],
    [942, 410, "#2f6bf7"],
    [950, 456, "#10b981"],
    [936, 488, "#f97316"],
    [942, 542, "#ec2f79"],
    [992, 584, "#7c3aed"],
];

function Chevrons({ y, color }) {
    return (
        <g stroke={color} strokeWidth={3} fill="none">
            <circle cx={686} cy={y} r={8} fill="#fff" />
            <path d={`M712 ${y - 10} l12 10 -12 10 M730 ${y - 10} l12 10 -12 10`} />
        </g>
    );
}

// Desktop cap: how wide the diagram's wrapper is allowed to grow. Lower
// this to shrink the whole diagram further; raise it to let it grow larger
// on wide screens.
const DESKTOP_MAX_WIDTH = 960;

export default function TrainingProcessSection() {
    const rootRef = useRef(null);
    const mobileItemRefs = useRef([]);
    const stageScalerRef = useRef(null);

    const DESIGN_W = 1536;
    const DESIGN_H = 1024;
    const [scale, setScale] = useState(DESKTOP_MAX_WIDTH / DESIGN_W);

    // Whether the section is on/near screen — gates all SVG animation.
    const [isLive, setIsLive] = useState(false);
    // Which trace (0-5) is currently hovered, or null.
    const [hoverIndex, setHoverIndex] = useState(null);
    // Which mobile step rows have scrolled into view.
    const [revealedSteps, setRevealedSteps] = useState(() => new Set());

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setIsLive(true);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => setIsLive(e.isIntersecting),
            { rootMargin: "100px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Measure the scaler's actual rendered width and scale the fixed-size
    // diagram to fit it exactly.
    useEffect(() => {
        const el = stageScalerRef.current;
        if (!el) return;

        const update = () => {
            const width = el.offsetWidth;
            if (width > 0) setScale(width / DESIGN_W);
        };

        update();

        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", update);
            return () => window.removeEventListener("resize", update);
        }
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Mobile step rows: reveal one-by-one as each scrolls into view.
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") {
            setRevealedSteps(new Set(STEPS.map((_, i) => i)));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.dataset.index);
                        setRevealedSteps((prev) => new Set(prev).add(idx));
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
        );
        mobileItemRefs.current.forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    const revealCount = revealedSteps.size;

    return (
        <Container>
            <AmbientBlueBackground>
                <div
                    className="overflow-visible flex items-center justify-center relative left-1/2 -translate-x-1/2 w-[100vw]"
                >
                    <section
                        ref={rootRef}
                        className="overflow-hidden pt-2"
                        style={{ fontFamily: '"Nunito", "Segoe UI", system-ui, -apple-system, sans-serif' }}
                        aria-label="How Connecting Dots ERP works"
                    >
                        {/* Section heading */}
                        <div className="max-w-[960px] mx-auto text-center px-5 pt-7 pb-1 md:px-10 md:pt-10 md:pb-2">
                            <h2
                                className="mt-2.5 font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-[#101426]"
                                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                            >
                                How it <span className="text-[#2b5cff]">works</span>
                            </h2>
                            <span
                                className="block w-[72px] h-[4px] rounded-[2px] bg-[#2b5cff] mx-auto mt-4"
                                aria-hidden
                            />
                        </div>

                        <div className="max-w-[960px] mx-auto hidden md:block">
                            <div
                                ref={stageScalerRef}
                                className="relative w-full overflow-hidden"
                                style={{ height: `${DESIGN_H * scale}px` }}
                            >
                                <div
                                    className="relative w-[1536px] h-[1024px] origin-top-left"
                                    style={{ transform: `scale(${scale})` }}
                                >
                                    <svg
                                        className="absolute inset-0 pointer-events-none"
                                        viewBox="0 0 1536 1024"
                                        fill="none"
                                        aria-hidden
                                    >
                                        <defs>
                                            <radialGradient id="cd-hubGlow" cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".35" />
                                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                            </radialGradient>
                                            <linearGradient id="cd-hubRing" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#8b2fd6" />
                                                <stop offset="100%" stopColor="#2f6bf7" />
                                            </linearGradient>
                                        </defs>

                                        <g stroke="#cfcdec" strokeWidth={1.5} opacity=".7">
                                            <path d="M60 950 h120 l40 40 h160" />
                                            <path d="M40 990 h200 l30 -30 h120" />
                                            <path d="M1210 300 l60 -60 h90" />
                                            <path d="M1490 420 v80 l-30 30" />
                                        </g>
                                        <g fill="#cfcdec">
                                            <circle cx="180" cy="950" r="4" /><circle cx="380" cy="990" r="4" />
                                            <circle cx="240" cy="990" r="3" /><circle cx="1270" cy="240" r="4" />
                                            <circle cx="1490" cy="420" r="4" />
                                        </g>

                                        <g stroke="#d7d5ee" strokeWidth={2} opacity=".8" fill="none">
                                            <path d="M1050 1024 C 1150 940, 1330 980, 1536 880" />
                                            <path d="M1100 1024 C 1200 960, 1380 1000, 1536 920" />
                                            <path d="M1160 1024 C 1260 980, 1420 1020, 1536 960" />
                                        </g>

                                        {TRACES.map((d, i) => {
                                            const dur = [3.4, 3.0, 2.4, 2.4, 3.0, 3.4][i];
                                            const delay = -(i * 0.55);
                                            const isHot = hoverIndex === i;
                                            const traceOpacityClass =
                                                hoverIndex === null ? "opacity-100" : isHot ? "opacity-100" : "opacity-[0.35]";
                                            return (
                                                <g key={i} className={`transition-opacity duration-200 ${traceOpacityClass}`} fill="none">
                                                    <path d={d} stroke={STEPS[i].color} strokeWidth={9} opacity={0.1} strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d={d} stroke={STEPS[i].color} strokeWidth={2.5} opacity={0.3} strokeLinecap="round" strokeLinejoin="round" />
                                                    <path
                                                        d={d}
                                                        stroke={STEPS[i].color}
                                                        strokeWidth={4}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className={`transition-opacity duration-200 ${isHot ? "opacity-[0.55]" : "opacity-0"}`}
                                                    />
                                                    <path
                                                        d={d}
                                                        stroke={STEPS[i].color}
                                                        strokeWidth={3.5}
                                                        strokeDasharray="14 226"
                                                        strokeLinecap="round"
                                                        className={`motion-reduce:[animation:none] animate-[cd-flowmove_3.2s_linear_infinite] ${isLive ? "[animation-play-state:running]" : "[animation-play-state:paused]"
                                                            }`}
                                                        style={{ animationDelay: `${delay}s` }}
                                                    />
                                                    <circle
                                                        r={5.5}
                                                        fill={STEPS[i].color}
                                                        opacity={0.9}
                                                        className={isLive ? "visible" : "invisible"}
                                                    >
                                                        <animateMotion keyPoints="1;0" keyTimes="0;1" calcMode="linear" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
                                                    </circle>
                                                </g>
                                            );
                                        })}
                                        {TRACE_DOTS.map(([x, y, i], k) => (
                                            <g key={k}>
                                                <circle cx={x} cy={y} r={8} fill={STEPS[i].color} opacity={0.18} />
                                                <circle cx={x} cy={y} r={4.5} fill="#fff" stroke={STEPS[i].color} strokeWidth={2.5} />
                                            </g>
                                        ))}

                                        <g strokeWidth={1.5} opacity={0.5} fill="none" strokeLinejoin="round">
                                            {COMPANIONS.map((t, k) => (
                                                <path key={k} d={t.d} stroke={t.c} />
                                            ))}
                                        </g>
                                        <g opacity={0.55}>
                                            {COMPANION_PADS.map(([x, y, c], k) => (
                                                <circle key={k} cx={x} cy={y} r={3.5} fill={c} />
                                            ))}
                                        </g>

                                        <path d={`M${BUS_X} ${PORTS[0]} V${PORTS[5]}`} stroke="#8b5cf6" strokeWidth={4} strokeLinecap="round" opacity={0.85} />
                                        {PORTS.map((y, i) => (
                                            <circle key={i} cx={BUS_X} cy={y} r={4} fill="#fff" stroke={STEPS[i].color} strokeWidth={2.5} />
                                        ))}
                                        <path d={`M${BUS_X} 476 H1040`} stroke="#6d28d9" strokeWidth={4} />

                                        <circle
                                            cx={HUB.x}
                                            cy={HUB.y}
                                            r={70}
                                            fill="url(#cd-hubGlow)"
                                            className={`origin-[1070px_476px] motion-reduce:[animation:none] animate-[cd-hubpulse_2.4s_ease-in-out_infinite] ${isLive ? "[animation-play-state:running]" : "[animation-play-state:paused]"
                                                }`}
                                        />
                                        <circle cx={HUB.x} cy={HUB.y} r={44} fill="none" stroke="#b9a7f2" strokeWidth={1.5} strokeDasharray="3 7" className={`origin-[1070px_476px] motion-reduce:[animation:none] animate-[cd-hubspin_14s_linear_infinite] ${isLive ? "[animation-play-state:running]" : "[animation-play-state:paused]"
                                            }`} />
                                        <circle cx={HUB.x} cy={HUB.y} r={32} fill="#fff" stroke="#e4e1f6" strokeWidth={2} />
                                        <circle cx={HUB.x} cy={HUB.y} r={20} fill="none" stroke="url(#cd-hubRing)" strokeWidth={10} />
                                        <circle cx={HUB.x} cy={HUB.y} r={6} fill="#6d28d9" />
                                        <path d={`M${HUB.x + 32} ${HUB.y} h54`} stroke="#2f6bf7" strokeWidth={3} strokeLinecap="round" />
                                        <circle cx={HUB.x + 88} cy={HUB.y} r={5} fill="#2f6bf7" />

                                        {ROW_Y.map((y, i) => (
                                            <Chevrons key={i} y={y} color={STEPS[i].color} />
                                        ))}
                                    </svg>

                                    <div className="absolute top-[34px] right-[250px] grid grid-cols-4 gap-4" aria-hidden>
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <i key={i} className="w-1.5 h-1.5 rounded-full bg-[#c9c6ea] block" />
                                        ))}
                                    </div>

                                    {STEPS.map((s, i) => (
                                        <div
                                            key={s.num}
                                            className="group absolute left-10 w-[640px] h-[116px] cursor-default"
                                            onMouseEnter={() => setHoverIndex(i)}
                                            onMouseLeave={() => setHoverIndex(null)}
                                            style={{ top: `${ROW_Y[i] - 58}px` }}
                                        >
                                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-[0_4px_12px_rgba(80,60,180,0.18)] flex items-center justify-center">
                                                <span className="w-4 h-4 rounded-full bg-white block" style={{ border: `5px solid ${s.color}` }} />
                                            </div>
                                            <div className="absolute left-11 top-1/2 -translate-y-1/2 w-12 h-[3px]" style={{ background: s.color }} />
                                            <div
                                                className="absolute left-[82px] top-1/2 -translate-y-1/2 w-[98px] h-[98px] rounded-full flex items-center justify-center z-[3] shadow-[0_0_0_8px_#fff,0_10px_26px_rgba(80,60,180,0.28)] transition-transform duration-[250ms] ease-in-out group-hover:[transform:translateY(-50%)_scale(1.07)] text-white [&>svg]:w-11 [&>svg]:h-11"
                                                style={{ background: `linear-gradient(135deg, ${s.grad[0]}, ${s.grad[1]})` }}
                                            >
                                                {s.icon}
                                            </div>
                                            <div className="absolute left-[118px] top-0 right-0 h-[116px] bg-white rounded-[26px] shadow-[0_14px_34px_rgba(90,70,190,0.13),0_2px_6px_rgba(90,70,190,0.06)] pt-[18px] pr-[88px] pb-4 pl-[84px] flex flex-col justify-center transition-transform duration-[250ms] ease group-hover:-translate-y-1 relative after:content-[''] after:absolute after:inset-0 after:rounded-[26px] after:shadow-[0_22px_44px_rgba(90,70,190,0.2),0_4px_10px_rgba(90,70,190,0.08)] after:opacity-0 after:transition-opacity after:duration-[250ms] group-hover:after:opacity-100 after:pointer-events-none">
                                                <div className="flex items-baseline gap-3.5 mb-1.5">
                                                    <span className="text-[26px] font-extrabold tracking-[0.5px]" style={{ color: s.color }}>
                                                        {s.num}
                                                    </span>
                                                    <h3 className="text-[21px] font-extrabold text-[#1e2340] m-0">{s.title}</h3>
                                                </div>
                                                <p className="text-[15px] leading-[1.45] text-[#5b6178] max-w-[400px] m-0">{s.desc}</p>
                                                <div className="absolute right-[26px] top-1/2 -translate-y-1/2 [&>svg]:w-[42px] [&>svg]:h-[42px]" style={{ color: s.color }}>
                                                    {s.icon}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="absolute left-[1150px] top-[340px] w-[320px] text-center">
                                        <Image
                                            src="https://res.cloudinary.com/bropujss/image/upload/v1783687480/Connecting_Logo_New_skvsup_ohmdgr.webp"
                                            alt="Connecting Dots ERP"
                                            width={220}
                                            height={220}
                                            className="w-[190px] h-[190px] mx-auto mb-[26px] block object-contain"
                                        />
                                        <h2 className="text-[36px] leading-[1.15] font-black text-[#101426] tracking-[0.5px] m-0">
                                            CONNECTING<br />DOTS{" "}
                                            <span className="bg-gradient-to-r from-[#7b2ff7] to-[#2f6bf7] bg-clip-text text-transparent">
                                                ERP
                                            </span>
                                        </h2>
                                        <div className="mt-3.5 text-[12.5px] font-bold tracking-[2.6px] text-[#3a4060]">
                                            CONNECTING OPPORTUNITIES,<br />DELIVERING EXCELLENCE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- mobile stacked timeline (shown under 768px) ---------- */}
                        {/* Brand/logo block intentionally omitted on mobile per request. */}
                        <div className="block md:hidden px-5 pt-6 pb-12">
                            <div className="relative">
                                <div className="absolute left-[31px] top-2 bottom-2 w-[3px] rounded-[2px] bg-[linear-gradient(180deg,#8b2fd6,#2f6bf7,#10b981,#f97316,#ec2f79,#7c3aed)] opacity-[0.18] overflow-hidden" aria-hidden>
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,#8b2fd6,#2f6bf7,#10b981,#f97316,#ec2f79,#7c3aed)] transition-[clip-path] duration-[600ms] ease motion-reduce:transition-none"
                                        style={{
                                            clipPath: `inset(0 0 ${100 - (revealCount / STEPS.length) * 100}% 0)`,
                                        }}
                                    />
                                </div>
                                <ol className="list-none m-0 p-0 relative">
                                    {STEPS.map((s, i) => {
                                        const isVisible = revealedSteps.has(i);
                                        return (
                                            <li
                                                key={s.num}
                                                ref={(el) => {
                                                    mobileItemRefs.current[i] = el;
                                                    if (el) el.dataset.index = i;
                                                }}
                                                className={`relative flex gap-4 items-start pb-[26px] transition-[opacity,transform] duration-500 ease motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                                                    }`}
                                            >
                                                <div
                                                    className="flex-none w-16 h-16 rounded-full shadow-[0_0_0_5px_#fff,0_8px_18px_rgba(80,60,180,0.25)] flex items-center justify-center relative z-[1] text-white [&>svg]:w-[30px] [&>svg]:h-[30px]"
                                                    style={{ background: `linear-gradient(135deg, ${s.grad[0]}, ${s.grad[1]})` }}
                                                >
                                                    {s.icon}
                                                </div>
                                                <div className="flex-1 bg-white rounded-[18px] shadow-[0_10px_24px_rgba(90,70,190,0.12)] px-4 py-3.5">
                                                    <div className="flex items-baseline gap-3.5 mb-1.5">
                                                        <span className="text-[19px] font-extrabold tracking-[0.5px]" style={{ color: s.color }}>
                                                            {s.num}
                                                        </span>
                                                        <h3 className="text-[16.5px] font-extrabold text-[#1e2340] m-0">{s.title}</h3>
                                                    </div>
                                                    <p className="text-[13.5px] leading-[1.45] text-[#5b6178] m-0">{s.desc}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </section>
                </div>
            </AmbientBlueBackground>

            {/* Only the three @keyframes live here — Tailwind's animate-[...]
                utility needs them declared somewhere, and there's no
                tailwind.config.js available in this context to add them to
                theme.extend.keyframes. Move them there in the real project
                and delete this block. */}
            <style jsx global>{`
                @keyframes cd-flowmove {
                    to { stroke-dashoffset: 240; }
                }
                @keyframes cd-hubpulse {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.12); }
                }
                @keyframes cd-hubspin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Container>
    );
}