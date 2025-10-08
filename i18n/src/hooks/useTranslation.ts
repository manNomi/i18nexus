"use client";

import { useI18nContext } from "../components/I18nProvider";
import { useMemo, useCallback } from "react";

export const useTranslation = () => {
  const { currentLanguage, isLoading, translations } = useI18nContext();

  // 현재 언어의 번역 데이터를 메모이제이션
  const currentTranslations = useMemo(() => {
    return translations[currentLanguage] || {};
  }, [translations, currentLanguage]);

  // 번역 함수를 useCallback으로 메모이제이션
  const translate = useCallback(
    (key: string) => {
      // 빠른 접근을 위한 직접 참조
      return currentTranslations[key] || key;
    },
    [currentTranslations],
  );

  return {
    t: translate,
    currentLanguage,
    isReady: !isLoading,
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
