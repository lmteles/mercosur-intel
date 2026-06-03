import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { hsCode, tariffData, tradeData, locale = "pt-BR" } = await request.json();

    if (!hsCode) {
      return NextResponse.json({ error: "HS code is required" }, { status: 400 });
    }

    // Generate strategies based on data patterns (deterministic, no LLM needed for demo)
    const strategies = generateStrategies(hsCode, tariffData, tradeData, locale);

    return NextResponse.json({ strategies });
  } catch (error) {
    console.error("Strategy generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function generateStrategies(
  hsCode: string,
  tariffData: any,
  tradeData: any,
  locale: string
) {
  const strategies = [];
  const category = tariffData?.category || "C";
  const currentMFN = tariffData?.currentMFN || 10;
  const topPartners = tradeData?.aggregated?.slice(0, 3) || [];

  // Strategy 1: Based on tariff advantage
  if (category === "A" || currentMFN === 0) {
    strategies.push({
      title: getLocalizedText(locale, "immediateAdvantage"),
      description: getLocalizedText(locale, "immediateAdvantageDesc", { hsCode }),
      confidence: 92,
      potential: "high",
    });
  } else if (category === "B" || category === "C") {
    strategies.push({
      title: getLocalizedText(locale, "earlyMover"),
      description: getLocalizedText(locale, "earlyMoverDesc", { hsCode, years: category === "B" ? 4 : 7 }),
      confidence: 85,
      potential: "high",
    });
  } else {
    strategies.push({
      title: getLocalizedText(locale, "longTermPlay"),
      description: getLocalizedText(locale, "longTermPlayDesc", { hsCode }),
      confidence: 75,
      potential: "medium",
    });
  }

  // Strategy 2: Based on trade volume / top partner
  if (topPartners.length > 0) {
    const top = topPartners[0];
    strategies.push({
      title: getLocalizedText(locale, "marketConcentration"),
      description: getLocalizedText(locale, "marketConcentrationDesc", {
        country: top.country,
        growth: top.yoyGrowth,
      }),
      confidence: 88,
      potential: top.yoyGrowth > 8 ? "high" : "medium",
    });
  } else {
    strategies.push({
      title: getLocalizedText(locale, "newMarket"),
      description: getLocalizedText(locale, "newMarketDesc"),
      confidence: 70,
      potential: "medium",
    });
  }

  // Strategy 3: Compliance / ROO advantage
  strategies.push({
    title: getLocalizedText(locale, "complianceEdge"),
    description: getLocalizedText(locale, "complianceEdgeDesc", { hsCode }),
    confidence: 80,
    potential: tariffData?.quotaApplies ? "medium" : "high",
  });

  return strategies;
}

function getLocalizedText(locale: string, key: string, params: Record<string, any> = {}): string {
  const texts: Record<string, Record<string, string>> = {
    immediateAdvantage: {
      "pt-BR": "Vantagem Tarifária Imediata",
      es: "Ventaja Arancelaria Inmediata",
      fr: "Avantage Tarifaire Immédiat",
      de: "Sofortiger Zollvorteil",
      it: "Vantaggio Tariffario Immediato",
      "pt-PT": "Vantagem Pautal Imediata",
    },
    immediateAdvantageDesc: {
      "pt-BR": `O produto ${params.hsCode || ""} já possui tarifa zero sob o acordo, representando uma vantagem competitiva imediata. Empresas que entrarem agora no mercado terão vantagem de first-mover enquanto concorrentes de países sem acordo preferencial ainda pagam a tarifa MFN completa.`,
      es: `El producto ${params.hsCode || ""} ya tiene arancel cero bajo el acuerdo, representando una ventaja competitiva inmediata. Las empresas que entren ahora al mercado tendrán ventaja de first-mover.`,
      fr: `Le produit ${params.hsCode || ""} bénéficie déjà d'un droit zéro dans le cadre de l'accord, représentant un avantage concurrentiel immédiat.`,
      de: `Das Produkt ${params.hsCode || ""} hat bereits Nullzoll im Rahmen des Abkommens, was einen sofortigen Wettbewerbsvorteil darstellt.`,
      it: `Il prodotto ${params.hsCode || ""} ha già dazio zero nell'ambito dell'accordo, rappresentando un vantaggio competitivo immediato.`,
      "pt-PT": `O produto ${params.hsCode || ""} já possui tarifa zero ao abrigo do acordo, representando uma vantagem competitiva imediata.`,
    },
    earlyMover: {
      "pt-BR": "Estratégia de Entrada Antecipada",
      es: "Estrategia de Entrada Anticipada",
      fr: "Stratégie d'Entrée Anticipée",
      de: "Frühzeitige Einstiegsstrategie",
      it: "Strategia di Ingresso Anticipato",
      "pt-PT": "Estratégia de Entrada Antecipada",
    },
    earlyMoverDesc: {
      "pt-BR": `Com a tarifa sendo eliminada ao longo de ${params.years || "N"} anos, agora é o momento ideal para estabelecer relações comerciais e canais de distribuição. A redução tarifária progressiva criará demanda crescente, e quem entrar cedo terá vantagem competitiva significativa.`,
      es: `Con el arancel eliminándose en ${params.years || "N"} años, ahora es el momento ideal para establecer relaciones comerciales y canales de distribución.`,
      fr: `Avec le démantèlement tarifaire sur ${params.years || "N"} ans, c'est le moment idéal pour établir des relations commerciales et des canaux de distribution.`,
      de: `Mit dem Zollabbau über ${params.years || "N"} Jahre ist jetzt der ideale Zeitpunkt, Handelsbeziehungen und Vertriebskanäle aufzubauen.`,
      it: `Con lo smantellamento tariffario su ${params.years || "N"} anni, ora è il momento ideale per stabilire relazioni commerciali e canali di distribuzione.`,
      "pt-PT": `Com a tarifa a ser eliminada ao longo de ${params.years || "N"} anos, agora é o momento ideal para estabelecer relações comerciais.`,
    },
    longTermPlay: {
      "pt-BR": "Posicionamento Estratégico de Longo Prazo",
      es: "Posicionamiento Estratégico a Largo Plazo",
      fr: "Positionnement Stratégique à Long Terme",
      de: "Langfristige Strategische Positionierung",
      it: "Posizionamento Strategico a Lungo Termine",
      "pt-PT": "Posicionamento Estratégico de Longo Prazo",
    },
    longTermPlayDesc: {
      "pt-BR": `Apesar do período mais longo de desgravação, a tendência de redução tarifária é irreversível. Recomenda-se iniciar relações comerciais agora, com foco em qualidade e diferenciação, para consolidar posição quando a tarifa atingir zero.`,
      es: `A pesar del período más largo de desgravación, la tendencia de reducción arancelaria es irreversible. Se recomienda iniciar relaciones comerciales ahora.`,
      fr: `Malgré la période de démantèlement plus longue, la tendance à la réduction tarifaire est irréversible. Il est recommandé d'initier des relations commerciales maintenant.`,
      de: `Trotz des längeren Abbau-Zeitraums ist der Trend zur Zollsenkung unumkehrbar. Es empfiehlt sich, jetzt Handelsbeziehungen aufzubauen.`,
      it: `Nonostante il periodo di smantellamento più lungo, la tendenza alla riduzione tariffaria è irreversibile. Si consiglia di avviare relazioni commerciali ora.`,
      "pt-PT": `Apesar do período mais longo de desagravamento, a tendência de redução pautal é irreversível.`,
    },
    marketConcentration: {
      "pt-BR": "Foco no Mercado de Maior Potencial",
      es: "Enfoque en el Mercado de Mayor Potencial",
      fr: "Focus sur le Marché à Plus Fort Potentiel",
      de: "Fokus auf den Markt mit Höchstem Potenzial",
      it: "Focus sul Mercato a Maggior Potenziale",
      "pt-PT": "Foco no Mercado de Maior Potencial",
    },
    marketConcentrationDesc: {
      "pt-BR": `${params.country || "O mercado principal"} apresenta crescimento de ${params.growth || "N"}% A/A, indicando demanda crescente. Concentrar esforços iniciais neste mercado maximiza o retorno sobre investimento em market entry.`,
      es: `${params.country || "El mercado principal"} presenta crecimiento de ${params.growth || "N"}% A/A, indicando demanda creciente.`,
      fr: `${params.country || "Le marché principal"} affiche une croissance de ${params.growth || "N"}% A/A, indiquant une demande croissante.`,
      de: `${params.country || "Der Hauptmarkt"} zeigt ein Wachstum von ${params.growth || "N"}% J/J, was auf steigende Nachfrage hindeutet.`,
      it: `${params.country || "Il mercato principale"} mostra una crescita del ${params.growth || "N"}% A/A, indicando domanda crescente.`,
      "pt-PT": `${params.country || "O mercado principal"} apresenta crescimento de ${params.growth || "N"}% A/A, indicando procura crescente.`,
    },
    newMarket: {
      "pt-BR": "Oportunidade de Novo Mercado",
      es: "Oportunidad de Nuevo Mercado",
      fr: "Opportunité de Nouveau Marché",
      de: "Neue Marktchance",
      it: "Opportunità di Nuovo Mercato",
      "pt-PT": "Oportunidade de Novo Mercado",
    },
    newMarketDesc: {
      "pt-BR": "Dados de comércio limitados indicam um mercado subexplorado. A entrada pioneira pode estabelecer liderança de mercado com baixa concorrência.",
      es: "Datos comerciales limitados indican un mercado subexplotado. La entrada pionera puede establecer liderazgo de mercado.",
      fr: "Des données commerciales limitées indiquent un marché sous-exploité. L'entrée pionnière peut établir un leadership de marché.",
      de: "Begrenzte Handelsdaten deuten auf einen untererschlossenen Markt hin. Ein Pioniereintritt kann Marktführerschaft etablieren.",
      it: "Dati commerciali limitati indicano un mercato sottosfruttato. L'ingresso pionieristico può stabilire la leadership di mercato.",
      "pt-PT": "Dados comerciais limitados indicam um mercado subexplorado. A entrada pioneira pode estabelecer liderança de mercado.",
    },
    complianceEdge: {
      "pt-BR": "Vantagem por Conformidade Regulatória",
      es: "Ventaja por Cumplimiento Regulatorio",
      fr: "Avantage par Conformité Réglementaire",
      de: "Vorteil durch Regulatorische Compliance",
      it: "Vantaggio per Conformità Normativa",
      "pt-PT": "Vantagem por Conformidade Regulatória",
    },
    complianceEdgeDesc: {
      "pt-BR": `Investir proativamente em conformidade com EUDR, ESG e certificações de origem cria uma barreira competitiva. Empresas que dominarem as regras de origem e documentação Statement on Origin terão acesso facilitado ao mercado enquanto concorrentes lutam com burocracia.`,
      es: `Invertir proactivamente en cumplimiento EUDR, ESG y certificaciones de origen crea una barrera competitiva.`,
      fr: `Investir proactivement dans la conformité EUDR, ESG et les certifications d'origine crée une barrière concurrentielle.`,
      de: `Proaktive Investitionen in EUDR-, ESG-Compliance und Ursprungszertifizierungen schaffen eine Wettbewerbsbarriere.`,
      it: `Investire proattivamente nella conformità EUDR, ESG e nelle certificazioni di origine crea una barriera competitiva.`,
      "pt-PT": `Investir proativamente em conformidade com EUDR, ESG e certificações de origem cria uma barreira competitiva.`,
    },
  };

  const langKey = texts[key]?.[locale] ? locale : "pt-BR";
  return texts[key]?.[langKey] || texts[key]?.["pt-BR"] || key;
}
