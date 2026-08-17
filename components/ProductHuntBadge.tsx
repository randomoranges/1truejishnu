import React from "react";
import styles from "./ProductHuntBadge.module.css";

export type BadgeProps = {
  /** Path under /static, e.g. "/badges/ph-product-of-the-week.png" */
  src: string;
  /** Light-on-dark variant, shown on themes with a dark ground */
  srcDark?: string;
  alt: string;
};

/**
 * Both variants are rendered and swapped in CSS by theme — no JS theme state
 * has to reach down here, and the right one is in the markup from the start.
 */
export const ProductHuntBadge = ({ src, srcDark, alt }: BadgeProps) => (
  <span className={styles.wrap}>
    <img className={styles.badge} src={src} alt={alt} loading="lazy" />
    {srcDark && (
      <img
        className={`${styles.badge} ${styles.badgeDark}`}
        src={srcDark}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    )}
  </span>
);
