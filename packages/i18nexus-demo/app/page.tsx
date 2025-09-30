"use client";

import { useTranslation } from "i18nexus";
export default function HomePage() {
  const {
    t
  } = useTranslation();
  return <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
          <span className="text-white font-bold text-2xl">i18</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {t("i18nexus Complete Guide")}
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t("From Installation to Advanced Usage")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/provider" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            {t("Provider Guide")}
          </a>
          <a href="/cli" className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors">
            {t("CLI Tools Guide")}
          </a>
        </div>
      </div>

      {/* Quick Start Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-12">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-green-600 font-semibold">🚀</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{t("Quick Start")}</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("1. Install Packages")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
              <code>{`npm install i18nexus
npm install -D i18nexus-tools`}</code>
            </pre>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("2. Wrap Korean Text (Optional)")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
              <code>{`npx i18n-wrapper --pattern "app/**/*.tsx"`}</code>
            </pre>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("3. Setup Provider (Required)")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{t("// app/layout.tsx\nimport { I18nProvider } from \"i18nexus\";\nimport { cookies } from \"next/headers\";\n\nexport default function RootLayout({ children }) {\n  const language = cookies().get(\"i18n-language\")?.value || \"ko\";\n\n  return (\n    <html lang={language}>\n      <body>\n        <I18nProvider\n          initialLanguage={language}\n          translations={{\n            ko: { \"환영합니다\": \"환영합니다\" },\n            en: { \"환영합니다\": \"Welcome\" }\n          }}\n        >\n          {children}\n        </I18nProvider>\n      </body>\n    </html>\n  );\n}")}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Why i18nexus Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-12">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-blue-600 font-semibold">💡</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{t("Why i18nexus?")}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Traditional i18n Problems")}
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span>
                <span>{t("Manual text wrapping with t()")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span>
                <span>{t("Hydration mismatch in SSR")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span>
                <span>{t("Complex setup and configuration")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">❌</span>
                <span>{t("Manual translation file management")}</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("i18nexus Solutions")}
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>{t("Automatic text wrapping with CLI")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>{t("Zero hydration issues with SSR")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>{t("Simple setup with sensible defaults")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>{t("Google Sheets integration")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recommended Project Structure */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-purple-600 font-semibold">📁</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {t("Recommended Project Structure")}
          </h2>
        </div>

        <p className="text-slate-400 mb-6">
          {t("This demo follows the recommended Next.js App Router structure with i18nexus:")}
        </p>

        <div className="bg-slate-800 rounded-lg p-6">
          <pre className="text-slate-300 text-sm">
            <code>{`app/
├── layout.tsx          # 🔑 I18nProvider setup (server-side)
├── page.tsx            # Client component with useTranslation
├── provider/
│   └── page.tsx        # Provider feature documentation
├── cli/
│   └── page.tsx        # CLI tools documentation
└── components/
    └── Header.tsx      # Reusable component with language switcher

lib/
└── translations/
    ├── en.json         # English translations
    └── ko.json         # Korean translations`}</code>
          </pre>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">
              {t("Server Components")}
            </h4>
            <p className="text-sm text-slate-400">
              {t("Use layout.tsx for I18nProvider with cookie-based language detection")}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">
              {t("Client Components")}
            </h4>
            <p className="text-sm text-slate-400">
              {t('Use "use client" with useTranslation() hook for reactive translations')}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">
              {t("Translation Files")}
            </h4>
            <p className="text-sm text-slate-400">
              {t("Store translations in lib/translations/ directory as JSON files")}
            </p>
          </div>
        </div>
      </section>
    </main>;
}