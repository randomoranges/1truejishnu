import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomeContact } from "../components/HomeContact";
import { BottomCornerControls } from "../components/BottomCornerControls";
import styles from "./contact.module.css";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('de') ? 'de' : 'en';

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
        <title>
          {currentLang === 'de' ? 'Kontakt | Jishnu Sai Matra' : 'Contact | Jishnu Sai Matra'}
        </title>
        <meta
          name="description"
          content={t('contact.metaDescription')}
        />
        <link rel="alternate" hrefLang="en" href="https://jishnusai.com/contact" />
        <link rel="alternate" hrefLang="de" href="https://jishnusai.com/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://jishnusai.com/contact" />
      </Helmet>

      <div className={styles.page}>
        <header className={styles.header}>
          <Link to="/" className={styles.homeLink}>
            Jishnu Sai Matra
          </Link>
        </header>

        <BottomCornerControls />

        <main className={styles.main}>
          <div className={styles.contactWrapper}>
            <HomeContact />
          </div>
        </main>
      </div>
    </>
  );
}