// components/Common/MegaMenuContent.jsx
"use client";

import Link from "next/link";
import styles from "@/styles/Common/Navbar.module.css";

// This component (and the icon-heavy data it imports) is only ever
// loaded via next/dynamic from Header.jsx — see renderDropdown* there.
// That means none of these ~30 icons or link arrays are part of the
// initial navbar bundle; they download on first hover/tap per menu.

export default function MegaMenuContent({ sections, onItemClick }) {
  return sections.map((section) => {
    const SectionIcon = section.Icon;

    return (
      <li key={section.title} className={styles.sapMenuColumn}>
        <div className={styles.sapMenuHeader}>
          <span className={styles.sapHeaderIcon}>
            <SectionIcon aria-hidden="true" size={25} strokeWidth={2} />
          </span>
          <span>
            <span className={styles.sapMenuTitle}>{section.title}</span>
            <span className={styles.sapMenuSubtitle}>
              {section.description}
            </span>
          </span>
        </div>
        <ul className={styles.sapMenuGrid}>
          {section.items.map((item) => {
            const ItemIcon = item.Icon;

            return (
              <li key={item.name}>
                <Link
                  className={styles.sapMenuLink}
                  href={item.link}
                  onClick={() => onItemClick(item.link)}
                >
                  <span
                    className={`${styles.sapItemIcon} ${
                      styles[`sapIcon${item.color}`]
                    } ${item.sapBadge ? styles.sapSapBadge : ""}`}
                  >
                    {item.sapBadge ? (
                      <span className={styles.sapLogoMark}>AI</span>
                    ) : (
                      <ItemIcon aria-hidden="true" size={18} strokeWidth={2} />
                    )}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  });
}
