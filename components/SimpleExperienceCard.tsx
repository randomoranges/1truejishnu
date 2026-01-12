import styles from './SimpleExperienceCard.module.css';

interface SimpleExperienceCardProps {
  companyName: string;
  role: string;
  duration: string;
  about: string;
  keyAchievement: string;
  narrative: string;
  location?: string;
  className?: string;
}

export const SimpleExperienceCard = ({
  companyName,
  role,
  duration,
  about,
  keyAchievement,
  narrative,
  location,
  className,
}: SimpleExperienceCardProps) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      <div className={styles.header}>
        <h3 className={styles.companyName}>{companyName}</h3>
        <div className={styles.metaRow}>
          <span className={styles.role}>{role}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.duration}>{duration}</span>
        </div>
        {location && <div className={styles.location}>{location}</div>}
      </div>

      <div className={styles.body}>
        <p className={styles.about}>{about}</p>
        
        {keyAchievement && (
          <div className={styles.achievementWrapper}>
            <span className={styles.achievementLabel}>Highlight</span>
            <p className={styles.achievementText}>{keyAchievement}</p>
          </div>
        )}
        
        <p className={styles.narrative}>{narrative}</p>
      </div>
    </div>
  );
};