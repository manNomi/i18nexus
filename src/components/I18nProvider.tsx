import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
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
  translations: Record<string, Record<string, string>>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions?: LanguageManagerOptions;
  translations?: Record<string, Record<string, string>>;
  onLanguageChange?: (language: string) => void;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  languageManagerOptions,
  translations = {},
  onLanguageChange,
}) => {
  const [languageManager] = useState(
    () => new LanguageManager(languageManagerOptions),
  );
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    languageManagerOptions?.defaultLanguage || 'en'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

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
  useEffect(() => {
    setIsHydrated(true);
    
    // 쿠키에서 실제 언어 설정 읽기
    const actualLanguage = languageManager.getCurrentLanguage();
    if (actualLanguage !== currentLanguage) {
      setCurrentLanguage(actualLanguage);
      onLanguageChange?.(actualLanguage);
    }
  }, []);

  useEffect(() => {
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
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }
  return context;
};
