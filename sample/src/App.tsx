import React, { useState } from "react";
import { I18nProvider, useTranslation, useLanguageSwitcher } from "i18nexus";
import "./i18n";
import "./App.css";

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, availableLanguages, changeLanguage } =
    useLanguageSwitcher();

  return (
    <div className="language-switcher">
      <label htmlFor="language-select">Language:</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select">
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang === "en" ? "English" : lang === "ko" ? "한국어" : "日本語"}
          </option>
        ))}
      </select>
    </div>
  );
};

const Counter: React.FC = () => {
  const { t } = useTranslation("common");
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h3>{t("counter")}</h3>
      <p>{t("count", { count })}</p>
      <div className="counter-buttons">
        <button onClick={() => setCount(count - 1)}>{t("decrement")}</button>
        <button onClick={() => setCount(count + 1)}>{t("increment")}</button>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { t, currentLanguage } = useTranslation("common");
  const { switchToNextLanguage } = useLanguageSwitcher();

  return (
    <div className="main-content">
      <header className="app-header">
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
      </header>

      <div className="demo-section">
        <h2>
          {t("currentLanguage")}: {currentLanguage}
        </h2>
        <LanguageSwitcher />
        <button onClick={switchToNextLanguage} className="switch-button">
          {t("switchLanguage")} 🔄
        </button>
      </div>

      <div className="demo-section">
        <h2>{t("cookieDemo")} 🍪</h2>
        <p>{t("cookieDescription")}</p>
      </div>

      <div className="demo-section">
        <h2>{t("features")} ✨</h2>
        <ul>
          <li>{t("feature1")}</li>
          <li>{t("feature2")}</li>
          <li>{t("feature3")}</li>
          <li>{t("feature4")}</li>
        </ul>
      </div>

      <div className="demo-section">
        <Counter />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider
      defaultLanguage="en"
      availableLanguages={["en", "ko", "ja"]}
      cookieName="i18n-toolkit-demo-lang"
      cookieOptions={{
        expires: 365,
        path: "/",
        secure: false, // Set to true in production with HTTPS
      }}>
      <div className="App">
        <MainContent />
      </div>
    </I18nProvider>
  );
};

export default App;
