"use client";

import { useTranslation } from "i18nexus";
import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
  const {
    t
  } = useTranslation();
  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl mb-8 shadow-2xl shadow-blue-500/50">
          <span className="text-white font-bold text-3xl">i18</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 mb-6 leading-tight">
          i18nexus
        </h1>
        <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">{t("완전한 React i18n 자동화 툴킷")}</p>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">{t("하드코딩된 한국어를 자동으로 감지하여 t() 함수로 래핑하고, 번역 파일을\n          관리하는 완전 자동화된 국제화 솔루션입니다.")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quickstart" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105">{t("빠른 시작 →")}</Link>
          <Link href="/detail" className="px-8 py-4 border-2 border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-800 hover:border-slate-500 transition-all">{t("상세 설명")}</Link>
        </div>
      </div>

      {/* Before/After Code Transformation */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t("자동 코드 변환의 힘")}</h2>
          <p className="text-slate-400 text-lg">{t("한 줄의 명령어로 모든 한국어 텍스트를 자동 변환")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Before */}
          <div className="bg-slate-900 rounded-2xl border border-red-900/50 overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/50 to-transparent px-6 py-4 border-b border-red-900/50">
              <div className="flex items-center">
                <span className="text-2xl mr-3">❌</span>
                <h3 className="text-xl font-semibold text-red-300">{t("변환 전")}</h3>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-slate-950 text-slate-300 p-6 rounded-xl text-sm border border-slate-800 overflow-x-auto">
                <code>{t("export default function Welcome() {\n  return (\n    <div>\n      <h1>환영합니다</h1>\n      <p>i18nexus 사용법을 알아보세요</p>\n      <button>시작하기</button>\n    </div>\n  );\n}")}</code>
              </pre>
            </div>
          </div>

          {/* After */}
          <div className="bg-slate-900 rounded-2xl border border-green-900/50 overflow-hidden">
            <div className="bg-gradient-to-r from-green-900/50 to-transparent px-6 py-4 border-b border-green-900/50">
              <div className="flex items-center">
                <span className="text-2xl mr-3">✅</span>
                <h3 className="text-xl font-semibold text-green-300">{t("변환 후")}</h3>
              </div>
            </div>
            <div className="p-6">
              <pre className="bg-slate-950 text-slate-300 p-6 rounded-xl text-sm border border-slate-800 overflow-x-auto">
                <code>{t("import { useTranslation } from \"i18nexus\";\n\nexport default function Welcome() {\n  const { t } = useTranslation();\n  return (\n    <div>\n      <h1>{t(\"환영합니다\")}</h1>\n      <p>{t(\"i18nexus 사용법을 알아보세요\")}</p>\n      <button>{t(\"시작하기\")}</button>\n    </div>\n  );\n}")}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Command */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border-2 border-blue-800/50 rounded-xl px-8 py-4">
            <p className="text-slate-400 mb-2 text-sm">{t("실행 명령어")}</p>
            <code className="text-blue-300 text-lg font-mono font-semibold">
              npx i18n-wrapper --pattern "app/**/*.tsx"
            </code>
          </div>
        </div>
      </section>

      {/* Live Demo GIF */}
      <section className="mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">{t("실제 동작 모습")}</h2>
          <p className="text-slate-400 text-lg">{t("t-wrapper가 실시간으로 코드를 변환하는 과정")}</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8">
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            {/* GIF Placeholder - 실제 GIF로 교체하세요 */}
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-slate-400 text-lg">{t("t-wrapper 실행 데모 GIF")}</p>
                <p className="text-slate-500 text-sm mt-2">{t("(여기에 실제 GIF가 들어갑니다)")}</p>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-center mt-4 text-sm">{t("💡 자동으로 import 추가 → useTranslation 훅 주입 → 한국어 텍스트 래핑")}</p>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">{t("기능별 상세 가이드")}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/quickstart" className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("빠른 시작")}</h3>
            <p className="text-slate-400 text-sm">{t("3분 안에 프로젝트에 적용하기")}</p>
          </Link>

          <Link href="/tool" className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-indigo-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("CLI 도구")}</h3>
            <p className="text-slate-400 text-sm">{t("자동화 도구 사용법")}</p>
          </Link>

          <Link href="/provider" className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🎨</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Provider</h3>
            <p className="text-slate-400 text-sm">{t("React Context 설정")}</p>
          </Link>

          <Link href="/detail" className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 hover:border-pink-500 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t("상세 설명")}</h3>
            <p className="text-slate-400 text-sm">{t("구조와 동작 원리")}</p>
          </Link>
        </div>
      </section>

      {/* Why i18nexus */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("왜 i18nexus인가?")}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-800/50 rounded-xl p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-blue-300 mb-3">{t("자동화 우선")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("수동으로 하나하나 t() 함수를 추가할 필요 없이, CLI 도구가 자동으로 모든 한국어 텍스트를 감지하고 변환합니다.")}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/50 to-indigo-900/30 border border-indigo-800/50 rounded-xl p-6">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-indigo-300 mb-3">{t("완벽한 SSR 지원")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("Next.js App Router와 완벽하게 통합되어 하이드레이션 문제가 전혀 없습니다. 쿠키 기반 언어 관리로 첫 렌더링부터 올바른 언어를 표시합니다.")}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 border border-purple-800/50 rounded-xl p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-purple-300 mb-3">{t("개발자 친화적")}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t("복잡한 설정 없이 바로 시작할 수 있습니다. TypeScript 완벽 지원으로 타입 안전성을 보장하며, 직관적인 API를 제공합니다.")}</p>
          </div>
        </div>
      </section>
    </main>;
}