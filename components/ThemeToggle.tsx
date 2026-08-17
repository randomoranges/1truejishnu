import React, { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "linen" | "malachite";
const STORAGE_KEY = "theme";
const LABELS: Record<Theme, string> = {
  linen: "linen",
  malachite: "malachite",
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("linen");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial: Theme = saved === "malachite" ? "malachite" : "linen";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next: Theme = theme === "linen" ? "malachite" : "linen";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      className={[styles.toggle, theme === "malachite" ? styles.on : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={toggle}
      role="switch"
      aria-checked={theme === "malachite"}
      aria-label={`Theme: ${LABELS[theme]}`}
    >
      <span className={styles.track}>
        <span className={styles.knob} />
      </span>
      <span className={styles.label}>
        theme: <span className={styles.value}>({LABELS[theme]})</span>
      </span>
    </button>
  );
};
