"use client";

import { useLanguageSwitcher } from "i18nexus";
import { useRouter } from "next/navigation";

export default function LanguageSwitcherWithRefresh() {
  const { currentLanguage, changeLanguage, availableLanguages } =
    useLanguageSwitcher();
  const router = useRouter();

  const handleLanguageChange = async (langCode: string) => {
    await changeLanguage(langCode);

    // SSR 페이지의 경우 강제 리다이렉트로 서버 컴포넌트 재렌더링
    if (window.location.pathname.includes("/ssr-test")) {
      router.push(window.location.pathname);
    } else {
      // 일반 페이지는 refresh로 충분
      router.refresh();
    }
  };

  return (
    <div className="space-y-2">
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentLanguage === lang.code
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}>
          <span>{lang.name}</span>
          {currentLanguage === lang.code && (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
