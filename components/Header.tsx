import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Code } from "lucide-react";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/#home" className={styles.logo}>
          <Code size={24} className={styles.logoIcon} />
          <span>John Doe</span>
        </Link>
        <div className={styles.navLinks}>
          <Button asChild variant="link">
            <Link to="/#about">About</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/#projects">Projects</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/#contact">Contact</Link>
          </Button>
        </div>
        <div className={styles.ctaButton}>
          <Button asChild>
            <a href="mailto:hello@johndoe.com">Get in Touch</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};