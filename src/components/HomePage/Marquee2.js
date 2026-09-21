import React, { useEffect, useRef } from "react";
import styles from "@/styles/Common/Marquee.module.css";

const ITEMS = [
  "Transforming Careers with SAP Mastery.",
  "Connect Your Dots to a Brighter Tech Future.",
  "Decode Data, Drive Innovation.",
  "Empower Your Career with SAP Mastery.",
];

const Marquee2 = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    // Start animation only after first paint → clean LCP
    const id = requestAnimationFrame(() => {
      trackRef.current?.classList.add(styles.animate);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={styles.mainContainerMarquee}>
      <div className={styles.mainContainerMarqueeTrack} ref={trackRef}>
        {/* First set */}
        <div className={styles.mainContainerMarqueeItems}>
          {ITEMS.map((text) => (
            <span key={text} className={styles.mainContainerMarqueeItem}>
              {text}
            </span>
          ))}
        </div>
        {/* Identical second set for seamless loop (aria-hidden) */}
        <div aria-hidden="true" className={styles.mainContainerMarqueeItems}>
          {ITEMS.map((text) => (
            <span key={`dup-${text}`} className={styles.mainContainerMarqueeItem}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee2;