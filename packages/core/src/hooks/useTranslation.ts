import { useI18nContext } from "../components/I18nProvider";

export const useTranslation = (namespace: string = "") => {
  const context = useI18nContext();

  const t = (key: string): string => {
    // namespace가 있는 경우 key 앞에 namespace를 붙임
    const finalKey = namespace ? `${namespace}.${key}` : key;
    return context.t(finalKey);
  };

  return {
    t,
    changeLanguage: context.changeLanguage,
    currentLanguage: context.currentLanguage,
    availableLanguages: context.availableLanguages,
  };
};

export const useLanguageSwitcher = () => {
  const context = useI18nContext();

  return {
    currentLanguage: context.currentLanguage,
    changeLanguage: context.changeLanguage,
    availableLanguages: context.availableLanguages,
  };
};
