# 🚀 i18nexus SSR Guide

## Next.js App Router에서 서버 컴포넌트 번역 사용하기

i18nexus는 Next.js App Router의 서버 컴포넌트에서 번역을 사용할 수 있는 간단하고 직관적인 API를 제공합니다.

## 📦 설치

```bash
npm install i18nexus
```

## 🎯 빠른 시작

### 1. 번역 파일 준비

```typescript
// lib/i18n.ts
import en from "./translations/en.json";
import ko from "./translations/ko.json";

export const translations = { en, ko };
```

### 2. 서버 컴포넌트에서 사용

```typescript
// app/page.tsx (Server Component)
import { getServerTranslation } from 'i18nexus';
import { translations } from '@/lib/i18n';

export default async function Page() {
  const { t, currentLanguage } = await getServerTranslation(translations);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <p>Current Language: {currentLanguage}</p>
    </div>
  );
}
```

## 🔧 고급 사용법

### 옵션 설정

```typescript
const { t, currentLanguage } = await getServerTranslation(translations, {
  cookieName: "my-language", // 기본값: "i18n-language"
  defaultLanguage: "ko", // 기본값: "en"
});
```

### 헬퍼 래퍼 생성 (추천)

프로젝트 전체에서 재사용할 수 있는 헬퍼 함수를 만드는 것을 추천합니다:

```typescript
// app/components/SSRProvider.tsx
import { getServerTranslation as getSSRTranslation } from "i18nexus";
import { translations } from "@/lib/i18n";

export async function getServerTranslation() {
  return getSSRTranslation(translations, {
    cookieName: "i18n-language",
    defaultLanguage: "en",
  });
}
```

이제 모든 서버 컴포넌트에서 간단하게 사용할 수 있습니다:

```typescript
// app/page.tsx
import { getServerTranslation } from '@/app/components/SSRProvider';

export default async function Page() {
  const { t } = await getServerTranslation();
  return <h1>{t('welcome')}</h1>;
}
```

### 현재 언어만 가져오기

```typescript
import { getCurrentLanguage } from 'i18nexus';

export default async function Page() {
  const lang = await getCurrentLanguage();
  return <div>Current: {lang}</div>;
}
```

## 📋 API 레퍼런스

### `getServerTranslation(translations, options?)`

서버 컴포넌트에서 번역을 사용하기 위한 메인 함수입니다.

**Parameters:**

- `translations: Record<string, Record<string, string>>` - 번역 데이터 객체
- `options?: { cookieName?: string; defaultLanguage?: string }` - 선택적 설정

**Returns:**

```typescript
{
  t: (key: string) => string; // 번역 함수
  currentLanguage: string; // 현재 언어 코드
  translations: Record<string, string>; // 현재 언어의 번역 데이터
}
```

### `getCurrentLanguage(cookieName?, defaultLanguage?)`

현재 언어 코드만 가져옵니다.

**Parameters:**

- `cookieName?: string` - 쿠키 이름 (기본값: "i18n-language")
- `defaultLanguage?: string` - 기본 언어 (기본값: "en")

**Returns:** `Promise<string>` - 현재 언어 코드

## 💡 모범 사례

### 1. 클라이언트 + 서버 컴포넌트 혼합

```typescript
// app/layout.tsx (Server Component)
import { getServerTranslation } from '@/app/components/SSRProvider';
import ClientProvider from './components/ClientProvider';

export default async function RootLayout({ children }) {
  const { currentLanguage } = await getServerTranslation();

  return (
    <html lang={currentLanguage}>
      <body>
        <ClientProvider initialLanguage={currentLanguage}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}

// app/components/ClientProvider.tsx (Client Component)
"use client";

import { I18nProvider } from 'i18nexus';
import { translations } from '@/lib/i18n';

export default function ClientProvider({ children, initialLanguage }) {
  return (
    <I18nProvider
      translations={translations}
      initialLanguage={initialLanguage}
    >
      {children}
    </I18nProvider>
  );
}
```

### 2. 언어 전환 + SSR 업데이트

```typescript
// app/components/LanguageSwitcher.tsx
"use client";

import { useLanguageSwitcher } from 'i18nexus';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const { changeLanguage, availableLanguages } = useLanguageSwitcher();
  const router = useRouter();

  const handleChange = async (langCode: string) => {
    await changeLanguage(langCode);
    router.refresh(); // 서버 컴포넌트 재렌더링
  };

  return (
    <select onChange={(e) => handleChange(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
```

## 🎯 장점

### ✅ 간단한 API

- 복잡한 설정 없이 바로 사용 가능
- 직관적인 함수 이름과 매개변수

### ✅ 완벽한 Next.js 통합

- App Router 서버 컴포넌트 완벽 지원
- 쿠키 기반 언어 감지
- Zero hydration mismatch

### ✅ 타입 안전성

- 완벽한 TypeScript 지원
- 자동 타입 추론

### ✅ 성능 최적화

- 서버에서 미리 번역되어 초기 로딩 빠름
- SEO 최적화 (크롤러가 번역된 콘텐츠 바로 확인)
- 클라이언트 메모리 사용량 감소

## 🔗 관련 문서

- [메인 README](./README.md)
- [클라이언트 컴포넌트 가이드](./CLIENT_GUIDE.md)
- [CLI 도구 가이드](./CLI_GUIDE.md)

## 📝 라이선스

MIT
