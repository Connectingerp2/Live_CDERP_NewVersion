"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AmbientBlueBackground from "../BackgroundCss/AnimatedBlueBg";
import { AlarmClock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { usePopupForm } from "../context/Popupformcontext";

// star icon
const Star = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#e58f0e" aria-hidden="true">
    <path d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7L12 2z" />
  </svg>
);

// Simple seeded pseudo-random generator so the same hour always
// produces the same numbers, and a new hour produces new numbers.
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Static info for the 6 SAP courses. Update `img` to match your
// actual asset filenames in /public.
const COURSE_META = [
  { key: "fico", title: "sap", subtitle: "Fico", img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785906042/SAPFICO_sqaqor.png", duration: "2-4 Months", from: '#f8fafe', to: "#f4f6fd", card: "#DBEAFE", head: "#1166ec", slug: "sap-fico-course-in-pune", desc:"Master Finance & Controlling in SAP." },
  { key: "ai", title: "AI", subtitle: "COURSES", img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785906042/ai_i3th45.png", duration: "2-4 Months", from: "#f0ecfb", to: "#f0ecfb", card: "#dfccfd", head: "#8b40f4", slug: "generative-ai-course-in-pune", desc:"Learn AI Tools & real-world Applications." },
  { key: "hr", title: "HR", subtitle: "MANAGEMENT", img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785906041/hrmanagement_hynulp.png", duration: "2-4 Months", from: "#fce4ec", to: "#fce4ec", card: "#fee7ed", head: "#fa4c79", slug: "hr-management-course-in-pune", desc:"Master recruitment, payroll & HR operations." },
  { key: "data", title: "DATA", subtitle: "ANALYTICS", img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785906042/dataanalytics_knarz3.png", duration: "2-4 Months", from: "#d6ead8", to: "#d6ead8", card: "#e7f3eb", head: "#5ed0a0", slug: "advanced-data-analytics-with-generative-ai-course-in-pune", desc:"Learn data analysis & visualization." },
  { key: "py", title: "PYTHON", subtitle: "PROGRAMMING", img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785906041/python_grrv5y.png", duration: "2-4 Months", from: "#d0ddf9", to: "#d0ddf9", card: "#dfe8fc", head: "#003a8e", slug: "python-with-ai-course-in-pune", desc:"Learn Python from basics to advanced." },
  { key: "sd", title: "sap", subtitle: "SD", img: "https://res.cloudinary.com/djdhtkjhn/image/upload/v1785906042/sapsd_j257es.png", duration: "2-4 Months", from: "#fdefd9", to: "#fdefd8", card: "#fef5e6", head: "#fdc53b", slug: "sap-sd-course-in-pune", desc:"Master Sales & Distribution in SAP." },
];

// How often the seats / timer data refreshes.
const RESET_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

// Autoplay tuning (mobile / tablet carousel only)
const AUTOPLAY_INTERVAL_MS = 4000; // how often it advances
const AUTOPLAY_RESUME_DELAY_MS = 6000; // how long to pause after manual interaction
const DESKTOP_BREAKPOINT = "(min-width: 1440px)"; // matches the 3x3 grid breakpoint below

function getHourBucket() {
  return Math.floor(Date.now() / RESET_INTERVAL_MS);
}

// Builds the 6 courses' dynamic data (seats + countdown target)
// deterministically from the current hour bucket, so every course
// gets a different value and everything changes once per hour.
function buildCourses(hourBucket) {
  return COURSE_META.map((meta, i) => {
    const seatSeed = hourBucket * 1000 + i;
    const timerSeed = hourBucket * 1000 + i + 500;

    // seats between 1 and 12 (below 5 triggers "Hurry Up")
    const seats = 1 + Math.floor(seededRandom(seatSeed) * 12);

    // countdown target: between 30 mins and 3 days out from the
    // start of the current hour bucket
    const minMs = 30 * 60 * 1000;
    const maxMs = 3 * 24 * 60 * 60 * 1000;
    const offset = minMs + seededRandom(timerSeed) * (maxMs - minMs);
    const bucketStart = hourBucket * RESET_INTERVAL_MS;
    const target = bucketStart + offset;

    return {
      ...meta,
      seats,
      target,
    };
  });
}

function CourseCard({ course }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(course.target - Date.now(), 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [course.target]);

  // Only show the "Hurry Up" badge when seats are below 5.
  const showHurryUp = course.seats < 5;

  const goToCourse = () => {
    // Adjust this route to wherever each course's detail page lives.
    router.push(`/${course.slug}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToCourse}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToCourse();
      }}
      className="group w-full h-full relative flex flex-wrap content-between justify-between border-2 border-gray-300 rounded-xl overflow-hidden p-3 box-border cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2b5cff]"
      style={{ backgroundImage: `linear-gradient(to right, ${course.from}, ${course.to})` }}
    >
      <div className="w-full ">
        {showHurryUp && (
          <div className="bg-red-200 text-red-600 w-fit flex justify-start items-center gap-2 py-1 px-2 rounded-md">
            <AlarmClock size={20} />
            <p className="text-sm">Hurry Up</p>
          </div>
        )}
      </div>
      <div className="w-fit rounded-md p-1 bg-white absolute right-3 top-3 text-xs text-[#0765f0]">{course.seats} seats left</div>
      <div className="w-[40%] p-2 my-3 box-border relative">
        <h5 className="font-semibold text-2xl uppercase" style={{ color: `${course.head}` }}>{course.title} <span className="text-black">{course.subtitle}</span></h5>
        <p className=" text-[14px] my-4">{course.desc}</p>
        <span className="flex justify-start gap-2 items-center">
          <span
            className="flex gap-0.5"
            aria-label="4.8 out of 5 stars on Google"
          >
            {Star}
            {Star}
            {Star}
            {Star}
            {Star}
          </span>
          <span className="text-sm font-sans font-semibold">4.8/5</span>
        </span>
      </div>
      <div className="w-[60%] h-[200px] flex flex-col items-start py-8 justify-start px-3 transition-transform duration-500 ease-out "
        style={{ backgroundImage: `url('${course.img}')`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: 'no-repeat' }}
      >
      </div>
      <div className="w-full -mt-6 flex flex-col sm:flex-row gap-2 sm:gap-2 justify-between">
        <div className="w-full sm:w-[32%] rounded-md p-2 leading-6"
          style={{ backgroundColor: `${course.card}` }}
        >
          <div className="flex justify-start items-center text-blue-800 gap-2 box-border">
            <Calendar size={14} /><p className="text-xs">Duration</p>
          </div>
          <p className="text-[12px] pl-6">{course.duration}</p>
        </div>
        <div className="w-full sm:w-[65%] p-2 box-border rounded-md grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:justify-between sm:gap-0"
          style={{ backgroundColor: `${course.card}` }}
        >
          <div className="aspect-square sm:w-[50px] sm:h-[50px] sm:aspect-auto flex flex-col rounded-md sm:rounded-tr-none rounded-tr-md sm:rounded-br-none rounded-br-md bg-white items-center justify-center sm:justify-around">
            <p className="text-base sm:text-xl text-red-500">{timeLeft.days}</p>
            <p className="text-[10px] sm:text-xs">DAYS</p>
          </div>
          <div className="aspect-square sm:w-[50px] sm:h-[50px] sm:aspect-auto flex flex-col sm:rounded-none rounded-md bg-white items-center justify-center sm:justify-around">
            <p className="text-base sm:text-xl text-red-500">{timeLeft.hours}</p>
            <p className="text-[10px] sm:text-xs">HRS</p>
          </div>
          <div className="aspect-square sm:w-[50px] sm:h-[50px] sm:aspect-auto flex flex-col sm:rounded-none rounded-md bg-white items-center justify-center sm:justify-around">
            <p className="text-base sm:text-xl text-red-500">{timeLeft.minutes}</p>
            <p className="text-[10px] sm:text-xs">MINS</p>
          </div>
          <div className="aspect-square sm:w-[50px] sm:h-[50px] sm:aspect-auto flex flex-col rounded-md sm:rounded-tl-none sm:rounded-bl-none rounded-tl-md rounded-bl-md  bg-white items-center justify-center sm:justify-around">
            <p className="text-base sm:text-xl text-red-500">{timeLeft.seconds}</p>
            <p className="text-[10px] sm:text-xs">SECS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PopularCourses() {
  const [hourBucket, setHourBucket] = useState(getHourBucket());
  const [courses, setCourses] = useState(() => buildCourses(getHourBucket()));
  const { openPopup } = usePopupForm();

  // ---- mobile/tablet carousel state ----
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ---- autoplay state (mobile/tablet only, desktop grid never autoplays) ----
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef(null);
  // Mirrors activeIndex so the autoplay interval always reads the latest
  // value without needing to restart the interval on every index change.
  const activeIndexRef = useRef(0);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    // Every minute, check whether we've crossed into a new hour bucket.
    // If so, regenerate all 6 courses' seats + timers.
    const check = setInterval(() => {
      const current = getHourBucket();
      setHourBucket((prev) => {
        if (current !== prev) {
          setCourses(buildCourses(current));
          return current;
        }
        return prev;
      });
    }, 60 * 1000);
    return () => clearInterval(check);
  }, []);

  // Track whether we're at the desktop 3x3 grid breakpoint — autoplay
  // and the carousel controls are irrelevant there.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, courses.length - 1));
    const slide = track.children[clamped];
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
    setActiveIndex(clamped);
  };

  // Same as scrollToIndex but wraps around, used by autoplay so it
  // loops back to the first card after the last one.
  const scrollToIndexLooping = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapped = (index + courses.length) % courses.length;
    const slide = track.children[wrapped];
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
    setActiveIndex(wrapped);
  };

  // Pausing on manual interaction, then auto-resuming after a delay,
  // keeps autoplay from fighting the user mid-swipe/click.
  const pauseAutoplay = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), AUTOPLAY_RESUME_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePrev = () => {
    pauseAutoplay();
    scrollToIndex(activeIndex - 1);
  };
  const handleNext = () => {
    pauseAutoplay();
    scrollToIndex(activeIndex + 1);
  };

  // Keep activeIndex in sync if the user swipes the carousel manually.
  // Uses a single card's width (not the container's) so this stays correct
  // whether 1 card (mobile) or 2 cards (tablet/laptop) are visible per view.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0];
    const second = track.children[1];
    // Distance between two consecutive cards' offsetLeft includes the
    // gap between them, unlike a single card's offsetWidth — using just
    // offsetWidth under-counts the step and causes index drift.
    const step = first && second ? second.offsetLeft - first.offsetLeft : first ? first.offsetWidth : track.clientWidth;
    if (!step) return;
    const idx = Math.round(track.scrollLeft / step);
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  };

  // Auto-scroll: mobile + tablet carousel only. Desktop (>=1440px) is a
  // static grid and never autoplays. Pauses while the user is interacting
  // and whenever the tab isn't visible.
  useEffect(() => {
    if (isDesktop || isPaused) return;
    if (typeof document !== "undefined" && document.hidden) return;

    const id = setInterval(() => {
      // Read the latest index from the ref (not the closed-over `activeIndex`)
      // and let scrollToIndexLooping do the single state update — advancing
      // by exactly one card per tick.
      const next = activeIndexRef.current + 1;
      scrollToIndexLooping(next);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isDesktop, isPaused, courses.length]);

  // Also pause/resume autoplay when the browser tab is hidden/shown.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <AmbientBlueBackground className="max-w-[1800px] mx-auto">
      <section
        className="relative w-full max-w-[1800px] mx-auto overflow-hidden py-16"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
        />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-[#13235b]">
              Our Popular <span className="text-[#2b5cff]">Courses</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2b5cff]" />
            <p className="mt-4 text-gray-500">Start your learning journey with our in-demand courses</p>
          </div>

          {/*
            Breakpoints:
            - below 768px (mobile): 1 card per view, carousel, autoplay
            - 768px–1439px (tablet / normal laptop): 2 cards per view, carousel, autoplay
            - 1440px and up: static 3x3 grid, no carousel, no autoplay
          */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            onTouchStart={pauseAutoplay}
            onMouseDown={pauseAutoplay}
            onWheel={pauseAutoplay}
            className="no-scrollbar flex items-stretch min-[1440px]:grid min-[1440px]:grid-cols-3 min-[1440px]:items-stretch gap-4 my-8 overflow-x-auto min-[1440px]:overflow-visible snap-x snap-mandatory scroll-smooth"
          >
            {courses.map((course) => (
              <div
                key={course.key}
                className="w-full md:w-[calc(50%-8px)] min-[1440px]:w-auto h-auto flex-none snap-center min-[1440px]:contents"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          {/* Prev / Next arrows — shown until the 3x3 grid kicks in at 1440px */}
          <div className="flex min-[1440px]:hidden items-center justify-center gap-6 -mt-2 mb-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous course"
              disabled={activeIndex === 0}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow disabled:opacity-40 transition"
            >
              <ChevronLeft size={20} className="text-[#13235b]" />
            </button>

            <div className="flex items-center gap-1.5">
              {courses.map((course, i) => (
                <span
                  key={course.key}
                  className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-4 bg-[#2b5cff]" : "w-1.5 bg-gray-300"
                    }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next course"
              disabled={activeIndex === courses.length - 1}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow disabled:opacity-40 transition"
            >
              <ChevronRight size={20} className="text-[#13235b]" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2b5cff] px-6 py-3 font-semibold text-white shadow transition hover:bg-[#1f49d6]"
              onClick={openPopup}
            >
              ⬇ Download Brochure
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#13235b] px-6 py-3 font-semibold text-white shadow transition hover:bg-[#0e1a44]"
              onClick={() =>
                window.open(
                  "https://wa.me/9004001938?text=Hi%20I'm%20interested%20in%20your%20courses.",
                  "_blank"
                )
              }
            >
              📅 Book a Free Demo
            </button>
          </div>
        </div>

      </section>

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </AmbientBlueBackground>
  );
}