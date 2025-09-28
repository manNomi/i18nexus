"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLanguageSwitcher = exports.useTranslation = void 0;
const react_i18next_1 = require("react-i18next");
const I18nProvider_1 = require("../components/I18nProvider");
const useTranslation = (ns) => {
    const { t, i18n, ready } = (0, react_i18next_1.useTranslation)(ns);
    const { currentLanguage, changeLanguage, availableLanguages, languageManager, isLoading, } = (0, I18nProvider_1.useI18nContext)();
    return {
        t,
        i18n,
        ready,
        currentLanguage,
        changeLanguage,
        availableLanguages,
        languageManager,
        isLoading,
    };
};
exports.useTranslation = useTranslation;
const useLanguageSwitcher = () => {
    const { currentLanguage, changeLanguage, availableLanguages, languageManager, isLoading, } = (0, I18nProvider_1.useI18nContext)();
    const switchToNextLanguage = async () => {
        const languageCodes = availableLanguages.map((lang) => lang.code);
        const currentIndex = languageCodes.indexOf(currentLanguage);
        const nextIndex = (currentIndex + 1) % languageCodes.length;
        const nextLanguage = languageCodes[nextIndex];
        await changeLanguage(nextLanguage);
    };
    const switchToPreviousLanguage = async () => {
        const languageCodes = availableLanguages.map((lang) => lang.code);
        const currentIndex = languageCodes.indexOf(currentLanguage);
        const prevIndex = currentIndex === 0 ? languageCodes.length - 1 : currentIndex - 1;
        const prevLanguage = languageCodes[prevIndex];
        await changeLanguage(prevLanguage);
    };
    const getLanguageConfig = (code) => {
        return languageManager.getLanguageConfig(code || currentLanguage);
    };
    const detectBrowserLanguage = () => {
        return languageManager.detectBrowserLanguage();
    };
    const resetLanguage = () => {
        languageManager.reset();
    };
    return {
        currentLanguage,
        availableLanguages,
        changeLanguage,
        switchToNextLanguage,
        switchToPreviousLanguage,
        getLanguageConfig,
        detectBrowserLanguage,
        resetLanguage,
        isLoading,
    };
};
exports.useLanguageSwitcher = useLanguageSwitcher;
//# sourceMappingURL=useTranslation.js.map