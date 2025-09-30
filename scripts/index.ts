// 위치 : translate/index.ts
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { options } from "../../../../i18next-scanner.config";
import creds from "./credential.json";

const spreadsheetDocId = "1bqln87y7D9Tyc8py1UyNnGbo2pSagz20iZYUQmPlSaw";
const sheetId = 0;
const ns = options.ns;
const lngs = options.lngs;
const loadPath = options.resource.loadPath;
const localesPath = loadPath;
const rePluralPostfix = new RegExp(/_plural|_[\d]/g);
const NOT_AVAILABLE_CELL = "_N/A";
interface ColumnKeyToHeader {
  key: string;
  [key: string]: string;
}

const columnKeyToHeader: ColumnKeyToHeader = {
  key: "Key",
  ko: "ko",
  en: "en",
};

/**
 * getting started from https://theoephraim.github.io/node-google-spreadsheet
 */
async function loadSpreadsheet() {
  console.info(
    "\u001B[32m",
    "=====================================================================================================================\n",
    "# i18next auto-sync using Spreadsheet\n\n",
    "  * Download translation resources from Spreadsheet and make /locales/{{lng}}/{{ns}}.json\n",
    "  * Upload translation resources to Spreadsheet.\n\n",
    `The Spreadsheet for translation is here (\u001B[34mhttps://docs.google.com/spreadsheets/d/${spreadsheetDocId}/#gid=${sheetId}\u001B[0m)\n`,
    "=====================================================================================================================",
    "\u001B[0m"
  );

  const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(spreadsheetDocId, serviceAccountAuth);

  await doc.loadInfo();
  return doc;
}

const getPureKey = (key: string = ""): string => {
  return key.replace(rePluralPostfix, "");
};

export {
  columnKeyToHeader,
  getPureKey,
  lngs,
  loadSpreadsheet,
  localesPath,
  NOT_AVAILABLE_CELL,
  ns,
  sheetId,
};
