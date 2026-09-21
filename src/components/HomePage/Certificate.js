// components/HomePage/Certificate.js (Tailwind + styled-jsx)
"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Playfair_Display } from "next/font/google";
import SectionHeading from "@/components/CoursesComponents/SectionHeading";

// Serif display face — used only for the headline & course title chip
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

// Dynamically import Btnform to prevent SSR-related issues
const Btnform = dynamic(() => import("@/components/HomePage/Btnform"), {
  ssr: false,
});

// Short, scannable highlights instead of a dense paragraph

const Certificate = ({ data }) => {
  const safeData = data && typeof data === 'object' ? data : {};
  const highlights = Array.isArray(safeData.highlights) ? safeData.highlights : [];
  const courseTitle = safeData.courseTitle || "Professional Training Certificate";
  const altText = safeData.alt || "Professional training certificate";
  const description = safeData.description || "";
  const completionText = safeData.completionText || ""
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <section className="relative w-full max-w-[1800px] mx-auto overflow-hidden bg-white dotted-bg pt-3 py-14">
      <div className="max-w-[1800px] mx-auto relative px-4 sm:px-6">
        <SectionHeading title="Certificate" />

        <div className="relative mx-2 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 mt-8">
          <div className="relative rounded-[1.75rem] overflow-hidden shadow-[0_30px_80px_-30px_rgba(8,21,39,0.45)] ring-1 ring-[#C9A227]/20 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">

            {/* Left: navy zone, certificate leads */}
            <div className="relative bg-gradient-to-br from-[#0B1E3F] via-[#102A52] to-[#081527] px-6 sm:px-10 py-12 flex items-center justify-center">
              <div className="relative">
                {/* corner ribbon — stays level, not rotated with the frame */}
                <div className="ribbon-wrap">
                  <span className="ribbon-tag">Certified</span>
                </div>

                <div className="cert-frame relative bg-[#FBF8F2] rounded-xl border-2 border-[#C9A227]/60 p-3">
                  <Image
                    src={"https://res.cloudinary.com/bropujss/image/upload/v1789796293/CD_certificate_updated_xzndsg.webp"}
                    alt={altText}
                    width={1000}
                    height={500}
                    className="w-full max-w-md h-auto lg:h-72 object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right: cream zone, content leads */}
            <div className="relative bg-[#FBF8F2] px-6 sm:px-10 md:px-12 py-12 flex flex-col justify-center gap-6 lg:border-l lg:border-[#C9A227]/30">

              <span
                className={`${playfair.className} inline-block w-fit mx-auto lg:mx-0 rounded-full border-2 border-[#C9A227] bg-white/70 px-4 py-1 text-sm sm:text-base text-[#0B1E3F]`}
              >
                {courseTitle}
              </span>

              <h2
                className={`${playfair.className} text-2xl sm:text-3xl lg:text-[2.1rem] font-semibold text-[#0B1E3F] leading-snug text-center lg:text-left`}
              >
                Congratulations on Completing Your Training
              </h2>
              <span>
                {completionText}
              </span>

              <span className="text-sm text-gray-600">
                {description || ""}
              </span>

              <ul className="space-y-3">
                {highlights.map((line, i) => (
                  <li key={i} className="flex items-start gap-3 justify-center lg:justify-start text-left">
                    <span className="check-dot shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#0B1E3F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#33415C] text-sm sm:text-[15px] leading-snug">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  onClick={handleButtonClick}
                  className="cert-btn relative overflow-hidden font-semibold py-3 px-7 text-sm sm:text-base rounded-full shadow-lg transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2] hover:scale-[1.03] active:scale-95"
                >
                  <span className="relative z-10 text-[#F3D67A] sm:hidden">Get Certificate</span>
                  <span className="relative z-10 text-[#F3D67A] hidden sm:inline">Get Your Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {showForm && <Btnform onClose={handleCloseForm} />}
      </div>

      <style jsx>{`
        .dotted-bg {
          background-color: #ffffff;
          background-image: radial-gradient(rgba(11, 30, 63, 0.12) 1.5px, transparent 1.5px);
          background-size: 18px 18px;
        }

        .cert-frame {
          // transform: rotate(-3deg);
          box-shadow: 0 22px 45px -18px rgba(201, 162, 39, 0.35), 0 10px 25px -10px rgba(0, 0, 0, 0.4);
          transition: transform 0.5s ease;
        }
        .cert-frame:hover {
          transform: rotate(0deg);
        }

        /* corner ribbon */
        .ribbon-wrap {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 120px;
          height: 120px;
          overflow: hidden;
          z-index: 2;
          pointer-events: none;
        }
        .ribbon-tag {
          position: absolute;
          display: block;
          width: 170px;
          padding: 6px 0;
          top: 24px;
          left: -42px;
          transform: rotate(-45deg);
          background: linear-gradient(90deg, #f3d67a, #c9a227 55%, #d9be6b);
          color: #0b1e3f;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }

        .check-dot {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: linear-gradient(145deg, #f3d67a, #c9a227 55%, #96771a);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .cert-btn {
          background: linear-gradient(90deg, #0b1e3f, #102a52 55%, #0b1e3f);
        }
        .cert-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          transition: left 0.7s;
        }
        .cert-btn:hover::before {
          left: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .cert-frame {
            transition: none;
          }
          .cert-btn::before {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Certificate;