import React from 'react';
import { FileText, Book } from 'lucide-react';
import { Button } from './Button';
import styles from './HomePublications.module.css';

interface Publication {
  title: string;
  conference: string;
  description: string;
  paperLink: string;
  citationLink: string;
}

const publications: Publication[] = [
  {
    title: 'Type-2 Diabetes Prediction Using Ensemble Machine Learning',
    conference: 'SPRINGER CONFERENCE · FEB 2023',
    description: 'Ensemble ML approach using LightGBM, XGBoost, and Random Forest achieving 94% accuracy in early diabetes detection. Practical healthcare application for preventive care.',
    paperLink: '#',
    citationLink: '#',
  },
  {
    title: 'IoT-Based Automated Toll Collection System',
    conference: 'WCASET CONFERENCE · FEB 2020',
    description: 'Smart toll collection system using IoT sensors and RFID technology to reduce traffic congestion and enable cashless transactions at scale.',
    paperLink: '#',
    citationLink: '#',
  },
];

export const HomePublications = () => {
  return (
    <section className={styles.publicationsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Research & Publications</h2>
        <p className={styles.sectionSubtitle}>
          Bridging ML research with practical healthcare applications.
        </p>
        <div className={styles.publicationsList}>
          {publications.map((pub) => (
            <div key={pub.title} className={styles.publicationCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <FileText className={styles.icon} size={24} />
                  <h3 className={styles.publicationTitle}>{pub.title}</h3>
                </div>
                <p className={styles.conferenceInfo}>{pub.conference}</p>
                <p className={styles.publicationDescription}>{pub.description}</p>
                <div className={styles.cardActions}>
                  <Button variant="outline" size="sm" asChild>
                    <a href={pub.paperLink} target="_blank" rel="noopener noreferrer">Read Paper</a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={pub.citationLink} target="_blank" rel="noopener noreferrer">View Citation</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};