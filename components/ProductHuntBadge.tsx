import React from "react";
import styles from "./ProductHuntBadge.module.css";

export type BadgeProps = {
  /** Path under /static, e.g. "/badges/ph-product-of-the-week.png" */
  src: string;
  alt: string;
};

export const ProductHuntBadge = ({ src, alt }: BadgeProps) => (
  <img className={styles.badge} src={src} alt={alt} loading="lazy" />
);
