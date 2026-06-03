"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supportPrograms } from "@/data/seed";
import {
  Building2,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Leaf,
  FileText,
  Shield,
  Globe2,
  Star,
  Lightbulb,
} from "lucide-react";

type ReadinessAnswer = "yes" | "no" | "partially" | null;

export default function SMEPage() {
  const t = useTranslations();

  // Readiness Assessment State
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswer[]>(Array(8).fill(null));
  const [showResult, setShowResult] = useState(false);

  const questions = Array.from({ length: 8 }, (_, i) =>
    t(`sme.readiness.question${i + 1}`)
  );

  // Compliance Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sme-checklist");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const toggleCheck = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sme-checklist", JSON.stringify(updated));
    }
  };

  const handleAnswer = (answer: ReadinessAnswer) => {
    const updated = [...answers];
    updated[currentQuestion] = answer;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < 7) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const getScore = () => {
    let score = 0;
    answers.forEach((a) => {
      if (a === "yes") score += 2;
      if (a === "partially") score += 1;
    });
    return score;
  };

  const getResult = () => {
    const score = getScore();
    if (score >= 12) return { key: "resultReady", color: "emerald", icon: Star };
    if (score >= 6) return { key: "resultDeveloping", color: "gold", icon: TrendingUpIcon };
    return { key: "resultStarting", color: "sky", icon: Lightbulb };
  };

  const complianceItems = [
    { id: "ce", icon: Award, titleKey: "ceMarking", descKey: "ceDesc" },
    { id: "phyto", icon: Leaf, titleKey: "phytosanitary", descKey: "phytoDesc" },
    { id: "origin", icon: FileText, titleKey: "originProof", descKey: "originDesc" },
    { id: "eudr", icon: Shield, titleKey: "eudr", descKey: "eudrDesc" },
    { id: "esg", icon: Globe2, titleKey: "esg", descKey: "esgDesc" },
  ];

  const learningTips = [
    { titleKey: "tip1Title", contentKey: "tip1Content", emoji: "🇩🇪" },
    { titleKey: "tip2Title", contentKey: "tip2Content", emoji: "🇫🇷" },
    { titleKey: "tip3Title", contentKey: "tip3Content", emoji: "🇮🇹" },
    { titleKey: "tip4Title", contentKey: "tip4Content", emoji: "🇧🇷" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {t("sme.title")}
              </h1>
            </div>
            <p className="text-navy-400 max-w-3xl">
              {t("sme.subtitle")}
            </p>
          </div>

          <div className="space-y-10">
            {/* ===== READINESS ASSESSMENT ===== */}
            <section className="animate-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">
                  {t("sme.readiness.title")}
                </h2>
              </div>
              <p className="text-sm text-navy-400 mb-6">
                {t("sme.readiness.subtitle")}
              </p>

              {!assessmentStarted ? (
                <button
                  onClick={() => setAssessmentStarted(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
                  id="start-assessment-btn"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  {t("sme.readiness.start")}
                </button>
              ) : showResult ? (
                // Result Card
                <div className="glass-card p-8 text-center max-w-md mx-auto">
                  {(() => {
                    const result = getResult();
                    return (
                      <>
                        <div className={`w-16 h-16 rounded-2xl bg-${result.color}-500/15 flex items-center justify-center mx-auto mb-4`}>
                          <result.icon className={`w-8 h-8 text-${result.color}-400`} />
                        </div>
                        <h3 className={`text-2xl font-bold text-${result.color}-400 mb-2`}>
                          {t(`sme.readiness.${result.key}`)}
                        </h3>
                        <p className="text-3xl font-bold text-white mb-2">
                          {getScore()}/16
                        </p>
                        <button
                          onClick={() => {
                            setAssessmentStarted(false);
                            setShowResult(false);
                            setCurrentQuestion(0);
                            setAnswers(Array(8).fill(null));
                          }}
                          className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 underline"
                        >
                          {t("sme.readiness.start")}
                        </button>
                      </>
                    );
                  })()}
                </div>
              ) : (
                // Question Wizard
                <div className="glass-card p-6 sm:p-8 max-w-2xl">
                  {/* Progress */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-all ${
                          i < currentQuestion
                            ? "bg-emerald-500"
                            : i === currentQuestion
                            ? "bg-emerald-400 animate-pulse"
                            : "bg-navy-700"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-navy-500 mb-2">
                    {currentQuestion + 1} / 8
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-6">
                    {questions[currentQuestion]}
                  </h3>

                  {/* Answer Options */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {(["yes", "no", "partially"] as ReadinessAnswer[]).map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                            answers[currentQuestion] === option
                              ? "bg-emerald-600 text-white ring-2 ring-emerald-400/50"
                              : "bg-navy-800/60 text-navy-300 hover:bg-navy-700/60 hover:text-white"
                          }`}
                        >
                          {t(`sme.readiness.${option}`)}
                        </button>
                      )
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-1 text-sm text-navy-400 hover:text-white transition-colors disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t("sme.readiness.previous")}
                    </button>
                    <button
                      onClick={nextQuestion}
                      disabled={answers[currentQuestion] === null}
                      className="flex items-center gap-1 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-30"
                    >
                      {currentQuestion === 7
                        ? t("sme.readiness.finish")
                        : t("sme.readiness.next")}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* ===== COMPLIANCE CHECKLIST ===== */}
            <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-sky-400" />
                <h2 className="text-xl font-bold text-white">
                  {t("sme.compliance.title")}
                </h2>
              </div>
              <p className="text-sm text-navy-400 mb-6">
                {t("sme.compliance.subtitle")}
              </p>

              <div className="space-y-3">
                {complianceItems.map(({ id, icon: Icon, titleKey, descKey }) => (
                  <button
                    key={id}
                    onClick={() => toggleCheck(id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all text-left ${
                      checkedItems[id]
                        ? "bg-emerald-500/8 border border-emerald-500/20"
                        : "glass-card hover:bg-navy-800/80"
                    }`}
                    id={`checklist-${id}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {checkedItems[id] ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-navy-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-navy-400" />
                        <span className={`text-sm font-semibold ${checkedItems[id] ? "text-emerald-300" : "text-navy-200"}`}>
                          {t(`sme.compliance.${titleKey}`)}
                        </span>
                      </div>
                      <p className="text-xs text-navy-400">
                        {t(`sme.compliance.${descKey}`)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* ===== SUPPORT PROGRAMS ===== */}
            <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="w-5 h-5 text-gold-400" />
                <h2 className="text-xl font-bold text-white">
                  {t("sme.support.title")}
                </h2>
              </div>
              <p className="text-sm text-navy-400 mb-6">
                {t("sme.support.subtitle")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportPrograms.map((program) => (
                  <a
                    key={program.id}
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 group"
                    id={`support-${program.id}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{program.flag}</span>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {program.nameKey}
                      </h3>
                    </div>
                    <p className="text-xs text-navy-400 leading-relaxed mb-3">
                      {program.descriptionKey}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium group-hover:gap-2 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* ===== MICRO-LEARNING ===== */}
            <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">
                  {t("sme.learning.title")}
                </h2>
              </div>
              <p className="text-sm text-navy-400 mb-6">
                {t("sme.learning.subtitle")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningTips.map(({ titleKey, contentKey, emoji }, i) => (
                  <div
                    key={i}
                    className="glass-card p-6 group hover:border-purple-500/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{emoji}</span>
                      <h3 className="text-sm font-bold text-white">
                        {t(`sme.learning.${titleKey}`)}
                      </h3>
                    </div>
                    <p className="text-sm text-navy-400 leading-relaxed">
                      {t(`sme.learning.${contentKey}`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Simple trending up icon to avoid type issues
function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
