"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const tips = [
    { icon: "📝", bg: "bg-purple-50", text: "Tailor your resume to the specific role" },
    { icon: "✂️", bg: "bg-orange-50", text: "Keep cover letter sharp — under 200 words" },
    { icon: "📊", bg: "bg-green-50", text: "Quantify achievements with real numbers" },
    { icon: "📄", bg: "bg-orange-50", text: "Always upload resume in PDF format" },
    { icon: "🛠️", bg: "bg-blue-50", text: "Highlight your key tools & tech stack" },
    { icon: "🔥", bg: "bg-rose-50", text: "Show passion — not just skills" },
];

const nextSteps = [
    { step: "01", bg: "bg-blue-50", text: "Application reviewed by our HR team" },
    { step: "02", bg: "bg-purple-50", text: "Shortlisted? Expect a call within 5 days" },
    { step: "03", bg: "bg-green-50", text: "Technical + culture fit round" },
    { step: "04", bg: "bg-orange-50", text: "Offer letter & onboarding within 2 weeks" },
];

const positions = [
    "HR",
    "Counsellor",
    "Digital Marketer",
    "Graphic Designer",
    "Office Admin",
    "Accountants",
    "Freelancing Trainer",
];

const workLocations = ["Mumbai", "Pune", "Raipur"];

// Base input styling (was .form-input)
const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15";

// Select styling (was .form-select) — native arrow is fully removed with
// appearance-none and a single lucide ChevronDown icon is layered on top
// (see the Select wrapper component below). This avoids any double-arrow
// rendering that can happen with a background-image chevron.
const selectClass = `${inputClass} appearance-none cursor-pointer pr-9`;

/**
 * Wraps a native <select> with a relatively-positioned container and a
 * single absolutely-positioned chevron icon, so there is always exactly
 * one dropdown arrow rendered, regardless of browser default styling.
 */
function Select({ className = "", children, ...props }) {
    return (
        <div className="relative">
            <select className={`${selectClass} ${className}`} {...props}>
                {children}
            </select>
            <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
        </div>
    );
}

export default function page() {
    const [position, setPosition] = useState("");
    const isFreelancingTrainer = position === "Freelancing Trainer";

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden px-4 py-10"
            style={{
                background:
                    "linear-gradient(135deg, #dcebfd 0%, #cfe4fb 40%, #bcd9f6 70%, #a7cbf0 100%)",
            }}
        >
            {/* Animated decorative background */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -left-32 h-[34rem] w-[34rem] animate-pulse rounded-full bg-sky-400/35 blur-3xl [animation-duration:9s] motion-reduce:animate-none" />
                <div className="absolute top-32 -right-40 h-[30rem] w-[30rem] animate-pulse rounded-full bg-emerald-400/30 blur-3xl [animation-delay:1.5s] [animation-duration:11s] motion-reduce:animate-none" />
                <div className="absolute bottom-[-12rem] left-1/5 h-[32rem] w-[32rem] animate-pulse rounded-full bg-purple-400/30 blur-3xl [animation-delay:3s] [animation-duration:13s] motion-reduce:animate-none" />
                <div className="absolute bottom-8 right-[5%] h-[26rem] w-[26rem] animate-pulse rounded-full bg-amber-300/30 blur-3xl [animation-delay:0.75s] [animation-duration:10s] motion-reduce:animate-none" />
            </div>

            <h1 className="mx-auto mb-1 max-w-5xl text-center text-3xl font-bold text-slate-900">
                Apply &amp; Start Your Journey
            </h1>
            <p className="mx-auto mb-8 max-w-5xl text-center text-sm text-slate-600">
                Fill out the form below to apply for a position at Atorix.
            </p>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[260px_1fr_260px]">
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-4">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 p-5 text-white shadow-sm">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Actively Hiring
                        </span>
                        <p className="mt-4 text-sm font-medium leading-snug text-white/90">
                            &ldquo;The best teams are built on trust, talent &amp; shared
                            vision.&rdquo;
                        </p>
                        <p className="mt-3 text-xs text-white/50">— Atorix Culture</p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                        <p className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                            <span aria-hidden>💡</span> Tips for a Winning Application
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {tips.map((tip) => (
                                <li
                                    key={tip.text}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${tip.bg}`}
                                >
                                    <span className="text-base leading-none">{tip.icon}</span>
                                    <span className="text-[13px] leading-snug text-slate-700">
                                        {tip.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="px-1 text-xs text-slate-600">
                        We respond within{" "}
                        <span className="font-semibold text-slate-800">
                            3–5 business days
                        </span>
                    </p>
                </div>

                {/* CENTER FORM */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900">
                        Job Application
                    </h2>

                    <form className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Full Name" required>
                                <input type="text" placeholder="John Doe" className={inputClass} />
                            </Field>
                            <Field label="Email" required>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className={inputClass}
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Phone" required>
                                <div className="flex gap-2">
                                    <Select className="w-24 flex-none pl-2">
                                        <option>IN +1</option>
                                    </Select>
                                    <input
                                        type="tel"
                                        placeholder="9876543210"
                                        className={`${inputClass} flex-1`}
                                    />
                                </div>
                            </Field>
                            <Field label="Position" required>
                                <Select
                                    className={position ? "" : "text-slate-400"}
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    required
                                >
                                    <option value="">Select position</option>
                                    {positions.map((p) => (
                                        <option key={p} value={p} className="text-slate-900">
                                            {p}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                        </div>

                        {isFreelancingTrainer && (
                            <Field label="Freelancing Trainer For" required>
                                <input
                                    type="text"
                                    placeholder="e.g. Digital Marketing, Graphic Design"
                                    className={inputClass}
                                    required
                                />
                            </Field>
                        )}

                        {!isFreelancingTrainer && (
                            <Field label="Work Location" required>
                                <Select className="text-slate-400" required defaultValue="">
                                    <option value="" disabled>
                                        Select work location
                                    </option>
                                    {workLocations.map((loc) => (
                                        <option key={loc} value={loc} className="text-slate-900">
                                            {loc}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                        )}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Current Company">
                                <input type="text" className={inputClass} />
                            </Field>
                            <Field label="Expected Salary">
                                <input type="text" className={inputClass} />
                            </Field>
                        </div>

                        <Field label="Resume" required>
                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-6 text-center transition-colors hover:border-emerald-300 hover:bg-emerald-50/40">
                                <p className="text-sm font-medium text-emerald-600">
                                    Click to upload or drag and drop
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    PDF, DOC, DOCX up to 5MB (Required)
                                </p>
                            </div>
                        </Field>

                        <Field label="Cover Letter">
                            <textarea
                                placeholder="Introduce yourself..."
                                rows={4}
                                className={`${inputClass} resize-none`}
                            />
                        </Field>

                        <Field label="How did you hear about us?">
                            <Select>
                                <option>Career Portal</option>
                                <option>LinkedIn</option>
                                <option>Referral</option>
                                <option>Job Board</option>
                                <option>Other</option>
                            </Select>
                        </Field>

                        <label className="flex items-start gap-2 text-xs text-slate-500">
                            <input
                                type="checkbox"
                                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            I agree to the processing of my personal data for recruitment
                            purposes.
                        </label>

                        <button
                            type="submit"
                            className="mt-1 w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                        >
                            Submit Application
                        </button>
                    </form>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm ring-1 ring-orange-100">
                        <p className="text-sm font-semibold leading-snug text-slate-900">
                            ✦ We are excited to onboard you!
                        </p>
                        <p className="mt-1 text-xs font-medium text-orange-500">
                            Your journey starts here
                        </p>
                        <div className="relative mt-4 h-40 w-full">
                            <Image
                                src="/onboarding-illustration.png"
                                alt="Illustration of a person holding a laptop with charts on screen"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                        <p className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                            <span aria-hidden>⭐</span> What Happens Next?
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {nextSteps.map((item) => (
                                <li
                                    key={item.step}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${item.bg}`}
                                >
                                    <span className="text-xs font-bold text-slate-400">
                                        {item.step}
                                    </span>
                                    <span className="text-[13px] leading-snug text-slate-700">
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="px-1 text-xs text-slate-600">
                        <span aria-hidden>🌍</span>{" "}
                        <span className="font-semibold text-slate-800">
                            Remote &amp; hybrid roles
                        </span>{" "}
                        available globally
                    </p>
                </div>
            </div>
        </div>
    );
}

function Field({ label, required, children }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-slate-600">
                {label}
                {required && <span className="ml-0.5 text-rose-500">*</span>}
            </span>
            {children}
        </label>
    );
}