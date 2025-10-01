# i18nexus

<div align="center">

![i18nexus Logo](https://via.placeholder.com/150x150.png?text=i18nexus)

[![npm version](https://img.shields.io/npm/v/i18nexus.svg)](https://www.npmjs.com/package/i18nexus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)

**🌍 Complete React i18n toolkit with intelligent automation**

[Features](#-features) • [Quick Start](#-quick-start) • [CLI Tools](#️-cli-tools) • [Demo](#-demo) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📦 Packages

This is a monorepo containing the following packages:

| Package                                                        | Description                              | Version                                                                                                 | Downloads                                                                                                  |
| -------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [i18nexus](https://www.npmjs.com/package/i18nexus)             | Core React i18n library with SSR support | [![npm](https://img.shields.io/npm/v/i18nexus.svg)](https://www.npmjs.com/package/i18nexus)             | [![Downloads](https://img.shields.io/npm/dw/i18nexus)](https://www.npmjs.com/package/i18nexus)             |
| [i18nexus-tools](https://www.npmjs.com/package/i18nexus-tools) | CLI tools for automation                 | [![npm](https://img.shields.io/npm/v/i18nexus-tools.svg)](https://www.npmjs.com/package/i18nexus-tools) | [![Downloads](https://img.shields.io/npm/dw/i18nexus-tools)](https://www.npmjs.com/package/i18nexus-tools) |
| [Live Demo](https://i18nexus-demo.vercel.app/)                 | Interactive demo application             | -                                                                                                       | [![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://i18nexus-demo.vercel.app/)           |

---

## 🚀 What is i18nexus?

i18nexus is a comprehensive React internationalization toolkit that **automates the entire i18n workflow**. From automatically wrapping hardcoded strings to managing translations via Google Sheets, i18nexus handles everything.

### 🎯 Why i18nexus?

Traditional i18n libraries require manual work:

- ❌ Manually wrap every text with `t()` functions
- ❌ Extract translation keys by hand
- ❌ Manage translation files across multiple languages
- ❌ Coordinate with translators via spreadsheets

**i18nexus automates all of this:**

- ✅ Automatically detects and wraps Korean text
- ✅ Extracts translation keys automatically
- ✅ Syncs with Google Sheets seamlessly
- ✅ Cookie-based language persistence
- ✅ Full SSR support for Next.js

---

## ✨ Features

### 🔧 **Automated Code Transformation**

- **Smart text detection**: Automatically finds Korean strings in your JSX
- **Intelligent wrapping**: Adds `t()` calls without breaking your code
- **Auto-import management**: Adds necessary imports automatically

### 📝 **Translation Management**

- **Key extraction**: Generates translation files from your code
- **Google Sheets sync**: Two-way sync with translators
- **Multiple formats**: JSON, CSV export options

### 🌐 **React Integration**

- **Cookie persistence**: Language choice survives page refreshes
- **SSR ready**: Works perfectly with Next.js App Router
- **Zero hydration issues**: Correct language on first render
- **TypeScript support**: Full type safety

---

## 📥 Quick Start

### 1. Install Packages

```bash
# Install core library
npm install i18nexus

# Install CLI tools (optional but recommended)
npm install -D i18nexus-tools
```

### 2. Setup React App

```tsx
// app/layout.tsx (Next.js App Router)
import { I18nProvider } from "i18nexus";
import { cookies } from "next/headers";

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const language = cookieStore.get("i18n-language")?.value || "ko";

  return (
    <html lang={language}>
      <body>
        <I18nProvider
          initialLanguage={language}
          languageManagerOptions={{
            defaultLanguage: "ko",
            availableLanguages: [
              { code: "ko", name: "한국어", flag: "🇰🇷" },
              { code: "en", name: "English", flag: "🇺🇸" },
            ],
          }}
          translations={{
            ko: { welcome: "환영합니다" },
            en: { welcome: "Welcome" },
          }}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

### 3. Use in Components

```tsx
"use client";

import { useTranslation, useLanguageSwitcher } from "i18nexus";

export default function Welcome() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguageSwitcher();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ko")}>한국어</button>
    </div>
  );
}
```

---

## 🛠️ CLI Tools

i18nexus provides powerful CLI tools that automate your entire i18n workflow:

### 1. 🔧 i18n-wrapper

**Automatically wrap Korean text with t() functions**

```bash
# Basic usage - scan all TypeScript/JavaScript files
npx i18n-wrapper

# Target specific files or directories
npx i18n-wrapper --pattern "src/components/**/*.{ts,tsx}"

# Dry run to see what would be changed
npx i18n-wrapper --dry-run
```

**What it does:**

- ✅ Detects hardcoded Korean strings in JSX
- ✅ Wraps them with `t('key')` functions
- ✅ Automatically adds `useTranslation` imports and hooks
- ✅ Preserves existing code structure and formatting

**Example transformation:**

```tsx
// Before
function Welcome() {
  return <h1>환영합니다</h1>;
}

// After
import { useTranslation } from "i18nexus";

function Welcome() {
  const { t } = useTranslation();
  return <h1>{t("환영합니다")}</h1>;
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
```

### 3. 📤 i18n-upload & 📥 i18n-download

**Sync translations with Google Sheets**

```bash
# Upload translations to Google Sheets
npx i18n-upload --spreadsheet-id "your-sheet-id" --credentials "./credentials.json"

# Download translations from Google Sheets
npx i18n-download --spreadsheet-id "your-sheet-id" --locales-dir "./public/locales"
```

### 🔄 Complete Workflow Example

```bash
# 1. Wrap hardcoded Korean strings
npx i18n-wrapper --pattern "src/**/*.{ts,tsx}"

# 2. Extract translation keys to JSON
npx i18n-extractor --output-format json --output-dir "./locales"

# 3. Upload to Google Sheets for translation
npx i18n-upload --spreadsheet-id "your-sheet-id"

# 4. Download translated content
npx i18n-download --spreadsheet-id "your-sheet-id"
```

---

## 🎯 Demo

Experience i18nexus in action with our live demo:

### 🌐 Live Demo

**[🚀 Try i18nexus Demo →](https://i18nexus-demo.vercel.app/)**

Features showcased:

- **Live language switching** with cookie persistence
- **Before/After examples** of automated transformations
- **Interactive CLI demonstrations**
- **Real-time t-wrapper demo GIF**

### 📦 NPM Packages

| Package                                                        | Downloads                                                         | Version                                                 | Size                                                               |
| -------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| [i18nexus](https://www.npmjs.com/package/i18nexus)             | ![Weekly Downloads](https://img.shields.io/npm/dw/i18nexus)       | ![Version](https://img.shields.io/npm/v/i18nexus)       | ![Size](https://img.shields.io/bundlephobia/minzip/i18nexus)       |
| [i18nexus-tools](https://www.npmjs.com/package/i18nexus-tools) | ![Weekly Downloads](https://img.shields.io/npm/dw/i18nexus-tools) | ![Version](https://img.shields.io/npm/v/i18nexus-tools) | ![Size](https://img.shields.io/bundlephobia/minzip/i18nexus-tools) |

**Current Stats:**

- **Weekly Downloads**: 1,373+
- **Version**: 2.0.6
- **License**: MIT
- **Unpacked Size**: 55.2 kB
- **Total Files**: 27
- **Issues**: 0
- **Pull Requests**: 0

---

## 📖 API Reference

### Core Library

#### `<I18nProvider>`

```tsx
interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions?: LanguageManagerOptions;
  initialLanguage?: string; // For SSR - prevents hydration mismatch
  translations?: Record<string, Record<string, string>>;
  onLanguageChange?: (language: string) => void;
}
```

#### `useTranslation()`

```tsx
const { t } = useTranslation();
// Usage: t('key')
```

#### `useLanguageSwitcher()`

```tsx
const { currentLanguage, changeLanguage, availableLanguages } =
  useLanguageSwitcher();
```

### CLI Tools

Full CLI documentation available in [packages/i18nexus-cli/README.md](./packages/i18nexus-cli/README.md)

---

## 🏗️ Project Structure

```
i18nexus/
├── packages/
│   ├── i18nexus/          # Core React library
│   │   ├── src/
│   │   │   ├── components/  # I18nProvider component
│   │   │   ├── hooks/       # useTranslation, useLanguageSwitcher
│   │   │   └── utils/       # Language management, cookies
│   │   └── package.json
│   │
│   ├── i18nexus-cli/      # CLI automation tools
│   │   ├── bin/            # CLI executables
│   │   ├── scripts/        # Core logic (t-wrapper, extractor, etc.)
│   │   └── package.json
│   │
│   └── i18nexus-demo/     # Demo application
│       ├── app/            # Next.js App Router pages
│       └── package.json
│
├── package.json           # Monorepo root
└── README.md             # This file
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/manNomi/i18nexus.git
cd i18nexus

# Install dependencies for all packages
npm install

# Build all packages
npm run build

# Run demo
npm run dev:demo
```

---

## 📄 License

MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with React and TypeScript
- CLI tools built with Commander.js and Babel
- Google Sheets integration via googleapis

---

<div align="center">

**Made with ❤️ by the i18nexus team**

⭐ [Star us on GitHub](https://github.com/manNomi/i18nexus) •
🐛 [Report Issues](https://github.com/manNomi/i18nexus/issues) •
💬 [Discussions](https://github.com/manNomi/i18nexus/discussions)

</div>
