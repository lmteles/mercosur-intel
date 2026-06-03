import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "pt-PT", "es", "fr", "de", "it"] as const,
  defaultLocale: "pt-BR",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
