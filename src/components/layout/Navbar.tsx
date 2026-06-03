"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LOCALE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";
import {
  Globe,
  Menu,
  X,
  Search,
  BarChart3,
  Brain,
  Building2,
  ChevronDown,
  TrendingUp,
} from "lucide-react";

export default function Navbar() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || "pt-BR";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { href: "/explorer", label: t("nav.explorer"), icon: Search },
    { href: "/dashboard", label: t("nav.dashboard"), icon: BarChart3 },
    { href: "/strategy", label: t("nav.strategy"), icon: Brain },
    { href: "/sme", label: t("nav.sme"), icon: Building2 },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <TrendingUp className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Mercosur<span className="text-emerald-400">Intel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-navy-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right side: Language + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-navy-300 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {LOCALE_CONFIG[currentLocale]?.flag}{" "}
                  {LOCALE_CONFIG[currentLocale]?.short}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              {langOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 py-1.5 glass-card z-50 animate-slide-down">
                    {(
                      Object.entries(LOCALE_CONFIG) as [
                        Locale,
                        (typeof LOCALE_CONFIG)[Locale],
                      ][]
                    ).map(([locale, config]) => (
                      <Link
                        key={locale}
                        href={pathname || "/"}
                        locale={locale}
                        onClick={() => setLangOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          currentLocale === locale
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-navy-200 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-lg">{config.flag}</span>
                        <span>{config.name}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-navy-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
