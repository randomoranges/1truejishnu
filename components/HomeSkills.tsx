import React from 'react';
import { BarChart, Brush, Users } from 'lucide-react';
import { Badge } from './Badge';
import styles from './HomeSkills.module.css';

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  primarySkills: string[];
  secondarySkills: string[];
  proofPoint: string;
}

const skillCategories: SkillCategory[] = [
  {
    icon: <BarChart size={40} />,
    title: 'Analyze & Strategize',
    primarySkills: ['Power BI', 'Excel', 'Python', 'SQL', 'Data Analysis'],
    secondarySkills: ['Statistical Modeling', 'A/B Testing', 'Market Research'],
    proofPoint: 'Published 2 ML research papers with 94% model accuracy.',
  },
  {
    icon: <Brush size={40} />,
    title: 'Build & Design',
    primarySkills: ['React', 'TypeScript', 'Angular', 'Vue.js', 'Figma'],
    secondarySkills: ['Chrome APIs', 'Node.js', 'Responsive Design', 'UI/UX'],
    proofPoint: 'Built apps serving 10,000+ users with a 4.8/5 rating.',
  },
  {
    icon: <Users size={40} />,
    title: 'Lead & Communicate',
    primarySkills: ['Agile/Scrum', 'Team Leadership', 'Public Speaking', 'German (A1)'],
    secondarySkills: ['Stakeholder Management', 'Cross-functional Collaboration', 'Event Planning'],
    proofPoint: 'Organized 20+ events, led teams across engineering and business.',
  },
];

export const HomeSkills = () => {
  return (
    <section className={styles.skillsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Toolkit</h2>
        <p className={styles.sectionSubtitle}>
          The skills and tools I use to analyze, build, and lead.
        </p>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category) => (
            <div key={category.title} className={styles.skillCard}>
              <div className={styles.icon}>{category.icon}</div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillsContainer}>
                <div className={styles.skillGroup}>
                  {category.primarySkills.map((skill) => (
                    <Badge key={skill} className={styles.primarySkill}>{skill}</Badge>
                  ))}
                </div>
                <div className={styles.skillGroup}>
                  {category.secondarySkills.map((skill) => (
                    <Badge key={skill} variant="outline" className={styles.secondarySkill}>{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className={styles.proofPoint}>
                <p>{category.proofPoint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};