export declare const useTranslation: () => {
    t: (key: string, options?: any) => string;
    currentLanguage: string;
    isReady: boolean;
};
export declare const useLanguageSwitcher: () => {
    currentLanguage: string;
    availableLanguages: import("..").LanguageConfig[];
    changeLanguage: (lang: string) => Promise<void>;
    switchToNextLanguage: () => Promise<void>;
    switchToPreviousLanguage: () => Promise<void>;
    getLanguageConfig: (code?: string) => import("..").LanguageConfig | undefined;
    detectBrowserLanguage: () => string | null;
    resetLanguage: () => void;
    isLoading: boolean;
};
//# sourceMappingURL=useTranslation.d.ts.map