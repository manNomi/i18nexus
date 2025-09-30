import React, { ReactNode } from "react";
import { LanguageManager, LanguageConfig, LanguageManagerOptions } from "../utils/languageManager";
interface I18nContextType {
    currentLanguage: string;
    changeLanguage: (lang: string) => Promise<void>;
    availableLanguages: LanguageConfig[];
    languageManager: LanguageManager;
    isLoading: boolean;
    translations: Record<string, Record<string, string>>;
}
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
export declare const I18nProvider: React.FC<I18nProviderProps>;
export declare const useI18nContext: () => I18nContextType;
export {};
//# sourceMappingURL=I18nProvider.d.ts.map