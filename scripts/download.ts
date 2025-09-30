import fs from "fs";
import { GoogleSpreadsheet } from "google-spreadsheet";

import {
  columnKeyToHeader,
  lngs,
  loadSpreadsheet,
  localesPath,
  NOT_AVAILABLE_CELL,
  ns,
  sheetId,
} from "./index";

/**
 * fetch translations from google spread sheet and transform to json
 * @param {GoogleSpreadsheet} doc GoogleSpreadsheet document
 * @returns [object] translation map
 * {
 *   "ko-KR": {
 *     "key": "value"
 *   },
 *   "en-US": {
 *     "key": "value"
 *   },
 * }
 */
const fetchTranslationsFromSheetToJson = async (
  doc: GoogleSpreadsheet
): Promise<{ [key: string]: { [key: string]: string } }> => {
  const sheet = doc.sheetsById[sheetId];
  if (!sheet) {
    return {};
  }

  const lngsMap: { [key: string]: { [key: string]: string } } = {};
  const rows = await sheet.getRows();

  rows?.forEach((row) => {
    const key = row.get(columnKeyToHeader.key);
    lngs?.forEach((lng: string | number) => {
      const translation = row.get(columnKeyToHeader[lng]);

      // NOT_AVAILABLE_CELL("_N/A") means no related language
      if (translation === NOT_AVAILABLE_CELL) {
        return;
      }

      if (!lngsMap[lng]) {
        lngsMap[lng] = {};
      }

      lngsMap[lng][key] = translation || ""; // prevent to remove undefined value like ({"key": undefined})
    });
  });

  return lngsMap;
};

const checkAndMakeLocaleDir = async (
  dirPath: string,
  subDirs: string[]
): Promise<void> => {
  for (const subDir of subDirs) {
    const path = `${dirPath}/${subDir}`;
    try {
      await fs.promises.mkdir(path, { recursive: true });
    } catch (err) {
      throw err;
    }
  }
};

const updateJsonFromSheet = async (): Promise<void> => {
  await checkAndMakeLocaleDir(localesPath, lngs);

  const doc = await loadSpreadsheet();
  const lngsMap = await fetchTranslationsFromSheetToJson(doc);

  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      throw error;
    }

    lngs.forEach((lng) => {
      const localeJsonFilePath = `${localesPath}/${lng}/${ns}.json`;
      const jsonString = JSON.stringify(lngsMap[lng] || {}, null, 2); // undefined일 경우 빈 객체로 대체

      fs.writeFile(localeJsonFilePath, jsonString, "utf8", (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
};

updateJsonFromSheet();
