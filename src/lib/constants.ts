// Agreement and phase-out constants
export const AGREEMENT_START_DATE = new Date("2026-05-01");
export const AGREEMENT_NAME = "EU-Mercosur Interim Trade Agreement (iTA)";

export const PHASE_OUT_CATEGORIES = {
  A: { years: 0, label: "Immediate Elimination" },
  B: { years: 4, label: "4-Year Phase-In" },
  C: { years: 7, label: "7-Year Phase-In" },
  D: { years: 10, label: "10-Year Phase-In" },
  E: { years: 15, label: "15-Year Phase-In (Sensitive)" },
} as const;

export type PhaseOutCategory = keyof typeof PHASE_OUT_CATEGORIES;

export const EU_COUNTRIES = [
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "LV", name: "Latvia", flag: "🇱🇻" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
] as const;

export const MERCOSUR_COUNTRIES = [
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
] as const;

export const ALL_COUNTRIES = [...EU_COUNTRIES, ...MERCOSUR_COUNTRIES];

export const LOCALE_CONFIG = {
  "pt-BR": { name: "Português (BR)", flag: "🇧🇷", short: "PT-BR" },
  "pt-PT": { name: "Português (PT)", flag: "🇵🇹", short: "PT-PT" },
  es: { name: "Español", flag: "🇪🇸", short: "ES" },
  fr: { name: "Français", flag: "🇫🇷", short: "FR" },
  de: { name: "Deutsch", flag: "🇩🇪", short: "DE" },
  it: { name: "Italiano", flag: "🇮🇹", short: "IT" },
} as const;
