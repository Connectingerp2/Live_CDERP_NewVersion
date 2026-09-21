"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import styles from "@/styles/Chatbot.module.css";

const TAWK_PROPERTY_ID = "65d9cf218d261e1b5f64d05b";
const TAWK_WIDGET_ID = "1hndd28n8";
const TAWK_EMBED_SRC = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

const Chatbot = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const toggleChat = useCallback(() => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    const hideTawkDefaults = () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };

    let attempts = 0;
    const checkTawkLoaded = setInterval(() => {
      attempts += 1;
      if (window.Tawk_API) {
        hideTawkDefaults();
        clearInterval(checkTawkLoaded);
      } else if (attempts >= 20) {
        clearInterval(checkTawkLoaded);
      }
    }, 500);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearInterval(checkTawkLoaded);
    };
  }, []);

  const isAdminPath = pathname && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/superadmin') ||
    pathname.startsWith('/AdminLogin')
  );

  if (isAdminPath) {
    return null;
  }

  return (
    <>
      <Script
        id="tawk-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();
          `,
        }}
      />

      <Script
        id="tawk-chat-widget"
        src={TAWK_EMBED_SRC}
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Tawk_API) {
            window.Tawk_API.hideWidget();
          }
        }}
      />

      <button
        className={`${styles.customLauncher} ${isMobile ? styles.mobile : ""}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-10 7.748-1.381 0-2.712-.254-3.959-.722l-3.071 1.05.665-2.923c-1.287-1.107-2.135-2.714-2.135-4.153 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 1.847.738 3.565 2.047 4.89l-1.304 5.723 6.118-2.09c1.283.481 2.643.742 4.039.742 6.627 0 12-4.363 12-9.749s-5.373-9.749-12-9.749z"
          />
        </svg>
      </button>
    </>
  );
};

export default Chatbot;
