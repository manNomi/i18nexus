// Components
export { I18nProvider, useI18nContext } from "./components/I18nProvider";
export type { I18nProviderProps } from "./components/I18nProvider";

// Hooks
export { useTranslation, useLanguageSwitcher } from "./hooks/useTranslation";
export {
  useTranslationOptimized,
  useBatchTranslation,
  useLazyTranslation,
  useTranslationWithMonitoring,
} from "./hooks/useTranslationOptimized";

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

// SSR Utilities (추천 - 간단하고 직관적인 API)
export { getServerTranslation, getCurrentLanguage } from "./utils/ssr";
export type { TranslationFunction, ServerTranslationResult } from "./utils/ssr";

// Server Translation (고급 - 전역 번역 시스템, 캐싱 등)
export {
  createServerT,
  createCachedServerT,
  createServerBatchT,
  clearServerCache,
  getServerCacheStats,
  registerTranslations,
  getRegisteredTranslations,
} from "./utils/serverTranslation";

// Performance Utilities
export {
  TranslationPerformanceTester,
  quickPerformanceTest,
  compareSSRClientPerformance,
  memoryUsageTest,
  cacheEfficiencyTest,
} from "./utils/performanceTest";

// Note: CLI tools are available separately:
// - npx i18n-wrapper (wrap hardcoded strings with t() functions)
// - npx i18n-extractor (extract translation keys to JSON/CSV)
// - npx i18n-upload (upload translations to Google Sheets)
// - npx i18n-download (download translations from Google Sheets)
