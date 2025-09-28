# i18nexus

🌍 **완전한 React 국제화 자동화 도구** - 쿠키 기반 언어 관리, Google Sheets 연동, 자동 코드 변환 기능을 제공합니다.

## ✨ 주요 기능

### 1. 🍪 쿠키 기반 언어 관리 툴

- 자동 언어 감지 및 쿠키 저장
- 브라우저 새로고침 시에도 언어 설정 유지
- SSR 환경에서도 완벽 동작
- LocalStorage 백업 지원

### 2. 🔧 t-wrapper 기능

- 하드코딩된 문자열을 자동으로 `t()` 함수로 래핑
- React 컴포넌트에 `useTranslation` 훅 자동 추가
- 번역 키 자동 생성 및 JSON 파일 출력
- Dry-run 모드로 미리보기 가능

### 3. 📊 Google Sheets 업로드 기능

- 로컬 번역 파일을 Google Sheets로 업로드
- Google Sheets에서 번역 파일 다운로드
- 양방향 동기화 지원
- 번역가와의 협업을 위한 웹 인터페이스

## 🚀 설치

```bash
npm install i18nexus react-i18next i18next
```

## 📖 사용 가이드

### 1. 🍪 쿠키 기반 언어 관리 설정

#### i18next 설정

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: {
        hello: "Hello",
        welcome: "Welcome to our app",
      },
    },
    ko: {
      common: {
        hello: "안녕하세요",
        welcome: "우리 앱에 오신 것을 환영합니다",
      },
    },
  },
  lng: "ko", // 기본 언어
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

#### I18nProvider로 앱 래핑

```typescript
import React from "react";
import { I18nProvider } from "i18nexus";
import "./i18n"; // i18next 설정 import

function App() {
  return (
    <I18nProvider
      languageManagerOptions={{
        defaultLanguage: "ko",
        availableLanguages: [
          { code: "ko", name: "한국어", flag: "🇰🇷" },
          { code: "en", name: "English", flag: "🇺🇸" }
        ],
        enableAutoDetection: true,
        cookieOptions: {
          expires: 365,
          path: "/",
          sameSite: "lax"
        }
      }}
      onLanguageChange={(lang) => console.log("Language changed to:", lang)}
    >
      <YourAppComponent />
    </I18nProvider>
  );
}
```

#### 컴포넌트에서 사용하기

```typescript
import React from "react";
import { useTranslation, useLanguageSwitcher } from "i18nexus";

function MyComponent() {
  const { t, currentLanguage, isLoading } = useTranslation();
  const {
    availableLanguages,
    changeLanguage,
    switchToNextLanguage,
    getLanguageConfig
  } = useLanguageSwitcher();

  const currentLangConfig = getLanguageConfig();

  return (
    <div>
      <h1>{t("hello")}</h1>
      <p>{t("welcome")}</p>

      <div>
        현재 언어: {currentLangConfig?.flag} {currentLangConfig?.name}
        {isLoading && " (변경 중...)"}
      </div>

      <div>
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            disabled={currentLanguage === lang.code}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      <button onClick={switchToNextLanguage}>
        다음 언어로 전환
      </button>
    </div>
  );
}
```

### 2. 🔧 t-wrapper로 자동 코드 변환

#### CLI 사용법

```bash
# 기본 사용 (한국어 문자열 처리)
npx i18n-wrapper

# 영어 문자열도 함께 처리
npx i18n-wrapper --english

# 번역 키 자동 생성 및 파일 출력
npx i18n-wrapper --generate-keys --namespace "components"

# 특정 패턴의 파일만 처리
npx i18n-wrapper --pattern "src/components/**/*.tsx"

# 미리보기 (파일 수정 없이)
npx i18n-wrapper --dry-run --generate-keys

# 모든 옵션 사용
npx i18n-wrapper \
  --pattern "src/**/*.{tsx,ts}" \
  --generate-keys \
  --namespace "common" \
  --key-prefix "ui" \
  --output-dir "./locales" \
  --english
```

#### 변환 전후 예시

**변환 전:**

```typescript
function Welcome() {
  return (
    <div>
      <h1>안녕하세요</h1>
      <p>우리 서비스에 오신 것을 환영합니다</p>
      <button>시작하기</button>
    </div>
  );
}
```

**변환 후:**

```typescript
import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("안녕하세요")}</h1>
      <p>{t("우리 서비스에 오신 것을 환영합니다")}</p>
      <button>{t("시작하기")}</button>
    </div>
  );
}
```

### 3. 📊 Google Sheets 연동

#### 초기 설정

```bash
# Google Sheets 연동 초기화
npx i18n-sheets init --spreadsheet "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"

# 상태 확인
npx i18n-sheets status --spreadsheet "YOUR_SPREADSHEET_ID"
```

#### 업로드/다운로드

```bash
# 로컬 번역 파일을 Google Sheets로 업로드
npx i18n-sheets upload \
  --spreadsheet "YOUR_SPREADSHEET_ID" \
  --credentials "./service-account-key.json" \
  --locales "./locales"

# Google Sheets에서 번역 파일 다운로드
npx i18n-sheets download \
  --spreadsheet "YOUR_SPREADSHEET_ID" \
  --languages "ko,en,ja" \
  --locales "./locales"

# 양방향 동기화
npx i18n-sheets sync \
  --spreadsheet "YOUR_SPREADSHEET_ID" \
  --locales "./locales"
```

#### 프로그래매틱 사용

````typescript
import { GoogleSheetsManager } from "i18nexus";

const sheetsManager = new GoogleSheetsManager({
  credentialsPath: "./service-account-key.json",
  spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  sheetName: "Translations"
});

// 인증 및 업로드
await sheetsManager.authenticate();
await sheetsManager.uploadTranslations("./locales");

// 다운로드 및 로컬 저장
await sheetsManager.saveTranslationsToLocal("./locales", ["ko", "en"]);

// 상태 확인
const status = await sheetsManager.getStatus();
console.log(`총 ${status.totalRows}개의 번역이 있습니다.`);
## 🛠️ 고급 설정

### LanguageManager 직접 사용
```typescript
import { LanguageManager } from "i18nexus";

const languageManager = new LanguageManager({
  defaultLanguage: "ko",
  availableLanguages: [
    { code: "ko", name: "한국어", flag: "🇰🇷", dir: "ltr" },
    { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
    { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" }
  ],
  enableAutoDetection: true,
  enableLocalStorage: true,
  cookieOptions: {
    expires: 365,
    secure: true,
    sameSite: "strict"
  }
});

// 언어 변경 리스너 등록
const removeListener = languageManager.addLanguageChangeListener((lang) => {
  console.log("언어가 변경되었습니다:", lang);
});

// 브라우저 언어 감지
const browserLang = languageManager.detectBrowserLanguage();

// 언어 설정 초기화
languageManager.reset();
````

## 📁 워크플로우 예시

### 개발자 워크플로우

1. **개발 단계**: 하드코딩된 문자열로 개발
2. **변환 단계**: `i18n-wrapper`로 자동 변환
3. **업로드 단계**: `i18n-sheets upload`로 Google Sheets에 업로드
4. **번역 단계**: 번역가가 Google Sheets에서 번역 작업
5. **다운로드 단계**: `i18n-sheets download`로 번역 파일 업데이트

### 팀 협업 워크플로우

```bash
# 개발자: 새로운 기능 개발 후
npm run build
npx i18n-wrapper --generate-keys --namespace "feature"
npx i18n-sheets sync

# 번역가: Google Sheets에서 번역 작업 완료 후 알림

# 개발자: 번역된 내용 동기화
npx i18n-sheets download
git add locales/
git commit -m "Update translations"
```

## 🔧 API 레퍼런스

### I18nProvider Props

```typescript
interface I18nProviderProps {
  children: ReactNode;
  languageManagerOptions?: LanguageManagerOptions;
  onLanguageChange?: (language: string) => void;
}
```

### useTranslation Hook

```typescript
const {
  t, // 번역 함수
  i18n, // i18next 인스턴스
  ready, // i18next 준비 상태
  currentLanguage, // 현재 언어
  changeLanguage, // 언어 변경 함수
  availableLanguages, // 사용 가능한 언어 목록
  languageManager, // LanguageManager 인스턴스
  isLoading, // 언어 변경 중 상태
} = useTranslation();
```

### CLI 명령어

#### i18n-wrapper

```bash
i18n-wrapper [options]

옵션:
  -p, --pattern <pattern>      파일 패턴 (기본값: "src/**/*.{js,jsx,ts,tsx}")
  -g, --generate-keys          번역 키 자동 생성
  -n, --namespace <ns>         네임스페이스 (기본값: "common")
  -e, --english                영어 텍스트도 처리
  --key-prefix <prefix>        생성되는 키의 접두사
  -o, --output-dir <dir>       출력 디렉토리 (기본값: "./locales")
  -d, --dry-run                미리보기 모드
  -h, --help                   도움말
```

#### i18n-sheets

```bash
i18n-sheets <command> [options]

명령어:
  init                         Google Sheets 연동 초기화
  upload                       로컬 파일을 Google Sheets로 업로드
  download                     Google Sheets에서 로컬로 다운로드
  sync                         양방향 동기화
  status                       상태 확인

공통 옵션:
  -c, --credentials <path>     서비스 계정 JSON 파일 경로
  -s, --spreadsheet <id>       Google Spreadsheet ID
  -w, --worksheet <name>       워크시트 이름 (기본값: "Translations")
  -l, --locales <dir>          로컬 디렉토리 (기본값: "./locales")
```

## 🌟 실제 사용 예시

### Next.js 프로젝트에서 사용

```typescript
// _app.tsx
import { I18nProvider } from "i18nexus";
import "../i18n/config";

export default function App({ Component, pageProps }) {
  return (
    <I18nProvider
      languageManagerOptions={{
        defaultLanguage: "ko",
        availableLanguages: [
          { code: "ko", name: "한국어" },
          { code: "en", name: "English" }
        ],
        cookieOptions: {
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
        }
      }}
    >
      <Component {...pageProps} />
    </I18nProvider>
  );
}
```

### TypeScript 타입 안전성

```typescript
// 타입 정의
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("../locales/ko/common.json");
    };
  }
}

// 사용
const { t } = useTranslation();
// t("hello") - 자동완성 및 타입 체크 지원
```

      <YourMainComponent />
    </I18nProvider>

);
}

export default App;

````

### 3. Use Translation Hooks

```tsx
import React from "react";
import {
  useTranslation,
  useLanguageSwitcher,
} from "i18nexus";

function MyComponent() {
  const { t, currentLanguage } = useTranslation("common");
  const { changeLanguage, switchToNextLanguage } = useLanguageSwitcher();

  return (
    <div>
      <h1>
        {t("hello")} {t("world")}!
      </h1>
      <p>Current language: {currentLanguage}</p>

      <button onClick={() => changeLanguage("ko")}>한국어</button>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={switchToNextLanguage}>Switch Language</button>
    </div>
  );
}
````

## API Reference

### I18nProvider

The main provider component that manages language state and cookies.

#### Props

| Prop                 | Type            | Default                       | Description                                     |
| -------------------- | --------------- | ----------------------------- | ----------------------------------------------- |
| `children`           | `ReactNode`     | -                             | Child components                                |
| `defaultLanguage`    | `string`        | `'en'`                        | Default language when no cookie is found        |
| `availableLanguages` | `string[]`      | `['en', 'ko']`                | List of supported languages                     |
| `cookieName`         | `string`        | `'i18n-language'`             | Name of the cookie to store language preference |
| `cookieOptions`      | `CookieOptions` | `{ expires: 365, path: '/' }` | Cookie configuration options                    |

#### CookieOptions

| Option     | Type         | Description                                   |
| ---------- | ------------ | --------------------------------------------- | ------- | ------------------------- |
| `expires`  | `number`     | Number of days until cookie expires           |
| `path`     | `string`     | Cookie path                                   |
| `domain`   | `string`     | Cookie domain                                 |
| `secure`   | `boolean`    | Whether cookie should only be sent over HTTPS |
| `sameSite` | `'strict' \\ | 'lax' \\                                      | 'none'` | SameSite cookie attribute |

### useTranslation Hook

Enhanced version of react-i18next's useTranslation hook with additional context.

```typescript
const {
  t, // Translation function
  i18n, // i18next instance
  ready, // Whether translations are loaded
  currentLanguage, // Current language from context
  changeLanguage, // Function to change language
  availableLanguages, // Array of available languages
} = useTranslation(namespace);
```

### useLanguageSwitcher Hook

Convenient hook for language switching functionality.

```typescript
const {
  currentLanguage, // Current language
  availableLanguages, // Array of available languages
  changeLanguage, // Function to change to specific language
  switchToNextLanguage, // Function to switch to next language in array
  switchToPreviousLanguage, // Function to switch to previous language in array
} = useLanguageSwitcher();
```

### Cookie Utilities

Direct access to cookie management functions:

```typescript
import { setCookie, getCookie, deleteCookie, getAllCookies } from "i18nexus";

// Set a cookie
setCookie("language", "ko", { expires: 30, path: "/" });

// Get a cookie
const language = getCookie("language");

// Delete a cookie
deleteCookie("language");

// Get all cookies
const allCookies = getAllCookies();
```

## Code Transformation Tools

### TranslationWrapper Class

Automatically wrap hardcoded strings in your code with translation functions:

```typescript
import { TranslationWrapper } from "i18nexus";

const wrapper = new TranslationWrapper({
  sourcePattern: "src/**/*.{js,jsx,ts,tsx}",
  processKorean: true,
  processEnglish: false,
  generateKeys: true,
  namespace: "common",
});

const { processedFiles, translationKeys } = await wrapper.processFiles();
await wrapper.generateTranslationFiles("./locales");
```

### Configuration Options

| Option                    | Type      | Default                      | Description                                        |
| ------------------------- | --------- | ---------------------------- | -------------------------------------------------- |
| `sourcePattern`           | `string`  | `"src/**/*.{js,jsx,ts,tsx}"` | Glob pattern for files to process                  |
| `processKorean`           | `boolean` | `true`                       | Whether to process Korean text                     |
| `processEnglish`          | `boolean` | `false`                      | Whether to process English text                    |
| `customTextRegex`         | `RegExp`  | `/[가-힣]/`                  | Custom regex for text detection                    |
| `translationImportSource` | `string`  | `"react-i18next"`            | Import source for translation functions            |
| `generateKeys`            | `boolean` | `false`                      | Whether to generate translation keys automatically |
| `keyPrefix`               | `string`  | `""`                         | Prefix for generated keys                          |
| `namespace`               | `string`  | `"common"`                   | Translation namespace                              |

## Examples

### Next.js Integration

```tsx
// pages/_app.tsx
import { I18nProvider } from "i18nexus";
import "../i18n";

function MyApp({ Component, pageProps }) {
  return (
    <I18nProvider
      defaultLanguage="en"
      availableLanguages={["en", "ko", "ja"]}
      cookieOptions={{
        expires: 365,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      }}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}

export default MyApp;
```

### Language Switcher Component

```tsx
import React from "react";
import { useLanguageSwitcher } from "i18nexus";

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, availableLanguages, changeLanguage } =
    useLanguageSwitcher();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}>
      {availableLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Changelog

### 1.0.0

- Initial release
- Cookie-based language management
- React Context integration
- TypeScript support
- Code transformation tools
- SSR compatibility
