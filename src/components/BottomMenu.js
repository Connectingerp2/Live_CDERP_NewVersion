"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaStar, FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ChatbotIcon from "@/components/ChatbotIcon";
import styles from "@/styles/BottomMenu.module.css";

const MENU_ITEMS = [
  {
    id: "chatbot",
    action: "open-chat",
    icon: <ChatbotIcon />,
    label: "Chat",
    color: "#7B61FF",
  },
  {
    id: "whatsapp",
    href: "https://wa.me/+919004002958",
    icon: <FaWhatsapp size={22} />,
    label: "WhatsApp",
    color: "#25D366",
  },
  {
    id: "review",
    href: "https://g.co/kgs/d827hLN",
    icon: <FaStar size={22} />,
    label: "Rating 4.7*",
    color: "#FFD700",
  },
  {
    id: "contact",
    href: "tel:+919004002958",
    icon: <FaPhoneAlt size={20} />,
    label: "Call Us",
    color: "#0D6EFD",
  },
];

const BottomMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const pathname = usePathname();
  const resetActiveItemTimeoutRef = useRef(null);

  const isAdminPath =
    pathname &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/superadmin") ||
      pathname === "/AdminLogin");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (resetActiveItemTimeoutRef.current) {
        clearTimeout(resetActiveItemTimeoutRef.current);
      }
    };
  }, []);

  const handleItemClick = (id) => {
    if (resetActiveItemTimeoutRef.current) {
      clearTimeout(resetActiveItemTimeoutRef.current);
    }

    setActiveItem(id);
    resetActiveItemTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
      resetActiveItemTimeoutRef.current = null;
    }, 500);
  };

  const openChat = () => {
    if (typeof window === "undefined" || !window.Tawk_API) {
      return;
    }

    if (typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
      return;
    }

    if (typeof window.Tawk_API.toggle === "function") {
      window.Tawk_API.toggle();
    }
  };

  if (!isMobile || isAdminPath) return null;

  return (
    <nav className={styles.bottomMenu}>
      <div className={`container-fluid ${styles.menuContainer}`}>
        <div className={styles.menuWrapper}>
          {MENU_ITEMS.map((item) => {
            const className = `${styles.menuItem} ${
              activeItem === item.id ? styles.active : ""
            }`;

            if (item.action === "open-chat") {
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`${className} ${styles.menuButton}`}
                  onClick={() => {
                    handleItemClick(item.id);
                    openChat();
                  }}
                  aria-label="Open chat"
                >
                  <div className={styles.iconWrapper} style={{ color: item.color }}>
                    {item.icon}
                    <div
                      className={styles.ripple}
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                  <span className={styles.label}>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.id}
                className={className}
                onClick={() => handleItemClick(item.id)}
              >
                <div className={styles.iconWrapper} style={{ color: item.color }}>
                  {item.icon}
                  <div
                    className={styles.ripple}
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
                <span className={styles.label}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default memo(BottomMenu);
