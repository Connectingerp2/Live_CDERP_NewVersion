import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Quote } from "lucide-react";
import SectionBackground from "../BackgroundCss/SectionBackground";
import { homepageReviews, ReviewStarRow } from "../Common/SharedReviews";

const AUTO_MS = 3200;
const GAP = 24; // px gap between cards

export default function TestimonialCarousel() {
  const reviews = useMemo(() => homepageReviews, []);

  const len = reviews.length;
  const trackRef = useRef(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(0); // card width + gap, in px
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  // measure card width, responsively
  const measure = useCallback(() => {
    if (!cardRef.current) return;
    const cardWidth = cardRef.current.getBoundingClientRect().width;
    setStep(cardWidth + GAP);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const restartTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCounter((c) => c + 1);
    }, AUTO_MS);
  }, []);

  useEffect(() => {
    if (!paused && !dragging) restartTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [paused, dragging, restartTimer]);

  const goTo = (i) => {
    setCounter((c) => {
      const currentMod = ((c % len) + len) % len;
      let diff = i - currentMod;
      if (diff <= 0) diff += len;
      return c + diff;
    });
  };
  const prev = () => setCounter((c) => c - 1);
  const next = () => setCounter((c) => c + 1);

  const activeIndex = ((counter % len) + len) % len;

  // render a window of virtual cards, wide enough for the largest breakpoint + buffer
  const windowStart = counter - 1;
  const windowEnd = counter + 6;
  const virtualIndices = [];
  for (let v = windowStart; v <= windowEnd; v++) virtualIndices.push(v);

  const translate = -(counter - windowStart) * step + dragDelta.current;

  // drag / swipe handlers
  const onPointerDown = (e) => {
    setDragging(true);
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragDelta.current = 0;
    clearInterval(timerRef.current);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragDelta.current = x - dragStartX.current;
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(${-(counter - windowStart) * step + dragDelta.current
        }px)`;
    }
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    const threshold = step * 0.2;
    if (trackRef.current) trackRef.current.style.transition = "";
    if (dragDelta.current > threshold) {
      dragDelta.current = 0;
      prev();
    } else if (dragDelta.current < -threshold) {
      dragDelta.current = 0;
      next();
    } else {
      dragDelta.current = 0;
      setCounter((c) => c); // snap back
    }
    restartTimer();
  };

  return (
    <SectionBackground>
      <div className="w-screen flex justify-center items-center relative left-1/2 -translate-x-1/2">
        <section
          className="relative w-full py-16 sm:py-20 px-4 sm:px-6 overflow-hidden max-w-[1800px] bg-transparent"
        >
          <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-14">
            <h2 className="font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight text-[#0f1b3f]">
              What Our{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg,#16255c 0%,#0f9c8d 100%)",
                }}
              >
                Students
              </span>{" "}
              Say
            </h2>
            <div
              className="mx-auto mt-4 mb-5 h-[3px] w-16 rounded-full"
              style={{
                background: "linear-gradient(90deg,#2b3a8f,#12a5c9)",
              }}
            />
            <p className="text-[#5b6272] text-[14px] sm:text-[16px] max-w-lg mx-auto leading-relaxed font-medium">
              Hear from our successful students about their learning experience
              with Connecting Dots
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div
              ref={containerRef}
              className="overflow-hidden select-none touch-pan-y"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => {
                setPaused(false);
                onPointerUp();
              }}
              onMouseDown={onPointerDown}
              onMouseMove={onPointerMove}
              onMouseUp={onPointerUp}
              onTouchStart={onPointerDown}
              onTouchMove={onPointerMove}
              onTouchEnd={onPointerUp}
            >
              <div
                ref={trackRef}
                className="flex"
                style={{
                  gap: GAP,
                  transform: `translateX(${translate}px)`,
                  transition: dragging ? "none" : "transform 0.9s linear",
                }}
              >
                {virtualIndices.map((v, i) => {
                  const idx = ((v % len) + len) % len;
                  const r = reviews[idx];
                  return (
                    <div
                      key={v}
                      ref={i === 1 ? cardRef : null}
                      className="shrink-0 w-[78vw] sm:w-[320px] md:w-[340px] lg:w-[360px] rounded-[22px] p-4 sm:p-7 flex flex-col justify-between"
                      style={{
                        background:
                          "linear-gradient(155deg,#132352 0%,#0c1638 100%)",
                        boxShadow: "0 18px 40px -12px rgba(15,27,63,0.45)",
                        minHeight: 300,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-12 h-12 rounded-full p-[2.5px] shrink-0"
                            style={{
                              background: "linear-gradient(135deg,#7c5cff,#3b82f6)",
                            }}
                          >
                            <img
                              src={r.image}
                              alt={r.name || "feedback img"}
                              className="w-full h-full rounded-full object-cover border-2 border-[#0c1638]"
                              draggable={false}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-[14.5px] truncate">
                              {r.name}
                            </p>
                            <p className="text-[12.5px] font-medium text-white/50 truncate">
                              {r.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <ReviewStarRow rating={r.rating} size={15} className="flex gap-1" />
                        </div>
                      </div>

                      <div className="relative">
                        <Quote
                          size={30}
                          color="rgba(255,255,255,0.14)"
                          fill="rgba(255,255,255,0.14)"
                          strokeWidth={0}
                          className="absolute -top-1 right-0"
                        />
                        <p className="text-white/85 text-[14.5px] leading-relaxed font-medium pr-6">
                          "{r.quote || r.review || ""}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goTo(i);
                  restartTimer();
                }}
                aria-label={`Show testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  background:
                    i === activeIndex
                      ? "linear-gradient(90deg,#2b3a8f,#12a5c9)"
                      : "#c7cce0",
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </SectionBackground>
  );
}