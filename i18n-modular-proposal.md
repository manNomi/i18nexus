# i18nexus 모듈 분리 제안

## 현재 문제점

- 브라우저에서 사용할 때 서버측 의존성(googleapis, fs, child_process 등)으로 인한 에러
- 모든 기능이 하나의 패키지에 묶여있어 불필요한 의존성 포함

## 제안하는 3개 모듈 구조

### 1. `@i18nexus/core` (브라우저 호환)

**목적**: 기본적인 React i18n 기능 제공
**포함 기능**:

- `I18nProvider` - React Context Provider
- `useTranslation` - 번역 훅
- `useLanguageSwitcher` - 언어 변경 훅
- Cookie 유틸리티 (브라우저 전용)
- Language Manager (클라이언트용)

**의존성**: React, cookie 관련 최소 라이브러리만
**번들 크기**: 매우 작음 (~10KB)

### 2. `@i18nexus/cli` (개발도구)

**목적**: 코드 변환 및 번역 스크립트
**포함 기능**:

- `t-wrapper` - 문자열을 t() 함수로 감싸기
- 코드 파싱 및 변환
- TypeScript AST 조작

**의존성**: @babel/parser, glob, fs 등
**사용 환경**: 개발 환경, Node.js

### 3. `@i18nexus/sheets` (Google Sheets 연동)

**목적**: 번역가와의 협업을 위한 Google Sheets 연동
**포함 기능**:

- Google Sheets API 연동
- 번역 데이터 동기화
- 인증 관리

**의존성**: googleapis, google-auth-library 등
**사용 환경**: 서버 환경, Node.js

## 패키지 구조

```
packages/
├── core/                    # @i18nexus/core
│   ├── src/
│   │   ├── components/
│   │   │   └── I18nProvider.tsx
│   │   ├── hooks/
│   │   │   └── useTranslation.ts
│   │   ├── utils/
│   │   │   ├── cookie.ts
│   │   │   └── languageManager.ts
│   │   └── index.ts
│   └── package.json
│
├── cli/                     # @i18nexus/cli
│   ├── src/
│   │   ├── scripts/
│   │   │   └── t-wrapper.ts
│   │   ├── bin/
│   │   │   └── i18n-wrapper.ts
│   │   └── index.ts
│   └── package.json
│
└── sheets/                  # @i18nexus/sheets
    ├── src/
    │   ├── scripts/
    │   │   └── google-sheets.ts
    │   ├── bin/
    │   │   └── i18n-sheets.ts
    │   └── index.ts
    └── package.json
```

## 사용 방법

### 기본 사용 (브라우저)

```bash
npm install @i18nexus/core
```

```tsx
import { I18nProvider, useTranslation } from "@i18nexus/core";
```

### 개발 도구 사용

```bash
npm install -D @i18nexus/cli
npx i18n-wrapper src/
```

### Google Sheets 연동

```bash
npm install @i18nexus/sheets
npx i18n-sheets sync
```

## 마이그레이션 전략

### 1단계: 현재 패키지를 `@i18nexus/legacy`로 유지

### 2단계: 새로운 모듈 구조 생성

### 3단계: 메인 `i18nexus` 패키지를 메타 패키지로 변경

```json
// i18nexus/package.json
{
  "name": "i18nexus",
  "dependencies": {
    "@i18nexus/core": "^2.0.0",
    "@i18nexus/cli": "^2.0.0",
    "@i18nexus/sheets": "^2.0.0"
  }
}
```

## 장점

1. **선택적 설치**: 필요한 기능만 설치 가능
2. **브라우저 호환성**: @i18nexus/core는 완전한 브라우저 호환
3. **번들 크기 최적화**: 불필요한 의존성 제거
4. **명확한 관심사 분리**: 각 모듈의 역할이 명확
5. **점진적 마이그레이션**: 기존 사용자 호환성 유지
