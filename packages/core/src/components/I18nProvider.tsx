"use client";

import React, { ReactNode } from "react";
import {
  LanguageManager,
  LanguageConfig,
  LanguageManagerOptions,
} from "../utils/languageManager";

interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  availableLanguages: LanguageConfig[];
  languageManager: LanguageManager;
  t: (key: string) => string;
}

const I18nContext = React.createContext<I18nContextType | undefined>(undefined);

export interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions: LanguageManagerOptions;
  translations: Record<string, Record<string, string>>;
  onLanguageChange?: (language: string) => void;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  languageManagerOptions,
  translations,
  onLanguageChange,
}) => {
  const [languageManager] = React.useState(
    () => new LanguageManager(languageManagerOptions)
  );
  const [currentLanguage, setCurrentLanguage] = React.useState<string>(() =>
    languageManager.getCurrentLanguage()
  );

  const changeLanguage = (lang: string): void => {
    const success = languageManager.setLanguage(lang);
    if (success) {
      setCurrentLanguage(lang);
      onLanguageChange?.(lang);
    }
  };

  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage];
    if (!languageTranslations) {
      console.warn(`No translations found for language: ${currentLanguage}`);
      return key;
    }

    const translation = languageTranslations[key];
    if (!translation) {
      console.warn(
        `Translation key not found: ${key} for language: ${currentLanguage}`
      );
      return key;
    }

    return translation;
  };

  React.useEffect(() => {
    // 언어 변경 리스너 등록
    const removeListener = languageManager.addLanguageChangeListener((lang) => {
      if (lang !== currentLanguage) {
        setCurrentLanguage(lang);
        onLanguageChange?.(lang);
      }
    });

    return removeListener;
  }, [languageManager, currentLanguage, onLanguageChange]);

  const contextValue: I18nContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages: languageManager.getAvailableLanguages(),
    languageManager,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18nContext = (): I18nContextType => {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }
  return context;
};
