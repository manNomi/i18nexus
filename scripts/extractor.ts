import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import * as fs from "fs";
import { glob } from "glob";
import * as path from "path";

// 1. 코드 내 t() 함수에서 추출한 모든 키를 저장할 Set
const keysFromCode = new Set<string>();

// 2. 기존 번역 파일(.json)에서 불러온 모든 키를 저장할 Set
const existingKeys = new Set<string>();

async function run() {
  console.log("스크립트를 시작합니다: t() 함수로 감싸진 키를 추출합니다...");

  // =================================================================
  // 단계 1: 기존 번역 파일에서 모든 키 불러오기
  // =================================================================
  const localePath =
    "src/app/i18n/locales/{{lng}}/{{ns}}.json/ko/card-tags,common,dashboard,detect,docu-mng,drawings,gallery,login,material,reports,site-log,write-report.json";
  const translationFiles = await glob(localePath);

  if (translationFiles.length === 0) {
    console.warn(`경고: "${localePath}" 경로에서 번역 파일을 찾을 수 없습니다.`);
  } else {
    for (const filePath of translationFiles) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        Object.keys(jsonData).forEach((key) => existingKeys.add(key));
      } catch (error) {
        console.error(
          `오류: ${filePath} 파일을 읽거나 파싱하는 중 문제가 발생했습니다:`,
          error
        );
      }
    }
    console.log(
      `✅ ${existingKeys.size}개의 기존 번역 키를 ${translationFiles.length}개 파일에서 불러왔습니다.`
    );
  }

  // =================================================================
  // 단계 2: 소스 코드에서 t() 함수로 감싸진 텍스트 추출하기
  // =================================================================
  const sourceFiles = await glob("src/**/*.{js,jsx,ts,tsx}");

  for (const filePath of sourceFiles) {
    const code = fs.readFileSync(filePath, "utf-8");

    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
      errorRecovery: true, // 파싱 에러가 있어도 최대한 진행
    });

    traverse(ast, {
      // t()와 같은 함수 호출 구문을 찾습니다.
      CallExpression(path) {
        // 호출된 함수(callee)가 't'라는 이름의 식별자(Identifier)인지 확인합니다.
        if (t.isIdentifier(path.node.callee, { name: "t" })) {
          // 첫 번째 인자가 있고, 그것이 문자열 리터럴(StringLiteral)인지 확인합니다.
          const firstArg = path.node.arguments[0];
          if (firstArg && t.isStringLiteral(firstArg)) {
            const key = firstArg.value.trim();
            if (key) {
              keysFromCode.add(key);
            }
          }
        }
      },
    });
  }
  console.log(`✅ ${keysFromCode.size}개의 키를 코드 내 t() 함수에서 추출했습니다.`);

  // =================================================================
  // 단계 3: 두 목록을 비교하여 누락된 키 찾기
  // =================================================================
  const missingKeys: string[] = [];
  for (const key of keysFromCode) {
    if (!existingKeys.has(key)) {
      missingKeys.push(key);
    }
  }
  console.log(`🟡 ${missingKeys.length}개의 새로운 번역 키를 찾았습니다.`);

  // =================================================================
  // 단계 4: 누락된 키를 새로운 JSON 파일로 저장하기
  // =================================================================
  if (missingKeys.length > 0) {
    const missingTranslationObject: { [key: string]: string } = {};
    missingKeys.sort().forEach((key) => {
      missingTranslationObject[key] = key;
    });

    const outputPath = path.join(__dirname, "missing_translations.json");
    fs.writeFileSync(
      outputPath,
      JSON.stringify(missingTranslationObject, null, 2),
      "utf-8"
    );
    console.log(
      "✨ 결과가 \"missing_translations.json\" 파일에 저장되었습니다. 이 파일의 내용을 구글 시트에 추가하세요."
    );
  } else {
    console.log("✨ 축하합니다! 누락된 번역 키가 없습니다.");
  }
}

run();
