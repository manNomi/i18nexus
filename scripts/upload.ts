import fs from "fs";

import {
  columnKeyToHeader,
  getPureKey,
  lngs,
  loadSpreadsheet,
  NOT_AVAILABLE_CELL,
  ns,
  sheetId,
} from "./index";

// 스프레드시트의 헤더 값 정의

const headerValues: string[] = ["Key", "ko", "en"];

/**
 * 새로운 시트를 추가하는 함수
 */
const addNewSheet = async (doc: any, title: string, sheetId: number) => {
  const sheet = await doc.addSheet({
    sheetId,
    title,
    headerValues,
  });

  return sheet;
};

type Translations = {
  [key: string]: string;
};

/**
 * keyMap을 사용하여 시트의 번역을 업데이트하는 함수
 */
const updateTranslationsFromKeyMapToSheet = async (doc: any, keyMap: any) => {
  const title = "소장";
  let sheet = doc.sheetsById[sheetId];
  if (!sheet) {
    sheet = await addNewSheet(doc, title, sheetId);
  }

  const rows = await sheet.getRows();
  const existKeys: { [key: string]: boolean } = {};
  const addedRows: any[] = [];

  rows.forEach((row: any) => {
    const key = row.get(columnKeyToHeader.key);
    if (keyMap[key]) {
      existKeys[key] = true;
    }
  });

  for (const [key, translations] of Object.entries<Translations>(keyMap)) {
    if (!existKeys[key]) {
      const row: Record<string, string> = {
        [columnKeyToHeader.key]: key,
        ...Object.keys(translations).reduce(
          (result, lng) => {
            const header = columnKeyToHeader[lng];
            result[header] = translations[lng];
            return result;
          },
          {} as Record<string, string>
        ),
      };

      addedRows.push(row);
    }
  }

  await sheet.addRows(addedRows);
};

/**
 * keyMap을 JSON 형식으로 변환하는 함수
 */
const toJson = (keyMap: any) => {
  const json: any = {};

  Object.entries(keyMap).forEach(([__, keysByPlural]: any) => {
    for (const [keyWithPostfix, translations] of Object.entries<Record<string, string>>(
      keysByPlural
    ) as [string, Record<string, string>][]) {
      json[keyWithPostfix] = {
        ...translations,
      };
    }
  });

  return json;
};

/**
 * JSON 데이터를 사용하여 keyMap을 구성하는 함수
 */
const gatherKeyMap = (keyMap: any, lng: string, json: any) => {
  for (const [keyWithPostfix, translated] of Object.entries(json)) {
    const key = getPureKey(keyWithPostfix);

    keyMap[key] = keyMap[key] || {};
    const keyMapWithLng = keyMap[key];
    if (!keyMapWithLng[keyWithPostfix]) {
      keyMapWithLng[keyWithPostfix] = lngs.reduce((initObj: any, lng: any) => {
        initObj[lng] = NOT_AVAILABLE_CELL;

        return initObj;
      }, {});
    }

    keyMapWithLng[keyWithPostfix][lng] = translated;
  }
};

/**
 * JSON 파일로부터 시트를 업데이트하는 메인 함수
 */
const updateSheetFromJson = async () => {
  const doc = await loadSpreadsheet();

  const keyMap = {};

  ns.forEach((eachNs) => {
    lngs.forEach((lng) => {
      const json = JSON.parse(
        fs.readFileSync(
          `src/app/i18n/locales/{{lng}}/{{ns}}.json/${lng}/card-tags,common,dashboard,detect,docu-mng,drawings,gallery,login,material,reports,site-log,write-report.json`,
          "utf8"
        )
      );
      gatherKeyMap(keyMap, lng, json);
    });
  });

  await updateTranslationsFromKeyMapToSheet(doc, toJson(keyMap));
};

updateSheetFromJson();
