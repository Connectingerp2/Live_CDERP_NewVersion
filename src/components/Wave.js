"use client";

import "../styles/Wave.css";

/*
  Key fix for seamless loop:
  - The wave starts and ends at the SAME y value (y=75)
  - The cubic bezier control points are mirrored at the seam so
    the tangent is continuous — no kink or pointy edge at the join
  - Path uses only gentle S-curves with mild amplitude (~20px)
  - viewBox 2880x120, two copies side by side, CSS slides by -50%
*/
const WaveComponent = () => {
  return (
    <div className="wave12-section" aria-hidden="true">
      <div className="wave-container">
        <svg
          className="static-wave"
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          focusable="false"
          role="presentation"
        >
          {/* Single unified path — two seamlessly joined wave periods */}
          <path
            d="
              M0,75
              C120,75 200,55 360,55
              C520,55 600,75 720,75
              C840,75 920,95 1080,95
              C1240,95 1320,75 1440,75
              C1560,75 1640,55 1800,55
              C1960,55 2040,75 2160,75
              C2280,75 2360,95 2520,95
              C2680,95 2760,75 2880,75
              L2880,120 L0,120 Z
            "
            fill="#182E4A"
          />
        </svg>
      </div>
    </div>
  );
};

export default WaveComponent;
