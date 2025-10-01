/**
 * SSR 번역 테스트 페이지
 * getServerTranslation을 사용한 서버 컴포넌트 번역 데모
 */

import { getServerTranslation } from "@/app/components/SSRProvider";

export default async function SSRTestPage() {
  // SSR Provider에서 번역 함수와 언어 정보 가져오기
  const { t, currentLanguage, translations: currentTranslations } =
    await getServerTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t("SSR 번역 테스트")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            서버 컴포넌트에서 getServerTranslation() 사용
          </p>
          {/* 성공 정보 */}
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              ✅ <strong>현재 언어:</strong> {currentLanguage}
            </p>
            <p className="text-sm text-green-800 dark:text-green-200">
              ✅ <strong>번역 작동:</strong> "소개" → {t("소개")}
            </p>
            <p className="text-sm text-green-800 dark:text-green-200">
              ✅ <strong>로드된 번역 키:</strong>{" "}
              {Object.keys(currentTranslations).length}개
            </p>
          </div>
        </div>

        {/* Auto Detection Section */}
        <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("자동 언어 감지")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("createServerT()는 자동으로 쿠키에서 언어를 감지합니다.")}
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-green-400 overflow-x-auto">
              {`import { getServerTranslation } from '@/app/components/SSRProvider';

export default async function Page() {
  const { t, currentLanguage } = await getServerTranslation();
  return <h1>{t('welcome')}</h1>;
}`}
            </pre>
          </div>
        </section>

        {/* Translation Test Results */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t("번역 테스트 결과")}
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <code className="text-sm text-gray-600 dark:text-gray-400">
                t("소개")
              </code>
              <span className="text-gray-900 dark:text-white font-medium">
                {t("소개")}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <code className="text-sm text-gray-600 dark:text-gray-400">
                t("빠른시작")
              </code>
              <span className="text-gray-900 dark:text-white font-medium">
                {t("빠른시작")}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <code className="text-sm text-gray-600 dark:text-gray-400">
                t("도구")
              </code>
              <span className="text-gray-900 dark:text-white font-medium">
                {t("도구")}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <code className="text-sm text-gray-600 dark:text-gray-400">
                t("welcome")
              </code>
              <span className="text-gray-900 dark:text-white font-medium">
                {t("welcome")}
              </span>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="mb-3">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("빠른 초기 로딩")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("서버에서 미리 번역되어 초기 로딩 시간 단축")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="mb-3">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("SEO 최적화")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("검색 엔진이 번역된 콘텐츠를 바로 크롤링")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="mb-3">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("메모리 효율")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("클라이언트 메모리 사용량 감소")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
