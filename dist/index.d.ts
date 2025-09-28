export { I18nProvider, useI18nContext } from "./components/I18nProvider";
export type { I18nProviderProps } from "./components/I18nProvider";
export { useTranslation, useLanguageSwitcher } from "./hooks/useTranslation";
export { setCookie, getCookie, deleteCookie, getAllCookies, } from "./utils/cookie";
export type { CookieOptions } from "./utils/cookie";
export { LanguageManager, defaultLanguageManager, } from "./utils/languageManager";
export type { LanguageConfig, LanguageManagerOptions, } from "./utils/languageManager";
export { TranslationWrapper, runTranslationWrapper } from "./scripts/t-wrapper";
export type { ScriptConfig } from "./scripts/t-wrapper";
export { GoogleSheetsManager, defaultGoogleSheetsManager, } from "./scripts/google-sheets";
export type { GoogleSheetsConfig, TranslationRow, } from "./scripts/google-sheets";
//# sourceMappingURL=index.d.ts.map