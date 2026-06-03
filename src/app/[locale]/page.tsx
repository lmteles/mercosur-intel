import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import {
  Search,
  BarChart3,
  Brain,
  Building2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

  const modules = [
    {
      href: "/explorer",
      icon: Search,
      title: t("common.nav.explorer"),
      description: t("explorer.subtitle"),
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/30",
    },
    {
      href: "/dashboard",
      icon: BarChart3,
      title: t("common.nav.dashboard"),
      description: t("dashboard.subtitle"),
      gradient: "from-sky-500/20 to-sky-600/5",
      iconColor: "text-sky-400",
      borderColor: "hover:border-sky-500/30",
    },
    {
      href: "/strategy",
      icon: Brain,
      title: t("common.nav.strategy"),
      description: t("strategy.subtitle"),
      gradient: "from-gold-500/20 to-gold-600/5",
      iconColor: "text-gold-400",
      borderColor: "hover:border-gold-500/30",
    },
    {
      href: "/sme",
      icon: Building2,
      title: t("common.nav.sme"),
      description: t("sme.subtitle"),
      gradient: "from-purple-500/20 to-purple-600/5",
      iconColor: "text-purple-400",
      borderColor: "hover:border-purple-500/30",
    },
  ];

  const stats = [
    { value: t("hero.stat1Value"), label: t("hero.stat1Label"), icon: Zap },
    { value: t("hero.stat2Value"), label: t("hero.stat2Label"), icon: ShieldCheck },
    { value: t("hero.stat3Value"), label: t("hero.stat3Label"), icon: Globe2 },
    { value: t("hero.stat4Value"), label: t("hero.stat4Label"), icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-emerald-300 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              {t("hero.stat2Label")} — {t("hero.stat2Value")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-navy-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explorer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Search className="w-5 h-5" />
                {t("hero.cta")}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <BarChart3 className="w-5 h-5" />
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <div
                key={i}
                className="glass-card p-5 text-center"
              >
                <Icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-navy-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map(
              (
                {
                  href,
                  icon: Icon,
                  title,
                  description,
                  gradient,
                  iconColor,
                  borderColor,
                },
                i
              ) => (
                <Link
                  key={href}
                  href={href}
                  className={`group glass-card p-8 ${borderColor}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-navy-400 leading-relaxed mb-4">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400 font-medium group-hover:gap-2.5 transition-all">
                    {t("common.viewMore")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
