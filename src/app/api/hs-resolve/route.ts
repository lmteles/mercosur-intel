import { NextRequest, NextResponse } from "next/server";
import { hsCodesData } from "@/data/seed";
import { isHSCode } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { query, locale = "pt-BR" } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // If already an HS code, return directly
    const cleanQuery = query.trim().replace(/[\s.]/g, "");
    if (isHSCode(cleanQuery)) {
      const match = hsCodesData.find((h) =>
        h.hsCode.startsWith(cleanQuery.padEnd(2, "0").slice(0, 2))
      );
      return NextResponse.json({
        hsCode: cleanQuery.padEnd(6, "0").slice(0, 6),
        description: match?.descriptions[locale] || match?.descriptions["pt-BR"] || query,
        confidence: 0.95,
        source: "direct",
      });
    }

    // Fuzzy search against descriptions in all languages
    const queryLower = query.toLowerCase();
    const results = hsCodesData
      .map((entry) => {
        let bestScore = 0;
        for (const desc of Object.values(entry.descriptions)) {
          const descLower = desc.toLowerCase();
          if (descLower.includes(queryLower)) {
            bestScore = Math.max(bestScore, queryLower.length / descLower.length + 0.5);
          } else {
            // Check word-level matches
            const queryWords = queryLower.split(/\s+/);
            const matchedWords = queryWords.filter((w) => descLower.includes(w));
            if (matchedWords.length > 0) {
              bestScore = Math.max(bestScore, matchedWords.length / queryWords.length * 0.7);
            }
          }
        }
        return { entry, score: bestScore };
      })
      .filter((r) => r.score > 0.1)
      .sort((a, b) => b.score - a.score);

    if (results.length === 0) {
      return NextResponse.json({
        hsCode: null,
        description: null,
        confidence: 0,
        source: "seed",
        suggestions: [],
      });
    }

    const top = results[0];
    return NextResponse.json({
      hsCode: top.entry.hsCode,
      description: top.entry.descriptions[locale] || top.entry.descriptions["pt-BR"],
      confidence: Math.min(0.95, top.score),
      source: "seed",
      suggestions: results.slice(0, 5).map((r) => ({
        hsCode: r.entry.hsCode,
        description: r.entry.descriptions[locale] || r.entry.descriptions["pt-BR"],
        confidence: Math.min(0.95, r.score),
      })),
    });
  } catch (error) {
    console.error("HS resolve error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
