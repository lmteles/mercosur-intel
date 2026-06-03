"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { hsCodesData } from "@/data/seed";
import { formatHSCode } from "@/lib/utils";
import {
  Brain,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Target,
  Shield,
  Loader2,
  ArrowRight,
} from "lucide-react";

interface Strategy {
  title: string;
  description: string;
  confidence: number;
  potential: "high" | "medium" | "low";
}

export default function StrategyPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params.locale as string) || "pt-BR";

  const [selectedHS, setSelectedHS] = useState("");
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);

  const generateStrategy = async () => {
    if (!selectedHS) return;
    setLoading(true);
    setStrategies([]);

    try {
      // Fetch tariff data first
      const tariffRes = await fetch(`/api/tariff?hs=${selectedHS}&locale=${locale}`);
      const tariffData = tariffRes.ok ? await tariffRes.json() : null;

      // Fetch trade data
      const tradeRes = await fetch(`/api/trade-flow?hs=${selectedHS}`);
      const tradeData = tradeRes.ok ? await tradeRes.json() : null;

      // Generate strategy
      const stratRes = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hsCode: selectedHS, tariffData, tradeData, locale }),
      });

      if (stratRes.ok) {
        const data = await stratRes.json();
        setStrategies(data.strategies || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const potentialConfig = {
    high: { color: "text-emerald-400", bg: "bg-emerald-500/15", icon: TrendingUp },
    medium: { color: "text-gold-400", bg: "bg-gold-500/15", icon: Target },
    low: { color: "text-navy-400", bg: "bg-navy-500/15", icon: Shield },
  };

  const strategyIcons = [TrendingUp, Target, Shield];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/5 flex items-center justify-center">
                <Brain className="w-5 h-5 text-gold-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {t("strategy.title")}
              </h1>
            </div>
            <p className="text-navy-400 max-w-3xl">
              {t("strategy.subtitle")}
            </p>
          </div>

          {/* LEGAL DISCLAIMER — CRITICAL */}
          <div className="legal-disclaimer mb-8 animate-fade-in" role="alert" id="legal-disclaimer">
            <p className="leading-relaxed">
              {t("strategy.legalDisclaimer")}
            </p>
          </div>

          {/* Product Selection & Generate */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-slide-up">
            <select
              value={selectedHS}
              onChange={(e) => setSelectedHS(e.target.value)}
              className="flex-1 px-4 py-3.5 bg-navy-800/60 border border-navy-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm"
              id="strategy-product-selector"
            >
              <option value="">{t("strategy.selectProduct")}</option>
              {hsCodesData.map((h) => (
                <option key={h.hsCode} value={h.hsCode}>
                  {formatHSCode(h.hsCode)} — {h.descriptions[locale] || h.descriptions["pt-BR"]}
                </option>
              ))}
            </select>
            <button
              onClick={generateStrategy}
              disabled={!selectedHS || loading}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-gold-600/20 hover:shadow-gold-500/30"
              id="generate-strategy-btn"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {loading ? t("strategy.generating") : t("strategy.generateStrategy")}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Strategy Cards */}
          {strategies.length > 0 && !loading && (
            <div className="space-y-6">
              {strategies.map((strategy, i) => {
                const config = potentialConfig[strategy.potential];
                const Icon = strategyIcons[i] || Target;

                return (
                  <div
                    key={i}
                    className="glass-card p-6 sm:p-8 animate-slide-up"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-start gap-5">
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/10 flex items-center justify-center border border-emerald-500/20">
                        <span className="text-lg font-bold text-emerald-400">
                          {i + 1}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-white">
                            {strategy.title}
                          </h3>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
                            {t(`strategy.${strategy.potential}Potential`)}
                          </span>
                        </div>

                        <p className="text-sm text-navy-300 leading-relaxed mb-4">
                          {strategy.description}
                        </p>

                        {/* Confidence Bar */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-navy-500">
                            {t("strategy.confidence")}
                          </span>
                          <div className="flex-1 max-w-xs h-2 bg-navy-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                              style={{ width: `${strategy.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-emerald-400">
                            {strategy.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {strategies.length === 0 && !loading && (
            <div className="text-center py-16 animate-fade-in">
              <Sparkles className="w-12 h-12 text-navy-600 mx-auto mb-4" />
              <p className="text-navy-500 mb-2">
                {t("strategy.selectProduct")}
              </p>
              <p className="text-xs text-navy-600">
                <ArrowRight className="w-3 h-3 inline mr-1" />
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
