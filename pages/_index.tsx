import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { TabNavigation, Tab } from "../components/TabNavigation";
import { AboutTab } from "../components/AboutTab";
import { ExperienceTab } from "../components/ExperienceTab";
import { EducationTab } from "../components/EducationTab";
import { ProjectsTab } from "../components/ProjectsTab";
import { PublicationsTab } from "../components/PublicationsTab";
import { SkillsTab } from "../components/SkillsTab";
import { ContactSection } from "../components/ContactSection";
import { BottomCornerControls } from "../components/BottomCornerControls";
import styles from "./_index.module.css";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  
  // We'll let TabNavigation handle the active state via scroll spy,
  // but we pass the tabs definition here.
  const tabs: Tab[] = [
{ id: "about", label: t('navigation.about') },
{ id: "work", label: t('navigation.work') },
{ id: "education", label: t('navigation.education') },
{ id: "projects", label: t('navigation.projects') },
{ id: "publications", label: t('navigation.publications') },
{ id: "skills", label: t('navigation.skills') },
{ id: "contact", label: t('navigation.contact') },
];

  const currentLang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const pageTitle = "Jishnu Sai Matra";
  const pageDescription = currentLang === 'de'
    ? "MBA-Student in Business Analytics an der Hochschule Fresenius. Gründer von 2Read. Köln, Deutschland."
    : "MBA student in Business Analytics at Hochschule Fresenius. Founder of 2Read. Based in Cologne, Germany.";
  const siteUrl = "https://jishnusaimatra.com";

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Jishnu Sai Matra, Product Designer, Developer, 2Read, Portfolio, Germany"
        />
        <link rel="canonical" href={siteUrl} />
        
        {/* Alternate Language Tags */}
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="de" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <html lang={currentLang} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:locale" content={currentLang === 'de' ? 'de_DE' : 'en_US'} />
        <meta property="og:locale:alternate" content={currentLang === 'de' ? 'en_US' : 'de_DE'} />
        <meta property="og:site_name" content="Jishnu Sai Matra" />
        <meta property="og:image" content="https://assets.floot.app/a32514e1-bff0-4614-b913-bc387420f56c/36ab6a43-60d7-40e1-8977-ea51da87edcb.jpeg" />
        <meta property="profile:first_name" content="Jishnu" />
        <meta property="profile:last_name" content="Matra" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://assets.floot.app/a32514e1-bff0-4614-b913-bc387420f56c/36ab6a43-60d7-40e1-8977-ea51da87edcb.jpeg" />

        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jishnu Sai Matra",
            "jobTitle": "Product Designer & Full Stack Developer",
            "description": "Product designer & developer crafting meaningful digital experiences. Founder of 2Read, ex-TCS. Based in Germany.",
            "url": siteUrl,
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "Hochschule Fresenius",
                "location": "Germany"
              },
              {
                "@type": "EducationalOrganization",
                "name": "Sikkim Manipal Institute of Technology",
                "location": "India"
              }
            ],
            "worksFor": [
              {
                "@type": "Organization",
                "name": "2Read",
                "description": "Mobile app for Kindle users"
              }
            ],
            "knowsAbout": [
              "React",
              "TypeScript",
              "Python",
              "Angular",
              "Product Design",
              "Full Stack Development",
              "Data Analytics",
              "Power BI",
              "Artificial Intelligence",
              "Machine Learning",
              "Business Analytics"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Product Designer & Full Stack Developer",
              "occupationLocation": {
                "@type": "Country",
                "name": "Germany"
              },
              "skills": "React, TypeScript, Python, Angular, Product Design, Data Analytics, Power BI, AI"
            }
          })}
        </script>
        
        {/* Enable smooth scrolling globally for this page */}
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </Helmet>

      <div className={styles.page}>
        <header className={styles.header}>
          <TabNavigation tabs={tabs} />
        </header>

        <BottomCornerControls />

        <main className={styles.main}>
          <section id="about" className={styles.section}>
            <AboutTab />
          </section>
          
          <section id="work" className={styles.section}>
            <ExperienceTab />
          </section>

          <section id="education" className={styles.section}>
            <EducationTab />
          </section>

          <section id="projects" className={styles.section}>
            <ProjectsTab />
          </section>

          <section id="publications" className={styles.section}>
            <PublicationsTab />
          </section>

          <section id="skills" className={styles.section}>
            <SkillsTab />
          </section>

          <section id="contact" className={styles.section}>
            <ContactSection />
          </section>
        </main>
      </div>
    </>
  );
}