import { getServerTranslation as getSSRTranslation } from "i18nexus";
import { translations } from "@/lib/i18n";

/**
 * SSR 전용 번역 Provider
 * 서버 컴포넌트에서 사용하기 위한 번역 함수를 제공합니다.
 * i18nexus의 getServerTranslation을 래핑하여 프로젝트 설정을 적용합니다.
 */
export async function getServerTranslation() {
  return getSSRTranslation(translations, {
    cookieName: "i18n-language",
    defaultLanguage: "en",
  });
}

/**
 * 사용 예시:
 *
 * // 서버 컴포넌트에서
 * import { getServerTranslation } from "@/app/components/SSRProvider";
 *
 * export default async function Page() {
 *   const { t, currentLanguage } = await getServerTranslation();
 *
 *   return (
 *     <div>
 *       <h1>{t("환영합니다")}</h1>
 *       <p>Current Language: {currentLanguage}</p>
 *     </div>
 *   );
 * }
 */
