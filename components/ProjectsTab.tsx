import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from './ScrollReveal';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './Carousel';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import styles from './ProjectsTab.module.css';

export const ProjectsTab = () => {
  const { t } = useTranslation();
  
  const personalProjects = t('projects.personal', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    actionButton?: { label: string; href: string };
  }>;

  const engineeringProjects = t('projects.engineering', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    actionButton?: { label: string; href: string };
  }>;

  const renderCarousel = (projects: typeof personalProjects) => (
    <div className={styles.carouselContainer}>
      <Carousel opts={{ loop: false }}>
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index} className={styles.carouselItem}>
              <ProjectCard
                title={project.title}
                description={project.description}
                actionButton={project.actionButton}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {projects.length > 3 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );

  return (
    <div className={styles.tabContent}>
      <ScrollReveal variant="fadeUp">
        <h2 className={styles.sectionTitle}>{t('projects.headline')}</h2>
      </ScrollReveal>
      
      <Tabs defaultValue="personal">
        <ScrollReveal variant="fadeIn" delay={100}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="personal">{t('projects.personalTitle')}</TabsTrigger>
            <TabsTrigger value="engineering">{t('projects.engineeringTitle')}</TabsTrigger>
          </TabsList>
        </ScrollReveal>

        <TabsContent value="personal" className={styles.tabPanel}>
          <ScrollReveal variant="fadeUp" delay={200}>
            {renderCarousel(personalProjects)}
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="engineering" className={styles.tabPanel}>
          <ScrollReveal variant="fadeUp" delay={200}>
            {renderCarousel(engineeringProjects)}
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </div>
  );
};