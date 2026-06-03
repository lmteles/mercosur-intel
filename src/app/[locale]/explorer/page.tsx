"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { formatHSCode } from "@/lib/utils";
import { PHASE_OUT_CATEGORIES, type PhaseOutCategory } from "@/lib/constants";
import {
  Search,
  ArrowDown,
  ArrowRight,
  TrendingDown,
  Clock,
  FileCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Package,
  ShieldCheck,
  Percent,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface TariffData {
  hsCode: string;
  description: string;
  chapter: string;
  section: string;
  currentMFN: number;
  agreementRate: number;
  category: PhaseOutCategory;
  categoryLabel: string;
  phaseOutYears: number;
  yearsRemaining: number;
  progress: number;
  quotaApplies: boolean;
  quotaVolume?: number;
  rulesOfOrigin: {
    tariffClassification: boolean;
    valueAdded?: number;
    specificProcessing?: string;
  };
}

interface Suggestion {
  hsCode: string;
  description: string;
  confidence: number;
}

export default function ExplorerPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params.locale as string) || "pt-BR";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tariffData, setTariffData] = useState<TariffData | null>(null);
  const [rooExpanded, setRooExpanded] = useState(false);

  // Debounced search for suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/hs-resolve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, locale }),
        });
        const data = await res.json();
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
          setShowSuggestions(true);
        } else if (data.hsCode) {
          setSuggestions([{ hsCode: data.hsCode, description: data.description, confidence: data.confidence }]);
          setShowSuggestions(true);
        }
      } catch (e) {
        console.error(e);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, locale]);

  const handleSearch = useCallback(
    async (hsCode?: string) => {
      const searchCode = hsCode || suggestions[0]?.hsCode;
      if (!searchCode) return;

      setLoading(true);
      setShowSuggestions(false);

      try {
        const res = await fetch(`/api/tariff?hs=${searchCode}&locale=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setTariffData(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [suggestions, locale]
  );

  const selectSuggestion = (s: Suggestion) => {
    setQuery(`${formatHSCode(s.hsCode)} — ${s.description}`);
    setShowSuggestions(false);
    handleSearch(s.hsCode);
  };

  const categoryColorMap: Record<PhaseOutCategory, string> = {
    A: "text-emerald-400 bg-emerald-500/15",
    B: "text-sky-400 bg-sky-500/15",
    C: "text-gold-400 bg-gold-500/15",
    D: "text-orange-400 bg-orange-500/15",
    E: "text-danger-400 bg-danger-500/15",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {t("explorer.title")}
            </h1>
            <p className="text-navy-400 max-w-2xl mx-auto">
              {t("explorer.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-12 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t("explorer.searchPlaceholder")}
                className="w-full pl-12 pr-32 py-4 bg-navy-800/60 border border-navy-700/50 rounded-2xl text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all text-base"
                id="product-search"
              />
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors text-sm"
              >
                {t("common.search")}
              </button>
            </div>
            <p className="text-xs text-navy-500 mt-2 ml-1">
              {t("explorer.searchHint")}
            </p>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-30">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => selectSuggestion(s)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <Package className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-mono text-emerald-400">
                        {formatHSCode(s.hsCode)}
                      </span>
                      <p className="text-sm text-navy-200 truncate">
                        {s.description}
                      </p>
                    </div>
                    <span className="text-xs text-navy-500 flex-shrink-0">
                      {Math.round(s.confidence * 100)}%
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard className="md:col-span-2" />
            </div>
          )}

          {/* Results */}
          {tariffData && !loading && (
            <div className="space-y-6 animate-fade-in">
              {/* Product Header */}
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-sm font-mono px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400">
                    {formatHSCode(tariffData.hsCode)}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColorMap[tariffData.category]}`}>
                    {t("explorer.category")} {tariffData.category} — {t(`explorer.category${tariffData.category}`)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">
                  {tariffData.description}
                </h2>
                <p className="text-sm text-navy-400 mt-1">{tariffData.section}</p>
              </div>

              {/* Tariff Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current MFN */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-gold-500" />
                    <h3 className="font-semibold text-navy-200">
                      {t("explorer.currentMFN")}
                    </h3>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {tariffData.currentMFN}%
                  </div>
                  <p className="text-sm text-navy-400">
                    MFN (Most Favoured Nation)
                  </p>
                </div>

                {/* Agreement Rate */}
                <div className="glass-card p-6 border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-navy-200">
                      {t("explorer.agreementRate")}
                    </h3>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-emerald-400">
                      {tariffData.agreementRate}%
                    </span>
                    {tariffData.currentMFN > 0 && (
                      <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full mb-1">
                        -{Math.round(((tariffData.currentMFN - tariffData.agreementRate) / tariffData.currentMFN) * 100)}%{" "}
                        {t("common.savings")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-navy-400 mt-1">
                    EU-Mercosur iTA
                  </p>
                </div>
              </div>

              {/* Phase-Out Timeline */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-sky-400" />
                  <h3 className="font-semibold text-navy-200">
                    {t("explorer.phaseOut")}
                  </h3>
                </div>
                <p className="text-sm text-navy-400 mb-6">
                  {t("explorer.phaseOutDescription")}
                </p>

                {tariffData.category === "A" ? (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-emerald-400">
                        {t("explorer.immediateElimination")}
                      </p>
                      <p className="text-sm text-navy-400">
                        {t("explorer.zeroTariff")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-navy-400">
                          {t("explorer.phaseOut")}
                        </span>
                        <span className="text-sm font-semibold text-emerald-400">
                          {tariffData.progress}%
                        </span>
                      </div>
                      <div className="progress-track h-3">
                        <div
                          className="progress-fill h-full relative"
                          style={{ width: `${tariffData.progress}%` }}
                        >
                          {tariffData.progress > 5 && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-emerald-500/50 animate-pulse-glow" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline steps */}
                    <div className="flex items-center justify-between text-xs text-navy-500">
                      <span>2026 (0%)</span>
                      <span className="font-semibold text-emerald-400">
                        {t("explorer.yearsRemaining", { count: tariffData.yearsRemaining })}
                      </span>
                      <span>
                        {2026 + tariffData.phaseOutYears} (0%)
                      </span>
                    </div>
                  </>
                )}

                {/* Quota Info */}
                {tariffData.quotaApplies && (
                  <div className="mt-5 p-4 bg-gold-500/5 rounded-xl border border-gold-500/15">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-4 h-4 text-gold-400" />
                      <span className="text-sm font-semibold text-gold-400">
                        {t("explorer.quotaInfo")}
                      </span>
                    </div>
                    <p className="text-sm text-navy-300">
                      {t("explorer.quotaVolume")}: {tariffData.quotaVolume?.toLocaleString()}{" "}
                      {t("explorer.tonnes")}
                    </p>
                  </div>
                )}
              </div>

              {/* Rules of Origin */}
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setRooExpanded(!rooExpanded)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-sky-400" />
                    <h3 className="font-semibold text-navy-200">
                      {t("explorer.rulesOfOrigin")}
                    </h3>
                  </div>
                  {rooExpanded ? (
                    <ChevronUp className="w-5 h-5 text-navy-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-navy-400" />
                  )}
                </button>

                {rooExpanded && (
                  <div className="px-6 pb-6 space-y-4 animate-slide-down">
                    <p className="text-sm text-navy-400">
                      {t("explorer.rulesOfOriginDesc")}
                    </p>

                    <div className="space-y-3">
                      {tariffData.rulesOfOrigin.tariffClassification && (
                        <div className="flex items-start gap-3 p-3 bg-navy-800/40 rounded-xl">
                          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-navy-200">
                              {t("explorer.tariffClassification")}
                            </p>
                            <p className="text-xs text-navy-400 mt-0.5">
                              Change in Tariff Classification (CTC) at heading level
                            </p>
                          </div>
                        </div>
                      )}
                      {tariffData.rulesOfOrigin.valueAdded && (
                        <div className="flex items-start gap-3 p-3 bg-navy-800/40 rounded-xl">
                          <Percent className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-navy-200">
                              {t("explorer.valueAdded")}:{" "}
                              <span className="text-sky-400">{tariffData.rulesOfOrigin.valueAdded}%</span>
                            </p>
                            <p className="text-xs text-navy-400 mt-0.5">
                              Minimum regional value-added content requirement
                            </p>
                          </div>
                        </div>
                      )}
                      {tariffData.rulesOfOrigin.specificProcessing && (
                        <div className="flex items-start gap-3 p-3 bg-navy-800/40 rounded-xl">
                          <FileCheck className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-navy-200">
                              {t("explorer.specificProcessing")}
                            </p>
                            <p className="text-xs text-navy-400 mt-0.5">
                              {tariffData.rulesOfOrigin.specificProcessing}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!tariffData && !loading && (
            <div className="text-center py-20 animate-fade-in">
              <Search className="w-12 h-12 text-navy-600 mx-auto mb-4" />
              <p className="text-navy-500">
                {t("explorer.searchHint")}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
