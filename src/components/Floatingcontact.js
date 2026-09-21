"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import styles from "@/styles/Floatingcontact.module.css";

const PHONE_ICON =
  "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.25 1.01l-2.2 2.2Z";

const Floatingcontact = ({ phoneNumber }) => {
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

  const handlecontactClick = () => {
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "").replace(/^0+/, "");
    const Contact = `tel:${formattedPhoneNumber}`;
    window.open(Contact, '_self');
  };

  // ✅ Safe conditional rendering after all hooks
  if (isAdminPath || isMobile) {
    return null;
  }

  return (
    <div className={styles.floatingContactContainer}>
      <div className={styles.floatingContact} onClick={handlecontactClick}>
        <svg viewBox="0 0 24 24" width="2em" height="2em" fill="currentColor" aria-hidden="true">
          <path d={PHONE_ICON} />
        </svg>
      </div>
    </div>
  );
};

export default Floatingcontact;
