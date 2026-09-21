import Image from "next/image";
import { Barlow_Condensed } from "next/font/google";
import ConsultationButton from "./ConsultationButton";

/* ---------- Inline SVG icons ---------- */
const StarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
  </svg>
);

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});


export default function CareerHeroSlide({ onOpenForm }) {
  return (
    <section className="relative w-full h-auto bg-white">
      {/* ================================================================
        MOBILE-ONLY: image is a normal in-flow element (sets the section's
        height by its own aspect ratio). Text panel is absolutely positioned
        on top of it with a glassmorphic look. No hard-coded heights needed.
      ================================================================ */}
      <div className="relative sm:hidden w-full">
        {/* Image — normal flow, w-full h-auto means it scales by its own
            intrinsic aspect ratio and the container height follows it */}
        <Image
          src="https://res.cloudinary.com/djdhtkjhn/image/upload/c_limit,w_900,q_auto,f_auto/v1785906042/mobileHero2_l4nu4u.png"
          alt="AI powered learning, SAP industry standard, smart assessments, personalized roadmap"
          width={900}
          height={1125}
          sizes="100vw"
          className="w-full h-auto"
          priority
          fetchPriority="high"
        />

        {/* Scrim for text readability regardless of what's under the panel */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Glassmorphic hero text panel — overlaid on the image */}
        <div className="absolute inset-0 z-10 flex flex-col justify-start p-3 xs:px-4">
          <div className=" p-3 xs:p-3">
            <div className="inline-flex max-w-full py-2 items-center gap-2 rounded-full bg-white/90 px-2 xs:px-3.5 xs:py-2 shadow-sm ring-1 ring-purple-100 backdrop-blur-sm">
              <StarIcon className="h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0 text-purple-600" />
              <span className="min-w-0 text-[11px] xs:text-xs font-semibold text-gray-800">
                India&apos;s Leading SAP &amp; IT Training with AI Institute
              </span>
            </div>

            <h1
              className={`${barlow.className} heroHeading relative mt-3 text-[30px] xs:text-[36px] leading-[0.95] xs:leading-[0.9] font-extrabold uppercase tracking-[0.05em] text-[#1b3a6d]`}
            >
              From <span className="font-normal">&#x22;</span>Just applying<span className="font-normal">&#x22;</span> to
              <br />
              <span className="bg-gradient-to-r from-[#ff9a3d] via-[#ff5b7b] to-[#b17dff] bg-clip-text text-transparent">
                <span className="font-normal">&#x22;</span>just got hired<span className="font-normal">&#x22;</span>
              </span>
              <br />
            </h1>

            <style jsx>{`
              /* Underline */
                .heroHeading::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  bottom: -18px;
                  width: 90px;
                  height: 5px;
                  border-radius: 999px;
                  background: linear-gradient(
                    90deg,
                    #ff9f43 0%,
                    #ff5e62 50%,
                    #b16cea 100%
                  );
                }
            `}</style>

            <p className="mt-4 text-[14px] xs:text-[15px] leading-relaxed text-gray-800">
              Real SAP, IT & HR training — taught by people who've done the job.
              Online or offline batches, built around your schedule.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <ConsultationButton onOpenForm={onOpenForm} />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
        DESKTOP (sm+) — UNCHANGED: image with text overlaid on top of it.
      ================================================================ */}
      <div className="relative hidden w-full overflow-hidden sm:block sm:aspect-[16/9] lg:aspect-[14/9] xl:aspect-[2.4/1]">
          <Image
            src="https://res.cloudinary.com/djdhtkjhn/image/upload/c_limit,w_1600,q_auto,f_auto/v1785573435/RoboWidth_mduj2r.png"
            alt="headerImg"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1600px"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
          />
        <div className="absolute inset-0 z-10 mx-auto flex max-w-[1400px] items-start pt-16 box-border px-5 sm:px-8 lg:px-10">
          <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="relative z-10 max-w-2xl lg:col-span-5">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-3 py-2 text-xs shadow-sm ring-1 ring-purple-100 sm:px-4 mb-4">
                <StarIcon className="h-4 w-4 shrink-0 text-purple-600" />
                <span className="min-w-0 text-xs font-semibold text-gray-800 sm:text-sm">
                  India&apos;s Leading SAP &amp; IT Training with AI Institute
                </span>
              </div>

              <h1
                className={`${barlow.className} text-[36px] lg:text-[58px] xl:text-[65px] leading-[0.9] font-extrabold uppercase tracking-[0.05em] text-[#1b3a6d] heroHeading`}
              >
                From <span className="font-normal">&#34;</span>Just applying<span className="font-normal">&#34;</span> to
                <br />

                <span className="gradientText">
                  <span className="font-normal">&#34;</span>just got hired<span className="font-normal">&#34;</span>
                </span>
              </h1>

              <style jsx>{`
                .heroHeading {
                  position: relative;
                  display: inline-block;
                }

                /* Underline */
                .heroHeading::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  bottom: -18px;
                  width: 120px;
                  height: 5px;
                  border-radius: 999px;
                  background: linear-gradient(
                    90deg,
                    #ff9f43 0%,
                    #ff5e62 50%,
                    #b16cea 100%
                  );
                }

                /* Animated Gradient Text */
                .gradientText {
                  display: inline-block;
                  font-weight: 800;
                  line-height: inherit;

                  background: linear-gradient(
                    90deg,
                    #FF3B5C,
                    #E11D48,
                    #C026D3,
                    #8B5CF6,
                    #6D28D9,
                    #FF3B5C
                  );

                  background-size: 300% 100%;
                  background-position: 0% 50%;

                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                  -webkit-text-fill-color: transparent;

                  animation: gradientFlow 6s ease infinite;
                }

                @keyframes gradientFlow {
                  0% {
                    background-position: 0% 50%;
                  }

                  50% {
                    background-position: 100% 50%;
                  }

                  100% {
                    background-position: 0% 50%;
                  }
                }
              `}</style>

              <p className="mt-4 max-w-md rounded-3xl py-2 md:text-md font-thin leading-relaxed text-[#1b3a6d] sm:mt-6 sm:text-lg">
                Real SAP, IT & HR training — taught by people who've done the
                job. Online or offline batches, built around your schedule.
              </p>

              <div className="mt-8 flex items-center justify-start gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
                <ConsultationButton onOpenForm={onOpenForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}