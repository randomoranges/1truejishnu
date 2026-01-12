import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import styles from "./LanguageSwitcher.module.css";

type Language = {
  code: "en" | "de";
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { i18n } = useTranslation();

  const currentLanguage =
    languages.find((lang) => i18n.language.startsWith(lang.code)) ||
    languages[0];

  const handleLanguageChange = (langCode: string) => {
    if (langCode === "en" || langCode === "de") {
      i18n.changeLanguage(langCode);
    }
  };

  return (
    <Select onValueChange={handleLanguageChange} value={currentLanguage.code}>
      <SelectTrigger
        className={`${styles.trigger} ${className || ""}`}
        aria-label="Select language"
      >
        <SelectValue>
          <div className={styles.triggerContent}>
            <span>{currentLanguage.flag}</span>
            <span className={styles.langCode}>
              {currentLanguage.code.toUpperCase()}
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={styles.content}>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className={styles.itemContent}>
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};