#!/usr/bin/env node

import { runTranslationExtractor, ExtractorConfig } from "../scripts/extractor";

const args = process.argv.slice(2);
const config: Partial<ExtractorConfig> = {};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--pattern":
    case "-p":
      config.sourcePattern = args[++i];
      break;
    case "--output":
    case "-o":
      config.outputFile = args[++i];
      break;
    case "--output-dir":
    case "-d":
      config.outputDir = args[++i];
      break;
    case "--format":
    case "-f":
      const format = args[++i];
      if (format !== "json" && format !== "csv") {
        console.error(`Invalid format: ${format}. Use 'json' or 'csv'`);
        process.exit(1);
      }
      config.outputFormat = format as "json" | "csv";
      break;
    case "--dry-run":
      config.dryRun = true;
      break;
    case "--help":
    case "-h":
      console.log(`
Usage: i18n-extractor [options]

t() 함수 호출에서 번역 키를 추출하여 JSON 또는 CSV 파일을 생성합니다.

Options:
  -p, --pattern <pattern>     소스 파일 패턴 (기본값: "src/**/*.{js,jsx,ts,tsx}")
  -o, --output <file>         출력 파일명 (기본값: "extracted-translations.json")
  -d, --output-dir <dir>      출력 디렉토리 (기본값: "./locales")
  -f, --format <format>       출력 형식: json|csv (기본값: "json")
  --dry-run                   실제 파일 생성 없이 미리보기
  -h, --help                  도움말 표시

Examples:
  i18n-extractor                                  # 기본 설정으로 키 추출 (JSON)
  i18n-extractor -p "app/**/*.tsx" -o "keys.json" # 커스텀 패턴과 출력 파일
  i18n-extractor -f csv -o "translations.csv"     # 구글 시트용 CSV 형식으로 출력
  i18n-extractor --dry-run                        # 추출 결과 미리보기
  
Features:
  - t() 함수 호출에서 번역 키 자동 추출
  - JSON: i18n-core 호환 형식 출력
  - CSV: 구글 시트 호환 형식 출력 (Key, English, Korean)
  - 중복 키 감지 및 보고
      `);
      process.exit(0);
      break;
    default:
      console.error(`Unknown option: ${args[i]}`);
      process.exit(1);
  }
}

runTranslationExtractor(config).catch((error) => {
  console.error("❌ Translation extraction failed:", error);
  process.exit(1);
});
