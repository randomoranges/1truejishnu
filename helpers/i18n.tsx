import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, de } from "./translations";

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: "en",
    debug: false, // Set to true for development debugging

    // Language detector options
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export { i18n };