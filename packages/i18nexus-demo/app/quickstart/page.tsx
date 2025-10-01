"use client";

import { useTranslation } from "i18nexus";
export default function QuickStartPage() {
  const {
    t
  } = useTranslation();
  return <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg shadow-green-500/30">
          <span className="text-white font-bold text-2xl">🚀</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">{t("빠른 시작")}</h1>
        <p className="text-xl text-slate-300">{t("3분 안에 i18nexus를 프로젝트에 적용하세요")}</p>
      </div>

      {/* Step 1: Install */}
      <div className="mb-10">
        <div className="flex items-start mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg shadow-blue-500/30 mr-4">
            1
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-300 mb-2">{t("패키지 설치")}</h2>
            <p className="text-slate-400 mb-4">{t("i18nexus 코어 라이브러리와 CLI 도구를 설치합니다")}</p>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg border border-slate-800">
            <code>{t("# 코어 라이브러리 설치\nnpm install i18nexus\n\n# CLI 도구 설치 (선택사항이지만 권장)\nnpm install -D i18nexus-tools")}</code>
          </pre>
        </div>
      </div>

      {/* Step 2: Wrap Korean Text */}
      <div className="mb-10">
        <div className="flex items-start mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg shadow-indigo-500/30 mr-4">
            2
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-indigo-300 mb-2">{t("한국어 텍스트 자동 래핑")}</h2>
            <p className="text-slate-400 mb-4">{t("기존 코드의 모든 한국어를 자동으로 t() 함수로 래핑합니다")}</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg border border-slate-800 mb-4">
            <code>npx i18n-wrapper --pattern "app/**/*.tsx"</code>
          </pre>
          <div className="bg-indigo-900/20 border border-indigo-800/50 rounded-lg p-4">
            <p className="text-indigo-300 text-sm font-semibold mb-2">{t("✨ 자동으로 처리되는 것들:")}</p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>{t("• useTranslation import 추가")}</li>
              <li>• const {"{"} t {"}"}{t("= useTranslation() 훅 주입")}</li>
              <li>{t("• 모든 한국어 텍스트를 t(\"...\") 로 래핑")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 3: Extract Keys */}
      <div className="mb-10">
        <div className="flex items-start mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg shadow-purple-500/30 mr-4">
            3
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-purple-300 mb-2">{t("번역 키 추출")}</h2>
            <p className="text-slate-400 mb-4">{t("모든 t() 함수 호출에서 키를 추출하여 en.json, ko.json 생성/업데이트")}</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg border border-slate-800 mb-4">
            <code>npx i18n-extractor -p "app/**/*.tsx" -d "./lib/translations"</code>
          </pre>
          <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4">
            <p className="text-purple-300 text-sm font-semibold mb-2">{t("🔍 스마트 병합 기능:")}</p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>{t("• 기존 번역은 모두 보존")}</li>
              <li>{t("• 새로운 키만 추가")}</li>
              <li>{t("• 자동으로 알파벳순 정렬")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 4: Setup Provider */}
      <div className="mb-10">
        <div className="flex items-start mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg shadow-pink-500/30 mr-4">
            4
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-pink-300 mb-2">{t("Provider 설정")}</h2>
            <p className="text-slate-400 mb-4">{t("layout.tsx에 I18nProvider를 설정합니다")}</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm border border-slate-800 overflow-x-auto">
            <code>{t("// app/layout.tsx\nimport { I18nProvider } from \"i18nexus\";\nimport { cookies } from \"next/headers\";\nimport enTranslations from \"@/lib/translations/en.json\";\nimport koTranslations from \"@/lib/translations/ko.json\";\n\nexport default function RootLayout({ children }) {\n  const language = cookies().get(\"i18n-language\")?.value || \"ko\";\n\n  return (\n    <html lang={language}>\n      <body>\n        <I18nProvider\n          initialLanguage={language}\n          languageManagerOptions={{\n            defaultLanguage: \"ko\",\n            availableLanguages: [\n              { code: \"ko\", name: \"한국어\", flag: \"🇰🇷\" },\n              { code: \"en\", name: \"English\", flag: \"🇺🇸\" },\n            ],\n          }}\n          translations={{\n            ko: koTranslations,\n            en: enTranslations,\n          }}\n        >\n          {children}\n        </I18nProvider>\n      </body>\n    </html>\n  );\n}")}</code>
          </pre>
        </div>
      </div>

      {/* Step 5: Done */}
      <div className="bg-gradient-to-r from-green-950/50 to-emerald-950/50 rounded-2xl border border-green-800/50 p-10 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-300 mb-4">{t("완료!")}</h2>
        <p className="text-slate-300 text-lg mb-6">{t("이제 앱이 완전히 국제화되었습니다")}</p>
        <div className="flex justify-center gap-4">
          <Link href="/tool" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">{t("CLI 도구 더 알아보기 →")}</Link>
          <Link href="/provider" className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-800 transition-colors">{t("Provider 가이드 →")}</Link>
        </div>
      </div>
    </main>;
}