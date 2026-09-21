import React from "react";
import "../../styles/CTABanner.css";
import Container from "../StandardContainer";

export default function SapDemoBanner({
    badge = "Free Live Demo",
    title = "Loading...",
    number = "+919004001938",
    subtitle = "loading...",
    primaryBtn = "Book My Free Demo",
    secondaryBtn = "Talk to a Counselor Instead",
    trust = "Loading...",
    screenTitle = "SAP S/4HANA Live System",
    widgets = ["FI/CO", "MM/SD", "Reports", "Master Data"],
} = {}) {
    const handleWhatsAppClick = () => {
        const digitsOnly = number.replace(/[^\d]/g, "");
        window.open(`https://wa.me/${digitsOnly}`, "_blank", "noopener,noreferrer");
    };

    return (
        <Container>
            <div className="h-30 w-full flex items-center justify-center bg-white p-5">
                <div className="sapdemo-root relative w-full flex items-center overflow-hidden rounded-2xl">
                    {/* decorative glow */}
                    <div className="sapdemo-glow pointer-events-none absolute" />

                    {/* ===== LEFT content ===== */}
                    <div className="sapdemo-content flex-1 min-w-0 z-10 flex flex-col justify-center text-white">
                        <div className="sapdemo-badge inline-flex items-center gap-1.5 w-fit rounded-full uppercase font-semibold">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            </svg>
                            {badge}
                        </div>

                        <h2 className="sapdemo-h2 font-bold">
                            {title}
                        </h2>

                        <p className="sapdemo-subtext text-slate-300">
                            {subtitle}
                        </p>

                        <div className="sapdemo-row flex flex-wrap">
                            <button
                                className="sapdemo-btn-primary font-bold whitespace-nowrap"
                                onClick={handleWhatsAppClick}
                            >
                                {primaryBtn}
                            </button>
                            <button
                                className="sapdemo-btn-secondary font-semibold whitespace-nowrap"
                                onClick={() => {
                                window.open(
                                    "https://wa.me/9004002941?text=Hi%20I'm%20interested%20in%20your%20courses.",
                                    "_blank"
                                );
                                }}
                            >
                                {secondaryBtn}
                            </button>
                        </div>

                        <p className="sapdemo-trust text-slate-400">
                            {trust}
                        </p>
                    </div>

                    {/* ===== RIGHT visual strip ===== */}
                    <div className="sapdemo-visual flex-shrink-0 flex flex-col items-center justify-center relative">
                        <div className="sapdemo-screen relative overflow-hidden">
                            <div className="sapdemo-screen-bar absolute top-0 left-0 right-0" />
                            <span className="sapdemo-dot r absolute rounded-full" />
                            <span className="sapdemo-dot y absolute rounded-full" />
                            <span className="sapdemo-dot g absolute rounded-full" />

                            <div className="sapdemo-screen-content grid grid-cols-2">
                                <div className="sapdemo-widget wide col-span-2 flex items-center justify-center font-semibold">
                                    {screenTitle}
                                </div>
                                {widgets.map((label) => (
                                    <div
                                        key={label}
                                        className="sapdemo-widget flex items-center justify-center"
                                    >
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sapdemo-icons flex">
                            <IconPill label="Live Trainer">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </IconPill>
                            <IconPill label="Real System">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </IconPill>
                            <IconPill label="No Pressure">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </IconPill>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

function IconPill({ label, children }) {
    return (
        <div className="sapdemo-icon-pill flex flex-col items-center">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {children}
            </svg>
            <span className="font-medium">{label}</span>
        </div>
    );
}