"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t border-white/5 bg-navy-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Mercosur<span className="text-emerald-400">Intel</span>
            </h3>
            <p className="text-sm text-navy-400 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-sm font-semibold text-navy-200 mb-3 uppercase tracking-wider">
              Data Sources
            </h4>
            <ul className="space-y-2 text-sm text-navy-400">
              <li>
                <a
                  href="https://comtrade.un.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  UN Comtrade Database
                </a>
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/eurostat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Eurostat COMEXT
                </a>
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/taxation_customs/dds2/taric/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  EU TARIC Database
                </a>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="text-sm font-semibold text-navy-200 mb-3 uppercase tracking-wider">
              Official Resources
            </h4>
            <ul className="space-y-2 text-sm text-navy-400">
              <li>
                <a
                  href="https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/mercosur_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  EU-Mercosur Agreement Text
                </a>
              </li>
              <li>
                <a
                  href="https://trade.ec.europa.eu/access-to-markets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Access2Markets Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-navy-500 leading-relaxed">
            {t("footer.disclaimer")}
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-navy-500">{t("footer.poweredBy")}</p>
            <p className="text-xs text-navy-500">{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
