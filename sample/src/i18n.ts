import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: {
        welcome: "Welcome to i18nexus",
        description:
          "This is a sample application demonstrating the i18nexus features.",
        currentLanguage: "Current Language",
        switchLanguage: "Switch Language",
        cookieDemo: "Cookie Demo",
        cookieDescription:
          "Your language preference is automatically saved in cookies and will be restored when you reload the page.",
        features: "Features",
        feature1: "Cookie-based language persistence",
        feature2: "React Context integration",
        feature3: "TypeScript support",
        feature4: "SSR compatibility",
        counter: "Counter",
        increment: "Increment",
        decrement: "Decrement",
        count: "Count: {{count}}",
      },
    },
    ko: {
      common: {
        welcome: "i18nexus에 오신 것을 환영합니다",
        description: "이것은 i18nexus 기능을 보여주는 샘플 애플리케이션입니다.",
        currentLanguage: "현재 언어",
        switchLanguage: "언어 변경",
        cookieDemo: "쿠키 데모",
        cookieDescription:
          "언어 선택은 자동으로 쿠키에 저장되며 페이지를 새로고침할 때 복원됩니다.",
        features: "기능",
        feature1: "쿠키 기반 언어 지속성",
        feature2: "React Context 통합",
        feature3: "TypeScript 지원",
        feature4: "SSR 호환성",
        counter: "카운터",
        increment: "증가",
        decrement: "감소",
        count: "개수: {{count}}",
      },
    },
    ja: {
      common: {
        welcome: "i18nexusへようこそ",
        description:
          "これはi18nexusの機能を実演するサンプルアプリケーションです。",
        currentLanguage: "現在の言語",
        switchLanguage: "言語を切り替える",
        cookieDemo: "クッキーデモ",
        cookieDescription:
          "言語設定は自動的にクッキーに保存され、ページをリロードすると復元されます。",
        features: "機能",
        feature1: "クッキーベースの言語永続化",
        feature2: "React Context統合",
        feature3: "TypeScriptサポート",
        feature4: "SSR互換性",
        counter: "カウンター",
        increment: "増加",
        decrement: "減少",
        count: "カウント: {{count}}",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18n;
