"use client";

import { memo } from "react";
import Image from "next/image";
import styles from "@/styles/AnimatedLogo.module.css";

const AnimatedLogo = ({ className = "" }) => {
  return (
    <div className={`${styles.logoContainer} ${className}`.trim()}>
      {/* CSS-based lines (always visible) */}
      <div className={styles.linesContainer}>
        <div className={`${styles.arcLine} ${styles.line1}`}></div>
        <div className={`${styles.arcLine} ${styles.line2}`}></div>
        <div className={`${styles.arcLine} ${styles.line3}`}></div>
      </div>

      {/* Center Arrow with up-down animation */}
      <div className={styles.centerArrow}>
        <Image
          src="https://res.cloudinary.com/bropujss/image/upload/v1783687662/arrow_vimuey_jheoet.avif"
          alt="Logo Arrow"
          width={18}
          height={18}
          priority
          sizes="18px"
        />
      </div>
    </div>
  );
};

export default memo(AnimatedLogo);
