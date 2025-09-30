// "use client";

// import NewTestComponent from "./components/NewTestComponent";

// export default function Home() {
//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         {/* Background gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>

//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             {/* Logo */}
//             <div className="mb-8">
//               <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
//                 i18nexus
//               </h1>
//               <h2 className="text-2xl text-gray-300 mb-2">
//                 완전한 React i18n 툴킷
//               </h2>
//               <p className="text-lg text-gray-400 mb-8">
//                 쿠키 기반 언어 관리 기능 포함
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex gap-4 justify-center mb-12">
//               <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
//                 시작하기
//               </button>
//               <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-all">
//                 GitHub에서 보기
//               </button>
//             </div>

//             {/* Live Demo */}
//             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-100">
//                   실시간 데모
//                 </h3>
//               </div>

//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
//                 <div className="text-left">
//                   <p className="text-gray-400 text-sm mb-2">
//                     CLI 도구로 변환 전 하드코딩된 한국어 텍스트
//                   </p>
//                   <p className="text-2xl font-bold text-green-400">
//                     안녕 세상
//                   </p>
//                   <p className="text-gray-300 mt-2">
//                     i18nexus에 오신 것을 환영합니다
//                   </p>
//                   <p className="text-gray-400 text-sm mt-4">
//                     이 텍스트들은 CLI 도구로 자동 변환할 수 있습니다
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CLI Tools Section */}
//       <div className="py-24 bg-gray-800/30">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h3 className="text-4xl font-bold text-gray-100 mb-4">
//               CLI 사용법
//             </h3>
//             <p className="text-xl text-gray-400">
//               강력한 CLI 도구로 i18n 워크플로우를 자동화하세요
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 mb-16">
//             {/* CLI Installation */}
//             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
//                   📦
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-100">
//                   설치
//                 </h4>
//               </div>
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
//                 <pre className="text-sm text-gray-300">
//                   <code>{`# 핵심 패키지 설치
// npm install i18nexus-core

// # CLI 도구 설치 (전역 또는 개발 의존성)
// npm install -g i18nexus-cli-tools
// # 또는
// npm install --save-dev i18nexus-cli-tools`}</code>
//                 </pre>
//               </div>
//             </div>

//             {/* Basic CLI Usage */}
//             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
//                   ⚡
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-100">
//                   기본 사용법
//                 </h4>
//               </div>
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
//                 <pre className="text-sm text-gray-300">
//                   <code>{`# 하드코딩된 문자열을 t() 함수 호출로 변환
// npx i18n-wrapper -p "src/**/*.tsx" -g -n "common"

// # 파일 수정 없이 변경사항 미리보기
// npx i18n-wrapper --dry-run

// # 영어 텍스트도 함께 처리
// npx i18n-wrapper -p "src/**/*.tsx" -g --english`}</code>
//                 </pre>
//               </div>
//             </div>
//           </div>

//           {/* Advanced CLI Options */}
//           <div className="mb-16">
//             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
//                   🔧
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-100">
//                   고급 옵션
//                 </h4>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h5 className="text-lg font-semibold text-gray-200 mb-3">
//                     명령어 옵션
//                   </h5>
//                   <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
//                     <pre className="text-sm text-gray-300">
//                       <code>{`옵션:
//   -p, --pattern <pattern>    처리할 파일 패턴
//   -g, --generate-keys        번역 키 생성
//   -n, --namespace <ns>       번역 네임스페이스
//   -e, --english             영어 텍스트 처리
//   --key-prefix <prefix>      생성된 키 접두사
//   -o, --output-dir <dir>     출력 디렉토리
//   -d, --dry-run             미리보기 모드
//   -h, --help                도움말 표시`}</code>
//                     </pre>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="text-lg font-semibold text-gray-200 mb-3">
//                     사용 예시
//                   </h5>
//                   <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
//                     <pre className="text-sm text-gray-300">
//                       <code>{`# 네임스페이스와 함께 커스텀 패턴
// npx i18n-wrapper -p "app/**/*.tsx" -g -n "components"

// # 커스텀 출력 디렉토리
// npx i18n-wrapper -g -o "./translations"

// # 키 접두사 사용
// npx i18n-wrapper -g --key-prefix "app"`}</code>
//                     </pre>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* CLI Features */}
//           <div>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
//                 <div className="text-3xl mb-3">🎯</div>
//                 <h5 className="text-lg font-semibold text-gray-100 mb-2">
//                   스마트 감지
//                 </h5>
//                 <p className="text-gray-400 text-sm">
//                   JSX에서 한국어 및 영어 텍스트 자동 감지
//                 </p>
//               </div>
//               <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
//                 <div className="text-3xl mb-3">🔧</div>
//                 <h5 className="text-lg font-semibold text-gray-100 mb-2">
//                   자동 Import
//                 </h5>
//                 <p className="text-gray-400 text-sm">
//                   useTranslation 훅 및 Import 자동 추가
//                 </p>
//               </div>
//               <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
//                 <div className="text-3xl mb-3">📁</div>
//                 <h5 className="text-lg font-semibold text-gray-100 mb-2">
//                   키 생성
//                 </h5>
//                 <p className="text-gray-400 text-sm">
//                   네임스페이스로 체계적인 번역 파일 생성
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Google Sheets Integration */}
//       <div className="py-24">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h3 className="text-4xl font-bold text-gray-100 mb-4">
//               Google Sheets 연동
//             </h3>
//             <p className="text-xl text-gray-400">
//               팀 협업을 위해 Google Sheets와 번역을 동기화하세요
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 mb-16">
//             {/* Setup */}
//             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
//                   🔑
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-100">
//                   인증 설정
//                 </h4>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
//                   <h5 className="text-sm font-semibold text-gray-200 mb-2">
//                     1. 서비스 계정 생성
//                   </h5>
//                   <p className="text-sm text-gray-400">
//                     Google Cloud Console > APIs & Services > Credentials 이동
//                   </p>
//                 </div>
//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
//                   <h5 className="text-sm font-semibold text-gray-200 mb-2">
//                     2. JSON 키 다운로드
//                   </h5>
//                   <p className="text-sm text-gray-400">
//                     프로젝트에{" "}
//                     <code className="bg-gray-800 px-1 rounded">
//                       credentials.json
//                     </code>
//                     으로 저장
//                   </p>
//                 </div>
//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
//                   <h5 className="text-sm font-semibold text-gray-200 mb-2">
//                     3. API 활성화
//                   </h5>
//                   <p className="text-sm text-gray-400">
//                     Google Sheets API 및 Google Drive API 활성화
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Sync Commands */}
//             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
//               <div className="flex items-center mb-6">
//                 <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
//                   🔄
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-100">
//                   번역 동기화
//                 </h4>
//               </div>
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
//                 <pre className="text-sm text-gray-300">
//                   <code>{`# Google Sheets에 번역 업로드
// npx i18n-sheets upload \\
//   --sheet-id "your-sheet-id" \\
//   --credentials "credentials.json" \\
//   --locales-dir "./locales"

// # Google Sheets에서 번역 다운로드
// npx i18n-sheets download \\
//   --sheet-id "your-sheet-id" \\
//   --credentials "credentials.json" \\
//   --output-dir "./locales"

// # 양방향 동기화
// npx i18n-sheets sync \\
//   --sheet-id "your-sheet-id" \\
//   --credentials "credentials.json"`}</code>
//                 </pre>
//               </div>
//             </div>
//           </div>

//           {/* Workflow Example */}
//           <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
//                 🔄
//               </div>
//               <h4 className="text-xl font-semibold text-gray-100">
//                 완전한 워크플로우
//               </h4>
//             </div>

//             <div className="grid md:grid-cols-4 gap-4">
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
//                 <div className="text-2xl mb-2">1️⃣</div>
//                 <h5 className="text-sm font-semibold text-gray-200 mb-1">
//                   텍스트 추출
//                 </h5>
//                 <p className="text-xs text-gray-400">
//                   CLI로 하드코딩된 문자열 변환
//                 </p>
//               </div>
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
//                 <div className="text-2xl mb-2">2️⃣</div>
//                 <h5 className="text-sm font-semibold text-gray-200 mb-1">
//                   Sheets 업로드
//                 </h5>
//                 <p className="text-xs text-gray-400">
//                   번역 키를 Google Sheets에 동기화
//                 </p>
//               </div>
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
//                 <div className="text-2xl mb-2">3️⃣</div>
//                 <h5 className="text-sm font-semibold text-gray-200 mb-1">
//                   팀 번역
//                 </h5>
//                 <p className="text-xs text-gray-400">
//                   익숙한 스프레드시트에서 번역 작업
//                 </p>
//               </div>
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
//                 <div className="text-2xl mb-2">4️⃣</div>
//                 <h5 className="text-sm font-semibold text-gray-200 mb-1">
//                   다운로드 & 배포
//                 </h5>
//                 <p className="text-xs text-gray-400">
//                   번역을 앱으로 다시 가져오기
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CLI 테스트 컴포넌트 */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h2 className="text-3xl font-bold text-white mb-8 text-center">
//           CLI 도구 테스트 결과
//         </h2>
//         <div className="flex justify-center">
//           <div>
//             <h3 className="text-xl font-semibold text-white mb-4">
//               CLI로 변환된 폼 컴포넌트
//             </h3>
//             <NewTestComponent />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
