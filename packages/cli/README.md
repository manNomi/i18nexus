# i18nexus-cli-tools

한국어 React 애플리케이션을 위한 간단하고 강력한 국제화 CLI 도구

## 설치

```bash
npm install -g i18nexus-cli-tools
# 또는 프로젝트에 설치
npm install i18nexus-cli-tools --save-dev
```

## 핵심 도구

### 1. i18n-wrapper - 자동 번역 래핑

한국어 하드코딩 문자열을 자동으로 `t()` 함수로 래핑하고 `useTranslation` 훅을 추가합니다.

```bash
# 기본 사용법 - src/** 에서 한국어 텍스트 처리
i18n-wrapper

# 커스텀 패턴과 네임스페이스
i18n-wrapper -p "app/**/*.tsx" -n "components"

# 변경사항 미리보기
i18n-wrapper --dry-run
```

**특징:**

- 한국어 문자열 자동 감지
- `useTranslation()` 훅 자동 추가 (i18nexus-core)
- 번역 키 파일 자동 생성 (띄어쓰기 포함)
- 기존 t() 호출 및 import 보존

### 2. i18n-extractor - 번역 키 추출

`t()` 함수 호출에서 번역 키를 추출하여 간단한 JSON 파일로 생성합니다.

```bash
# 기본 사용법
i18n-extractor

# 커스텀 패턴과 출력 파일
i18n-extractor -p "app/**/*.tsx" -o "translation-keys.json"

# 추출 결과 미리보기
i18n-extractor --dry-run
```

**특징:**

- t() 함수 호출에서 번역 키 자동 추출
- 간단한 key-value JSON 형식 출력
- 중복 키 감지 및 보고

## 사용 예시

### 1단계: 하드코딩된 텍스트를 t() 함수로 래핑

```tsx
// Before
export default function Welcome() {
  return <h1>안녕하세요 반갑습니다</h1>;
}

// After (i18n-wrapper 실행 후)
import { useTranslation } from "i18nexus-core";

export default function Welcome() {
  const { t } = useTranslation("common");
  return <h1>{t("안녕하세요 반갑습니다")}</h1>;
}
```

### 2단계: 번역 키 추출

```bash
i18n-extractor -p "src/**/*.tsx" -o "keys.json"
```

```json
{
  "안녕하세요 반갑습니다": "",
  "저장하기": "",
  "취소하기": ""
}
```

## CLI 옵션

### i18n-wrapper 옵션

| 옵션               | 설명                    | 기본값                       |
| ------------------ | ----------------------- | ---------------------------- |
| `-p, --pattern`    | 소스 파일 패턴          | `"src/**/*.{js,jsx,ts,tsx}"` |
| `-n, --namespace`  | 번역 네임스페이스       | `"common"`                   |
| `-o, --output-dir` | 번역 파일 출력 디렉토리 | `"./locales"`                |
| `-d, --dry-run`    | 실제 수정 없이 미리보기 | -                            |
| `-h, --help`       | 도움말 표시             | -                            |

### i18n-extractor 옵션

| 옵션               | 설명                         | 기본값                          |
| ------------------ | ---------------------------- | ------------------------------- |
| `-p, --pattern`    | 소스 파일 패턴               | `"src/**/*.{js,jsx,ts,tsx}"`    |
| `-o, --output`     | 출력 파일명                  | `"extracted-translations.json"` |
| `-d, --output-dir` | 출력 디렉토리                | `"./locales"`                   |
| `--dry-run`        | 실제 파일 생성 없이 미리보기 | -                               |
| `-h, --help`       | 도움말 표시                  | -                               |

## 워크플로우

1. **개발**: 한국어로 하드코딩하여 개발
2. **변환**: `i18n-wrapper`로 t() 함수 래핑
3. **추출**: `i18n-extractor`로 번역 키 추출
4. **번역**: 생성된 JSON 파일에 번역 추가
5. **배포**: 다국어 지원 완료

## 관련 패키지

- `i18nexus-core` - React 컴포넌트와 훅
- `i18nexus` - 전체 toolkit (Google Sheets 연동 포함)

## 라이센스

MIT
