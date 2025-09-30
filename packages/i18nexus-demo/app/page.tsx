"use client";
import { useTranslation } from "i18nexus";
import Header from "./components/Header";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <span className="text-white font-bold text-2xl">i18</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("i18nexus 완전 가이드")}
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("설치부터 고급 사용법까지")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {t("시작하기")}
            </button>
            <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors">
              {t("문서 보기")}
            </button>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 p-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-blue-600 font-semibold">💡</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              {t("i18nexus 소개")}
            </h2>
          </div>
          <p className="text-lg text-slate-400 mb-6 leading-relaxed">
            {t(
              "i18nexus에 대해 알아보고 React 국제화를 위한 완벽한 솔루션인 이유를 확인하세요."
            )}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                {t("i18nexus란?")}
              </h3>
              <p className="text-slate-400">
                {t(
                  "자동 코드 변환과 구글 시트 연동으로 국제화를 단순화하는 완전한 React i18n 툴킷입니다."
                )}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                {t("왜 i18nexus인가?")}
              </h3>
              <p className="text-slate-400">
                {t(
                  "자동화 우선 접근법과 개발자 친화적 도구로 기존 i18n 라이브러리의 복잡성을 해결합니다."
                )}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">주요 특징</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✅</span>
                <div>
                  <p className="font-medium text-white">쿠키 기반 언어 관리</p>
                  <p className="text-sm text-slate-400">
                    자동 브라우저 언어 감지 및 지속적 저장
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✅</span>
                <div>
                  <p className="font-medium text-white">완전한 SSR 지원</p>
                  <p className="text-sm text-slate-400">
                    Next.js 서버 사이드 렌더링 완벽 호환
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✅</span>
                <div>
                  <p className="font-medium text-white">자동 코드 변환</p>
                  <p className="text-sm text-slate-400">
                    t-wrapper CLI로 하드코딩된 문자열 자동 래핑
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✅</span>
                <div>
                  <p className="font-medium text-white">구글 시트 연동</p>
                  <p className="text-sm text-slate-400">
                    번역 팀과의 원활한 협업을 위한 통합
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✅</span>
                <div>
                  <p className="font-medium text-white">TypeScript 지원</p>
                  <p className="text-sm text-slate-400">
                    완전한 타입 안전성과 자동 완성
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 mt-1">✅</span>
                <div>
                  <p className="font-medium text-white">성능 최적화</p>
                  <p className="text-sm text-slate-400">
                    React 18 동시성 기능 완벽 호환
                  </p>
                </div>
              </div>
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
