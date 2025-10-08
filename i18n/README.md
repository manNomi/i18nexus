# i18nexus

<div align="center">

![i18nexus](https://img.shields.io/badge/i18nexus-Fastest%20React%20i18n-blue?style=for-the-badge)

[![npm version](https://badge.fury.io/js/i18nexus.svg)](https://www.npmjs.com/package/i18nexus)
[![npm downloads](https://img.shields.io/npm/dm/i18nexus.svg)](https://www.npmjs.com/package/i18nexus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**⚡ The fastest way to add internationalization to your React app**

Zero dependencies • Automatic workflow • Production-ready in 60 seconds

[Quick Start](#-60-second-setup) • [Why i18nexus?](#-why-i18nexus) • [🎮 Live Demo](https://i18nexus-demo.vercel.app) • [Full Guide](#-complete-guide)

</div>

---

## 🚀 60-Second Setup

Add complete internationalization to your React app in **under 60 seconds**:

```bash
# 1. Install (5 seconds)
npm install i18nexus
npm install -g i18nexus-tools

# 2. Initialize (10 seconds)
npx i18n-init

# 3. Done! (45 seconds to integrate)
```

**That's it!** Your app now supports multiple languages with:

- ✅ Automatic translation file structure
- ✅ Type-safe translation hooks
- ✅ Cookie-based language persistence
- ✅ SSR/Next.js ready
- ✅ Zero configuration needed

---

## 🎯 Why i18nexus?

### ⚡ Fastest Implementation

| Solution      | Setup Time | Manual Work | Auto Tools |
| ------------- | ---------- | ----------- | ---------- |
| **i18nexus**  | **60 sec** | **None**    | **✅ Yes** |
| react-i18next | ~20 min    | High        | ❌ No      |
| formatjs      | ~30 min    | High        | ❌ No      |
| Custom        | 2-3 hours  | Very High   | ❌ No      |

### 🎁 What Makes It Fast?

#### 1. **One-Command Initialization**

```bash
npx i18n-init
```

Creates perfect folder structure, config files, and sample code instantly.

#### 2. **Automatic Code Transformation**

```bash
npx i18n-wrapper
```

Finds all hardcoded strings and wraps them with `t()` automatically. No manual editing!

#### 3. **Zero Configuration**

Works out of the box. No webpack config, no babel plugins, no complex setup.

#### 4. **Zero Dependencies**

Only requires React. No bloated dependency tree.

#### 5. **Complete Automation**

```bash
npx i18n-init          # Initialize structure
npx i18n-wrapper       # Wrap hardcoded strings
npx i18n-extractor     # Extract to translation files
npx i18n-upload        # Sync with Google Sheets
npx i18n-download      # Get translations back
```

---

## 📦 Installation

```bash
# Core library (required)
npm install i18nexus

# CLI automation tools (highly recommended)
npm install -g i18nexus-tools
```

---

## 🎬 Quick Start Guide

### Step 1: Initialize Your Project

```bash
npx i18n-init
```

This creates:

```
src/
├── i18n/
│   ├── translations/
│   │   ├── en.json       # English translations
│   │   └── ko.json       # Korean translations
│   └── i18n.ts           # i18n configuration
├── App.example.tsx       # Example implementation
└── i18nexus.config.js    # Tool configuration
```

### Step 2: Wrap Your App

```tsx
// src/App.tsx
import { I18nProvider } from "i18nexus";
import { translations, languageConfig } from "./i18n/i18n";

function App() {
  return (
    <I18nProvider
      translations={translations}
      languageManagerOptions={languageConfig}>
      <YourApp />
    </I18nProvider>
  );
}
```

### Step 3: Use Translations

```tsx
import { useTranslation } from "i18nexus";

function Welcome() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("hello")}</p>
    </div>
  );
}
```

### Step 4: Add Language Switcher

```tsx
import { useLanguageSwitcher } from "i18nexus";

function LanguageSwitcher() {
  const { currentLanguage, availableLanguages, changeLanguage } =
    useLanguageSwitcher();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}>
      {availableLanguages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
```

**🎉 Done!** Your app is now multilingual!

---

## 🔥 Automatic Workflow (The Real Power!)

Already have an app with hardcoded strings? **No problem!**

### 1. Auto-Wrap Hardcoded Strings

```bash
npx i18n-wrapper
```

**Before:**

```tsx
function Greeting() {
  return <h1>Welcome to our app!</h1>;
}
```

**After (automatic):**

```tsx
import { useTranslation } from "i18nexus";

function Greeting() {
  const { t } = useTranslation();
  return <h1>{t("welcomeToOurApp")}</h1>;
}
```

### 2. Auto-Extract Translation Keys

```bash
npx i18n-extractor
```

Scans your entire codebase and generates translation files:

```json
// src/i18n/translations/en.json
{
  "welcomeToOurApp": "Welcome to our app!",
  "loginButton": "Login",
  "signupPrompt": "Don't have an account?"
}
```

### 3. Sync with Google Sheets (Optional)

```bash
npx i18n-upload      # Upload for translators
# Translators work in Google Sheets
npx i18n-download    # Get translations back
```

**Result:** Complete i18n in minutes instead of days!

---

## 🌟 Key Features

### 🍪 Smart Language Persistence

```tsx
// Language persists across browser sessions automatically
<I18nProvider
  translations={translations}
  languageManagerOptions={{
    defaultLanguage: "en",
    cookieName: "app-language",  // Custom cookie name
    cookieOptions: {
      expires: 365,  // 1 year
      path: "/",
    },
  }}>
```

### 🚀 Next.js / SSR Support

```tsx
// app/layout.tsx (Server Component)
import { getServerTranslation } from "i18nexus/ssr";
import { translations } from "@/i18n/i18n";

export default async function Layout() {
  const { t, currentLanguage } = await getServerTranslation(translations);

  return (
    <html lang={currentLanguage}>
      <body>
        <h1>{t("welcome")}</h1>
      </body>
    </html>
  );
}
```

### ⚡ Performance Optimized

```tsx
// Automatic memoization and optimization
const { t } = useTranslation(); // Fast lookups
const { t: batchT } = useBatchTranslation(["key1", "key2"]); // Batch operations
const { t: lazyT } = useLazyTranslation(); // Lazy loading
```

### 🎯 TypeScript Support

Full type safety out of the box:

```tsx
const { t } = useTranslation();
t("welcome"); // ✅ Type-safe
t("nonexistent"); // ⚠️ Returns key (no crash)
```

---

## 📊 Real-World Comparison

### Traditional Approach (react-i18next)

```bash
Time: ~2 hours
```

1. ✍️ Install multiple packages (5 min)
2. ✍️ Configure i18next (10 min)
3. ✍️ Set up file structure (5 min)
4. ✍️ Find all hardcoded strings **manually** (60+ min)
5. ✍️ Wrap each with t() **manually** (30+ min)
6. ✍️ Create translation files **manually** (10 min)

### i18nexus Approach

```bash
Time: ~5 minutes
```

1. ⚡ `npm install i18nexus i18nexus-tools -g` (30 sec)
2. ⚡ `npx i18n-init` (10 sec)
3. ⚡ `npx i18n-wrapper` (2 min)
4. ⚡ `npx i18n-extractor` (1 min)
5. ⚡ Add `<I18nProvider>` (1 min)

**Result: 24x faster! ⚡**

---

## 🔌 API Reference

### Core Hooks

#### `useTranslation()`

```tsx
const { t, currentLanguage, isReady } = useTranslation();

t("key"); // Get translation
currentLanguage; // Current language code
isReady; // Is i18n ready?
```

#### `useLanguageSwitcher()`

```tsx
const {
  currentLanguage,
  availableLanguages,
  changeLanguage,
  switchToNextLanguage,
  switchToPreviousLanguage,
} = useLanguageSwitcher();
```

#### `useTranslationOptimized()`

```tsx
// For performance-critical components
const { t } = useTranslationOptimized();
```

### Server-Side (SSR/Next.js)

#### `getServerTranslation()`

```tsx
// Server Component
const { t, currentLanguage, translations } =
  await getServerTranslation(translations);
```

#### `getCurrentLanguage()`

```tsx
// Get current language in Server Component
const lang = await getCurrentLanguage();
```

### Components

#### `<I18nProvider>`

```tsx
<I18nProvider
  translations={translations}
  languageManagerOptions={{
    defaultLanguage: "en",
    availableLanguages: [
      { code: "en", name: "English" },
      { code: "ko", name: "한국어" },
    ],
  }}
  initialLanguage={serverLanguage} // For SSR
  onLanguageChange={(lang) => console.log(lang)}>
  {children}
</I18nProvider>
```

---

## 🛠️ CLI Tools

> **Note**: CLI tools are available in the separate `i18nexus-tools` package.
>
> ```bash
> npm install -g i18nexus-tools
> ```

### Quick Reference

```bash
npx i18n-init          # Initialize project structure
npx i18n-wrapper       # Auto-wrap hardcoded strings
npx i18n-extractor     # Extract translation keys
npx i18n-upload        # Upload to Google Sheets
npx i18n-download      # Download from Google Sheets
```

**📖 Full CLI documentation:** [i18nexus-tools](https://www.npmjs.com/package/i18nexus-tools)

---

## 💡 Pro Tips

### 1. **Start with Auto-Wrap**

Already have an app? Let the tools do the work:

```bash
npx i18n-wrapper --pattern "src/**/*.{tsx,jsx}"
```

### 2. **Use Google Sheets for Collaboration**

Share translations with non-technical team members:

```bash
npx i18n-upload
# Share Google Sheet link
npx i18n-download  # Get updates
```

### 3. **Optimize Bundle Size**

Only load translations you need:

```tsx
import { useLazyTranslation } from "i18nexus";

const { t } = useLazyTranslation(); // Loads on-demand
```

### 4. **Next.js App Router Pattern**

```tsx
// layout.tsx (Server Component)
import { getServerTranslation } from "i18nexus/ssr";

// page.tsx (Client Component)
import { useTranslation } from "i18nexus";
```

---

## 🎯 Live Demo

**📱 Try it now:** [https://i18nexus-demo.vercel.app](https://i18nexus-demo.vercel.app)

See live examples of:

- ✅ Automatic code transformation in action
- ✅ Real-time language switching
- ✅ SSR/Next.js integration
- ✅ All CLI tools demonstrations

**💻 Code examples:** [GitHub Examples](https://github.com/manNomi/i18nexus/tree/main/examples)

---

## 📈 Performance

- **Bundle Size**: ~15KB (minified + gzipped)
- **Dependencies**: 0 (only peer: React)
- **Lookup Speed**: O(1) - Direct object access
- **Memory**: Minimal - Smart caching

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT © [manNomi](https://github.com/manNomi)

---

## 🔗 Links

- **NPM Package**: [i18nexus](https://www.npmjs.com/package/i18nexus)
- **CLI Tools**: [i18nexus-tools](https://www.npmjs.com/package/i18nexus-tools)
- **GitHub**: [i18nexus](https://github.com/manNomi/i18nexus)
- **Issues**: [Report a bug](https://github.com/manNomi/i18nexus/issues)

---

<div align="center">

**⭐ If i18nexus saved you time, please star it on [GitHub](https://github.com/manNomi/i18nexus)!**

**🎮 Try the live demo:** [https://i18nexus-demo.vercel.app](https://i18nexus-demo.vercel.app)

Made with ❤️ by developers, for developers

</div>
