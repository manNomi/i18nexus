"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGoogleSheetsManager = exports.GoogleSheetsManager = exports.runTranslationWrapper = exports.TranslationWrapper = exports.defaultLanguageManager = exports.LanguageManager = exports.getAllCookies = exports.deleteCookie = exports.getCookie = exports.setCookie = exports.useLanguageSwitcher = exports.useTranslation = exports.useI18nContext = exports.I18nProvider = void 0;
// Components
var I18nProvider_1 = require("./components/I18nProvider");
Object.defineProperty(exports, "I18nProvider", { enumerable: true, get: function () { return I18nProvider_1.I18nProvider; } });
Object.defineProperty(exports, "useI18nContext", { enumerable: true, get: function () { return I18nProvider_1.useI18nContext; } });
// Hooks
var useTranslation_1 = require("./hooks/useTranslation");
Object.defineProperty(exports, "useTranslation", { enumerable: true, get: function () { return useTranslation_1.useTranslation; } });
Object.defineProperty(exports, "useLanguageSwitcher", { enumerable: true, get: function () { return useTranslation_1.useLanguageSwitcher; } });
// Utils
var cookie_1 = require("./utils/cookie");
Object.defineProperty(exports, "setCookie", { enumerable: true, get: function () { return cookie_1.setCookie; } });
Object.defineProperty(exports, "getCookie", { enumerable: true, get: function () { return cookie_1.getCookie; } });
Object.defineProperty(exports, "deleteCookie", { enumerable: true, get: function () { return cookie_1.deleteCookie; } });
Object.defineProperty(exports, "getAllCookies", { enumerable: true, get: function () { return cookie_1.getAllCookies; } });
// Language Manager
var languageManager_1 = require("./utils/languageManager");
Object.defineProperty(exports, "LanguageManager", { enumerable: true, get: function () { return languageManager_1.LanguageManager; } });
Object.defineProperty(exports, "defaultLanguageManager", { enumerable: true, get: function () { return languageManager_1.defaultLanguageManager; } });
// Scripts
var t_wrapper_1 = require("./scripts/t-wrapper");
Object.defineProperty(exports, "TranslationWrapper", { enumerable: true, get: function () { return t_wrapper_1.TranslationWrapper; } });
Object.defineProperty(exports, "runTranslationWrapper", { enumerable: true, get: function () { return t_wrapper_1.runTranslationWrapper; } });
// Google Sheets Integration
var google_sheets_1 = require("./scripts/google-sheets");
Object.defineProperty(exports, "GoogleSheetsManager", { enumerable: true, get: function () { return google_sheets_1.GoogleSheetsManager; } });
Object.defineProperty(exports, "defaultGoogleSheetsManager", { enumerable: true, get: function () { return google_sheets_1.defaultGoogleSheetsManager; } });
//# sourceMappingURL=index.js.map