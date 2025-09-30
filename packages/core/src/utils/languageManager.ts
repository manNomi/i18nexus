import { getCookie, setCookie, CookieOptions } from "./cookie";

export interface LanguageConfig {
  code: string;
  name: string;
  flag?: string;
}

export interface LanguageManagerOptions {
  availableLanguages: LanguageConfig[];
  defaultLanguage: string;
  cookieName?: string;
  cookieOptions?: CookieOptions;
}

export class LanguageManager {
  private availableLanguages: LanguageConfig[];
  private defaultLanguage: string;
  private cookieName: string;
  private cookieOptions: CookieOptions;
  private currentLanguage: string;
  private listeners: ((language: string) => void)[] = [];

  constructor(options: LanguageManagerOptions) {
    this.availableLanguages = options.availableLanguages;
    this.defaultLanguage = options.defaultLanguage;
    this.cookieName = options.cookieName || "i18nexus-lang";
    this.cookieOptions = options.cookieOptions || { expires: 365, path: "/" };

    // Initialize current language from cookie or default
    const savedLanguage = getCookie(this.cookieName);
    this.currentLanguage = this.isValidLanguage(savedLanguage)
      ? savedLanguage!
      : this.defaultLanguage;
  }

  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  public getAvailableLanguages(): LanguageConfig[] {
    return [...this.availableLanguages];
  }

  public setLanguage(language: string): boolean {
    if (!this.isValidLanguage(language)) {
      console.warn(`Invalid language: ${language}`);
      return false;
    }

    if (this.currentLanguage === language) {
      return true;
    }

    this.currentLanguage = language;
    setCookie(this.cookieName, language, this.cookieOptions);

    // Notify all listeners
    this.listeners.forEach((listener) => listener(language));

    return true;
  }

  public addLanguageChangeListener(
    callback: (language: string) => void
  ): () => void {
    this.listeners.push(callback);

    // Return cleanup function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public getLanguageConfig(code: string): LanguageConfig | undefined {
    return this.availableLanguages.find((lang) => lang.code === code);
  }

  private isValidLanguage(language: string | null): boolean {
    if (!language) return false;
    return this.availableLanguages.some((lang) => lang.code === language);
  }
}

export const defaultLanguageManager = new LanguageManager({
  availableLanguages: [
    { code: "en", name: "English" },
    { code: "ko", name: "한국어" },
  ],
  defaultLanguage: "en",
});
