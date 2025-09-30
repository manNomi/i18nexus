"use client";

import { useTranslation, useLanguageSwitcher } from "i18nexus";
export default function ProviderPage() {
  const {
    t
  } = useTranslation();
  const {
    currentLanguage,
    changeLanguage,
    availableLanguages
  } = useLanguageSwitcher();
  return <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          {t("I18nProvider Guide")}
        </h1>
        <p className="text-xl text-slate-400">
          {t("React Context provider for cookie-based language management and SSR support")}
        </p>
      </div>

      {/* Features Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t("Key Features")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✅</span>
            <div>
              <p className="font-medium text-white">
                {t("Cookie-based Language Persistence")}
              </p>
              <p className="text-sm text-slate-400">
                {t("Automatically saves and restores user language preference")}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✅</span>
            <div>
              <p className="font-medium text-white">{t("Full SSR Support")}</p>
              <p className="text-sm text-slate-400">
                {t("Perfect compatibility with Next.js server-side rendering")}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✅</span>
            <div>
              <p className="font-medium text-white">
                {t("Zero Hydration Mismatch")}
              </p>
              <p className="text-sm text-slate-400">
                {t("Correct language on first render prevents layout shift")}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✅</span>
            <div>
              <p className="font-medium text-white">
                {t("TypeScript Support")}
              </p>
              <p className="text-sm text-slate-400">
                {t("Full type safety and autocomplete")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t("Basic Setup")}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("1. Server Layout (app/layout.tsx)")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{t("import { I18nProvider } from \"i18nexus\";\nimport { cookies } from \"next/headers\";\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  // Read language from cookie\n  const cookieStore = cookies();\n  const language = cookieStore.get(\"i18n-language\")?.value || \"ko\";\n\n  return (\n    <html lang={language}>\n      <body>\n        <I18nProvider\n          initialLanguage={language}\n          languageManagerOptions={{\n            defaultLanguage: \"ko\",\n            availableLanguages: [\n              { code: \"ko\", name: \"한국어\", flag: \"🇰🇷\" },\n              { code: \"en\", name: \"English\", flag: \"🇺🇸\" },\n            ],\n          }}\n          translations={{\n            ko: { \"환영합니다\": \"환영합니다\" },\n            en: { \"환영합니다\": \"Welcome\" },\n          }}\n        >\n          {children}\n        </I18nProvider>\n      </body>\n    </html>\n  );\n}")}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("2. Client Component (app/page.tsx)")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{t("\"use client\";\n\nimport { useTranslation, useLanguageSwitcher } from \"i18nexus\";\n\nexport default function HomePage() {\n  const { t } = useTranslation();\n  const { currentLanguage, changeLanguage, availableLanguages } =\n    useLanguageSwitcher();\n\n  return (\n    <div>\n      <h1>{t(\"환영합니다\")}</h1>\n      \n      <select\n        value={currentLanguage}\n        onChange={(e) => changeLanguage(e.target.value)}\n      >\n        {availableLanguages.map((lang) => (\n          <option key={lang.code} value={lang.code}>\n            {lang.flag} {lang.name}\n          </option>\n        ))}\n      </select>\n    </div>\n  );\n}")}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">{t("Live Demo")}</h2>

        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("Current Language")}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                {currentLanguage.toUpperCase()}
              </div>
              <p className="text-slate-400">
                {availableLanguages.find(l => l.code === currentLanguage)?.name}
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("Language Switcher")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {availableLanguages.map(lang => <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentLanguage === lang.code ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
                  {lang.flag} {lang.name}
                </button>)}
            </div>
            <p className="text-sm text-slate-400 mt-4">
              {t("💡 Try switching languages - the selection is saved in cookies!")}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("Translation Examples")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded">
                <span className="text-slate-400">{t("t(\"환영합니다\")")}</span>
                <span className="text-white font-medium">
                  {t("환영합니다")}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded">
                <span className="text-slate-400">t("Quick Start")</span>
                <span className="text-white font-medium">{t("Quick Start")}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded">
                <span className="text-slate-400">t("Why i18nexus?")</span>
                <span className="text-white font-medium">
                  {t("Why i18nexus?")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t("API Reference")}
        </h2>

        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              useTranslation()
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm mb-3">
              <code>{t("const { t } = useTranslation();\n\n// Usage\nt(\"key\")           // Simple translation\nt(\"한국어 텍스트\")  // Korean text as key")}</code>
            </pre>
            <p className="text-slate-400 text-sm">
              {t("Hook for accessing the translation function in client components")}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              useLanguageSwitcher()
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm mb-3">
              <code>{`const {
  currentLanguage,      // Current language code
  changeLanguage,       // Function to change language
  availableLanguages,   // Array of available languages
} = useLanguageSwitcher();

// Usage
changeLanguage("en")   // Switch to English`}</code>
            </pre>
            <p className="text-slate-400 text-sm">
              {t("Hook for managing language switching and accessing language state")}
            </p>
          </div>
        </div>
      </section>
    </main>;
}