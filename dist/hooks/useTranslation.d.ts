export declare const useTranslation: (ns?: string | string[]) => {
    t: import("i18next").TFunction<string | string[], undefined>;
    i18n: import("i18next").i18n;
    ready: boolean;
    currentLanguage: string;
    changeLanguage: (lang: string) => Promise<void>;
    availableLanguages: import("..").LanguageConfig[];
    languageManager: import("..").LanguageManager;
    isLoading: boolean;
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