import { NextRequest, NextResponse } from "next/server";
import { tariffScheduleData, hsCodesData } from "@/data/seed";
import { calculateCurrentRate, calculateYearsRemaining, calculatePhaseOutProgress } from "@/lib/utils";
import { PHASE_OUT_CATEGORIES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hs = searchParams.get("hs");
  const locale = searchParams.get("locale") || "pt-BR";

  if (!hs) {
    return NextResponse.json({ error: "HS code is required" }, { status: 400 });
  }

  const tariff = tariffScheduleData.find((t) => t.hsCode === hs);
  const hsEntry = hsCodesData.find((h) => h.hsCode === hs);

  if (!tariff || !hsEntry) {
    return NextResponse.json(
      { error: "HS code not found in database", hsCode: hs },
      { status: 404 }
    );
  }

  const now = new Date();
  const currentRate = calculateCurrentRate(tariff.baseMFN, tariff.category, now);
  const yearsRemaining = calculateYearsRemaining(tariff.category, now);
  const progress = calculatePhaseOutProgress(tariff.category, now);
  const categoryInfo = PHASE_OUT_CATEGORIES[tariff.category];

  return NextResponse.json({
    hsCode: tariff.hsCode,
    description: hsEntry.descriptions[locale] || hsEntry.descriptions["pt-BR"],
    chapter: hsEntry.chapter,
    section: hsEntry.section,
    currentMFN: tariff.baseMFN,
    agreementRate: currentRate,
    category: tariff.category,
    categoryLabel: categoryInfo.label,
    phaseOutYears: categoryInfo.years,
    yearsRemaining,
    progress,
    quotaApplies: tariff.quotaApplies,
    quotaVolume: tariff.quotaVolume,
    rulesOfOrigin: tariff.rulesOfOrigin,
  });
}
