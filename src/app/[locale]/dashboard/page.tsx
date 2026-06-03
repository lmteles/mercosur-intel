"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SkeletonChart, SkeletonMap } from "@/components/ui/SkeletonLoader";
import { formatTradeValue, formatPercentageChange } from "@/lib/utils";
import { hsCodesData } from "@/data/seed";
import { useParams } from "next/navigation";
import {
  BarChart3,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Globe2,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface AggregatedData {
  country: string;
  importValue: number;
  exportValue: number;
  yoyGrowth: number;
}

export default function DashboardPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params.locale as string) || "pt-BR";

  const [flow, setFlow] = useState<"import" | "export">("import");
  const [selectedHS, setSelectedHS] = useState("090111");
  const [data, setData] = useState<AggregatedData[]>([]);
  const [totals, setTotals] = useState({ imports: 0, exports: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/trade-flow?hs=${selectedHS}&flow=${flow}`
        );
        const json = await res.json();
        setData(json.aggregated || []);
        setTotals({
          imports: json.totalImports || 0,
          exports: json.totalExports || 0,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedHS, flow]);

  const chartData = data.slice(0, 10).map((d) => ({
    country: d.country,
    value: flow === "import" ? d.importValue : d.exportValue,
    growth: d.yoyGrowth,
  }));

  const barColors = [
    "#10B981", "#34D399", "#6EE7B7", "#059669", "#047857",
    "#0EA5E9", "#38BDF8", "#0284C7", "#F59E0B", "#FBBF24",
  ];

  const currentProduct = hsCodesData.find((h) => h.hsCode === selectedHS);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {t("dashboard.title")}
            </h1>
            <p className="text-navy-400 max-w-3xl">
              {t("dashboard.subtitle")}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
            {/* Product Selector */}
            <div className="flex-1">
              <select
                value={selectedHS}
                onChange={(e) => setSelectedHS(e.target.value)}
                className="w-full px-4 py-3 bg-navy-800/60 border border-navy-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm"
                id="product-selector"
              >
                {hsCodesData.map((h) => (
                  <option key={h.hsCode} value={h.hsCode}>
                    {h.hsCode} — {h.descriptions[locale] || h.descriptions["pt-BR"]}
                  </option>
                ))}
              </select>
            </div>

            {/* Flow Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-navy-700/50">
              <button
                onClick={() => setFlow("import")}
                className={`px-5 py-3 text-sm font-medium transition-colors ${
                  flow === "import"
                    ? "bg-emerald-600 text-white"
                    : "bg-navy-800/60 text-navy-400 hover:text-white"
                }`}
                id="import-toggle"
              >
                {t("common.importView")}
              </button>
              <button
                onClick={() => setFlow("export")}
                className={`px-5 py-3 text-sm font-medium transition-colors ${
                  flow === "export"
                    ? "bg-sky-600 text-white"
                    : "bg-navy-800/60 text-navy-400 hover:text-white"
                }`}
                id="export-toggle"
              >
                {t("common.exportView")}
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-navy-400 uppercase tracking-wider">
                  {t("explorer.product")}
                </span>
              </div>
              <p className="text-sm font-semibold text-white truncate">
                {currentProduct?.descriptions[locale] || currentProduct?.descriptions["pt-BR"]}
              </p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-navy-400 uppercase tracking-wider">
                  {t("dashboard.imports")}
                </span>
              </div>
              <p className="text-xl font-bold text-white">
                {formatTradeValue(totals.imports)}
              </p>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-sky-400" />
                <span className="text-xs text-navy-400 uppercase tracking-wider">
                  {t("dashboard.exports")}
                </span>
              </div>
              <p className="text-xl font-bold text-white">
                {formatTradeValue(totals.exports)}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkeletonMap />
              <SkeletonChart />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="lg:col-span-2 glass-card p-6">
                <h3 className="font-semibold text-navy-200 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  {t("dashboard.chartTitle")}
                </h3>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={380}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis
                        dataKey="country"
                        tick={{ fill: "#94A3C0", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                      />
                      <YAxis
                        tick={{ fill: "#94A3C0", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickFormatter={(v) => formatTradeValue(v)}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(30, 41, 59, 0.95)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#E2E8F0",
                          fontSize: "13px",
                        }}
                        formatter={(value) => [formatTradeValue(Number(value || 0)), t("dashboard.tradeVolume")]}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartData.map((_, i) => (
                          <Cell key={i} fill={barColors[i % barColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64 text-navy-500">
                    <Globe2 className="w-8 h-8 mr-2" />
                    No trade data available for this view
                  </div>
                )}
              </div>

              {/* Top Partners List */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-navy-200 mb-4 flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5 text-sky-400" />
                  {t("dashboard.topPartners")}
                </h3>
                <div className="space-y-3">
                  {data.slice(0, 8).map((d, i) => {
                    const value = flow === "import" ? d.importValue : d.exportValue;
                    const maxValue = Math.max(
                      ...data.slice(0, 8).map((x) => (flow === "import" ? x.importValue : x.exportValue))
                    );
                    const barWidth = maxValue > 0 ? (value / maxValue) * 100 : 0;

                    return (
                      <div key={d.country} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-navy-500 w-5">
                              {i + 1}.
                            </span>
                            <span className="text-sm font-medium text-navy-200">
                              {d.country}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-navy-400">
                              {formatTradeValue(value)}
                            </span>
                            <span
                              className={`text-xs font-medium ${
                                d.yoyGrowth >= 0
                                  ? "text-emerald-400"
                                  : "text-danger-400"
                              }`}
                            >
                              {formatPercentageChange(d.yoyGrowth)}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${barWidth}%`,
                              background: `linear-gradient(90deg, ${barColors[i % barColors.length]}88, ${barColors[i % barColors.length]})`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
