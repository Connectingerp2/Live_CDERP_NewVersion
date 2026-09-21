import React from "react";
import { Crown, GraduationCap, BookOpen, Star, Briefcase } from "lucide-react";
import AmbientBlueBackground from "../../components/BackgroundCss/AnimatedBlueBg";
import Container from "../StandardContainer";

/* ============================================================
   StatsSection — single-file version
   Theme: blue & white, skeuomorphic pillowy cards.
   Heading/subtitle are plain, simple text (no emboss/plaque).
   Motion: only the ambient background ripple rings animate;
   everything else renders statically, no entrance animation.
   ============================================================ */

const STATS = [
  {
    value: "10+", title: "Years of Legacy", tint: "#b47a08", icon: <Crown size={26} strokeWidth={1.8} />,
    desc: "Our institute, with over 10+ years of excellence, is transforming lives through quality education."
  },
  {
    value: "5,000+", title: "Students Taught", tint: "#1a7a42", icon: <GraduationCap size={26} strokeWidth={1.8} />,
    desc: "Our institute has educated and trained 5000+ students, empowering them with practical, industry-ready skills."
  },
  {
    value: "50+", title: "Courses Offered", tint: "#4d3ecf", icon: <BookOpen size={26} strokeWidth={1.8} />,
    desc: "Our institute offers 50+ industry-relevant courses designed to help learners upskill across domains."
  },
  {
    value: "4.8/5", title: "Google Rating", tint: "#c95f08", icon: <Star size={26} strokeWidth={1.8} />,
    desc: "Our institute is rated 4.9/5 on Google, reflecting the trust and satisfaction of our learners."
  },
  {
    value: "200+", title: "Hiring Partners", tint: "#2456b8", icon: <Briefcase size={26} strokeWidth={1.8} />,
    desc: "Our institute has 200+ hiring partners that trust our talent and help students kickstart their careers."
  },
];

export default function StatsSection() {
  return (
    <Container>
      <AmbientBlueBackground
        as="section"
        className="ss-section max-w-[1800px]"
        aria-labelledby="ss-heading"
      >
        <style>{`
        .ss-section {
          width: 100%;
          padding: 60px 28px 80px;
          box-sizing: border-box;
        }

        .ss-head { position: relative; z-index: 2; text-align: center; margin-bottom: 52px; }

        .ss-heading {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 3.4vw, 38px);
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #1e3a66;
        }

        .ss-accent {
          color: #2563eb;
        }

        .ss-headingRule {
          width: 64px;
          height: 3px;
          margin: 14px auto 0;
          border-radius: 2px;
          background: #2563eb;
        }

        .ss-subtitle {
          margin: 12px 0 0;
          font-size: 15px;
          color: #3d557a;
        }

        .ss-underline { border-bottom: 2px solid #2563eb; padding-bottom: 2px; }

        /* ---------- layout: cards on a connecting rail ---------- */
        .ss-grid {
          list-style: none;
          margin: 0 auto;
          padding: 0;
          max-width: 1380px;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(var(--stat-count, 5), 1fr);
          gap: 26px;
        }

        @media (min-width: 1101px) {
          .ss-grid::before {
            content: "";
            position: absolute;
            left: 0; right: 0; top: 80px;
            height: 9px;
            border-radius: 5px;
            background: linear-gradient(180deg, #cddcf5 0%, #7fa4e0 45%, #5f86c9 70%, #a4c0ec 100%);
            box-shadow:
              inset 0 1px 1px rgba(255, 255, 255, 0.7),
              inset 0 -2px 3px rgba(30, 58, 102, 0.30),
              0 2px 4px rgba(30, 58, 102, 0.18);
            z-index: 0;
          }
        }

        @media (max-width: 1100px) { .ss-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .ss-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 460px)  { .ss-grid { grid-template-columns: 1fr; } }

        /* ---------- the extruded card ---------- */
        .ss-card {
          position: relative;
          z-index: 2;
          border-radius: 28px;
          padding: 24px 18px 26px;
          min-height: 200px;
          box-sizing: border-box;
          background: linear-gradient(155deg, #ffffff 0%, #eff5fd 55%, #dbe8f9 100%);
          box-shadow:
            inset 0 2px 2px rgba(255, 255, 255, 1),
            inset 3px 5px 10px rgba(255, 255, 255, 0.7),
            inset 0 -4px 8px rgba(37, 99, 235, 0.22),
            inset -2px 0 5px rgba(37, 99, 235, 0.10),
            0 2px 4px rgba(30, 58, 102, 0.20),
            0 16px 32px rgba(37, 99, 235, 0.22);
          transition: transform 220ms ease, box-shadow 220ms ease;
          will-change: transform;
        }

        @media (hover: hover) {
          .ss-card:hover {
            transform: translateY(-6px);
            box-shadow:
              inset 0 2px 2px rgba(255, 255, 255, 1),
              inset 3px 5px 10px rgba(255, 255, 255, 0.7),
              inset 0 -4px 8px rgba(37, 99, 235, 0.22),
              inset -2px 0 5px rgba(37, 99, 235, 0.10),
              0 4px 8px rgba(30, 58, 102, 0.18),
              0 26px 48px rgba(37, 99, 235, 0.30);
          }
          .ss-card:hover .ss-iconDisc {
            transform: translateY(-2px);
            box-shadow:
              inset 0 2px 3px rgba(255, 255, 255, 1),
              inset 0 -3px 5px rgba(37, 99, 235, 0.40),
              0 7px 12px rgba(30, 58, 102, 0.35),
              0 2px 3px rgba(0, 0, 0, 0.18);
          }
        }

        /* ---------- the raised 3D icon button ---------- */
        .ss-iconRow { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }

        .ss-iconWell {
          flex: none;
          width: 70px; height: 70px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(180deg, #c3d7f5 0%, #dfebfb 60%, #f5f9fe 100%);
          box-shadow:
            inset 0 4px 7px rgba(30, 58, 102, 0.32),
            inset 0 -1px 2px rgba(255, 255, 255, 0.9),
            0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .ss-iconDisc {
          width: 54px; height: 54px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          background: radial-gradient(circle at 30% 24%, #ffffff 0%, #f1f6fd 40%, #c2d7f2 100%);
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 5px rgba(37, 99, 235, 0.40),
            0 5px 9px rgba(30, 58, 102, 0.32),
            0 1px 2px rgba(0, 0, 0, 0.18);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .ss-iconDisc::before {
          content: "";
          position: absolute;
          top: 5px; left: 9px;
          width: 26px; height: 14px;
          border-radius: 50%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0));
          pointer-events: none;
        }

        .ss-iconDisc svg { filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3)); }

        .ss-headline { min-width: 0; }
        .ss-h3 { margin: 0; display: flex; flex-direction: column; }

        .ss-value {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          font-weight: 700;
          color: #15161a;
          line-height: 1.1;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .ss-title {
          display: block;
          font-size: 13.5px;
          font-weight: 700;
          color: #1e3a66;
          margin-top: 3px;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .ss-desc {
          margin: 4px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: #3d557a;
        }

        /* ---------- accessibility: motion + contrast prefs ---------- */
        @media (prefers-reduced-motion: reduce) {
          .ss-card, .ss-iconDisc { transition: none; }
          .ss-card:hover { transform: none; }
          .ss-card:hover .ss-iconDisc { transform: none; }
        }
      `}</style>

        <header className="ss-head">
          <h2 id="ss-heading" className="text-3xl sm:text-4xl md:text-5xl ss-heading">
            Our Stats <span className="ss-accent">At A</span> Glance
          </h2>
          <div className="ss-headingRule" aria-hidden="true" />
          <p className="ss-subtitle">
            Milestones that define our journey and success
          </p>
        </header>

        <ul className="ss-grid" style={{ "--stat-count": STATS.length }}>
          {STATS.map((s, i) => (
            <li key={i} className="ss-card">
              <div className="ss-iconRow">
                <span className="ss-iconWell">
                  <span className="ss-iconDisc" style={{ color: s.tint }}>
                    {s.icon}
                  </span>
                </span>
                <div className="ss-headline">
                  <h3 className="ss-h3">
                    <span className="ss-value">{s.value}</span>
                    <span className="ss-title">{s.title}</span>
                  </h3>
                </div>
              </div>
              <p className="ss-desc">{s.desc}</p>
            </li>
          ))}
        </ul>
      </AmbientBlueBackground>
    </Container>
  );
}