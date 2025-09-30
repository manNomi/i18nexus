"use client";
import { useTranslation } from "i18nexus";
import Header from "../components/Header";

export default function ArchitecturePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t("아키텍처 및 원칙")}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t(
              "현대적 원칙으로 구축되고 확장성과 유지보수성을 위해 설계되었습니다."
            )}
          </p>
        </div>

        {/* Architecture Diagram */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            시스템 아키텍처
          </h2>
          <div className="bg-slate-950 text-white p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              {`┌─────────────────────────────────────────┐
│              React App                  │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │         I18nProvider                │ │
│ │  ┌─────────────────────────────────┐ │ │
│ │  │    LanguageManager              │ │ │
│ │  │  ┌─────────────────────────────┐ │ │ │
│ │  │  │ Cookie Storage              │ │ │ │
│ │  │  │ Google Sheets API           │ │ │ │
│ │  │  │ Local Storage               │ │ │ │
│ │  │  └─────────────────────────────┘ │ │ │
│ │  └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│           i18nexus-cli                  │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │        Commands                     │ │
│ │  - pull                             │ │
│ │  - add-string                       │ │
│ │  - import                           │ │
│ │  - listen                           │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘`}
            </pre>
          </div>
        </section>

        {/* Design Principles */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("설계 원칙")}
          </h2>
          <div className="space-y-6">
            {/* Principle 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t("개발자 경험 최우선")}
                </h3>
                <p className="text-slate-400 mb-3">
                  {t("최소한의 설정으로 최대한의 기능 제공")}
                </p>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• 직관적이고 예측 가능한 API</li>
                  <li>• 강력한 TypeScript 지원</li>
                  <li>• 상세한 에러 메시지</li>
                  <li>• 포괄적인 문서화</li>
                </ul>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t("자동화 지향")}
                </h3>
                <p className="text-slate-400 mb-3">
                  {t("자동 코드 변환 및 번역 관리")}
                </p>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• 하드코딩된 문자열 자동 래핑</li>
                  <li>• 구글 시트 자동 동기화</li>
                  <li>• 번역 키 자동 추출</li>
                  <li>• 실시간 업데이트</li>
                </ul>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t("성능 최적화")}
                </h3>
                <p className="text-slate-400 mb-3">
                  {t("불필요한 재렌더링 방지 및 상태 관리 최적화")}
                </p>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• 메모이제이션 활용</li>
                  <li>• 최적화된 상태 관리</li>
                  <li>• React 18 동시성 지원</li>
                  <li>• 지연 로딩 지원</li>
                </ul>
              </div>
            </div>

            {/* Principle 4 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔧</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  확장성
                </h3>
                <p className="text-slate-400 mb-3">
                  플러그인 아키텍처로 기능 확장 가능
                </p>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• 커스텀 번역 로더</li>
                  <li>• 다양한 스토리지 백엔드</li>
                  <li>• 플러그인 시스템</li>
                  <li>• 커스텀 포맷터</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Components */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">핵심 컴포넌트</h2>

          <div className="space-y-6">
            {/* I18nProvider */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                I18nProvider
              </h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  languageManagerOptions,
  translations = {},
  onLanguageChange,
}) => {
  // 상태 관리
  const [languageManager] = useState(
    () => new LanguageManager(languageManagerOptions)
  );
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    languageManagerOptions?.defaultLanguage || "ko"
  );
  
  // Context 값 구성
  const contextValue: I18nContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages: languageManager.getAvailableLanguages(),
    translations,
  };
  
  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};`}
                </pre>
              </div>
            </div>

            {/* LanguageManager */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                LanguageManager
              </h3>
              <div className="bg-slate-950 text-white p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`export class LanguageManager {
  private currentLanguage: string;
  
  constructor(options: LanguageManagerOptions) {
    this.currentLanguage = options.defaultLanguage || 'ko';
    this.initialize();
  }
  
  async setLanguage(lang: string): Promise<void> {
    if (!this.isValidLanguage(lang)) {
      throw new Error(\`지원하지 않는 언어: \${lang}\`);
    }
    
    this.currentLanguage = lang;
    await this.saveLanguageToCookie(lang);
  }
  
  private async saveLanguageToCookie(lang: string): Promise<void> {
    setCookie('i18nexus-language', lang, {
      expires: 365,
      path: '/',
      sameSite: 'lax',
    });
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Package Structure */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">패키지 구조</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                  i18nexus
                </span>
              </div>
              <p className="text-slate-300 mb-3">
                클라이언트 라이브러리 (React 컴포넌트, 훅 등)
              </p>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• I18nProvider</li>
                <li>• useTranslation</li>
                <li>• useLanguageSwitcher</li>
                <li>• LanguageManager</li>
              </ul>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium">
                  i18nexus-cli
                </span>
              </div>
              <p className="text-slate-300 mb-3">
                개발 도구들 (코드 변환, 추출, 구글 시트 연동)
              </p>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• pull - 번역 다운로드</li>
                <li>• add-string - 문자열 추가</li>
                <li>• import - JSON 가져오기</li>
                <li>• listen - 실시간 업데이트</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500">Built with ❤️ by i18nexus Team</p>
        </div>
      </footer>
    </div>
  );
}
