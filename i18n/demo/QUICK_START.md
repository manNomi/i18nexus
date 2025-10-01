# i18nexus 빠른 시작 가이드

## 📦 설치

```bash
# 코어 라이브러리 설치
npm install i18nexus

# CLI 도구 설치 (선택사항)
npm install -D i18nexus-tools
```

## 🚀 가장 간단한 사용법

### 1️⃣ 기존 프로젝트에 적용하기

#### Step 1: 한국어 텍스트 자동 래핑
```bash
# 프로젝트 루트에서 실행
npx i18n-wrapper --pattern "app/**/*.tsx"
```

이 명령어는:
- ✅ `app` 폴더의 모든 TSX 파일에서 한국어 텍스트를 찾음
- ✅ 자동으로 `t("한국어")` 형태로 래핑
- ✅ `useTranslation` import와 훅 자동 추가

#### Step 2: 번역 키 추출
```bash
# 번역 키를 추출하여 en.json, ko.json 생성/업데이트
npx i18n-extractor -p "app/**/*.tsx" -d "./lib/translations"
```

이 명령어는:
- ✅ 모든 `t()` 호출에서 키를 추출
- ✅ `lib/translations/en.json`, `ko.json` 파일 생성/업데이트
- ✅ 기존 번역은 유지하고 새로운 키만 추가

#### Step 3: 영어 번역 추가
`lib/translations/en.json` 파일을 열어서 새로 추가된 키들의 영어 번역을 입력하세요.

```json
{
  "환영합니다": "Welcome",
  "시작하기": "Get Started",
  // ... 나머지 키들
}
```

### 2️⃣ Provider 설정

#### app/layout.tsx (서버 컴포넌트)
```tsx
import { I18nProvider } from "i18nexus";
import { cookies } from "next/headers";
import enTranslations from "@/lib/translations/en.json";
import koTranslations from "@/lib/translations/ko.json";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 쿠키에서 언어 읽기
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
            ko: koTranslations,
            en: enTranslations,
          }}
        >
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

### 3️⃣ 컴포넌트에서 사용

#### app/page.tsx (클라이언트 컴포넌트)
```tsx
"use client";

import { useTranslation, useLanguageSwitcher } from "i18nexus";

export default function HomePage() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } =
    useLanguageSwitcher();

  return (
    <div>
      {/* 번역된 텍스트 */}
      <h1>{t("환영합니다")}</h1>
      <p>{t("i18nexus를 시작해보세요")}</p>

      {/* 언어 전환 버튼 */}
      <div>
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentLanguage === lang.code ? "active" : ""}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## 📁 권장 프로젝트 구조

```
your-project/
├── app/
│   ├── layout.tsx          # ✅ I18nProvider 설정 (서버)
│   ├── page.tsx            # ✅ useTranslation 사용 (클라이언트)
│   └── components/
│       └── Header.tsx      # ✅ 재사용 컴포넌트
│
└── lib/
    └── translations/       # ✅ 번역 파일들
        ├── en.json        # 영어 번역
        └── ko.json        # 한국어 번역
```

## 🔄 일반적인 워크플로우

```bash
# 1. 한국어로 코드 작성
# app/page.tsx에 <h1>환영합니다</h1> 작성

# 2. 자동 래핑
npx i18n-wrapper --pattern "app/**/*.tsx"
# → <h1>{t("환영합니다")}</h1>로 변환됨

# 3. 번역 키 추출
npx i18n-extractor -p "app/**/*.tsx" -d "./lib/translations"
# → en.json, ko.json 업데이트

# 4. 영어 번역 추가
# lib/translations/en.json에서 "환영합니다": "Welcome" 추가

# 5. 개발 서버 실행
npm run dev
```

## 💡 유용한 팁

### dry-run으로 미리보기
```bash
# wrapper가 어떻게 수정할지 미리보기
npx i18n-wrapper --pattern "app/**/*.tsx" --dry-run

# extractor가 어떤 키를 추출할지 미리보기
npx i18n-extractor -p "app/**/*.tsx" --dry-run
```

### 특정 파일만 처리
```bash
# 특정 파일만 래핑
npx i18n-wrapper --pattern "app/page.tsx"

# 특정 디렉토리만 추출
npx i18n-extractor -p "app/components/**/*.tsx"
```

### 추가 언어 지원
```bash
# 일본어 추가
npx i18n-extractor -l "en,ko,ja" -d "./lib/translations"
```

## 📚 더 자세한 내용

- 🌐 [Live Demo](http://localhost:3000) - 실제 동작하는 데모 확인
- 📖 [Provider 가이드](http://localhost:3000/provider) - Provider 상세 설명
- 🛠️ [CLI 도구 가이드](http://localhost:3000/cli) - CLI 도구 상세 설명

## ❓ 자주 묻는 질문

**Q: 기존 번역이 사라지지 않나요?**  
A: 아니요! extractor는 기존 번역을 모두 유지하고 새로운 키만 추가합니다.

**Q: 언어를 추가하려면?**  
A: `languageManagerOptions.availableLanguages`에 언어를 추가하고, extractor로 파일을 생성하세요.

**Q: wrapper가 잘못 래핑했어요**  
A: wrapper는 한국어만 감지합니다. 잘못 래핑된 부분은 수동으로 수정하세요.

**Q: SSR/SSG에서 작동하나요?**  
A: 네! i18nexus는 Next.js App Router의 SSR을 완벽하게 지원합니다.
