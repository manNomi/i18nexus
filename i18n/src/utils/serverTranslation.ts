/**
 * 서버 컴포넌트용 번역 시스템
 * I18nProvider에 등록된 번역을 서버 컴포넌트에서도 사용 가능
 */

// 전역 번역 저장소
let globalTranslations: Record<string, Record<string, string>> = {};
let globalFallbackLanguage = "en";

/**
 * 전역 번역 데이터 등록
 * I18nProvider에서 자동으로 호출됨
 */
export function registerTranslations(
  translations: Record<string, Record<string, string>>,
  fallbackLanguage: string = "en"
) {
  globalTranslations = translations;
  globalFallbackLanguage = fallbackLanguage;
}

/**
 * 등록된 번역 데이터 가져오기
 */
export function getRegisteredTranslations() {
  return {
    translations: globalTranslations,
    fallbackLanguage: globalFallbackLanguage,
  };
}

/**
 * 쿠키에서 언어 가져오기 (서버 사이드)
 */
function getLanguageFromCookies(cookieName: string = "i18n-language"): string {
  // Next.js App Router에서만 작동
  if (typeof window === "undefined") {
    try {
      // 동적으로 next/headers import 시도
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      const language = cookieStore.get(cookieName)?.value;
      return language || globalFallbackLanguage;
    } catch (e) {
      // Next.js가 아니거나 cookies를 사용할 수 없는 경우
      return globalFallbackLanguage;
    }
  }
  return globalFallbackLanguage;
}

/**
 * 서버 컴포넌트용 번역 함수 생성
 * @param language - 현재 언어 (선택적, 없으면 쿠키에서 자동 감지)
 * @param cookieName - 쿠키 이름 (기본값: "i18n-language")
 * @returns t 번역 함수
 */
export function createServerT(
  language?: string,
  cookieName: string = "i18n-language"
) {
  // language가 제공되지 않으면 쿠키에서 자동으로 가져오기
  const currentLanguage = language || getLanguageFromCookies(cookieName);
  const currentTranslations = globalTranslations[currentLanguage] || {};
  const fallbackTranslations = globalTranslations[globalFallbackLanguage] || {};

  // 디버깅 로그 (개발 환경에서만)
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 createServerT Debug:", {
      currentLanguage,
      availableLanguages: Object.keys(globalTranslations),
      currentTranslationsKeys: Object.keys(currentTranslations),
      fallbackTranslationsKeys: Object.keys(fallbackTranslations),
    });
  }

  return function t(key: string): string {
    // 현재 언어에서 번역 찾기
    if (currentTranslations[key]) {
      return currentTranslations[key];
    }

    // 폴백 언어에서 번역 찾기
    if (
      currentLanguage !== globalFallbackLanguage &&
      fallbackTranslations[key]
    ) {
      return fallbackTranslations[key];
    }

    // 번역을 찾지 못한 경우 키 반환
    return key;
  };
}

/**
 * Next.js App Router용 서버 컴포넌트 번역 함수
 * @param language - 현재 언어 (선택적, 없으면 쿠키에서 자동 감지)
 * @param cookieName - 쿠키 이름 (기본값: "i18n-language")
 * @returns t 번역 함수와 언어 정보
 */
export function getServerTranslation(
  language?: string,
  cookieName: string = "i18n-language"
) {
  const currentLanguage = language || getLanguageFromCookies(cookieName);
  const t = createServerT(currentLanguage, cookieName);

  return {
    t,
    language: currentLanguage,
    availableLanguages: Object.keys(globalTranslations),
  };
}

/**
 * 캐싱이 포함된 서버 번역 함수
 */
const serverCache = new Map<string, string>();
const MAX_SERVER_CACHE_SIZE = 500;

export function createCachedServerT(language: string) {
  const currentTranslations = globalTranslations[language] || {};
  const fallbackTranslations = globalTranslations[globalFallbackLanguage] || {};

  return function t(key: string): string {
    const cacheKey = `${language}:${key}`;

    // 캐시 확인
    if (serverCache.has(cacheKey)) {
      return serverCache.get(cacheKey)!;
    }

    // 번역 찾기
    let translation = key;

    if (currentTranslations[key]) {
      translation = currentTranslations[key];
    } else if (
      language !== globalFallbackLanguage &&
      fallbackTranslations[key]
    ) {
      translation = fallbackTranslations[key];
    }

    // 캐시 크기 제한
    if (serverCache.size >= MAX_SERVER_CACHE_SIZE) {
      const firstKey = serverCache.keys().next().value;
      if (firstKey) {
        serverCache.delete(firstKey);
      }
    }

    serverCache.set(cacheKey, translation);
    return translation;
  };
}

/**
 * 서버 캐시 초기화
 */
export function clearServerCache() {
  serverCache.clear();
}

/**
 * 서버 캐시 통계
 */
export function getServerCacheStats() {
  return {
    size: serverCache.size,
    maxSize: MAX_SERVER_CACHE_SIZE,
  };
}

/**
 * 배치 번역 (서버용)
 */
export function createServerBatchT(language: string) {
  const t = createServerT(language);

  return function batchT(keys: string[]): string[] {
    return keys.map((key) => t(key));
  };
}
