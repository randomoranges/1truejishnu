import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge } from './Badge';
import styles from './HomeProjects.module.css';

interface Project {
  title: string;
  description: string;
  metrics: string[];
  challenge: string;
  solution: string;
  result: string;
  skills: string[];
  link?: string;
  isFeatured?: boolean;
}

const projects: Project[] = [
  {
    title: '2Read - AI Reading Companion',
    description: 'Chrome extension that turns any article into an interactive learning experience.',
    metrics: ['1,400+ Users', '#4 Product Hunt', 'Featured'],
    challenge: 'Users struggled to retain information from long articles.',
    solution: 'Built AI-powered reading companion with summaries, flashcards, and progress tracking.',
    result: '1,400+ organic users, #4 on Product Hunt, 4.8/5 rating.',
    skills: ['React', 'Chrome API', 'OpenAI', 'TypeScript'],
    link: '#',
    isFeatured: true,
  },
  {
    title: 'Issue51 - Internet Meme Apparel',
    description: 'First entrepreneurial venture in fashion e-commerce.',
    metrics: ['4 Months', 'Learning Experience'],
    challenge: 'Enter the competitive fashion market with unique positioning.',
    solution: 'Launched internet-meme-inspired clothing brand, managed design & marketing.',
    result: "Failed after 4 months—learned marketing isn't just execution, it's strategy. Pivoted to tech.",
    skills: ['E-commerce', 'Marketing', 'Design', 'Operations'],
  },
  {
    title: 'Smart Support Chatbot',
    description: 'Internal assistant serving 10,000+ employees.',
    metrics: ['35% Reduction', '10K+ Users'],
    challenge: 'High volume of repetitive support tickets.',
    solution: 'Built intelligent chatbot with NLP for automated query resolution.',
    result: '35% reduction in support tickets, saved hundreds of hours.',
    skills: ['Python', 'NLP', 'Angular', 'Bot Framework'],
  },
  {
    title: 'ML Model Dashboard',
    description: 'Interactive viz for diabetes prediction research.',
    metrics: ['Published Research'],
    challenge: 'Make complex ML research accessible to non-technical audiences.',
    solution: 'Built interactive dashboard showing model performance and predictions.',
    result: 'Enhanced paper presentation, demonstrated practical application.',
    skills: ['Python', 'Plotly', 'Data Viz'],
  },
];

export const HomeProjects = () => {
  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects Showcase</h2>
        <p className={styles.sectionSubtitle}>
          A selection of projects where I've turned ideas into reality.
        </p>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div
              key={project.title}
              className={`${styles.projectCard} ${project.isFeatured ? styles.featured : ''}`}
            >
              <div className={styles.cardBackground}></div>
              <div className={styles.contentOverlay}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.metrics}>
                  {project.metrics.map((metric) => (
                    <Badge key={metric} variant="secondary">{metric}</Badge>
                  ))}
                </div>
                <div className={styles.hoverContent}>
                  <div className={styles.details}>
                    <p><strong>Challenge:</strong> {project.challenge}</p>
                    <p><strong>Solution:</strong> {project.solution}</p>
                    <p><strong>Result:</strong> {project.result}</p>
                  </div>
                </div>
              </div>
              <div className={styles.skills}>
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};