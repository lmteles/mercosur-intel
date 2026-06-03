import { AGREEMENT_START_DATE, PHASE_OUT_CATEGORIES, type PhaseOutCategory } from "./constants";

/**
 * Calculate current preferential rate based on category and elapsed time
 */
export function calculateCurrentRate(
  baseMFN: number,
  category: PhaseOutCategory,
  referenceDate: Date = new Date()
): number {
  const { years } = PHASE_OUT_CATEGORIES[category];
  if (years === 0) return 0;

  const elapsedMs = referenceDate.getTime() - AGREEMENT_START_DATE.getTime();
  const elapsedYears = elapsedMs / (365.25 * 24 * 60 * 60 * 1000);

  if (elapsedYears >= years) return 0;

  // Linear reduction
  const reductionPerYear = baseMFN / years;
  const currentRate = baseMFN - reductionPerYear * Math.floor(elapsedYears);
  return Math.max(0, Math.round(currentRate * 100) / 100);
}

/**
 * Calculate years remaining until zero tariff
 */
export function calculateYearsRemaining(
  category: PhaseOutCategory,
  referenceDate: Date = new Date()
): number {
  const { years } = PHASE_OUT_CATEGORIES[category];
  if (years === 0) return 0;

  const elapsedMs = referenceDate.getTime() - AGREEMENT_START_DATE.getTime();
  const elapsedYears = elapsedMs / (365.25 * 24 * 60 * 60 * 1000);

  return Math.max(0, Math.ceil(years - elapsedYears));
}

/**
 * Calculate phase-out progress as percentage
 */
export function calculatePhaseOutProgress(
  category: PhaseOutCategory,
  referenceDate: Date = new Date()
): number {
  const { years } = PHASE_OUT_CATEGORIES[category];
  if (years === 0) return 100;

  const elapsedMs = referenceDate.getTime() - AGREEMENT_START_DATE.getTime();
  const elapsedYears = elapsedMs / (365.25 * 24 * 60 * 60 * 1000);

  return Math.min(100, Math.round((elapsedYears / years) * 100));
}

/**
 * Format currency value with appropriate suffix
 */
export function formatTradeValue(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * Format percentage with sign
 */
export function formatPercentageChange(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Format HS code as XX.XX.XX
 */
export function formatHSCode(code: string): string {
  const clean = code.replace(/\D/g, "");
  if (clean.length >= 6) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}.${clean.slice(4, 6)}`;
  }
  if (clean.length >= 4) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}`;
  }
  return clean;
}

/**
 * Check if a string looks like an HS code (numeric, 2-6 digits)
 */
export function isHSCode(input: string): boolean {
  const clean = input.replace(/[\s.]/g, "");
  return /^\d{2,6}$/.test(clean);
}
