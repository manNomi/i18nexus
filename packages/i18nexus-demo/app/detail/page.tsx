"use client";

import { useTranslation } from "i18nexus";
export default function DetailPage() {
  const {
    t
  } = useTranslation();
  return <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-6 shadow-lg shadow-pink-500/30">
          <span className="text-white font-bold text-2xl">📚</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mb-4">{t("상세 설명")}</h1>
        <p className="text-xl text-slate-300">{t("i18nexus의 구조와 동작 원리를 이해하세요")}</p>
      </div>

      {/* Architecture Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8">{t("시스템 아키텍처")}</h2>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mb-8">
          <pre className="text-slate-300 text-sm font-mono leading-relaxed overflow-x-auto">
            <code>{`┌─────────────────────────────────────────┐
│           Your React App                │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │      I18nProvider (Client)        │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   LanguageManager           │  │  │
│  │  │  • Cookie Storage            │  │  │
│  │  │  • Language Detection        │  │  │
│  │  │  • State Management          │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
             ↕
┌─────────────────────────────────────────┐
│        i18nexus-tools (CLI)             │
├─────────────────────────────────────────┤
│  • i18n-wrapper  → Auto wrap Korean     │
│  • i18n-extractor → Extract keys        │
│  • i18n-upload   → Sync with Sheets     │
│  • i18n-download → Pull translations    │
└─────────────────────────────────────────┘`}</code>
          </pre>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">{t("클라이언트 라이브러리")}</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">I18nProvider:</span>{t("React Context 프로바이더")}</div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">useTranslation:</span>{t("번역 함수 훅")}</div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">useLanguageSwitcher:</span>{t("언어 전환 훅")}</div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">LanguageManager:</span>{t("언어 관리 클래스")}</div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/50 to-indigo-900/30 border border-indigo-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">{t("CLI 도구들")}</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">i18n-wrapper:</span>{t("한국어 자동 래핑")}</div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">i18n-extractor:</span>{t("번역 키 추출")}</div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">i18n-upload:</span>{t("Google Sheets 업로드")}</div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">▸</span>
                <div>
                  <span className="font-semibold">i18n-download:</span>{t("Google Sheets 다운로드")}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-8">{t("동작 원리")}</h2>

        <div className="space-y-6">
          {/* Language Detection */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">{t("1️⃣ 언어 감지 및 설정")}</h3>
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <pre className="text-slate-300 text-sm">
                <code>{t("초기 로드 시:\n1. 쿠키에서 'i18n-language' 확인\n2. 쿠키가 없으면 브라우저 언어 감지 (선택적)\n3. 기본 언어(ko)로 폴백\n4. 감지된 언어를 React Context에 저장")}</code>
              </pre>
            </div>
          </div>

          {/* Translation Process */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">{t("2️⃣ 번역 프로세스")}</h3>
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <pre className="text-slate-300 text-sm">
                <code>{t("t(\"환영합니다\") 호출 시:\n1. Context에서 currentLanguage 가져오기\n2. translations[currentLanguage][\"환영합니다\"] 조회\n3. 번역값 반환 (없으면 키 자체 반환)\n4. React가 UI 업데이트")}</code>
              </pre>
            </div>
          </div>

          {/* Language Change */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">{t("3️⃣ 언어 전환 흐름")}</h3>
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <pre className="text-slate-300 text-sm">
                <code>{t("changeLanguage(\"en\") 호출 시:\n1. 새 언어를 쿠키에 저장\n2. Context 상태 업데이트\n3. 모든 useTranslation 사용 컴포넌트 리렌더\n4. 새로운 언어의 번역값으로 UI 업데이트")}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-8">{t("설계 원칙")}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-950/50 to-green-900/30 border border-green-800/50 rounded-xl p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-green-300 mb-3">{t("자동화 우선")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("수동 작업을 최소화하고 CLI 도구로 모든 반복 작업을 자동화합니다. 개발자는 코드 작성에만 집중하고, 나머지는 도구가 처리합니다.")}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-800/50 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">{t("개발자 경험 최우선")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("직관적인 API, 명확한 에러 메시지, 완벽한 TypeScript 지원으로 개발자가 쉽고 빠르게 사용할 수 있도록 설계되었습니다.")}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 border border-purple-800/50 rounded-xl p-6">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-purple-300 mb-3">{t("성능 최적화")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("불필요한 리렌더링을 방지하고, 메모이제이션을 활용하여 최적의 성능을 제공합니다. React 18의 동시성 기능과도 완벽하게 호환됩니다.")}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-950/50 to-pink-900/30 border border-pink-800/50 rounded-xl p-6">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="text-lg font-semibold text-pink-300 mb-3">{t("확장성")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("플러그인 시스템, 커스텀 로더, 다양한 스토리지 백엔드 지원으로 프로젝트의 요구사항에 맞게 확장할 수 있습니다.")}</p>
          </div>
        </div>
      </section>
    </main>;
}