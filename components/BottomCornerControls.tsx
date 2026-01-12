import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Button } from "./Button";
import {
  ThemeMode,
  switchToDarkMode,
  switchToLightMode,
  getCurrentThemeMode,
} from "../helpers/themeMode";
import styles from "./BottomCornerControls.module.css";

export const BottomCornerControls = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { i18n } = useTranslation();

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    const currentMode = getCurrentThemeMode();
    // If auto, we check the actual class on body or system pref, but for simplicity
    // let's just check if 'dark' class is present which is the source of truth for the UI
    setIsDark(document.body.classList.contains("dark"));

    // Observer to watch for class changes on body to keep state in sync
    // if changed from elsewhere (like the settings dropdown)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIsDark(document.body.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      switchToLightMode();
      setIsDark(false);
    } else {
      switchToDarkMode();
      setIsDark(true);
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLang = i18n.language.startsWith("de") ? "DE" : "EN";

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.pill}>
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleTheme}
          className={styles.iconButton}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div className={`${styles.iconWrapper} ${isDark ? styles.rotate : ""}`}>
            {isDark ? (
              <Sun size={18} className={styles.sunIcon} />
            ) : (
              <Moon size={18} className={styles.moonIcon} />
            )}
          </div>
        </Button>

        <div className={styles.divider} />

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={styles.langButton}
              aria-label="Change language"
            >
              <Globe size={16} />
              <span className={styles.langCode}>{currentLang}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className={styles.menuContent}>
            <DropdownMenuItem
              onClick={() => changeLanguage("en")}
              className={currentLang === "EN" ? styles.activeItem : ""}
            >
              <span className={styles.flag}>🇬🇧</span> English
              {currentLang === "EN" && <Check size={14} className={styles.check} />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("de")}
              className={currentLang === "DE" ? styles.activeItem : ""}
            >
              <span className={styles.flag}>🇩🇪</span> Deutsch
              {currentLang === "DE" && <Check size={14} className={styles.check} />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};