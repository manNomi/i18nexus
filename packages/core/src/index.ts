// Components
export { I18nProvider, useI18nContext } from "./components/I18nProvider";
export type { I18nProviderProps } from "./components/I18nProvider";

// Hooks
export { useTranslation, useLanguageSwitcher } from "./hooks/useTranslation";

// Utils
export {
  setCookie,
  getCookie,
  deleteCookie,
  getAllCookies,
} from "./utils/cookie";
export type { CookieOptions } from "./utils/cookie";

// Language Manager
export {
  LanguageManager,
  defaultLanguageManager,
} from "./utils/languageManager";
export type {
  LanguageConfig,
  LanguageManagerOptions,
} from "./utils/languageManager";
