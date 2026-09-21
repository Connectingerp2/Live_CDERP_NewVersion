"use client";

/**
 * Font setup (recommended, not required — component falls back to system fonts):
 *   Display serif: "Fraunces"  (course title, module heading, TOC numerals)
 *   Body sans:     "Inter"
 *   Mono:          "JetBrains Mono" (durations, small tags)
 * Add via next/font or a <link> in your root layout for the intended look.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Code2,
  Clock,
  Users,
  Calendar,
  Download,
  Info,
} from "lucide-react";
import Btnform from "../HomePage/Btnform";

const displayFont = "'Fraunces', 'Georgia', serif";
const bodyFont = "'Inter', system-ui, sans-serif";
const monoFont = "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace";

const palette = {
  paper: "#FFFFFF",
  ink: "#0F172A",
  inkMuted: "#64748B",
  gold: "#2563EB",
  goldSoft: "#EFF6FF",
  rule: "#E2E8F0",
};

const AUTOPLAY_MS = 3200;
const RESUME_DELAY_MS = 6000;

const stats = [
  { icon: Code2, value: "10+", label: "Languages & tools" },
  { icon: Clock, value: "280+", label: "Live session hours" },
  { icon: Users, value: "Expert", label: "Mentor guidance" },
  { icon: Calendar, value: "Certified", label: "Industry recognized" },
];

function TocRow({ mod, isSelected, showProgress, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="relative overflow-hidden w-full text-left flex items-baseline gap-2 py-2.5 sm:py-3 px-2.5 sm:px-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2"
      style={{
        borderLeft: isSelected ? `3px solid ${palette.gold}` : "3px solid transparent",
        background: isSelected ? palette.goldSoft : "transparent",
        "--tw-ring-color": palette.gold,
      }}
    >
      <span
        className="text-[11px] sm:text-[12px] shrink-0"
        style={{
          fontFamily: monoFont,
          color: isSelected ? palette.gold : palette.inkMuted,
        }}
      >
        {mod.id}
      </span>
      <span
        className="text-[13px] sm:text-[13.5px] whitespace-nowrap"
        style={{
          fontFamily: bodyFont,
          fontWeight: isSelected ? 600 : 500,
          color: isSelected ? palette.ink : palette.inkMuted,
        }}
      >
        {mod.title}
      </span>
      <span
        className="flex-1 border-b mx-1 mb-1"
        style={{ borderBottomStyle: "dotted", borderColor: palette.rule }}
      />
      <span
        className="text-[10.5px] sm:text-[11px] shrink-0"
        style={{ fontFamily: monoFont, color: palette.inkMuted }}
      >
        {mod.duration}
      </span>

      {showProgress && (
        <span
          className="sasy-toc-progress absolute left-0 bottom-0 h-[2px]"
          style={{ background: palette.gold, animationDuration: `${AUTOPLAY_MS}ms` }}
        />
      )}
    </button>
  );
}

function DetailPane({ mod }) {
  const Icon = mod.icon;
  return (
    <div key={mod.id} className="sasy-detail-enter">
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className="text-3xl sm:text-4xl leading-none"
          style={{ fontFamily: displayFont, fontWeight: 400, color: palette.gold }}
        >
          {mod.id}
        </span>
        <div className="flex-1 min-w-0">
          <h4
            className="text-lg sm:text-[22px] leading-snug"
            style={{ fontFamily: displayFont, fontWeight: 600, color: palette.ink }}
          >
            {mod.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <Icon size={13} style={{ color: palette.inkMuted }} />
            <span
              className="text-[11.5px]"
              style={{ fontFamily: monoFont, color: palette.inkMuted }}
            >
              {mod.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="h-px my-4 sm:my-5" style={{ background: palette.rule }} />

      {mod.columns ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2.5">
          {mod.columns.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-2.5">
              {col.map((item, ii) => (
                <div key={ii} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 shrink-0"
                    style={{ background: palette.gold }}
                  />
                  <span
                    className="text-[13px] leading-snug"
                    style={{ fontFamily: bodyFont, color: palette.inkMuted }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {(mod.topics || []).map((item, ii) => (
            <div key={ii} className="flex items-start gap-2">
              <span
                className="mt-1.5 w-1.5 h-1.5 shrink-0"
                style={{ background: palette.gold }}
              />
              <span
                className="text-[13px] leading-snug"
                style={{ fontFamily: bodyFont, color: palette.inkMuted }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SapAbapSyllabus(props) {
  const data = (props && props.data) || props || {};
  const [selectedId, setSelectedId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const resumeTimeoutRef = useRef(null);

  const displayedModules = useMemo(() => {
    try {
      const src =
        (props && props.curriculum) ||
        (data && data.modules) ||
        (data && data.overview && data.overview.modules) ||
        (data && data.curriculum);

      if (!Array.isArray(src) || src.length === 0) return [];

      return src.map((m, idx) => ({
        id: m.id || m.slug || String(idx + 1).padStart(2, "0"),
        title: m.title || m.name || `Module ${idx + 1}`,
        topics: m.topics || m.subtopics || m.items || m.content || [],
        duration: m.duration || m.time || "1–2 wks",
        icon: m.icon || Code2,
        columns: m.columns,
        default: m.default,
      }));
    } catch (err) {
      return [];
    }
  }, [data, props && props.curriculum]);

  // pick the initial module
  useEffect(() => {
    if (!displayedModules.length) {
      setSelectedId(null);
      return;
    }
    setSelectedId((prev) => {
      if (prev && displayedModules.some((m) => m.id === prev)) return prev;
      const flagged = displayedModules.find((m) => m.default);
      return (flagged || displayedModules[0]).id;
    });
  }, [displayedModules]);

  // whole-component fade-in on first render
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 30);
    return () => window.clearTimeout(t);
  }, []);

  // respect reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // auto-advance through the chapters one by one
  useEffect(() => {
    if (isPaused || reducedMotion || displayedModules.length < 2) return;
    const interval = window.setInterval(() => {
      setSelectedId((prev) => {
        const idx = displayedModules.findIndex((m) => m.id === prev);
        const nextIdx = idx === -1 ? 0 : (idx + 1) % displayedModules.length;
        return displayedModules[nextIdx].id;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [isPaused, reducedMotion, displayedModules]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleSelect = useCallback((id) => {
    setSelectedId(id);
    setIsPaused(true);
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
  }, []);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    setIsPaused(false);
  }, []);

  const handleDownloadBrochureClick = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);
  const handleFormSubmit = useCallback(() => {
    setFormSubmitted(true);
    setShowForm(false);
    window.setTimeout(() => {
      if (data && data.downloadLink) {
        const link = document.createElement("a");
        link.href = data.downloadLink;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Download link is not available.");
      }
    }, 1000);
  }, [data]);

  // No modules → render nothing
  if (!displayedModules.length) {
    return null;
  }

  const selected =
    displayedModules.find((m) => m.id === selectedId) || displayedModules[0];
  const isAutoPlaying = !isPaused && !reducedMotion;

  return (
    <section
      className={`relative w-full pb-8 px-4 sm:py-12 sm:px-8 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      style={{ background: palette.paper, fontFamily: bodyFont }}
    >
      <style>{`
        .sasy-detail-enter {
          animation: sasyDetailIn 0.4s ease;
        }
        @keyframes sasyDetailIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sasy-toc-progress {
          width: 0%;
          animation-name: sasyTocProgress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @keyframes sasyTocProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sasy-detail-enter { animation: none; }
          .sasy-toc-progress { animation: none; }
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <div className="max-w-xl">
            <div
              className="text-[11px] sm:text-[11.5px] mb-2"
              style={{ fontFamily: monoFont, color: palette.gold }}
            >
              {(data.title2 || data.title || "Course Title").replace(/<[^>]+>/g, "")}
            </div>
            <h2
              className="text-[26px] sm:text-4xl leading-tight"
              style={{ fontFamily: displayFont, fontWeight: 600, color: palette.ink }}
            >
              {(data.title2 || data.title || "Course Title").replace(/<[^>]+>/g, "")}
            </h2>
            <p
              className="mt-3 text-[13.5px] sm:text-[14.5px] leading-relaxed"
              style={{ color: palette.inkMuted }}
            >
              {data.description || "Course description"}{" "}
              {data.summary || "Course summary"}
            </p>
          </div>

          <button
            onClick={handleDownloadBrochureClick}
            className="shrink-0 flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-semibold transition-colors duration-200 hover:bg-opacity-90"
            style={{
              fontFamily: bodyFont,
              color: "#FFFFFF",
              background: palette.gold,
              border: `1px solid ${palette.gold}`,
            }}
          >
            <Download size={14} />
            Download syllabus
          </button>
        </div>

        {/* STAT STRIP */}
        <div
          className="mt-6 sm:mt-8 flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 sm:divide-x"
          style={{ borderTop: `1px solid ${palette.rule}`, borderBottom: `1px solid ${palette.rule}`, borderColor: palette.rule }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="w-1/2 sm:w-auto sm:flex-1 flex items-center gap-2.5 py-3 sm:py-4 px-1 sm:px-4"
              >
                <Icon size={16} style={{ color: palette.gold, flexShrink: 0 }} />
                <div className="min-w-0">
                  <div
                    className="text-[14px] sm:text-[15px] leading-tight"
                    style={{ fontFamily: displayFont, fontWeight: 600, color: palette.ink }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10.5px] sm:text-[11px] leading-tight truncate"
                    style={{ color: palette.inkMuted }}
                  >
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CONTENTS + DETAIL */}
        <div
          className="mt-8 sm:mt-10 flex flex-col lg:flex-row gap-6 lg:gap-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full lg:w-[38%] shrink-0">
            <div
              className="text-[11px] mb-2 pl-2.5 sm:pl-3"
              style={{ fontFamily: monoFont, color: palette.inkMuted }}
            >
              contents
            </div>
            <div className="flex flex-col">
              {displayedModules.map((mod) => (
                <TocRow
                  key={mod.id}
                  mod={mod}
                  isSelected={selected && selected.id === mod.id}
                  showProgress={isAutoPlaying && selected && selected.id === mod.id}
                  onSelect={() => handleSelect(mod.id)}
                />
              ))}
            </div>
          </div>

          <div
            className="w-full lg:w-[62%] lg:pl-8"
            style={{ borderLeft: `1px solid ${palette.rule}` }}
          >
            {selected && <DetailPane mod={selected} />}
          </div>
        </div>

        {/* NOTE */}
        <div
          className="mt-8 sm:mt-10 pt-4 flex items-center gap-2"
          style={{ borderTop: `1px solid ${palette.rule}` }}
        >
          <Info size={13} style={{ color: palette.gold, flexShrink: 0 }} />
          <span className="text-[12px] sm:text-[12.5px]" style={{ color: palette.inkMuted }}>
            To see every module in full, click{" "}
            <span
              className="underline font-semibold cursor-pointer"
              style={{ color: palette.ink }}
              onClick={handleDownloadBrochureClick}
            >
              Download syllabus
            </span>
            .
          </span>
        </div>
      </div>

      {showForm && <Btnform onClose={handleCloseForm} onSubmit={handleFormSubmit} />}

      {formSubmitted && (
        <div
          className="fixed bottom-4 right-4 px-5 py-3 shadow-lg z-50"
          style={{ background: palette.gold, color: "#FFFFFF" }}
        >
          <div className="flex items-center gap-2 text-[13px]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Thank you! Download will start shortly.
          </div>
        </div>
      )}
    </section>
  );
}