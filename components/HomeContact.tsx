import React from "react";
import { Mail, Linkedin, Instagram, Rss, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import styles from "./HomeContact.module.css";

export const HomeContact = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t('contact.heading')}</h2>
        <p className={styles.subtext}>{t('contact.description')}</p>
        <div className={styles.actions}>
          <Button
            size="lg"
            className={styles.primaryButton}
            asChild
          >
            <a href="mailto:jishnusai@tutanota.com">
              <Mail size={20} />
              {t('contact.emailButton')}
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={styles.secondaryButton}
            asChild
          >
            <a
              href="https://www.linkedin.com/in/jishnu-sai-264115230/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
              {t('contact.linkedinButton')}
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={styles.secondaryButton}
            asChild
          >
            <a
              href="https://www.instagram.com/1truejishnu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
              {t('contact.instagramButton')}
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={styles.secondaryButton}
            asChild
          >
            <a
              href="https://substack.com/@1truejishnu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Rss size={20} />
              {t('contact.substackButton')}
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={styles.secondaryButton}
            asChild
          >
            <a
              href="https://x.com/1TrueJishnu?t=A0v4jS9Fc9ECOCTxhBnTcA&s=08"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} />
              {t('contact.xButton')}
            </a>
          </Button>
        </div>
        <p className={styles.footerText}>{t('contact.location')}</p>
      </div>
    </section>
  );
};