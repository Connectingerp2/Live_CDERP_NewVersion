// components/CoursesComponents/Why.js

"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/CoursesComponents/Why.module.css";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
const Why = ({ data }) => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>No data available for this section.</p>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`${styles.containerYds} py-0 ${sectionInView ? styles.fadeIn : styles.hidden}`}
    >
      <SectionComponent section={data} />
    </div>
  );
};

const SectionComponent = ({ section }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add(styles.titleAnimation);
    }
  }, []);

  const cards = section?.cards || [];

  // Pull just the "answer" out of every card — flatten string vs array content
  // into one plain string each, drop anything empty.
  const paragraphs = cards
    .map((card) =>
      Array.isArray(card.content) ? card.content.join(" ") : card.content
    )
    .filter(Boolean);

  // Any structured listItems across cards become a single consolidated
  // "Key points" list, rather than living inside separate cards.
  const keyPoints = cards.flatMap((card) => card.listItems || []);

  const heading = section?.title || "Course overview";
  const kicker = section?.kicker || section?.subtitle || "What this course covers";

  if (paragraphs.length === 0) {
    return (
      <section
        className="w-full px-6 py-24 text-center"
        style={{ backgroundColor: "#fbfbfb" }}
      >
        <p style={{ color: "#4B5163", fontFamily: "'IBM Plex Sans', sans-serif" }}>
          No content available for this section.
        </p>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden px-6 pt-8 pb-18 md:py-15"
      style={{ backgroundColor: "#fbfbfb" }}
    >
      <SectionHeading
        title="Course Overview"
        description=""
      />
      {/* faint ruled-paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.4,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 35px, #D8D2C2 35px, #D8D2C2 36px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl md:mb-20">
          <p
            className="mb-3 text-base italic"
            style={{ color: "#6B4E1D", fontFamily: "'IBM Plex Serif', Georgia, serif" }}
          >
            {kicker}
          </p>
          <h2
            ref={titleRef}
            className="text-4xl leading-[1.15] tracking-tight md:text-5xl"
            style={{
              color: "#12192B",
              fontFamily: "'IBM Plex Serif', Georgia, serif",
              fontWeight: 600,
            }}
          >
            {heading}
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 gap-y-12 ${keyPoints.length > 0 ? "lg:grid-cols-12 lg:gap-x-16" : ""
            }`}
        >
          {/* Combined answers, as flowing paragraphs */}
          <div className={keyPoints.length > 0 ? "lg:col-span-8" : ""}>
            <div
              className="space-y-6 text-[17px] md:text-[18px]"
              style={{
                color: "#3D4257",
                fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
                lineHeight: 1.75,
                maxWidth: "62ch",
              }}
            >
              {paragraphs.map((html, idx) => (
                <p
                  key={idx}
                  className={idx === 0 ? "drop-cap" : undefined}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </div>
          </div>

          {/* Only rendered when cards actually carry listItems */}
          {keyPoints.length > 0 && (
            <div className="lg:col-span-4">
              <div className="border-t pt-6" style={{ borderColor: "#C9C2AC" }}>
                <h3
                  className="mb-4 text-sm"
                  style={{ color: "#12192B", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
                >
                  Key points
                </h3>
                <ul className="space-y-2">
                  {keyPoints.map((item, i) => (
                    <li
                      key={i}
                      className="text-[15px]"
                      style={{ color: "#4B5163", fontFamily: "'IBM Plex Sans', sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500&display=swap");
      `}</style>
      <style jsx>{`
        .drop-cap::first-letter {
          float: left;
          font-family: "IBM Plex Serif", Georgia, serif;
          font-size: 3.6rem;
          line-height: 0.85;
          font-weight: 600;
          color: #6b4e1d;
          padding-right: 0.5rem;
          padding-top: 0.35rem;
        }
      `}</style>
    </section>
  );
};

export default Why;