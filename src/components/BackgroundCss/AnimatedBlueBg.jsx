import React from "react";

/* ============================================================
   AmbientBlueBackground
   A reusable backdrop: soft blue/white wash, three pulsing
   "ripple" rings drifting outward from center, and a few
   embossed decorative rings in the corners.

   Usage:
     <AmbientBlueBackground as="section" className="my-section">
       ...your content...
     </AmbientBlueBackground>

   - `as`        : which element to render as (default "div")
   - `className` : extra class(es) merged onto the root element,
                   e.g. for padding/layout specific to that page
   - any other prop (id, aria-*, onClick, etc.) is passed through
   - children are placed above the background, in normal flow
   ============================================================ */

export default function AmbientBlueBackground({
    as: Tag = "div",
    className = "",
    children,
    ...rest
}) {
    return (
        <Tag className={`abg-root${className ? ` ${className}` : ""}`} {...rest}>
            <style>{`
        .abg-root {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #eaf2fd 45%, #d3e5fb 100%);
        }

        .abg-root::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
          pointer-events: none;
          z-index: 2;
        }

        /* concentric glow-rings pulsing outward from the center */
        .abg-blobs {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 1px;
          pointer-events: none;
          z-index: 0;
        }
        .abg-blob {
          position: absolute;
          top: 0; left: 0;
          width: 140px; height: 140px;
          margin: -70px 0 0 -70px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(58, 130, 245, 0.20) 0%, rgba(58, 130, 245, 0.12) 45%, rgba(58, 130, 245, 0) 72%);
          border: 1px solid rgba(37, 99, 235, 0.25);
          opacity: 0;
          animation: abg-ripple 7s ease-out infinite;
        }
        .abg-blob1 { animation-delay: 0s; }
        .abg-blob2 { animation-delay: 2.33s; }
        .abg-blob3 { animation-delay: 4.66s; }

        @keyframes abg-ripple {
          0%   { transform: scale(0.6); opacity: 0.65; }
          85%  { transform: scale(9); opacity: 0; }
          100% { transform: scale(9); opacity: 0; }
        }

        /* embossed decorative rings tucked into the corners */
        .abg-deco {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          border: 22px solid transparent;
          background: linear-gradient(180deg, rgba(37, 99, 235, 0.12), rgba(255, 255, 255, 0.65)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: 1;
          opacity: 0.5;
        }
        .abg-decoA { width: 420px; height: 420px; top: -180px; left: -140px; }
        .abg-decoB { width: 560px; height: 560px; bottom: -300px; right: -180px; border-width: 30px; }
        .abg-decoC { width: 220px; height: 220px; top: 30px; right: 14%; border-width: 14px; opacity: 0.4; }

        .abg-content {
          max-width:"1800px";
          position: relative;
          z-index: 2;
          overflow:"hidden";
        }

        @media (prefers-reduced-motion: reduce) {
          .abg-blob { animation: none; }
        }
      `}</style>

            <span className="abg-blobs" aria-hidden="true">
                <span className="abg-blob abg-blob1" />
                <span className="abg-blob abg-blob2" />
                <span className="abg-blob abg-blob3" />
            </span>

            <span className="abg-deco abg-decoA" aria-hidden="true" />
            <span className="abg-deco abg-decoB" aria-hidden="true" />
            <span className="abg-deco abg-decoC" aria-hidden="true" />

            <div className="abg-content">{children}</div>
        </Tag>
    );
}