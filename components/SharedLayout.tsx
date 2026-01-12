import React from "react";
import { SettingsDropdown } from "./SettingsDropdown";
import styles from "./SharedLayout.module.css";

interface SharedLayoutProps {
  children: React.ReactNode;
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.aurora} />
      <header className={styles.header}>
        <SettingsDropdown />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};