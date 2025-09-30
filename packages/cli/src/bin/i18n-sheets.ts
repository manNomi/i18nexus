#!/usr/bin/env node

import { Command } from "commander";
import {
  GoogleSheetsManager,
  GoogleSheetsConfig,
} from "../scripts/google-sheets";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

program
  .name("i18n-sheets")
  .description("Google Sheets integration for i18n translations")
  .version("1.0.0");

// 공통 옵션들
const addCommonOptions = (cmd: Command) => {
  return cmd
    .option(
      "-c, --credentials <path>",
      "Path to Google service account credentials JSON file",
      "./credentials.json",
    )
    .option("-s, --spreadsheet <id>", "Google Spreadsheet ID")
    .option("-w, --worksheet <name>", "Worksheet name", "Translations")
    .option("-l, --locales <dir>", "Locales directory", "./locales");
};

// 환경 설정 확인
const checkConfig = (options: any): GoogleSheetsConfig => {
  if (!options.spreadsheet) {
    console.error(
      "❌ Spreadsheet ID is required. Use -s option or set GOOGLE_SPREADSHEET_ID environment variable.",
    );
    process.exit(1);
  }

  if (!fs.existsSync(options.credentials)) {
    console.error(`❌ Credentials file not found: ${options.credentials}`);
    console.error(
      "Please download your Google Service Account key file and specify its path with -c option.",
    );
    process.exit(1);
  }

  return {
    credentialsPath: options.credentials,
    spreadsheetId: options.spreadsheet,
    sheetName: options.worksheet,
  };
};

// 업로드 명령
addCommonOptions(
  program
    .command("upload")
    .description("Upload local translation files to Google Sheets")
    .option("-f, --force", "Force upload even if keys already exist"),
).action(async (options) => {
  try {
    console.log("📤 Starting upload to Google Sheets...");

    const config = checkConfig(options);
    const manager = new GoogleSheetsManager(config);

    await manager.authenticate();
    await manager.ensureWorksheet();
    await manager.uploadTranslations(options.locales);

    console.log("✅ Upload completed successfully");
  } catch (error) {
    console.error("❌ Upload failed:", error);
    process.exit(1);
  }
});

// 다운로드 명령
addCommonOptions(
  program
    .command("download")
    .description("Download translations from Google Sheets to local files")
    .option(
      "--languages <langs>",
      "Comma-separated list of languages",
      "en,ko",
    ),
).action(async (options) => {
  try {
    console.log("📥 Starting download from Google Sheets...");

    const config = checkConfig(options);
    const manager = new GoogleSheetsManager(config);
    const languages = options.languages.split(",").map((l: string) => l.trim());

    await manager.authenticate();
    await manager.saveTranslationsToLocal(options.locales, languages);

    console.log("✅ Download completed successfully");
  } catch (error) {
    console.error("❌ Download failed:", error);
    process.exit(1);
  }
});

// 동기화 명령
addCommonOptions(
  program
    .command("sync")
    .description("Bidirectional sync between local files and Google Sheets"),
).action(async (options) => {
  try {
    console.log("🔄 Starting bidirectional sync...");

    const config = checkConfig(options);
    const manager = new GoogleSheetsManager(config);

    await manager.authenticate();
    await manager.ensureWorksheet();
    await manager.syncTranslations(options.locales);

    console.log("✅ Sync completed successfully");
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
});

// 상태 확인 명령
addCommonOptions(
  program
    .command("status")
    .description("Show Google Sheets status and statistics"),
).action(async (options) => {
  try {
    console.log("📊 Checking Google Sheets status...");

    const config = checkConfig(options);
    const manager = new GoogleSheetsManager(config);

    await manager.authenticate();
    const status = await manager.getStatus();

    console.log("\n📋 Google Sheets Status:");
    console.log(`   Spreadsheet ID: ${status.spreadsheetId}`);
    console.log(`   Worksheet: ${status.sheetName}`);
    console.log(`   Total translations: ${status.totalRows}`);

    // 로컬 파일 상태도 확인
    if (fs.existsSync(options.locales)) {
      const languages = fs
        .readdirSync(options.locales)
        .filter((item) =>
          fs.statSync(path.join(options.locales, item)).isDirectory(),
        );

      console.log(`\n📁 Local Files Status:`);
      console.log(`   Locales directory: ${options.locales}`);
      console.log(`   Languages: ${languages.join(", ")}`);

      languages.forEach((lang) => {
        const langDir = path.join(options.locales, lang);
        const files = fs
          .readdirSync(langDir)
          .filter((f) => f.endsWith(".json"));
        let totalKeys = 0;

        files.forEach((file) => {
          const content = JSON.parse(
            fs.readFileSync(path.join(langDir, file), "utf-8"),
          );
          totalKeys += Object.keys(content).length;
        });

        console.log(`   ${lang}: ${totalKeys} keys in ${files.length} files`);
      });
    } else {
      console.log(`\n📁 Local Files Status:`);
      console.log(`   Locales directory not found: ${options.locales}`);
    }
  } catch (error) {
    console.error("❌ Status check failed:", error);
    process.exit(1);
  }
});

// 초기 설정 명령
program
  .command("init")
  .description("Initialize Google Sheets integration")
  .option("-s, --spreadsheet <id>", "Google Spreadsheet ID")
  .option(
    "-c, --credentials <path>",
    "Path to credentials file",
    "./credentials.json",
  )
  .action(async (options) => {
    try {
      console.log("🚀 Initializing Google Sheets integration...");

      // credentials.json 파일 확인
      if (!fs.existsSync(options.credentials)) {
        console.log("\n📝 Google Service Account Setup:");
        console.log(
          "1. Go to Google Cloud Console (https://console.cloud.google.com/)",
        );
        console.log("2. Create a new project or select existing one");
        console.log("3. Enable Google Sheets API");
        console.log("4. Create a Service Account");
        console.log("5. Download the JSON key file");
        console.log(`6. Save it as '${options.credentials}'`);
        console.log("\n📋 Spreadsheet Setup:");
        console.log("1. Create a new Google Spreadsheet");
        console.log("2. Share it with your service account email");
        console.log("3. Copy the spreadsheet ID from the URL");
        console.log("4. Use it with the -s option");

        if (!options.spreadsheet) {
          console.log("\n❌ Please provide spreadsheet ID with -s option");
          process.exit(1);
        }

        console.log("\n⚠️  Please add the credentials file and try again.");
        process.exit(1);
      }

      if (!options.spreadsheet) {
        console.error("❌ Spreadsheet ID is required for initialization");
        process.exit(1);
      }

      // 설정 테스트
      const config = {
        credentialsPath: options.credentials,
        spreadsheetId: options.spreadsheet,
        sheetName: "Translations",
      };

      const manager = new GoogleSheetsManager(config);
      await manager.authenticate();

      const canAccess = await manager.checkSpreadsheet();
      if (!canAccess) {
        console.error("❌ Cannot access the spreadsheet. Please check:");
        console.error("   1. Spreadsheet ID is correct");
        console.error("   2. Service account has access to the spreadsheet");
        process.exit(1);
      }

      await manager.ensureWorksheet();

      // 환경 파일 생성
      const envContent = `# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=${options.spreadsheet}
GOOGLE_CREDENTIALS_PATH=${options.credentials}
`;

      fs.writeFileSync(".env.sheets", envContent);

      console.log("✅ Google Sheets integration initialized successfully!");
      console.log(`📋 Spreadsheet ID: ${options.spreadsheet}`);
      console.log(`🔑 Credentials: ${options.credentials}`);
      console.log("📄 Configuration saved to .env.sheets");
    } catch (error) {
      console.error("❌ Initialization failed:", error);
      process.exit(1);
    }
  });

// 도움말 개선
program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log(
    "  $ i18n-sheets init -s 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  console.log(
    "  $ i18n-sheets upload -s 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  console.log(
    "  $ i18n-sheets download -s 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  console.log(
    "  $ i18n-sheets sync -s 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  console.log(
    "  $ i18n-sheets status -s 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  console.log("");
  console.log("Environment Variables:");
  console.log("  GOOGLE_SPREADSHEET_ID    Google Spreadsheet ID");
  console.log("  GOOGLE_CREDENTIALS_PATH  Path to service account credentials");
  console.log("");
});

// 환경 변수에서 기본값 읽기
if (process.env.GOOGLE_SPREADSHEET_ID) {
  program.setOptionValue("spreadsheet", process.env.GOOGLE_SPREADSHEET_ID);
}

if (process.env.GOOGLE_CREDENTIALS_PATH) {
  program.setOptionValue("credentials", process.env.GOOGLE_CREDENTIALS_PATH);
}

program.parse();
