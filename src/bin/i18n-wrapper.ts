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
    case "--generate-keys":
    case "-g":
      config.generateKeys = true;
      break;
    case "--namespace":
    case "-n":
      config.namespace = args[++i];
      break;
    case "--english":
    case "-e":
      config.processEnglish = true;
      break;
    case "--key-prefix":
      config.keyPrefix = args[++i];
      break;
    case "--output-dir":
    case "-o":
      config.outputDir = args[++i];
      break;
    case "--dry-run":
    case "-d":
      config.dryRun = true;
      break;
    case "--help":
    case "-h":
      console.log(`
Usage: i18n-wrapper [options]

Automatically wraps hardcoded strings with t() function calls and adds useTranslation hooks.

Options:
  -p, --pattern <pattern>    Source file pattern (default: "src/**/*.{js,jsx,ts,tsx}")
  -g, --generate-keys        Generate translation keys automatically
  -n, --namespace <ns>       Translation namespace (default: "common")
  -e, --english             Process English text too (default: Korean only)
  --key-prefix <prefix>      Prefix for generated keys
  -o, --output-dir <dir>     Output directory for translation files (default: "./locales")
  -d, --dry-run             Preview changes without modifying files
  -h, --help                Show this help message

Examples:
  i18n-wrapper                                    # Process Korean strings in src/**
  i18n-wrapper -p "app/**/*.tsx" -g -n "components"  # Custom pattern with key generation
  i18n-wrapper --generate-keys --english --dry-run   # Preview English processing
  i18n-wrapper -g -n "common" -o "./translations"    # Custom output directory

Features:
  - Detects hardcoded Korean/English strings in React components
  - Automatically adds useTranslation() hooks to components
  - Generates translation key files (with -g option)
  - Supports dry-run mode for preview
  - Preserves existing t() calls and imports
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
