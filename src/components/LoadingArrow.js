"use client";
export default function LoadingArrow({ size = 18, className = "" }) {
  return (
    <svg
      className={`overflow-visible drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Scoped CSS: only the keyframes, since arbitrary Tailwind animation
          values still need the @keyframes body defined somewhere (there's
          no tailwind.config here to add it to). */}
      <style>{`
        @keyframes arrowDrawToFro {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <path
        d="M5 12h14"
        pathLength="1"
        className="[stroke-dasharray:1] [stroke-dashoffset:1] [animation:arrowDrawToFro_1.3s_ease-in-out_infinite_alternate]"
      />
      <path
        d="m12 5 7 7-7 7"
        pathLength="1"
        className="[stroke-dasharray:1] [stroke-dashoffset:1] [animation:arrowDrawToFro_1.3s_ease-in-out_infinite_alternate]"
        style={{ animationDelay: "0.12s" }}
      />
    </svg>
  );
}