"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FixedLogo = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Show logo only when at the top (within 15px of top)
          setIsVisible(currentScrollY <= 15);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-2 right-8 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src="https://res.cloudinary.com/bropujss/image/upload/v1783687585/connecting_dot_erp_logo_oidgta_1_ewvjqf.avif"
        alt="ERP Logo"
        width={170}
        height={100}
        className="object-contain"
      />
    </div>
  );
};

export default FixedLogo;