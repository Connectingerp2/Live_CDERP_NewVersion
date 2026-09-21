"use client";

import { Briefcase, Calendar, Globe2, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import TrustBar from "./TrustBar";

// Lightweight replacement for react-countup — no deps, animates once on view
function useCountUp(end, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(end);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return { value, ref };
}

const premiumClients = [
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784196792/Accenture_tq8yph_csm5fm.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784190703/wipro_uaggn6_pa26lz.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784193712/infosys_fwvbzh_peauzo.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784194657/google_fyyiqe_cnt0ft.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784193553/microsoft_rpgsvd_ufsjh5.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784196247/capgemini_a2rbho_fghbhe.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784193319/tcs_d0gfvm_n8ckd5.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784196516/amdocs_ht9zgl_jjlvem.avif",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197852/Ibmm_rmcikx_nh4x5a.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199617/paytm_e2vqfx_zk6tmu.webp",
  "https://res.cloudinary.com/bropujss/image/upload/v1784196247/capgemini_a2rbho_fghbhe.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784193411/swiggy_t0utde_o5pxt2.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784194527/hdfc_jvdkoi_cf4mlm.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784194989/God_g8j8xc_nl5owb.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784196399/baja_xxmf3l_saurcq.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784196972/bharatpe_p9ixem_wio63w.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199566/pizza-hut_dhd1o8_argx2k.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197632/exl_zle2ra_mg0tfy.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199677/volkswagon_pcvphe_cdvnhu.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197965/jindal_njgnxp_nbmnsn.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784198042/john-deere_ohljwx_uxiuzq.webp",
  "https://res.cloudinary.com/bropujss/image/upload/v1784196319/bostonbyte_hljirv_fnhzks.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784193475/sharechat_eieyag_dqslhj.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199337/leapfinance_v7ykv6_xvnw50.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199455/moneytap_dizaqo_qccgwl.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199726/whitehat_emmomu_uzfh8l.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197326/cummins_alim2w_tdory9.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784196748/airmeet_idryrc_lcmgoo.avif",
  "https://res.cloudinary.com/bropujss/image/upload/v1784196453/ask_nncu3a_nucsuv.avif",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784196925/bharatgri_weuerc_vltjko.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197129/capita_r10ko1_epy8vy.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197269/crisi_ciluav_crx1ki.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197679/eatfit_bg4cj0_tg3tj6.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197751/genius_tqh8rw_b4u9dl.webp",
  "https://res.cloudinary.com/bropujss/image/upload/v1784194452/homelane_rl9bh6_dkwqll.avif",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784197917/iss_gcjk9j_ymm5xy.webp",
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784199398/kelly_bkcgnw_emivqo.webp",
];

const statsData = [
  { number: 15, text: "Years experience", Icon: Calendar },
  { number: 200, text: "Happy students", Icon: Users },
  { number: 20, text: "hiring partners", Icon: Globe2 },
  { number: 50, text: "expert courses", Icon: Briefcase, last: true },
];

const shuffleArray = (array) => {
  return array
    .map((value, index) => ({
      value,
      index,
      sortKey: `${value}-${index}`,
    }))
    .sort((first, second) => {
      if (first.sortKey < second.sortKey) return -1;
      if (first.sortKey > second.sortKey) return 1;
      return 0;
    })
    .map(({ value }) => value);
};

const getLogoAlt = (logoUrl) => {
  if (typeof logoUrl !== "string" || !logoUrl) return "Client logo";
  const filename = logoUrl.split("/").pop() || logoUrl;
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/^v\d+\//, "")
    .replace(/[_-]+/g, " ")
    .trim();
};

function Stat({ number, text, Icon }) {
  const { value, ref } = useCountUp(number);
  return (
    <div ref={ref} className="flex items-center gap-2.5">
      <Icon className="w-4 h-4 text-blue-500 shrink-0" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold text-blue-900 tabular-nums leading-none">
          {value}+
        </span>
        <span className="text-[9px] uppercase tracking-wide text-gray-400">
          {text}
        </span>
      </div>
    </div>
  );
}

const MarqueeRow = ({ logos = [], direction = "left", speed = "normal", shuffle = false }) => {
  // Stable list – shuffle only once, no re-render loop
  const logosToUse = useMemo(() => {
    const safe = Array.isArray(logos) ? logos : [];
    return shuffle ? shuffleArray(safe) : safe;
  }, [logos, shuffle]);

  const speedMultiplier =
    speed === "slow" ? "40s" : speed === "fast" ? "20s" : "30s";

  const animationClass =
    direction === "right" ? "animate-marquee-reverse" : "animate-marquee";

  if (!logosToUse.length) return null;

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-4 sm:gap-6 md:gap-8 ${animationClass}`}
        style={{
          width: "max-content",
          animationDuration: speedMultiplier,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
      >
        {/* First set */}
        {logosToUse.map((logo, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 group w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-2"
          >
            <Image
              src={logo}
              alt="client logo"
              width={120}
              height={100}
              className="object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
              quality={60}
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
            />
          </div>
        ))}

        {/* Identical second set for seamless loop (aria-hidden) */}
        {logosToUse.map((logo, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 group w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-2"
            aria-hidden="true"
          >
            <Image
              src={logo}
              alt="company logos"
              width={120}
              height={100}
              className="object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const OurClients = () => {
  return (
    <div className="w-full max-w-[1800px] mx-auto">
        <section
          className="sm:py-12 md:py-12 relative"
          style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            overflow: "hidden",
            maxWidth: "1800px",
            margin: "0 auto",
          }}
        >
          <div className="container w-full mx-auto px-0 md:px-4 lg:px-8 relative my-2 md:my-0 lg:my-0 xl:my-0">
            <div className="text-center mb-4 sm:mb-14 md:mb-16">
              <div className="relative z-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
                  Trust Bar
                </h2>
                <div className="w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Trusted by industry leaders worldwide
                </p>
              </div>
            </div>

            <div className="w-full md:w-[90%] lg:w-[90%] xl:w-[90%] mx-auto pb-8 mt-8">
              <TrustBar />
            </div>

            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
                <MarqueeRow
                  logos={premiumClients}
                  direction="left"
                  speed="slow"
                  shuffle={true}
                />
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default OurClients;