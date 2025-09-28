"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18nContext = exports.I18nProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const languageManager_1 = require("../utils/languageManager");
const I18nContext = (0, react_1.createContext)(undefined);
const I18nProvider = ({ children, languageManagerOptions, onLanguageChange, }) => {
    const { i18n } = (0, react_i18next_1.useTranslation)();
    const [languageManager] = (0, react_1.useState)(() => new languageManager_1.LanguageManager(languageManagerOptions));
    const [currentLanguage, setCurrentLanguage] = (0, react_1.useState)(() => languageManager.getCurrentLanguage());
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const changeLanguage = async (lang) => {
        if (lang === currentLanguage) {
            return;
        }
        setIsLoading(true);
        try {
            // LanguageManager를 통해 언어 설정
            const success = languageManager.setLanguage(lang);
            if (!success) {
                throw new Error(`Failed to set language to ${lang}`);
            }
            // i18next 언어 변경
            await i18n.changeLanguage(lang);
            setCurrentLanguage(lang);
            // 콜백 호출
            onLanguageChange?.(lang);
        }
        catch (error) {
            console.error("Failed to change language:", error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        // 언어 변경 리스너 등록
        const removeListener = languageManager.addLanguageChangeListener((lang) => {
            if (lang !== currentLanguage) {
                setCurrentLanguage(lang);
                i18n.changeLanguage(lang);
                onLanguageChange?.(lang);
            }
        });
        // 초기 언어 설정
        const initLanguage = languageManager.getCurrentLanguage();
        if (initLanguage !== i18n.language) {
            i18n.changeLanguage(initLanguage).catch(console.error);
        }
        return removeListener;
    }, [i18n, languageManager, currentLanguage, onLanguageChange]);
    const contextValue = {
        currentLanguage,
        changeLanguage,
        availableLanguages: languageManager.getAvailableLanguages(),
        languageManager,
        isLoading,
    };
    return ((0, jsx_runtime_1.jsx)(I18nContext.Provider, { value: contextValue, children: children }));
};
exports.I18nProvider = I18nProvider;
const useI18nContext = () => {
    const context = (0, react_1.useContext)(I18nContext);
    if (!context) {
        throw new Error("useI18nContext must be used within an I18nProvider");
    }
    return context;
};
exports.useI18nContext = useI18nContext;
//# sourceMappingURL=I18nProvider.js.map