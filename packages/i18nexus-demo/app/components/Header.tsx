"use client";

import { useLanguageSwitcher, useTranslation } from "i18nexus";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const {
    t
  } = useTranslation();
  const {
    currentLanguage,
    changeLanguage,
    availableLanguages
  } = useLanguageSwitcher();
  const pathname = usePathname();
  const navItems = [{
    href: "/",
    label: currentLanguage === "ko" ? t("홈") : "Home"
  }, {
    href: "/provider",
    label: currentLanguage === "ko" ? "Provider" : "Provider"
  }, {
    href: "/cli",
    label: currentLanguage === "ko" ? t("CLI 도구") : "CLI Tools"
  }];
  return <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">i18</span>
              </div>
              <h1 className="text-xl font-semibold text-white">i18nexus</h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(item => <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                  {item.label}
                </Link>)}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <select value={currentLanguage} onChange={e => changeLanguage(e.target.value)} className="px-3 py-2 border border-slate-700 rounded-lg text-sm bg-slate-800 text-white hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
              {availableLanguages.map(lang => <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>)}
            </select>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map(item => <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                {item.label}
              </Link>)}
          </div>
        </div>
      </div>
    </nav>;
}