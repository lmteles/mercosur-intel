import { NextRequest, NextResponse } from "next/server";
import { tradeVolumeData } from "@/data/seed";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hs = searchParams.get("hs");
  const reporter = searchParams.get("reporter");
  const partner = searchParams.get("partner");
  const flow = searchParams.get("flow"); // "import" or "export"

  let data = [...tradeVolumeData];

  if (hs) {
    data = data.filter((d) => d.hsCode === hs);
  }
  if (reporter) {
    data = data.filter((d) => d.reporter === reporter);
  }
  if (partner) {
    data = data.filter((d) => d.partner === partner);
  }

  // Aggregate by partner for map view
  const byCountry: Record<
    string,
    { country: string; importValue: number; exportValue: number; yoyGrowth: number; count: number }
  > = {};

  data.forEach((d) => {
    const key = flow === "export" ? d.reporter : d.partner;
    if (!byCountry[key]) {
      byCountry[key] = { country: key, importValue: 0, exportValue: 0, yoyGrowth: 0, count: 0 };
    }
    byCountry[key].importValue += d.importValue;
    byCountry[key].exportValue += d.exportValue;
    byCountry[key].yoyGrowth += d.yoyGrowth;
    byCountry[key].count += 1;
  });

  // Average YoY growth
  Object.values(byCountry).forEach((v) => {
    v.yoyGrowth = Math.round((v.yoyGrowth / v.count) * 10) / 10;
  });

  return NextResponse.json({
    raw: data,
    aggregated: Object.values(byCountry).sort(
      (a, b) => (b.importValue + b.exportValue) - (a.importValue + a.exportValue)
    ),
    totalImports: data.reduce((s, d) => s + d.importValue, 0),
    totalExports: data.reduce((s, d) => s + d.exportValue, 0),
  });
}
