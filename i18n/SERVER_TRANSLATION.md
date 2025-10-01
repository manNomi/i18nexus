# 서버 컴포넌트 번역 가이드

i18nexus는 Next.js App Router의 서버 컴포넌트에서도 번역 함수를 사용할 수 있습니다.

## 🎯 핵심 개념

**I18nProvider에 번역을 등록하면, 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 동일한 번역 데이터를 사용할 수 있습니다.**

### 기존 방식 vs 새로운 방식

#### ❌ 기존 방식 (번역 데이터 직접 전달)

```typescript
import { createSSRTranslator } from 'i18nexus';
import translations from './translations';

export default async function Page() {
  const t = createSSRTranslator({
    language: 'en',
    translations: translations, // 매번 전달해야 함
    fallbackLanguage: 'en'
  });

  return <h1>{t('welcome')}</h1>;
}
```

#### ✅ 새로운 방식 (자동 등록)

```typescript
import { createServerT } from 'i18nexus';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18n-language')?.value || 'en';

  const t = createServerT(lang); // I18nProvider가 자동으로 등록!

  return <h1>{t('welcome')}</h1>;
}
```

## 📦 설치 및 설정

### 1. I18nProvider 설정 (layout.tsx)

```typescript
// app/layout.tsx
import { I18nProvider } from 'i18nexus';
import { getServerLanguage } from 'i18nexus';
import translations from '@/lib/translations';

export default function RootLayout({ children }) {
  const currentLanguage = getServerLanguage();

  return (
    <html lang={currentLanguage}>
      <body>
        <I18nProvider
          translations={translations} // 여기서 등록!
          languageManagerOptions={{
            supportedLanguages: [
              { code: 'en', name: 'English' },
              { code: 'ko', name: '한국어' }
            ],
            defaultLanguage: 'en'
          }}
          initialLanguage={currentLanguage}
        >
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

### 2. 서버 컴포넌트에서 사용

```typescript
// app/page.tsx (서버 컴포넌트)
import { createServerT } from 'i18nexus';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = await cookies();
  const language = cookieStore.get('i18n-language')?.value || 'en';

  // 간단하게 번역 함수 생성
  const t = createServerT(language);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 3. 클라이언트 컴포넌트에서 사용

```typescript
// app/components/Button.tsx (클라이언트 컴포넌트)
'use client';

import { useTranslation } from 'i18nexus';

export default function Button() {
  const { t } = useTranslation();

  return <button>{t('click_me')}</button>;
}
```

## 🚀 API 레퍼런스

### `createServerT(language: string)`

가장 간단한 서버용 번역 함수를 생성합니다.

```typescript
import { createServerT } from "i18nexus";

const t = createServerT("ko");
console.log(t("welcome")); // "환영합니다"
```

### `getServerTranslation(language: string)`

번역 함수와 언어 정보를 함께 반환합니다.

```typescript
import { getServerTranslation } from "i18nexus";

const { t, language, availableLanguages } = getServerTranslation("ko");

console.log(t("welcome")); // "환영합니다"
console.log(language); // "ko"
console.log(availableLanguages); // ["en", "ko"]
```

### `createCachedServerT(language: string)`

캐싱이 포함된 성능 최적화 버전입니다.

```typescript
import { createCachedServerT } from "i18nexus";

const t = createCachedServerT("ko");

// 첫 번째 호출: 캐시 미스
console.log(t("welcome")); // 번역 데이터에서 찾음

// 두 번째 호출: 캐시 히트 (빠름!)
console.log(t("welcome")); // 캐시에서 가져옴
```

### `createServerBatchT(language: string)`

여러 키를 한 번에 번역합니다.

```typescript
import { createServerBatchT } from "i18nexus";

const batchT = createServerBatchT("ko");
const translations = batchT(["welcome", "hello", "goodbye"]);

console.log(translations);
// ["환영합니다", "안녕하세요", "안녕히 가세요"]
```

## 🔧 유틸리티 함수

### `clearServerCache()`

서버 번역 캐시를 초기화합니다.

```typescript
import { clearServerCache } from "i18nexus";

clearServerCache();
```

### `getServerCacheStats()`

서버 캐시 통계를 확인합니다.

```typescript
import { getServerCacheStats } from "i18nexus";

const stats = getServerCacheStats();
console.log(stats);
// { size: 150, maxSize: 500 }
```

### `registerTranslations(translations, fallbackLanguage)`

수동으로 번역 데이터를 등록합니다 (보통 I18nProvider가 자동으로 호출).

```typescript
import { registerTranslations } from "i18nexus";

registerTranslations(
  {
    en: { welcome: "Welcome" },
    ko: { welcome: "환영합니다" },
  },
  "en"
);
```

### `getRegisteredTranslations()`

등록된 번역 데이터를 가져옵니다.

```typescript
import { getRegisteredTranslations } from "i18nexus";

const { translations, fallbackLanguage } = getRegisteredTranslations();
console.log(translations);
// { en: {...}, ko: {...} }
```

## 📝 완전한 예시

### Next.js App Router 전체 구조

```
app/
├── layout.tsx          # I18nProvider 설정
├── page.tsx            # 서버 컴포넌트
└── components/
    └── Button.tsx      # 클라이언트 컴포넌트
```

#### `app/layout.tsx`

```typescript
import { I18nProvider, getServerLanguage } from 'i18nexus';
import translations from '@/lib/translations';

export default function RootLayout({ children }) {
  const currentLanguage = getServerLanguage();

  return (
    <html lang={currentLanguage}>
      <body>
        <I18nProvider
          translations={translations}
          initialLanguage={currentLanguage}
          languageManagerOptions={{
            supportedLanguages: [
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'ko', name: '한국어', flag: '🇰🇷' }
            ],
            defaultLanguage: 'en'
          }}
        >
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

#### `app/page.tsx`

```typescript
import { createServerT } from 'i18nexus';
import { cookies } from 'next/headers';
import Button from './components/Button';

export default async function HomePage() {
  const cookieStore = await cookies();
  const language = cookieStore.get('i18n-language')?.value || 'en';

  const t = createServerT(language);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <Button />
    </div>
  );
}
```

#### `app/components/Button.tsx`

```typescript
'use client';

import { useTranslation } from 'i18nexus';

export default function Button() {
  const { t } = useTranslation();

  return (
    <button onClick={() => alert(t('clicked'))}>
      {t('click_me')}
    </button>
  );
}
```

## 🎯 장점

### 1. 간단한 사용법

- 번역 데이터를 매번 전달할 필요 없음
- `createServerT(lang)` 한 줄로 끝!

### 2. 서버 + 클라이언트 통합

- 서버: `createServerT` / `getServerTranslation`
- 클라이언트: `useTranslation`
- 동일한 번역 데이터 사용

### 3. 성능 최적화

- 전역 등록으로 메모리 효율성 향상
- 캐싱 시스템으로 빠른 번역
- LRU 캐시로 자동 메모리 관리

### 4. TypeScript 지원

- 완벽한 타입 안정성
- 자동 완성 지원

## 🔍 디버깅

### 번역이 안 나오는 경우

1. **I18nProvider 등록 확인**

   ```typescript
   // I18nProvider에 translations가 제대로 전달되었는지 확인
   <I18nProvider translations={translations}>
   ```

2. **등록된 번역 확인**

   ```typescript
   import { getRegisteredTranslations } from "i18nexus";

   console.log(getRegisteredTranslations());
   ```

3. **언어 코드 확인**
   ```typescript
   const t = createServerT("ko"); // 'ko'가 translations에 있는지 확인
   ```

## 📚 추가 자료

- [기본 사용법](./README.md)
- [성능 최적화](./PERFORMANCE.md)
- [마이그레이션 가이드](./MIGRATION.md)

## 💡 팁

### 성능을 위해 캐싱 버전 사용

```typescript
// 일반 버전
const t = createServerT(language);

// 캐싱 버전 (더 빠름!)
const t = createCachedServerT(language);
```

### 배치 번역으로 최적화

```typescript
// 여러 번 호출하는 대신
const title = t("title");
const description = t("description");
const button = t("button");

// 한 번에 번역
const batchT = createServerBatchT(language);
const [title, description, button] = batchT(["title", "description", "button"]);
```

### 쿠키에서 언어 가져오기 헬퍼

```typescript
// lib/getLanguage.ts
import { cookies } from "next/headers";

export async function getLanguage() {
  const cookieStore = await cookies();
  return cookieStore.get("i18n-language")?.value || "en";
}

// 사용
import { getLanguage } from "@/lib/getLanguage";
const language = await getLanguage();
const t = createServerT(language);
```
