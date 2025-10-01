#!/usr/bin/env node

import { runTranslationWrapper, ScriptConfig } from "../scripts/t-wrapper";

const args = process.argv.slice(2);
const config: Partial<ScriptConfig> = {};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--pattern":
    case "-p":
      config.sourcePattern = args[++i];
      break;
    case "--dry-run":
    case "-d":
      config.dryRun = true;
      break;
    case "--help":
    case "-h":
      console.log(`
Usage: i18n-wrapper [options]

자동으로 하드코딩된 한국어 문자열을 t() 함수로 래핑하고 useTranslation 훅을 추가합니다.

Options:
  -p, --pattern <pattern>    소스 파일 패턴 (기본값: "src/**/*.{js,jsx,ts,tsx}")
  -d, --dry-run             실제 수정 없이 미리보기
  -h, --help                도움말 표시

Examples:
  i18n-wrapper                     # 기본 설정으로 한국어/영어 문자열 처리
  i18n-wrapper -p "app/**/*.tsx"   # 커스텀 패턴
  i18n-wrapper --dry-run           # 변경사항 미리보기
  
Features:
  - 한국어/영어 문자열 자동 감지 및 t() 래핑
  - useTranslation() 훅 자동 추가 (i18nexus-core)
  - 기존 t() 호출 및 import 보존
      `);
      process.exit(0);
      break;
    default:
      console.error(`Unknown option: ${args[i]}`);
      process.exit(1);
  }
}

runTranslationWrapper(config).catch((error) => {
  console.error("❌ Translation wrapper failed:", error);
  process.exit(1);
});
