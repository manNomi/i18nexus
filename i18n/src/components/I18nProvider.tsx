"use client";

import React, { ReactNode } from "react";
import {
  LanguageManager,
  LanguageConfig,
  LanguageManagerOptions,
} from "../utils/languageManager";
import { registerTranslations } from "../utils/serverTranslation";

interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  availableLanguages: LanguageConfig[];
  languageManager: LanguageManager;
  isLoading: boolean;
  translations: Record<string, Record<string, string>>;
}

const I18nContext = React.createContext<I18nContextType | null>(null);

export interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions?: LanguageManagerOptions;
  translations?: Record<string, Record<string, string>>;
  onLanguageChange?: (language: string) => void;
  /**
   * Initial language from server-side (for SSR/Next.js App Router)
   * This prevents hydration mismatch by ensuring server and client render with the same language
   */
  initialLanguage?: string;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  languageManagerOptions,
  translations = {},
  onLanguageChange,
  initialLanguage,
}) => {
  const [languageManager] = React.useState(
    () => new LanguageManager(languageManagerOptions)
  );

  // 번역 데이터를 전역에 등록 (서버 컴포넌트에서 사용 가능하도록)
  React.useEffect(() => {
    registerTranslations(
      translations,
      languageManagerOptions?.defaultLanguage || "en"
    );
  }, [translations, languageManagerOptions?.defaultLanguage]);

  // Use initialLanguage (from server) if provided, otherwise use default
  // This prevents hydration mismatch
  const getInitialLanguage = () => {
    if (initialLanguage) {
      return initialLanguage;
    }
    return languageManagerOptions?.defaultLanguage || "en";
  };

  const [currentLanguage, setCurrentLanguage] =
    React.useState<string>(getInitialLanguage());
  const [isLoading, setIsLoading] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  const changeLanguage = async (lang: string): Promise<void> => {
    if (lang === currentLanguage) {
      return;
    }

    setIsLoading(true);
    try {
      // LanguageManager를 통해 언어 설정
      const success = languageManager.setLanguage(lang);
      if (!success) {
        throw new Error(`Failed to set language to ${lang}`);
      }

      // i18nexus 자체 언어 관리

      setCurrentLanguage(lang);

      // 콜백 호출
      onLanguageChange?.(lang);
    } catch (error) {
      console.error("Failed to change language:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 클라이언트에서 hydration 완료 후 실제 언어 설정 로드
  React.useEffect(() => {
    setIsHydrated(true);

    // initialLanguage가 제공되지 않은 경우에만 쿠키에서 읽기
    // initialLanguage가 제공된 경우 이미 서버-클라이언트 동기화되어 있음
    if (!initialLanguage) {
      const actualLanguage = languageManager.getCurrentLanguage();
      if (actualLanguage !== currentLanguage) {
        setCurrentLanguage(actualLanguage);
        onLanguageChange?.(actualLanguage);
      }
    }

    // 쿠키 변경 감지 (폴링 방식)
    const cookieName = languageManagerOptions?.cookieName || "i18n-language";
    const checkCookieChange = setInterval(() => {
      const cookieLanguage = languageManager.getCurrentLanguage();
      if (cookieLanguage !== currentLanguage) {
        setCurrentLanguage(cookieLanguage);
        onLanguageChange?.(cookieLanguage);
      }
    }, 1000); // 1초마다 체크

    return () => clearInterval(checkCookieChange);
  }, [
    currentLanguage,
    languageManager,
    languageManagerOptions?.cookieName,
    onLanguageChange,
  ]);

  React.useEffect(() => {
    if (!isHydrated) return;

    // 언어 변경 리스너 등록
    const removeListener = languageManager.addLanguageChangeListener((lang) => {
      if (lang !== currentLanguage) {
        setCurrentLanguage(lang);
        onLanguageChange?.(lang);
      }
    });

    return removeListener;
  }, [languageManager, currentLanguage, onLanguageChange, isHydrated]);

  const contextValue: I18nContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages: languageManager.getAvailableLanguages(),
    languageManager,
    isLoading,
    translations,
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
