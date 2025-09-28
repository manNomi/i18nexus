import { useTranslation as useReactI18nextTranslation } from "react-i18next";
import { useI18nContext } from "../components/I18nProvider";

export const useTranslation = (ns?: string | string[]) => {
  const { t, i18n, ready } = useReactI18nextTranslation(ns);
  const {
    currentLanguage,
    changeLanguage,
    availableLanguages,
    languageManager,
    isLoading,
  } = useI18nContext();

  return {
    t,
    i18n,
    ready,
    currentLanguage,
    changeLanguage,
    availableLanguages,
    languageManager,
    isLoading,
  };
};

export const useLanguageSwitcher = () => {
  const {
    currentLanguage,
    changeLanguage,
    availableLanguages,
    languageManager,
    isLoading,
  } = useI18nContext();

  const switchToNextLanguage = async () => {
    const languageCodes = availableLanguages.map((lang) => lang.code);
    const currentIndex = languageCodes.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languageCodes.length;
    const nextLanguage = languageCodes[nextIndex];
    await changeLanguage(nextLanguage);
  };

  const switchToPreviousLanguage = async () => {
    const languageCodes = availableLanguages.map((lang) => lang.code);
    const currentIndex = languageCodes.indexOf(currentLanguage);
    const prevIndex =
      currentIndex === 0 ? languageCodes.length - 1 : currentIndex - 1;
    const prevLanguage = languageCodes[prevIndex];
    await changeLanguage(prevLanguage);
  };

  const getLanguageConfig = (code?: string) => {
    return languageManager.getLanguageConfig(code || currentLanguage);
  };

  const detectBrowserLanguage = () => {
    return languageManager.detectBrowserLanguage();
  };

  const resetLanguage = () => {
    languageManager.reset();
  };

  return {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    switchToNextLanguage,
    switchToPreviousLanguage,
    getLanguageConfig,
    detectBrowserLanguage,
    resetLanguage,
    isLoading,
  };
};
