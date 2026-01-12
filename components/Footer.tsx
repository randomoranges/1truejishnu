import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <p className={styles.copyright}>
            © {currentYear} {t('footer.name')}. {t('footer.copyright')}
          </p>
          <p className={styles.designedBy}>
            {t('footer.designedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
};