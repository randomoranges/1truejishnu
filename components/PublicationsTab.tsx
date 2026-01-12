import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import styles from './PublicationsTab.module.css';

export const PublicationsTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.tabContent}>
      <ScrollReveal variant="fadeUp">
        <h2 className={styles.sectionTitle}>{t('publications.headline')}</h2>
      </ScrollReveal>
      <div className={styles.publicationsGrid}>
        <ScrollReveal 
          variant="fadeUp"
          delay={100}
        >
          <a 
            href={t('publications.items.0.link')}
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.publicationCard}
            style={{ height: '100%' }} // Ensure height fills wrapper
          >
            <ExternalLink size={18} className={styles.externalIcon} />
            <div className={styles.publicationContent}>
              <h3 className={styles.publicationTitle}>
                {t('publications.items.0.title')}
              </h3>
              <p className={styles.publicationVenue}>
                {t('publications.items.0.venue')}
              </p>
              <p className={styles.publicationDescription}>
                {t('publications.items.0.description')}
              </p>
            </div>
          </a>
        </ScrollReveal>

        <ScrollReveal 
          variant="fadeUp"
          delay={200}
        >
          <a 
            href={t('publications.items.1.link')}
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.publicationCard}
            style={{ height: '100%' }} // Ensure height fills wrapper
          >
            <ExternalLink size={18} className={styles.externalIcon} />
            <div className={styles.publicationContent}>
              <h3 className={styles.publicationTitle}>
                {t('publications.items.1.title')}
              </h3>
              <p className={styles.publicationVenue}>
                {t('publications.items.1.venue')}
              </p>
              <p className={styles.publicationDescription}>
                {t('publications.items.1.description')}
              </p>
            </div>
          </a>
        </ScrollReveal>
      </div>
    </div>
  );
};