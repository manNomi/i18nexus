"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18nContext = exports.I18nProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const languageManager_1 = require("../utils/languageManager");
const I18nContext = (0, react_1.createContext)(undefined);
const I18nProvider = ({ children, languageManagerOptions, translations = {}, onLanguageChange, }) => {
    const [languageManager] = (0, react_1.useState)(() => new languageManager_1.LanguageManager(languageManagerOptions));
    const [currentLanguage, setCurrentLanguage] = (0, react_1.useState)(languageManagerOptions?.defaultLanguage || 'en');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isHydrated, setIsHydrated] = (0, react_1.useState)(false);
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
            // i18nexus 자체 언어 관리
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
    // 클라이언트에서 hydration 완료 후 실제 언어 설정 로드
    (0, react_1.useEffect)(() => {
        setIsHydrated(true);
        // 쿠키에서 실제 언어 설정 읽기
        const actualLanguage = languageManager.getCurrentLanguage();
        if (actualLanguage !== currentLanguage) {
            setCurrentLanguage(actualLanguage);
            onLanguageChange?.(actualLanguage);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isHydrated)
            return;
        // 언어 변경 리스너 등록
        const removeListener = languageManager.addLanguageChangeListener((lang) => {
            if (lang !== currentLanguage) {
                setCurrentLanguage(lang);
                onLanguageChange?.(lang);
            }
        });
        return removeListener;
    }, [languageManager, currentLanguage, onLanguageChange, isHydrated]);
    const contextValue = {
        currentLanguage,
        changeLanguage,
        availableLanguages: languageManager.getAvailableLanguages(),
        languageManager,
        isLoading,
        translations,
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