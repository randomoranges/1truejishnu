import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';
import styles from './AboutTab.module.css';

export const AboutTab = () => {
  const { t } = useTranslation();

  const fullHeading = t('about.heading');
  
  // Logic to separate the greeting (e.g., "👋 Hey!") from the rest of the heading
  // to apply specific styling.
  const separator = '! ';
  const splitIndex = fullHeading.indexOf(separator);
  
  let greeting = '';
  let rest = fullHeading;

  if (splitIndex !== -1) {
    // Include the '!' in the greeting
    const cutPoint = splitIndex + 1;
    greeting = fullHeading.substring(0, cutPoint);
    rest = fullHeading.substring(cutPoint);
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.container}>
        <ScrollReveal variant="fadeUp" delay={0}>
          <h1 className={styles.heading}>
            {greeting ? (
              <>
                <span className={styles.greeting}>{greeting}</span>
                {rest}
              </>
            ) : (
              fullHeading
            )}
          </h1>
        </ScrollReveal>
        
        <ScrollReveal variant="fadeUp" delay={150}>
          <p className={styles.bio}>
            {t('about.bio')}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
};