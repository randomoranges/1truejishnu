import React from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';
import styles from './EducationTab.module.css';

export const EducationTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.tabContent}>
      <ScrollReveal variant="fadeUp">
        <h2 className={styles.sectionTitle}>{t('education.headline')}</h2>
      </ScrollReveal>
      <div className={styles.educationGrid}>
        <ScrollReveal variant="fadeUp" delay={100} className={styles.educationPhotoCard}>
          <img
            src="https://assets.floot.app/d372592e-5881-4125-a8b8-57b2ea1e5201/e509bb30-325d-4a11-ab24-5f430ce80a0e.jpg"
            alt={t('education.hochschule.name')}
            className={styles.educationPhoto}
          />
          <div className={styles.educationOverlay}>
            <h3 className={styles.educationInstitution}>{t('education.hochschule.name')}</h3>
            <p className={styles.educationDegree}>{t('education.hochschule.degree')}</p>
            <p className={styles.educationYears}>{t('education.hochschule.years')}</p>
            <p className={styles.educationLocation}>
              <MapPin className={styles.locationIcon} />
              {t('education.hochschule.location')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={200} className={styles.educationPhotoCard}>
          <img
            src="https://assets.floot.app/d372592e-5881-4125-a8b8-57b2ea1e5201/dc803ea5-1830-4543-b0a3-214113a8a4dc.png"
            alt={t('education.smit.name')}
            className={styles.educationPhoto}
          />
          <div className={styles.educationOverlay}>
            <h3 className={styles.educationInstitution}>{t('education.smit.name')}</h3>
            <p className={styles.educationDegree}>{t('education.smit.degree')}</p>
            <p className={styles.educationYears}>{t('education.smit.years')}</p>
            <p className={styles.educationLocation}>
              <MapPin className={styles.locationIcon} />
              {t('education.smit.location')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};