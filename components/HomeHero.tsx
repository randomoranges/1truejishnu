import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Linkedin, Github } from "lucide-react";
import styles from "./HomeHero.module.css";

interface HomeHeroProps {
  onSeeWorkClick: () => void;
}

export const HomeHero = ({ onSeeWorkClick }: HomeHeroProps) => {
  const { t } = useTranslation();
  
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroName}>{t('hero.name')}</h1>
          <p className={styles.heroTagline}>
            {t('hero.tagline')}
          </p>
          <p className={styles.heroDescription}>
            {t('hero.description')}
          </p>
          <div className={styles.heroActions}>
            <Button size="lg" onClick={onSeeWorkClick}>
              {t('buttons.seeMyWork')}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/jishnusai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('buttons.resume')}
              </a>
            </Button>
          </div>
          <div className={styles.heroSocial}>
            <a
              href="https://www.linkedin.com/in/jishnusai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/jishnusai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImagePlaceholder}>
              <span className={styles.heroImageText}>JS</span>
            </div>
          </div>
          <div className={styles.heroBackgroundShapes}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
          </div>
        </div>
      </div>
    </section>
  );
};