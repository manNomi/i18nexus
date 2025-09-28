import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  LanguageManager,
  LanguageConfig,
  LanguageManagerOptions,
} from "../utils/languageManager";

interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  availableLanguages: LanguageConfig[];
  languageManager: LanguageManager;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions?: LanguageManagerOptions;
  onLanguageChange?: (language: string) => void;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  languageManagerOptions,
  onLanguageChange,
}) => {
  const { i18n } = useTranslation();
  const [languageManager] = useState(
    () => new LanguageManager(languageManagerOptions),
  );
  const [currentLanguage, setCurrentLanguage] = useState<string>(() =>
    languageManager.getCurrentLanguage(),
  );
  const [isLoading, setIsLoading] = useState(false);

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

      // i18next 언어 변경
      await i18n.changeLanguage(lang);

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

  useEffect(() => {
    // 언어 변경 리스너 등록
    const removeListener = languageManager.addLanguageChangeListener((lang) => {
      if (lang !== currentLanguage) {
        setCurrentLanguage(lang);
        i18n.changeLanguage(lang);
        onLanguageChange?.(lang);
      }
    });

    // 초기 언어 설정
    const initLanguage = languageManager.getCurrentLanguage();
    if (initLanguage !== i18n.language) {
      i18n.changeLanguage(initLanguage).catch(console.error);
    }

    return removeListener;
  }, [i18n, languageManager, currentLanguage, onLanguageChange]);

  const contextValue: I18nContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages: languageManager.getAvailableLanguages(),
    languageManager,
    isLoading,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18nContext = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }
  return context;
};
