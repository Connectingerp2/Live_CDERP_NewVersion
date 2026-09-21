"use client";

import styles from "../../styles/HomePage/TrustBar.module.css";
import { usePopupForm } from "../../components/context/Popupformcontext";

const CapIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3zM5 13.18v3.5C5 18.5 8.13 20 12 20s7-1.5 7-3.32v-3.5l-7 3.18-7-3.18z" />
  </svg>
);

const PeopleIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 19v-1.5C2 15 5.3 14 8 14s6 1 6 3.5V19H2zm12.2-4.9c1.9.4 3.8 1.3 3.8 3.4V19h4v-1.5c0-2.2-2.8-3.2-5-3.4-.9 0-1.9.1-2.8.5z" />
  </svg>
);

const BriefcaseIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M9 4h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v3H2V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2zm0 3h6V6H9v1zM2 14h9v2h2v-2h9v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5z" />
  </svg>
);

const CheckDocIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8.6 13.2l2.1 2.1 4.7-4.7 1.4 1.4-6.1 6.1-3.5-3.5 1.4-1.4z" />
  </svg>
);

const ITEMS = [
  {
    value: "10+",
    label: "Years Of Legacy",
    tint: "#3a56b8",
    icon: CapIcon,
  },
  {
    value: "5,000+",
    label: "Students Trained",
    tint: "#c95f08",
    icon: PeopleIcon,
  },
  {
    value: "200+",
    label: "Hiring Partners",
    tint: "#5a3ecf",
    icon: BriefcaseIcon,
  },
  {
    value: "100%",
    label: "Placement Assistance",
    tint: "#1a7a42",
    icon: CheckDocIcon,
  },
];

const Star = (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#e58f0e" aria-hidden="true">
    <path d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7L12 2z" />
  </svg>
);

const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="-3 0 262 262"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    className={className}
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);

export default function TrustBar({rating="4.8"}) {
  const { openPopup } = usePopupForm();

  return (
    <>
      <div className={`${styles.wrap}`}>
        <ul className={styles.bar} aria-label="Institute highlights">
          {ITEMS.map((it, i) => (
            <li key={i} className={styles.item} style={{ "--tint": it.tint }}>
              <span className={styles.iconWell}>
                <span className={styles.iconDisc}>{it.icon}</span>
              </span>

              <span className={`md:hidden lg:hidden xl:hidden ${styles.divider}`} aria-hidden="true"></span>

              <span className={styles.text}>
                <span className={styles.value}>{it.value}</span>
                <span className={styles.label}>{it.label}</span>
              </span>
            </li>
          ))}

          <li className={`${styles.item} ${styles.rating}`}>
            {/* Left: value + stars, stacked */}
            <span className={styles.ratingLeft}>
              <span className={styles.value}>{rating}/5</span>
              <span
                className={styles.stars}
                aria-label="4.8 out of 5 stars on Google"
              >
                {Star}
                {Star}
                {Star}
                {Star}
                {Star}
              </span>
            </span>

            {/* Center: pipe */}
            <span className={` md:hidden lg:hidden xl:hidden ${styles.divider}`} aria-hidden="true"></span>

            {/* Right: Google icon only, centered */}
            <span className={styles.ratingRight}>
              <GoogleIcon className="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8" />
            </span>
          </li>

          <li className={`${styles.item} ${styles.ctaItem}`}>
            <div className={`${styles.cta} cursor-pointer`} onClick={openPopup}>
              Book Demo
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}