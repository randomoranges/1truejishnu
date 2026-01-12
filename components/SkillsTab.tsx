import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';
import styles from './SkillsTab.module.css';

interface SkillCardProps {
  title: string;
  items: string[];
  variant: 'green' | 'purple' | 'blue';
  className?: string;
  rotation?: string;
  showMore?: boolean;
moreText?: string;
}

const SkillCard = ({ title, items, variant, className, rotation, showMore, moreText }: SkillCardProps) => {
  return (
    <div 
      className={`${styles.card} ${styles[variant]} ${className || ''}`}
      style={{ '--rotation': rotation } as React.CSSProperties}
    >
      <div className={styles.cardTab}>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <div className={styles.cardBody}>
        <ul className={styles.itemList}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>{item}</li>
          ))}
        </ul>
        {showMore && (
<div className={styles.moreText}>
{moreText}
</div>
)}
      </div>
    </div>
  );
};

export const SkillsTab = () => {
  const { t } = useTranslation();
  
  const getList = (key: string) => {
    const items = t(key, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  };

  return (
    <div className={styles.container}>
      <ScrollReveal variant="fadeUp">
        <div className={styles.header}>
          <div className={styles.introWrapper}>
            <p className={styles.intro}>{t('skills.intro')}</p>
          </div>
          <h2 className={styles.headline}>{t('skills.headline')}</h2>
        </div>
      </ScrollReveal>
      
      <div className={styles.cardsContainer}>
        <ScrollReveal variant="fadeUp" delay={100} className={styles.card1}>
          <SkillCard 
            title={t('skills.card1.title')}
            items={getList('skills.card1.items')}
            variant="green"
            rotation="-5deg"
          />
        </ScrollReveal>
        
        <ScrollReveal variant="fadeUp" delay={200} className={styles.card2}>
          <SkillCard 
            title={t('skills.card2.title')}
            items={getList('skills.card2.items')}
            variant="purple"
            rotation="0deg"
            showMore={true}
            moreText={t('skills.andMore')}
          />
        </ScrollReveal>
        
        <ScrollReveal variant="fadeUp" delay={300} className={styles.card3}>
          <SkillCard 
            title={t('skills.card3.title')}
            items={getList('skills.card3.items')}
            variant="blue"
            rotation="5deg"
          />
        </ScrollReveal>
      </div>
    </div>
  );
};