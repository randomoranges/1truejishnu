import React, { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "cool" | "warm";
const STORAGE_KEY = "theme";

const apply = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("cool");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial: Theme = saved === "warm" ? "warm" : "cool";
    setTheme(initial);
    apply(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "cool" ? "warm" : "cool";
    setTheme(next);
    apply(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      className={[styles.toggle, theme === "warm" ? styles.on : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={toggle}
      role="switch"
      aria-checked={theme === "warm"}
      aria-label="Switch page tone"
    >
      <span className={styles.track}>
        <span className={styles.knob} />
      </span>
      <span className={styles.label}>{theme === "warm" ? "warm" : "cool"}</span>
    </button>
  );
};
