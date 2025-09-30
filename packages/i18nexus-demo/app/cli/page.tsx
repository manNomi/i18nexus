"use client";

import { useTranslation } from "i18nexus";

export default function CLIPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          {t("CLI Tools Guide")}
        </h1>
        <p className="text-xl text-slate-400">
          {t(
            "Automate your i18n workflow with powerful command-line tools"
          )}
        </p>
      </div>

      {/* Installation Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t("Installation")}
        </h2>
        <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto">
          <code>npm install -D i18nexus-tools</code>
        </pre>
      </section>

      {/* i18n-wrapper Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-purple-600 font-semibold">🔧</span>
          </div>
          <h2 className="text-2xl font-bold text-white">i18n-wrapper</h2>
        </div>

        <p className="text-slate-400 mb-6">
          {t(
            "Automatically wraps Korean text with t() functions and adds useTranslation imports"
          )}
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Basic Usage")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Wrap Korean text in all TSX files
npx i18n-wrapper

# Target specific files or directories
npx i18n-wrapper --pattern "app/**/*.tsx"

# Dry run to preview changes
npx i18n-wrapper --dry-run`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Before & After Example")}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-2">{t("Before")}</p>
                <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm">
                  <code>{`export default function Welcome() {
  return (
    <div>
      <h1>환영합니다</h1>
      <p>i18nexus 사용법</p>
    </div>
  );
}`}</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">{t("After")}</p>
                <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm">
                  <code>{`import { useTranslation } from "i18nexus";

export default function Welcome() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("환영합니다")}</h1>
      <p>{t("i18nexus 사용법")}</p>
    </div>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
            <h4 className="font-semibold text-blue-400 mb-2">
              💡 {t("Pro Tip")}
            </h4>
            <p className="text-slate-300 text-sm">
              {t(
                "The wrapper intelligently detects Korean text and skips already wrapped text, imports, and object keys"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* i18n-extractor Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-green-600 font-semibold">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-white">i18n-extractor</h2>
        </div>

        <p className="text-slate-400 mb-6">
          {t("Extract translation keys from your code and automatically merge with existing translations")}
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Basic Usage")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Extract and merge with existing en.json, ko.json
npx i18n-extractor -p "app/**/*.tsx" -d "./lib/translations"

# Generate specific language files
npx i18n-extractor -l "en,ko,ja" -d "./lib/translations"

# Preview changes without modifying files
npx i18n-extractor --dry-run

# Create new files without merging
npx i18n-extractor --no-merge`}</code>
            </pre>
          </div>

          <div className="bg-green-900/20 border border-green-800 rounded-lg p-6">
            <h4 className="font-semibold text-green-400 mb-3">
              ✨ {t("Smart Merging")}
            </h4>
            <p className="text-slate-300 text-sm mb-3">
              {t("The extractor intelligently merges with existing translations:")}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{t("Preserves all existing translations")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{t("Adds only new keys found in your code")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{t("Automatically sorts keys alphabetically")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{t("Shows detailed statistics of changes")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Output Example")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`🔍 Starting translation key extraction...
📂 Found 8 files to analyze
🔑 Found 94 unique translation keys

📊 en.json - Added 11 new keys:
   + "새로운 키 1"
   + "새로운 키 2"

✓ en.json - Preserved 83 existing translations

📝 en.json: 94 total keys (11 new, 83 existing)
📝 ko.json: 94 total keys (85 new, 9 existing)`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Generated Files")}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-2">lib/translations/en.json</p>
                <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm">
                  <code>{`{
  "Quick Start": "Quick Start",
  "Why i18nexus?": "Why i18nexus?",
  "환영합니다": "Welcome"
}`}</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">lib/translations/ko.json</p>
                <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg text-sm">
                  <code>{`{
  "Quick Start": "빠른 시작",
  "Why i18nexus?": "왜 i18nexus인가?",
  "환영합니다": "환영합니다"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Sheets Integration Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-yellow-600 font-semibold">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {t("Google Sheets Integration")}
          </h2>
        </div>

        <p className="text-slate-400 mb-6">
          {t("Collaborate with translators by syncing translations with Google Sheets")}
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Upload Translations")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`npx i18n-upload \\
  --spreadsheet-id "YOUR_SHEET_ID" \\
  --credentials "./google-credentials.json" \\
  --locales-dir "./lib/translations"`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {t("Download Translations")}
            </h3>
            <pre className="bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`npx i18n-download \\
  --spreadsheet-id "YOUR_SHEET_ID" \\
  --credentials "./google-credentials.json" \\
  --locales-dir "./lib/translations"`}</code>
            </pre>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-400 mb-2">
              ⚠️ {t("Setup Required")}
            </h4>
            <p className="text-slate-300 text-sm mb-3">
              {t("You need to set up Google Service Account credentials:")}
            </p>
            <ol className="text-slate-300 text-sm space-y-1 list-decimal list-inside">
              <li>{t("Create a Google Cloud project")}</li>
              <li>{t("Enable Google Sheets API")}</li>
              <li>{t("Create Service Account credentials")}</li>
              <li>{t("Download JSON credentials file")}</li>
              <li>{t("Share your Google Sheet with the service account email")}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Complete Workflow Section */}
      <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t("Complete Workflow")}
        </h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {t("Wrap Korean Text")}
              </h3>
              <p className="text-slate-400 text-sm">
                {t("Use i18n-wrapper to automatically wrap hardcoded Korean strings")}
              </p>
              <pre className="bg-slate-950 text-slate-300 p-3 rounded-lg mt-2 text-xs">
                <code>npx i18n-wrapper --pattern "app/**/*.tsx"</code>
              </pre>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {t("Extract Translation Keys")}
              </h3>
              <p className="text-slate-400 text-sm">
                {t("Generate translation files from your wrapped text")}
              </p>
              <pre className="bg-slate-950 text-slate-300 p-3 rounded-lg mt-2 text-xs">
                <code>npx i18n-extractor --output-dir "./lib/translations"</code>
              </pre>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {t("Upload to Google Sheets (Optional)")}
              </h3>
              <p className="text-slate-400 text-sm">
                {t("Share with translators via Google Sheets")}
              </p>
              <pre className="bg-slate-950 text-slate-300 p-3 rounded-lg mt-2 text-xs">
                <code>npx i18n-upload --spreadsheet-id "YOUR_ID"</code>
              </pre>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {t("Download Translated Content (Optional)")}
              </h3>
              <p className="text-slate-400 text-sm">
                {t("Pull completed translations back to your project")}
              </p>
              <pre className="bg-slate-950 text-slate-300 p-3 rounded-lg mt-2 text-xs">
                <code>npx i18n-download --spreadsheet-id "YOUR_ID"</code>
              </pre>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {t("Deploy")}
              </h3>
              <p className="text-slate-400 text-sm">
                {t("Your app is now fully internationalized!")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
