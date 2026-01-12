import React, { useState, useEffect } from "react";
import { SettingsDropdown } from "./SettingsDropdown";
import styles from "./HomeNavigation.module.css";

interface HomeNavigationProps {
  onNavigate: (sectionId: string) => void;
}

export const HomeNavigation = ({ onNavigate }: HomeNavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "publications", label: "Research" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`${styles.navigation} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <span className={styles.navLogoText}>JS</span>
        </div>
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={styles.navLink}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.navActions}>
          <SettingsDropdown />
        </div>
      </div>
    </nav>
  );
};