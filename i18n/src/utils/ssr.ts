/**
 * Next.js App Router SSR 전용 번역 유틸리티
 * 서버 컴포넌트에서 사용하기 위한 간단하고 직관적인 API 제공
 */

/**
 * 서버 컴포넌트에서 번역을 사용하기 위한 함수
 *
 * @param translations - 번역 데이터 객체 { en: {...}, ko: {...} }
 * @param cookieName - 언어 쿠키 이름 (기본값: "i18n-language")
 * @param defaultLanguage - 기본 언어 (기본값: "en")
 * @returns 번역 함수 t, 현재 언어, 번역 데이터
 *
 * @example
 * ```tsx
 * // lib/i18n.ts
 * import en from './translations/en.json';
 * import ko from './translations/ko.json';
 *
 * export const translations = { en, ko };
 *
 * // app/page.tsx (Server Component)
 * import { getServerTranslation } from 'i18nexus/ssr';
 * import { translations } from '@/lib/i18n';
 *
 * export default async function Page() {
 *   const { t, currentLanguage } = await getServerTranslation(translations);
 *
 *   return (
 *     <div>
 *       <h1>{t('welcome')}</h1>
 *       <p>{t('description')}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export async function getServerTranslation(
  translations: Record<string, Record<string, string>>,
  options?: {
    cookieName?: string;
    defaultLanguage?: string;
  }
) {
  const cookieName = options?.cookieName || "i18n-language";
  const defaultLanguage = options?.defaultLanguage || "en";

  // Next.js cookies() 동적 import
  let currentLanguage = defaultLanguage;

  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const langCookie = cookieStore.get(cookieName);
      currentLanguage = langCookie?.value || defaultLanguage;
    } catch (e) {
      // Next.js가 아니거나 cookies를 사용할 수 없는 경우 기본 언어 사용
      console.warn(
        "⚠️  i18nexus: Unable to access cookies. Using default language:",
        defaultLanguage
      );
    }
  }

  const currentTranslations =
    translations[currentLanguage] || translations[defaultLanguage] || {};

  /**
   * 번역 함수
   * @param key - 번역 키
   * @returns 번역된 문자열 또는 키 (번역이 없는 경우)
   */
  const t = (key: string): string => {
    return currentTranslations[key] || key;
  };

  return {
    /** 번역 함수 */
    t,
    /** 현재 언어 코드 */
    currentLanguage,
    /** 현재 언어의 모든 번역 데이터 */
    translations: currentTranslations,
  };
}

/**
 * 헬퍼: 서버 컴포넌트에서 현재 언어만 가져오기
 *
 * @param cookieName - 언어 쿠키 이름 (기본값: "i18n-language")
 * @param defaultLanguage - 기본 언어 (기본값: "en")
 * @returns 현재 언어 코드
 *
 * @example
 * ```tsx
 * import { getCurrentLanguage } from 'i18nexus/ssr';
 *
 * export default async function Page() {
 *   const lang = await getCurrentLanguage();
 *   return <div>Current: {lang}</div>;
 * }
 * ```
 */
export async function getCurrentLanguage(
  cookieName: string = "i18n-language",
  defaultLanguage: string = "en"
): Promise<string> {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const langCookie = cookieStore.get(cookieName);
      return langCookie?.value || defaultLanguage;
    } catch (e) {
      return defaultLanguage;
    }
  }
  return defaultLanguage;
}

/**
 * 타입 헬퍼: 번역 함수의 타입
 */
export type TranslationFunction = (key: string) => string;

/**
 * 타입 헬퍼: getServerTranslation의 반환 타입
 */
export type ServerTranslationResult = {
  t: TranslationFunction;
  currentLanguage: string;
  translations: Record<string, string>;
};
