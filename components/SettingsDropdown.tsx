import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Settings, Sun, Moon, SunMoon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Button } from "./Button";
import {
  ThemeMode,
  switchToDarkMode,
  switchToLightMode,
  switchToAutoMode,
  getCurrentThemeMode,
} from "../helpers/themeMode";
import styles from "./SettingsDropdown.module.css";

type Language = {
  code: "en" | "de";
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export interface SettingsDropdownProps {
  /**
   * Optional CSS class to apply to the component
   */
  className?: string;
}

export const SettingsDropdown = ({ className }: SettingsDropdownProps) => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>("auto");
  const { i18n } = useTranslation();

  const currentLanguageCode = i18n.language.startsWith("de") ? "de" : "en";

  useEffect(() => {
    const initialMode = getCurrentThemeMode();
    setCurrentMode(initialMode);
    
    // If no theme preference has been set (i.e., we're in the default state),
    // automatically apply auto mode
    if (initialMode === "light" && !document.body.classList.contains("dark")) {
      // Check if this is truly a default state (no preference set yet)
      // by applying auto mode if we're starting fresh
      switchToAutoMode();
      setCurrentMode("auto");
    }
  }, []);

  const applyThemeMode = (mode: ThemeMode) => {
    switch (mode) {
      case "light":
        switchToLightMode();
        break;
      case "dark":
        switchToDarkMode();
        break;
      case "auto":
        switchToAutoMode();
        break;
    }
    setCurrentMode(mode);
  };

  const handleLanguageChange = (langCode: "en" | "de") => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-md"
            aria-label="Open settings menu"
            className={styles.settingsButton}
          >
            <Settings className={styles.icon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={styles.content}>
          {/* Theme Section */}
          <DropdownMenuLabel className={styles.menuLabel}>
            Theme
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={currentMode === "light" ? styles.activeItem : ""}
            onClick={() => applyThemeMode("light")}
          >
            <div className={styles.menuItemContent}>
              <Sun size={16} className={styles.menuIcon} />
              <span>Light</span>
              {currentMode === "light" && (
                <span className={styles.checkmark}>✓</span>
              )}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={currentMode === "dark" ? styles.activeItem : ""}
            onClick={() => applyThemeMode("dark")}
          >
            <div className={styles.menuItemContent}>
              <Moon size={16} className={styles.menuIcon} />
              <span>Dark</span>
              {currentMode === "dark" && (
                <span className={styles.checkmark}>✓</span>
              )}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={currentMode === "auto" ? styles.activeItem : ""}
            onClick={() => applyThemeMode("auto")}
          >
            <div className={styles.menuItemContent}>
              <SunMoon size={16} className={styles.menuIcon} />
              <span>Auto</span>
              {currentMode === "auto" && (
                <span className={styles.checkmark}>✓</span>
              )}
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Language Section */}
          <DropdownMenuLabel className={styles.menuLabel}>
            Language
          </DropdownMenuLabel>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              className={
                currentLanguageCode === lang.code ? styles.activeItem : ""
              }
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className={styles.menuItemContent}>
                <span className={styles.menuIcon}>{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLanguageCode === lang.code && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};