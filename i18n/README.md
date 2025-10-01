# i18nexus

<div align="center">

![i18nexus Logo](https://img.shields.io/badge/i18nexus-Complete%20React%20i18n%20Toolkit-blue?style=for-the-badge)

[![npm version](https://badge.fury.io/js/i18nexus.svg)](https://badge.fury.io/js/i18nexus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**🌍 Complete React i18n toolkit with intelligent automation**

[Features](#-features) • [Quick Start](#-quick-start) • [CLI Tools](#-cli-tools) • [Demo](#-demo) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## 🚀 What is i18nexus?

i18nexus is a comprehensive React internationalization toolkit that **automates the entire i18n workflow**. From automatically wrapping hardcoded strings to seamless Google Sheets integration, i18nexus eliminates the tedious manual work of internationalization.

### ✨ Why i18nexus?

- **🤖 Zero Manual Work**: Automatically detect and wrap hardcoded strings
- **🔄 Seamless Workflow**: Extract → Translate → Deploy in minutes
- **🍪 Smart Persistence**: Cookie-based language management with SSR support
- **📊 Team Collaboration**: Direct Google Sheets integration for translators
- **🎯 Developer Friendly**: CLI tools that integrate into any workflow

---

## 🌟 Features

### 🔧 Smart Code Transformation

- **Automatic Detection**: Finds hardcoded Korean and English strings in JSX
- **Intelligent Wrapping**: Wraps strings with `t()` functions automatically
- **Hook Injection**: Adds `useTranslation` hooks where needed
- **TypeScript Support**: Full TypeScript compatibility

### 🔍 Translation Key Extraction

- **Comprehensive Scanning**: Extracts all `t()` wrapped keys from your codebase
- **Multiple Formats**: Generate JSON, CSV files for translators
- **Smart Organization**: Maintains consistent key structures
- **Incremental Updates**: Only processes changed files

### 📊 Google Sheets Integration

- **Direct Sync**: Upload/download translations to/from Google Sheets
- **Real-time Collaboration**: Translators work directly in familiar interface
- **Version Control**: Track translation changes and updates
- **Batch Operations**: Handle multiple languages simultaneously

### 🍪 Advanced Language Management

- **Cookie Persistence**: Language settings survive browser refreshes
- **SSR Compatible**: Works seamlessly with Next.js and other SSR frameworks
- **Auto-detection**: Detect user's preferred language automatically
- **Flexible Configuration**: Customizable cookie settings and fallbacks

---

## 🚀 Quick Start

### Installation

```bash
npm install i18nexus react-i18next i18next
```

### Basic Setup

```tsx
// App.tsx
import { I18nProvider } from "i18nexus";

function App() {
  return (
    <I18nProvider
      languageManagerOptions={{
        defaultLanguage: "en",
        availableLanguages: [
          { code: "en", name: "English", flag: "🇺🇸" },
          { code: "ko", name: "한국어", flag: "🇰🇷" },
        ],
      }}>
      {/* Your app */}
    </I18nProvider>
  );
}
```

### Using Translations

```tsx
import { useTranslation, useLanguageSwitcher } from "i18nexus";

function MyComponent() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguageSwitcher();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => changeLanguage("ko")}>Switch to Korean</button>
    </div>
  );
}
```

### Next.js App Router Setup (Recommended ⭐)

For Next.js App Router (Next.js 13+), i18nexus provides a simple and powerful SSR API:

**Step 1: Setup translations**

```typescript
// lib/i18n.ts
import en from "./translations/en.json";
import ko from "./translations/ko.json";

export const translations = { en, ko };
```

**Step 2: Use in Server Components**

```tsx
// app/page.tsx (Server Component)
import { getServerTranslation } from "i18nexus";
import { translations } from "@/lib/i18n";

export default async function Page() {
  const { t, currentLanguage } = await getServerTranslation(translations);

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

**Step 3: Setup Client Provider (Optional)**

For client components, wrap your app with `I18nProvider`:

```tsx
// app/layout.tsx
import { getCurrentLanguage } from "i18nexus";
import { translations } from "@/lib/i18n";
import ClientProvider from "./components/ClientProvider";

export default async function RootLayout({ children }) {
  const currentLanguage = await getCurrentLanguage();

  return (
    <html lang={currentLanguage}>
      <body>
        <ClientProvider
          translations={translations}
          initialLanguage={currentLanguage}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}

// app/components/ClientProvider.tsx
("use client");

import { I18nProvider } from "i18nexus";

export default function ClientProvider({
  children,
  translations,
  initialLanguage,
}) {
  return (
    <I18nProvider
      translations={translations}
      initialLanguage={initialLanguage}
      languageManagerOptions={{
        defaultLanguage: "en",
        availableLanguages: [
          { code: "en", name: "English", flag: "🇺🇸" },
          { code: "ko", name: "한국어", flag: "🇰🇷" },
        ],
      }}>
      {children}
    </I18nProvider>
  );
}
```

**Why this approach?**

- ✅ **No hydration mismatch**: Server and client render with the same language
- ✅ **No import errors**: Proper package exports for server/client separation
- ✅ **SEO friendly**: Correct `lang` attribute on first render
- ✅ **Fast**: No layout shift from language detection

**Using in Client Components:**

```tsx
"use client";

import { useTranslation, useLanguageSwitcher } from "i18nexus";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } =
    useLanguageSwitcher();

  return (
    <div>
      <p>
        {t("currentLanguage")}: {currentLanguage}
      </p>
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}>
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

## 🛠️ CLI Tools

i18nexus provides powerful CLI tools that automate your entire i18n workflow:

### 1. 🔧 i18n-wrapper

**Automatically wrap hardcoded strings with t() functions**

```bash
# Basic usage - scan all TypeScript/JavaScript files
npx i18n-wrapper

# Target specific files or directories
npx i18n-wrapper --pattern "src/components/**/*.{ts,tsx}"

# Dry run to see what would be changed
npx i18n-wrapper --dry-run

# Include specific file types
npx i18n-wrapper --pattern "src/**/*.{js,jsx,ts,tsx}"
```

**What it does:**

- ✅ Detects hardcoded Korean and English strings in JSX
- ✅ Wraps them with `t('key')` functions
- ✅ Automatically adds `useTranslation` imports and hooks
- ✅ Preserves existing code structure and formatting
- ✅ Handles complex JSX expressions safely

**Example transformation:**

```tsx
// Before
function Welcome() {
  return <h1>Welcome to our app!</h1>;
}

// After
import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation();
  return <h1>{t("welcomeToOurApp")}</h1>;
}
```

### 2. 🔍 i18n-extractor

**Extract translation keys and generate translation files**

```bash
# Extract keys to JSON format
npx i18n-extractor --output-format json

# Extract to CSV for translators
npx i18n-extractor --output-format csv

# Specify output directory
npx i18n-extractor --output-dir "./locales"

# Extract from specific files
npx i18n-extractor --pattern "src/**/*.tsx"
```

**Generated output:**

```json
{
  "welcomeToOurApp": "Welcome to our app!",
  "loginButton": "Login",
  "signupPrompt": "Don't have an account?"
}
```

### 3. 📤 i18n-upload

**Upload translations to Google Sheets**

```bash
# Upload with Google Sheets credentials
npx i18n-upload \
  --spreadsheet-id "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms" \
  --credentials "./google-credentials.json"

# Specify local translation directory
npx i18n-upload \
  --spreadsheet-id "your-sheet-id" \
  --locales-dir "./locales"

# Upload specific sheet
npx i18n-upload \
  --spreadsheet-id "your-sheet-id" \
  --sheet-name "App Translations"
```

### 4. 📥 i18n-download

**Download translations from Google Sheets**

```bash
# Download all languages
npx i18n-download --spreadsheet-id "your-sheet-id"

# Download specific languages
npx i18n-download \
  --spreadsheet-id "your-sheet-id" \
  --languages "en,ko,ja"

# Save to specific directory
npx i18n-download \
  --spreadsheet-id "your-sheet-id" \
  --locales-dir "./public/locales"
```

### 🔄 Complete Workflow Example

```bash
# 1. Wrap hardcoded strings in your React components
npx i18n-wrapper --pattern "src/**/*.{ts,tsx}"

# 2. Extract translation keys to JSON
npx i18n-extractor --output-format json --output-dir "./locales"

# 3. Upload to Google Sheets for translation
npx i18n-upload --spreadsheet-id "your-sheet-id" --locales-dir "./locales"

# 4. Download translated content
npx i18n-download --spreadsheet-id "your-sheet-id" --locales-dir "./public/locales"
```

---

## 📊 Google Sheets Setup

### 1. Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create Service Account credentials
5. Download JSON credentials file

### 2. Setup Google Sheet

1. Create a new Google Sheet
2. Share it with your service account email
3. Set up columns: `key`, `en`, `ko`, etc.

### 3. Configure i18nexus

```bash
# Set up credentials
export GOOGLE_APPLICATION_CREDENTIALS="./path/to/credentials.json"

# Or pass directly to CLI
npx i18n-upload --credentials "./credentials.json" --spreadsheet-id "your-id"
```

---

## 🎯 Demo

Try out i18nexus features in our interactive demo:

**🌐 [Live Demo](http://localhost:3003)**

- **Home**: Overview and feature showcase
- **Demo**: Interactive before/after comparison
- **CLI Test**: Try CLI tools on sample code

---

## 📖 API Reference

### I18nProvider Props

```tsx
interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions?: LanguageManagerOptions;
  onLanguageChange?: (language: string) => void;
  initialLanguage?: string; // For SSR/Next.js - prevents hydration mismatch
  translations?: Record<string, Record<string, string>>;
}

interface LanguageManagerOptions {
  defaultLanguage: string;
  availableLanguages: LanguageConfig[];
  enableAutoDetection?: boolean;
  cookieOptions?: CookieOptions;
  cookieName?: string;
  enableLocalStorage?: boolean;
  storageKey?: string;
}
```

### Server-side Utilities

For Next.js App Router and SSR:

```tsx
import { getServerLanguage } from 'i18nexus/server';

// Read language from headers in Server Components
const language = getServerLanguage(headers, {
  cookieName?: string;      // default: 'i18n-language'
  defaultLanguage?: string; // default: 'en'
});
```

### Hooks

#### useTranslation

```tsx
const { t } = useTranslation();
// Usage: t('key', { variable: 'value' })
```

#### useLanguageSwitcher

```tsx
const { currentLanguage, changeLanguage, availableLanguages } =
  useLanguageSwitcher();
```

### CLI Options

#### i18n-wrapper

- `--pattern <glob>`: File pattern to process (default: `**/*.{js,jsx,ts,tsx}`)
- `--dry-run`: Preview changes without writing files
- `--verbose`: Show detailed processing information

#### i18n-extractor

- `--pattern <glob>`: File pattern to scan
- `--output-format <json|csv>`: Output format (default: json)
- `--output-dir <path>`: Output directory (default: ./locales)

#### i18n-upload/download

- `--spreadsheet-id <id>`: Google Sheets ID (required)
- `--credentials <path>`: Google credentials JSON file
- `--sheet-name <name>`: Sheet name (default: Translations)
- `--locales-dir <path>`: Local translation directory

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/i18nexus.git
cd i18nexus

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

### Project Structure

```
i18nexus/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # React hooks
│   ├── utils/         # Utility functions
│   ├── scripts/       # CLI tools
│   └── bin/          # CLI executables
├── demo/             # Demo application
└── docs/            # Documentation
```

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Powered by [react-i18next](https://react.i18next.com/) and [i18next](https://www.i18next.com/)
- CLI tools built with [Commander.js](https://github.com/tj/commander.js/)
- Google Sheets integration via [googleapis](https://github.com/googleapis/google-api-nodejs-client)

---

<div align="center">

**Made with ❤️ by the i18nexus team**

[⭐ Star us on GitHub](https://github.com/your-username/i18nexus) • [🐛 Report Issues](https://github.com/your-username/i18nexus/issues) • [💬 Discussions](https://github.com/your-username/i18nexus/discussions)

</div>
