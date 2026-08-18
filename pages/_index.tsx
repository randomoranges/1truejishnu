import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Hero } from "../components/Hero";
import { BuiltSection } from "../components/BuiltSection";
import { ToolkitGraph } from "../components/ToolkitGraph";
import { NextSection } from "../components/NextSection";
import { SiteFooter } from "../components/SiteFooter";
import { CustomCursor } from "../components/CustomCursor";
import styles from "./_index.module.css";

/* ------------------------------------------------------------------
 * REDESIGN IN PROGRESS — starting from scratch.
 * The previous page composition is preserved below for reference and
 * will be rebuilt section by section.
 *
 * import { TabNavigation, Tab } from "../components/TabNavigation";
 * import { AboutTab } from "../components/AboutTab";
 * import { ExperienceTab } from "../components/ExperienceTab";
 * import { EducationTab } from "../components/EducationTab";
 * import { ProjectsTab } from "../components/ProjectsTab";
 * import { PublicationsTab } from "../components/PublicationsTab";
 * import { SkillsTab } from "../components/SkillsTab";
 * import { ContactSection } from "../components/ContactSection";
 * import { BottomCornerControls } from "../components/BottomCornerControls";
 *
 * const tabs: Tab[] = [
 *   { id: "about",        label: t('navigation.about') },
 *   { id: "work",         label: t('navigation.work') },
 *   { id: "education",    label: t('navigation.education') },
 *   { id: "projects",     label: t('navigation.projects') },
 *   { id: "publications", label: t('navigation.publications') },
 *   { id: "skills",       label: t('navigation.skills') },
 *   { id: "contact",      label: t('navigation.contact') },
 * ];
 *
 * <header className={styles.header}>
 *   <TabNavigation tabs={tabs} />
 * </header>
 * <BottomCornerControls />
 * <main className={styles.main}>
 *   <section id="about"        className={styles.section}><AboutTab /></section>
 *   <section id="work"         className={styles.section}><ExperienceTab /></section>
 *   <section id="education"    className={styles.section}><EducationTab /></section>
 *   <section id="projects"     className={styles.section}><ProjectsTab /></section>
 *   <section id="publications" className={styles.section}><PublicationsTab /></section>
 *   <section id="skills"       className={styles.section}><SkillsTab /></section>
 *   <section id="contact"      className={styles.section}><ContactSection /></section>
 * </main>
 * ------------------------------------------------------------------ */

export default function HomePage() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language?.startsWith("de") ? "de" : "en";
  const pageTitle = "Jishnu Sai Matra";
  const pageDescription =
    currentLang === "de"
      ? "MBA-Student in Business Analytics an der Hochschule Fresenius. Gründer von 2Read. Köln, Deutschland."
      : "MBA student in Business Analytics at Hochschule Fresenius. Founder of 2Read. Based in Cologne, Germany.";
  const siteUrl = "https://jishnusaimatra.com";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={siteUrl} />
        <html lang={currentLang} />

        <meta property="og:type" content="profile" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:site_name" content="Jishnu Sai Matra" />

        <style>{`html { scroll-behavior: smooth; }`}</style>
      </Helmet>

      <CustomCursor />

      <div className={styles.page}>
        <Hero />
        <BuiltSection />
        <ToolkitGraph />
        <NextSection />
        <SiteFooter />
      </div>
    </>
  );
}
