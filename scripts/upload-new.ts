import fs from "fs";
import path from "path";

// 기존의 구글 시트 연동 설정/헬퍼 함수들을 그대로 가져옵니다.
// './index' 경로는 실제 프로젝트 구조에 맞게 조정해야 할 수 있습니다.
import {
  columnKeyToHeader,
  lngs,
  loadSpreadsheet,
  NOT_AVAILABLE_CELL,
  sheetId,
} from "./index";

/**
 * missing_translations.json 파일을 읽어 새로운 키들만 Google Sheet에 업로드합니다.
 */
const uploadNewKeysToSheet = async (): Promise<void> => {
  const missingKeysFilePath = path.join(__dirname, "missing_translations.json");
  const removeAfterUpload = true; // 업로드 후 삭제 여부 설정

  console.log(`- "${missingKeysFilePath}" 파일을 읽고 있습니다...`);

  if (!fs.existsSync(missingKeysFilePath)) {
    console.error(
      "❌ 오류: missing_translations.json 파일이 없습니다. 'i18n:find-missing' 스크립트를 먼저 실행하세요."
    );
    return;
  }

  try {
    // 1. 누락된 키 파일(JSON)을 읽어옵니다.
    const missingKeysContent = fs.readFileSync(missingKeysFilePath, "utf-8");
    const missingKeysData = JSON.parse(missingKeysContent);
    const newKeysToUpload = Object.keys(missingKeysData);

    if (newKeysToUpload.length === 0) {
      console.log("✅ 업로드할 새로운 키가 없습니다.");
      return;
    }

    console.log(
      `- ${newKeysToUpload.length}개의 새로운 키를 구글 시트에 업로드합니다...`
    );

    // 2. 구글 시트 문서를 불러오고, 시트에서 기존 키 전체를 가져옵니다.
    const doc = await loadSpreadsheet();
    const sheet = doc.sheetsById[sheetId];
    if (!sheet) {
      throw new Error(`시트 ID '${sheetId}'를 찾을 수 없습니다.`);
    }

    console.log("- 시트에서 기존 키 목록을 가져오는 중...");
    const rows = await sheet.getRows();
    const existingKeys = new Set(rows.map((row) => row.get(columnKeyToHeader.key)));
    console.log(`- 현재 시트에 ${existingKeys.size}개의 키가 존재합니다.`);

    // 3. 이미 시트에 존재하는 키는 업로드 목록에서 안전하게 제외합니다.
    const finalRowsToAdd = newKeysToUpload
      .filter((key) => !existingKeys.has(key))
      .map((key) => {
        const newRow: { [key: string]: string } = {};
        // 'key' 열 설정
        newRow[columnKeyToHeader.key] = key;
        // 각 언어 열 설정 (기본 언어 'ko'는 키와 동일하게, 나머지는 N/A 처리)
        lngs.forEach((lng: string) => {
          newRow[columnKeyToHeader[lng]] = lng === "ko" ? key : NOT_AVAILABLE_CELL;
        });
        return newRow;
      });

    if (finalRowsToAdd.length === 0) {
      console.log("✅ 모든 새로운 키가 이미 시트에 존재합니다.");
      return;
    }

    // 4. 최종적으로 추가할 행들을 시트에 한 번에 추가합니다.
    console.log(`- ${finalRowsToAdd.length}개의 새로운 키를 시트에 추가합니다.`);
    await sheet.addRows(finalRowsToAdd);

    console.log(
      `✨ ${finalRowsToAdd.length}개의 새로운 키를 구글 시트에 성공적으로 추가했습니다!`
    );

    if (removeAfterUpload) {
      fs.unlinkSync(missingKeysFilePath);
      console.log(`🗑️ "${missingKeysFilePath}" 파일을 업로드 후 삭제했습니다.`);
    }
  } catch (error) {
    console.error("❌ 오류: 구글 시트에 업로드하는 중 문제가 발생했습니다.", error);
  }
};

uploadNewKeysToSheet();
