"use client";

import { ChevronRight } from "lucide-react";

// const ArrowRight = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//     <path d="M5 12h14" />
//     <path d="M13 6l6 6-6 6" />
//   </svg>
// );


export default function ConsultationButton({ onOpenForm }) {
  return (
    <div className="flex items-center justify-start gap-2 sm:gap-3">
  <button
    className="rounded-lg border border-blue-600 bg-[#593adc] text-white
      px-3 py-2 text-xs
      sm:px-2 sm:py-2.5 sm:text-sm
      md:px-5 md:py-3 md:text-[15px]
      lg:px-6 lg:py-3"
    onClick={() => {
      window.open(
        "https://wa.me/9004001938?text=Hi%20I'm%20interested%20in%20your%20courses.",
        "_blank"
      );
    }}
  >
    Book a Free Demo Class
  </button>

  <button
    onClick={() => {
      window.open(
        "https://wa.me/9004002941?text=Hi%20I'm%20interested%20in%20your%20courses.",
        "_blank"
      );
    }}
    className="inline-flex items-center justify-center gap-1
      rounded-lg border-2 bg-transparent border-[#593adc]
      text-[#593adc] transition
      hover:bg-[#593adc] hover:text-white
      px-3 py-2 text-xs
      sm:gap-2 sm:px-2 sm:py-2.5 sm:text-sm
      md:px-6 md:py-3 md:text-[15px]
      lg:px-7 lg:py-3"
  >
    Start My Journey
    <ChevronRight
      className="h-4 w-4 sm:h-5 sm:w-5"
    />
  </button>
</div>
  );
}

