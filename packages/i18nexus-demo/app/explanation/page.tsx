"use client";

import { useTranslation } from "i18nexus";
import Header from "../components/Header";
export default function ExplanationPage() {
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("사용 가이드")}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t("i18nexus를 프로젝트에 통합하고 사용하는 방법을 단계별로 알아보세요.")}
          </p>
        </div>

        {/* Installation */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t("1. 설치")}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t("패키지 설치")}</h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {t("npm install i18nexus i18next react-i18next\n# 또는\nyarn add i18nexus i18next react-i18next")}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Translation Files Setup */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t("2. 번역 파일 설정 (권장)")}</h2>
          <div className="space-y-4">
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                💡 <strong>{t("권장하는 방식:")}</strong>{t("번역 데이터를 JSON 파일로\n                분리하여 관리하면 i18nexus-cli와의 통합이 용이하고, 번역 관리가\n                효율적입니다.")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t("📁 디렉토리 구조")}</h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  {t("lib/\n  ├── translations/\n  │   ├── ko.json     # 한국어 번역\n  │   └── en.json     # 영어 번역\n  ├── i18n.ts         # 번역 데이터 export (서버 안전)\n  └── i18n.client.ts  # i18next 초기화 (클라이언트 전용)")}
                </pre>
              </div>

              <h4 className="text-md font-semibold text-white mb-2">
                lib/translations/ko.json
              </h4>
              <div className="bg-slate-950 text-white p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  {t("{\n  \"환영합니다\": \"환영합니다\",\n  \"i18nexus를 사용해주셔서 감사합니다\": \"i18nexus를 사용해주셔서 감사합니다\",\n  \"시작하기\": \"시작하기\"\n}")}
                </pre>
              </div>

              <h4 className="text-md font-semibold text-white mb-2">
                lib/translations/en.json
              </h4>
              <div className="bg-slate-950 text-white p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  {t("{\n  \"환영합니다\": \"Welcome\",\n  \"i18nexus를 사용해주셔서 감사합니다\": \"Thank you for using i18nexus\",\n  \"시작하기\": \"Get Started\"\n}")}
                </pre>
              </div>

              <h4 className="text-md font-semibold text-white mb-2">{t("lib/i18n.ts (서버/클라이언트 공통)")}</h4>
              <div className="bg-slate-950 text-white p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  {t("import en from \"./translations/en.json\";\nimport ko from \"./translations/ko.json\";\n\n// 번역 데이터만 export (서버에서도 안전)\nexport const translations = { ko, en };")}
                </pre>
              </div>

              <h4 className="text-md font-semibold text-white mb-2">{t("lib/i18n.client.ts (클라이언트 전용)")}</h4>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {t("\"use client\";\nimport i18n from \"i18next\";\nimport { initReactI18next } from \"react-i18next\";\nimport { translations } from \"./i18n\";\n\n// i18next 초기화 (클라이언트 전용)\nif (typeof window !== \"undefined\" && !i18n.isInitialized) {\n  i18n.use(initReactI18next).init({\n    resources: {\n      ko: { translation: translations.ko },\n      en: { translation: translations.en },\n    },\n    lng: \"ko\",\n    fallbackLng: \"ko\",\n    interpolation: {\n      escapeValue: false,\n    },\n  });\n}\n\nexport default i18n;")}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Provider Setup */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t("3. Provider 설정")}</h2>
          <div className="space-y-4">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                ⚠️ <strong>{t("중요:")}</strong>{t("Next.js App Router에서는 layout.tsx가\n                서버 컴포넌트입니다. I18nProvider는 클라이언트 컴포넌트이므로\n                별도의 ClientProvider로 감싸야 합니다.")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                app/components/ClientProvider.tsx
              </h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  {t("\"use client\";\nimport { I18nProvider } from \"i18nexus\";\nimport { ReactNode } from \"react\";\nimport \"@/lib/i18n.client\"; // 클라이언트 전용 i18next 초기화\n\nexport default function ClientProvider({ \n  children \n}: { \n  children: ReactNode \n}) {\n  return (\n    <I18nProvider\n      languageManagerOptions={{\n        defaultLanguage: \"ko\",\n        availableLanguages: [\n          { code: \"ko\", name: \"한국어\", flag: \"🇰🇷\" },\n          { code: \"en\", name: \"English\", flag: \"🇺🇸\" },\n        ],\n        enableAutoDetection: false, // Hydration 에러 방지\n      }}>\n      {children}\n    </I18nProvider>\n  );\n}")}
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                app/layout.tsx
              </h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`import ClientProvider from "./components/ClientProvider";
import "./globals.css";

export const metadata = {
  title: "i18nexus Demo",
  description: "Complete React i18n toolkit",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="ko">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t("4. 컴포넌트에서 사용하기")}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t("번역 함수 사용")}</h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {t("\"use client\";\nimport { useTranslation } from \"i18nexus\";\n\nfunction Welcome() {\n  const { t } = useTranslation();\n  \n  return (\n    <div>\n      <h1>{t(\"환영합니다\")}</h1>\n      <p>{t(\"i18nexus를 사용해주셔서 감사합니다\")}</p>\n      <button>{t(\"시작하기\")}</button>\n    </div>\n  );\n}")}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t("언어 전환 컴포넌트")}</h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`"use client";
import { useLanguageSwitcher } from "i18nexus";

function LanguageSwitcher() {
  const { 
    currentLanguage, 
    changeLanguage, 
    availableLanguages 
  } = useLanguageSwitcher();
  
  return (
    <select 
      value={currentLanguage} 
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CLI Tools */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t("5. i18nexus-cli 도구 (선택사항)")}</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t("📦 설치")}</h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {t("npm install -D i18nexus-cli\n# 또는\nyarn add -D i18nexus-cli")}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t("⚙️ 설정 파일 (i18nexus.config.js)")}</h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`module.exports = {
  projectId: "your-project-id",
  translations: {
    sourceDirectory: "./lib/translations",
    languages: ["ko", "en"],
    defaultLanguage: "ko",
    format: "json",
  },
  commands: {
    extract: {
      include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
      exclude: ["node_modules/**"],
    },
    pull: {
      googleSheets: {
        spreadsheetId: "your-spreadsheet-id",
        range: "Sheet1!A:C",
      },
    },
  },
};`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t("🛠️ 주요 명령어")}</h3>

              <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6">
                <p className="text-yellow-200 text-sm">
                  ⚠️ <strong>{t("참고:")}</strong>{t("i18nexus-cli는 구글 시트 연동과 번역\n                  관리에 중점을 둔 도구입니다. 코드 내에서 `t()` 함수를 사용하여\n                  한국어 키로 번역을 호출하고, CLI로 번역 데이터를 관리하는\n                  방식입니다.")}</p>
              </div>

              <div className="space-y-4">
                {/* Add String Command */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">
                      add-string
                    </span>
                    <span className="text-slate-400 text-sm">{t("새 번역 키 추가")}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{t("프로젝트에 새로운 번역 문자열을 추가합니다.")}</p>

                  <h4 className="text-white font-semibold mb-2 text-sm">{t("사용 예시:")}</h4>
                  <div className="bg-slate-950 text-white p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
                      {t("# 새 번역 키 추가\nnpx i18nexus add-string\n\n# 또는 별칭 사용\nnpx i18nexus a")}
                    </pre>
                  </div>

                  <div className="mt-3 bg-blue-900/30 border border-blue-700 rounded p-3">
                    <p className="text-blue-200 text-xs">
                      💡 <strong>{t("대화형:")}</strong>{t("명령어 실행 시 네임스페이스,\n                      키, 기본 텍스트를 입력하라는 프롬프트가 나타납니다.")}</p>
                  </div>
                </div>

                {/* Update String Command */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">
                      update-string
                    </span>
                    <span className="text-slate-400 text-sm">{t("번역 키 수정")}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{t("기존 번역 문자열을 수정합니다.")}</p>

                  <h4 className="text-white font-semibold mb-2 text-sm">{t("사용 예시:")}</h4>
                  <div className="bg-slate-950 text-white p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
                      {t("# 번역 키 수정\nnpx i18nexus update-string namespace:key\n\n# 또는 별칭 사용\nnpx i18nexus u namespace:key")}
                    </pre>
                  </div>
                </div>

                {/* Delete String Command */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">
                      delete-string
                    </span>
                    <span className="text-slate-400 text-sm">{t("번역 키 삭제")}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{t("번역 문자열과 모든 번역을 삭제합니다.")}</p>

                  <h4 className="text-white font-semibold mb-2 text-sm">{t("사용 예시:")}</h4>
                  <div className="bg-slate-950 text-white p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
                      {t("# 번역 키 삭제\nnpx i18nexus delete-string namespace:key\n\n# 또는 별칭 사용\nnpx i18nexus d namespace:key")}
                    </pre>
                  </div>

                  <div className="mt-3 bg-red-900/30 border border-red-700 rounded p-3">
                    <p className="text-red-200 text-xs">
                      ⚠️ <strong>{t("주의:")}</strong>{t("이 작업은 되돌릴 수 없습니다.\n                      모든 언어의 번역이 삭제됩니다.")}</p>
                  </div>
                </div>

                {/* Pull Command */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">
                      pull
                    </span>
                    <span className="text-slate-400 text-sm">{t("구글 시트에서 가져오기")}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{t("구글 시트의 번역 데이터를 로컬 JSON 파일로 다운로드합니다.")}</p>

                  <div className="bg-slate-950 text-white p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      {`npx i18nexus pull`}
                    </pre>
                  </div>
                </div>

                {/* Import Command */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">
                      import
                    </span>
                    <span className="text-slate-400 text-sm">{t("로컬 파일 업로드")}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{t("로컬 JSON 번역 파일을 구글 시트로 업로드합니다.")}</p>

                  <div className="bg-slate-950 text-white p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      {`npx i18nexus import ./lib/translations/ko.json`}
                    </pre>
                  </div>
                </div>

                {/* Listen Command */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-pink-600 text-white px-3 py-1 rounded text-sm font-medium mr-3">
                      listen
                    </span>
                    <span className="text-slate-400 text-sm">{t("실시간 동기화")}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{t("구글 시트의 변경사항을 실시간으로 감지하고 자동\n                    다운로드합니다.")}</p>

                  <div className="bg-slate-950 text-white p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      {`npx i18nexus listen`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Example */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t("🔄 권장 워크플로우")}</h3>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t("코드 작성")}</h4>
                      <p className="text-slate-400 text-sm">{t("한국어를 키로 사용하여 환영합니다 형태로 코드 작성")}</p>
                      <div className="bg-slate-950 p-2 rounded mt-2">
                        <code className="text-xs text-slate-300">
                          {t("<h1>{t(\"환영합니다\")}</h1>")}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t("번역 파일 생성")}</h4>
                      <p className="text-slate-400 text-sm">{t("lib/translations/ko.json과 en.json 파일에 번역 키 추가")}</p>
                      <div className="bg-slate-950 p-2 rounded mt-2">
                        <code className="text-xs text-slate-300">
                          {t("{ \"환영합니다\": \"환영합니다\" }")}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      3
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t("구글 시트 업로드")}</h4>
                      <p className="text-slate-400 text-sm">
                        <code className="bg-slate-950 px-2 py-1 rounded text-xs">
                          npx i18nexus import ./lib/translations/ko.json
                        </code>{" "}{t("로 번역 데이터 업로드")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      4
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t("번역 작업")}</h4>
                      <p className="text-slate-400 text-sm">{t("구글 시트에서 팀원들과 협업하여 번역 진행")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      5
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t("동기화")}</h4>
                      <p className="text-slate-400 text-sm">
                        <code className="bg-slate-950 px-2 py-1 rounded text-xs">
                          npx i18nexus pull
                        </code>{" "}{t("로 번역 데이터 다운로드")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      6
                    </span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{t("실시간 감지 (선택)")}</h4>
                      <p className="text-slate-400 text-sm">
                        <code className="bg-slate-950 px-2 py-1 rounded text-xs">
                          npx i18nexus listen
                        </code>{" "}{t("으로 구글 시트 변경사항 실시간 반영")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500">Built with ❤️ by i18nexus Team</p>
        </div>
      </footer>
    </div>;
}