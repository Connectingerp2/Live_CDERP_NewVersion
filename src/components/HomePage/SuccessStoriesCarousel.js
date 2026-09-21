"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AUTOPLAY_MS = 4000; // Auto-rotate every 10 seconds (set to 0 to disable)

const ICONS = [
  // Training
  (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  // Projects
  (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  // Interview
  (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  // Placed
  (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
];

const STEP_COLORS = ["#a855f7", "#3b82f6", "#22d3ee", "#22c55e"];

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill={i < count ? "#facc15" : "none"} stroke="#facc15" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ src, alt, size }) {
  const sizeClasses =
    size === "lg"
      ? "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
      : "h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24";
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-purple-500/40 ${sizeClasses}`}>
      {src ? (
        <Image src={src} alt={alt || "image"} fill sizes="128px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/5 text-2xl font-semibold text-white/40">
          {alt?.charAt(0) || "?"}
        </div>
      )}
    </div>
  );
}

// fonts 
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ------------------------------------------------------------------ */
/*  Mini Card (Peeking) — only shown from the xl breakpoint up so the */
/*  layout never overflows on 1024px (lg) screens.                    */
/* ------------------------------------------------------------------ */
function MiniCard({ story, side, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hidden xl:flex w-52 shrink-0 flex-col items-center gap-2 rounded-3xl border border-white/10 bg-black px-5 py-8 text-center transition-all hover:opacity-100 2xl:w-64 2xl:px-6 2xl:py-10 ${
        side === "left" ? "-mr-6 2xl:-mr-8" : "-ml-6 2xl:-ml-8"
      }`}
    >
      <Avatar src={story.image} alt={story.name || "candidate image"} size="sm" />
      <h4 className="mt-2 text-base font-semibold text-white 2xl:text-lg">{story.name}</h4>
      <p className="text-xs text-white/60 2xl:text-sm">{story.role}</p>
      <p className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-extrabold text-transparent 2xl:text-2xl">
        {story.lpa}
      </p>
      <p className="text-base font-bold text-white/80 2xl:text-lg">{story.company}</p>
      <Stars count={story.rating} />
      <p className="text-xs text-white/50 2xl:text-sm">{story.placedIn}</p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Card                                                     */
/* ------------------------------------------------------------------ */
function FeaturedCard({ story }) {
  return (
    <div className="relative mx-auto w-full max-w-[92vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      {/* Gradient Border */}
      <div
        className="relative rounded-3xl p-[2px] transition-all duration-700 sm:p-[3px]"
        style={{
          background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22d3ee 100%)",
        }}
      >
        <div className="rounded-[22px] bg-[#0a0a0f] p-4 sm:p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,240px)_1fr] md:gap-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-8">
            {/* Left Profile — always visible, including on mobile */}
            <div className="flex flex-col items-center text-center md:border-r md:border-white/10 md:pr-6 lg:pr-8">
              <Avatar src={story.image} alt={story.name} size="lg" />
              <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">{story.name}</h3>
              <p className="text-sm text-white/60 sm:text-base">{story.role}</p>
              <p className="mt-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                {story.lpa}
              </p>
              <span className="mt-4 text-xs text-white/70 sm:text-sm">{`${story.placedIn} at`}</span>
              <Image src={story?.companyLogo} width={100} height={100} alt={story.company || "company logo"} className="my-3 h-auto w-16 sm:w-20 md:w-24" />
              <Stars count={story.rating} />
            </div>

            {/* Right Journey + Testimonial — hidden on mobile, shown from md up */}
            <div className="hidden md:flex md:flex-col">
              <div className="mb-6 flex items-center justify-center gap-3 text-white/70">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-base font-semibold lg:text-lg">My Journey</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500" />
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8">
                {story.journey.map((step, i) => {
                  const Icon = ICONS[i];
                  const color = STEP_COLORS[i];
                  return (
                    <div key={i} className="relative flex flex-col">
                      <div className="mb-3 flex items-center">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full border-2 lg:h-12 lg:w-12"
                          style={{ borderColor: color, color }}
                        >
                          <Icon width={20} height={20} />
                        </span>
                        {i < story.journey.length - 1 && (
                          <span
                            className="ml-2 hidden h-px flex-1 sm:block"
                            style={{ background: `linear-gradient(to right, ${color}, ${STEP_COLORS[i + 1]})` }}
                          />
                        )}
                      </div>
                      <span className="text-sm font-bold" style={{ color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold text-white">{step.title}</span>
                      <span className="mt-1 text-xs leading-relaxed text-white/60">{step.desc}</span>
                    </div>
                  );
                })}
              </div>

              <blockquote className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
                <div className="flex gap-3">
                  <span className="text-3xl leading-none text-purple-400">“</span>
                  <p className={`text-sm leading-relaxed text-white/80 sm:text-base ${poppins.className}`}>{story.testimonial}</p>
                  <span className="self-end text-3xl leading-none text-purple-400">”</span>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT COMPONENT — carousel state, motion, and interactivity      */
/* ------------------------------------------------------------------ */
export default function SuccessStoriesCarousel({ stories }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const n = stories.length;

  const go = useCallback(
    (dir) => {
      setDirection(dir);
      setActive((i) => (i + dir + n) % n);
    },
    [n]
  );

  const jump = useCallback((i) => setActive(i), []);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!AUTOPLAY_MS || paused || n <= 1) return;
    const t = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [go, paused, n]);

  const { current, prev, next } = useMemo(
    () => ({
      current: stories[active],
      prev: stories[(active - 1 + n) % n],
      next: stories[(active + 1) % n],
    }),
    [active, n, stories]
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel */}
      <div className="relative flex min-h-[380px] items-center justify-center sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {/* Left Mini Card */}
          {n > 1 && (
            <motion.div
              key={`prev-${prev.id}`}
              initial={{ opacity: 0, x: -60, scale: 0.85 }}
              animate={{ opacity: 0.75, x: 0, scale: 0.92 }}
              exit={{ opacity: 0, x: -100, scale: 0.7 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute left-0 z-10 hidden xl:block"
            >
              <MiniCard story={prev} side="left" onClick={() => go(-1)} />
            </motion.div>
          )}

          {/* Center Featured Card */}
          <motion.div
            key={`current-${current.id}`}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="relative z-20 w-full"
          >
            <FeaturedCard story={current} />
          </motion.div>

          {/* Right Mini Card */}
          {n > 1 && (
            <motion.div
              key={`next-${next.id}`}
              initial={{ opacity: 0, x: 60, scale: 0.85 }}
              animate={{ opacity: 0.75, x: 0, scale: 0.92 }}
              exit={{ opacity: 0, x: 100, scale: 0.7 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute right-0 z-10 hidden xl:block"
            >
              <MiniCard story={next} side="right" onClick={() => go(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-3 sm:mt-12">
        {stories.map((_, i) => (
          <button
            key={i}
            onClick={() => jump(i)}
            aria-label={`Go to story ${i + 1}`}
            className={`h-3 rounded-full transition-all ${i === active ? "w-8 bg-purple-500" : "w-3 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}