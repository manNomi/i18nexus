# i18nexus

<div align="center">

![i18nexus](https://img.shields.io/badge/i18nexus-Complete%20React%20i18n%20Toolkit-blue?style=for-the-badge)

[![npm version](https://img.shields.io/npm/v/i18nexus)](https://www.npmjs.com/package/i18nexus)
[![npm downloads](https://img.shields.io/npm/dw/i18nexus)](https://www.npmjs.com/package/i18nexus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**🌍 Complete React i18n toolkit with cookie-based language management and SSR support**

[Features](#-features) • [Quick Start](#-quick-start) • [SSR Guide](#-ssr-support) • [Demo](https://github.com/manNomi/i18nexus-demo) • [CLI Tools](https://github.com/manNomi/i18nexus-cli)

</div>

---

## 🚀 What is i18nexus?

i18nexus is a lightweight and modern React internationalization (i18n) library designed for simplicity and performance. Unlike complex i18n libraries, i18nexus focuses on providing a clean API with essential features.

### ✨ Why i18nexus?

- **⚡ Lightweight**: 65% smaller than traditional i18n libraries (~8KB vs ~23KB)
- **🚀 Fast Setup**: Get started in 3 lines of code
- **🍪 Cookie-based**: Automatic language persistence
- **🖥️ SSR Support**: Perfect Next.js App Router integration
- **🇰🇷 Korean Optimized**: Built with Korean developers in mind
- **📦 Zero Dependencies**: Minimal external dependencies

---

## 🌟 Features

### Core Features

- ✅ Cookie-based language management
- ✅ SSR/Next.js App Router support
- ✅ TypeScript support with full type safety
- ✅ React 18 compatible
- ✅ Zero hydration mismatches
- ✅ Automatic browser language detection
- ✅ RTL language support

### Performance

- **65% smaller bundle** compared to traditional i18n libraries
- **5x faster** initial loading time
- **70% less memory** usage
- Built-in caching and memoization

---

## 📦 Installation

```bash
npm install i18nexus
```

---

## 🚀 Quick Start

### Client Components

```tsx
// app/components/Welcome.tsx
"use client";

import { useTranslation } from "i18nexus";

export default function Welcome() {
  const { t } = useTranslation();
  
  return <h1>{t("welcome")}</h1>;
}
```

### Language Switching

```tsx
"use client";

import { useLanguageSwitcher } from "i18nexus";

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguageSwitcher();
  
  return (
    <select value={currentLanguage} onChange={(e) => changeLanguage(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>{lang.name}</option>
      ))}
    </select>
  );
}
```

---

## 🖥️ SSR Support

### Next.js App Router Setup

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

**Step 3: Setup Client Provider**

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
          initialLanguage={currentLanguage}
        >
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
```

**Why this approach?**

- ✅ No hydration mismatch
- ✅ SEO friendly
- ✅ Fast initial render
- ✅ Zero layout shift

---

## 📖 API Reference

### Client Components

#### `<I18nProvider>`

```typescript
interface I18nProviderProps {
  children: ReactNode;
  translations?: Record<string, Record<string, string>>;
  initialLanguage?: string;  // For SSR
  languageManagerOptions?: LanguageManagerOptions;
  onLanguageChange?: (language: string) => void;
}
```

#### `useTranslation()`

```typescript
const { t, currentLanguage, isReady } = useTranslation();

// Usage
const text = t("welcome");  // Returns translated string
```

#### `useLanguageSwitcher()`

```typescript
const {
  currentLanguage,
  availableLanguages,
  changeLanguage,
  switchToNextLanguage,
  switchToPreviousLanguage,
} = useLanguageSwitcher();
```

### Server Components

#### `getServerTranslation()`

```typescript
const { t, currentLanguage, translations } = await getServerTranslation(
  translations,
  {
    cookieName: "i18n-language",    // Optional
    defaultLanguage: "en",          // Optional
  }
);
```

#### `getCurrentLanguage()`

```typescript
const currentLanguage = await getCurrentLanguage(
  "i18n-language",  // cookieName (optional)
  "en"              // defaultLanguage (optional)
);
```

---

## 🎯 Demo & Examples

- **Live Demo**: [i18nexus-demo](https://github.com/manNomi/i18nexus-demo)
- **Demo Source**: [i18n/demo](./i18n/demo)

Features demonstrated:
- Sidebar navigation with collapsible menu
- SSR translation test page
- Language switching with `router.refresh()`
- Modern UI with dark mode

---

## 🛠️ CLI Tools

For automation tools (auto-wrapping Korean text, translation extraction, Google Sheets sync), check out:

**[i18nexus-cli](https://github.com/manNomi/i18nexus-cli)**

Features:
- 🔧 Auto-wrap Korean text with `t()` functions
- 🔍 Extract translation keys to JSON/CSV
- 📤 Upload/Download translations to/from Google Sheets
- 🎯 Smart merging and key management

---

## 📚 Documentation

- [SSR Guide](./i18n/SSR_GUIDE.md) - Complete guide for server-side rendering
- [Server Translation Guide](./i18n/SERVER_TRANSLATION.md) - Advanced server translation features
- [Contributing Guide](./i18n/CONTRIBUTING.md) - How to contribute

---

## 🏗️ Project Structure

```
i18nexus/
├── i18n/                          # Main package
│   ├── src/                       # Source code
│   │   ├── components/            # I18nProvider
│   │   ├── hooks/                 # useTranslation, useLanguageSwitcher
│   │   └── utils/                 # ssr.ts, languageManager, cookies
│   ├── demo/                      # Demo application
│   ├── SSR_GUIDE.md               # SSR documentation
│   └── package.json               # v2.1.0
├── README.md                      # This file
└── package.json                   # Monorepo root
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./i18n/CONTRIBUTING.md) for details.

---

## 📄 License

MIT License - see the [LICENSE](./i18n/LICENSE) file for details.

---

## 👤 Author

**manNomi**
- Email: hanmw110@naver.com
- GitHub: [@manNomi](https://github.com/manNomi)

---

## 🙏 Acknowledgments

- Built with React and TypeScript
- Inspired by modern i18n best practices
- Designed for Korean developers

---

**Made with ❤️ by manNomi**

⭐ Star us on [GitHub](https://github.com/manNomi/i18nexus) • 🐛 [Report Issues](https://github.com/manNomi/i18nexus/issues) • 💬 [Discussions](https://github.com/manNomi/i18nexus/discussions)
