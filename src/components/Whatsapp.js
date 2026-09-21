"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/Whatsapp.module.css";

const WHATSAPP_ICON =
  "M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.93 11.93 0 0 0 5.81 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.49-8.43Zm-8.45 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 0 1-1.51-5.28c0-5.46 4.43-9.9 9.89-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.45-4.44 9.89-9.91 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.29-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z";

const Whatsapp = ({ phoneNumber }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isAdminPath = pathname && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/superadmin') ||
    pathname.startsWith('/AdminLogin')
  );

  // ✅ Safe conditional rendering AFTER all hooks
  if (isAdminPath || isMobile) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "").replace(/^0+/, "");
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.floatingWhatsappContainer}>
      <div className={styles.floatingWhatsapp} onClick={handleWhatsAppClick}>
        <svg viewBox="0 0 24 24" width="2em" height="2em" fill="currentColor" aria-hidden="true">
          <path d={WHATSAPP_ICON} />
        </svg>
      </div>
    </div>
  );
};

export default Whatsapp;
