import { PhaseOutCategory } from "@/lib/constants";

export interface HSCodeEntry {
  hsCode: string;
  descriptions: Record<string, string>;
  chapter: string;
  section: string;
}

export interface TariffEntry {
  hsCode: string;
  category: PhaseOutCategory;
  baseMFN: number;
  quotaApplies: boolean;
  quotaVolume?: number;
  rulesOfOrigin: {
    tariffClassification: boolean;
    valueAdded?: number; // percentage
    specificProcessing?: string;
  };
}

export interface TradeVolumeEntry {
  hsCode: string;
  reporter: string;
  partner: string;
  year: number;
  importValue: number;
  exportValue: number;
  importWeight: number;
  exportWeight: number;
  yoyGrowth: number;
}

// Curated HS code seed data — top traded products EU-Mercosur
export const hsCodesData: HSCodeEntry[] = [
  {
    hsCode: "090111",
    descriptions: {
      "pt-BR": "Café não torrado, não descafeinado",
      "pt-PT": "Café não torrado, não descafeinado",
      es: "Café sin tostar, sin descafeinar",
      fr: "Café non torréfié, non décaféiné",
      de: "Kaffee, nicht geröstet, nicht entkoffeiniert",
      it: "Caffè non torrefatto, non decaffeinato",
    },
    chapter: "09",
    section: "II - Vegetable products",
  },
  {
    hsCode: "120190",
    descriptions: {
      "pt-BR": "Soja, mesmo triturada, exceto para semeadura",
      "pt-PT": "Soja, mesmo triturada, exceto para semeadura",
      es: "Soja, incluso triturada, excepto para siembra",
      fr: "Graines de soja, même concassées, autres que pour l'ensemencement",
      de: "Sojabohnen, auch geschrotet, ausgenommen zur Aussaat",
      it: "Semi di soia, anche frantumati, diversi da quelli destinati alla semina",
    },
    chapter: "12",
    section: "II - Vegetable products",
  },
  {
    hsCode: "020130",
    descriptions: {
      "pt-BR": "Carnes desossadas de bovino, frescas ou refrigeradas",
      "pt-PT": "Carnes desossadas de bovino, frescas ou refrigeradas",
      es: "Carne deshuesada de bovino, fresca o refrigerada",
      fr: "Viandes désossées de bovins, fraîches ou réfrigérées",
      de: "Rindfleisch, ohne Knochen, frisch oder gekühlt",
      it: "Carni bovine disossate, fresche o refrigerate",
    },
    chapter: "02",
    section: "I - Live animals; animal products",
  },
  {
    hsCode: "170114",
    descriptions: {
      "pt-BR": "Açúcar de cana, em bruto",
      "pt-PT": "Açúcar de cana, em bruto",
      es: "Azúcar de caña, en bruto",
      fr: "Sucre de canne, brut",
      de: "Rohrzucker, roh",
      it: "Zucchero di canna, greggio",
    },
    chapter: "17",
    section: "IV - Foodstuffs",
  },
  {
    hsCode: "230400",
    descriptions: {
      "pt-BR": "Tortas e outros resíduos da extração do óleo de soja",
      "pt-PT": "Bagaços e outros resíduos da extração do óleo de soja",
      es: "Tortas y demás residuos de la extracción del aceite de soja",
      fr: "Tourteaux et autres résidus de l'extraction de l'huile de soja",
      de: "Ölkuchen und andere Rückstände aus der Gewinnung von Sojaöl",
      it: "Panelli e altri residui dell'estrazione dell'olio di soia",
    },
    chapter: "23",
    section: "IV - Foodstuffs",
  },
  {
    hsCode: "260111",
    descriptions: {
      "pt-BR": "Minérios de ferro não aglomerados e seus concentrados",
      "pt-PT": "Minérios de ferro não aglomerados e os seus concentrados",
      es: "Minerales de hierro sin aglomerar y sus concentrados",
      fr: "Minerais de fer non agglomérés et leurs concentrés",
      de: "Eisenerze, nicht agglomeriert, und ihre Konzentrate",
      it: "Minerali di ferro non agglomerati e loro concentrati",
    },
    chapter: "26",
    section: "V - Mineral products",
  },
  {
    hsCode: "870323",
    descriptions: {
      "pt-BR": "Automóveis com motor a explosão, 1500-3000 cm³",
      "pt-PT": "Automóveis com motor de explosão, 1500-3000 cm³",
      es: "Automóviles con motor de explosión, 1500-3000 cm³",
      fr: "Voitures à moteur à explosion, 1500-3000 cm³",
      de: "Personenkraftwagen mit Hubkolbenmotor, 1500-3000 cm³",
      it: "Autoveicoli con motore a scoppio, 1500-3000 cm³",
    },
    chapter: "87",
    section: "XVII - Vehicles, aircraft, vessels",
  },
  {
    hsCode: "847130",
    descriptions: {
      "pt-BR": "Máquinas automáticas para processamento de dados, portáteis",
      "pt-PT": "Máquinas automáticas para processamento de dados, portáteis",
      es: "Máquinas automáticas para procesamiento de datos, portátiles",
      fr: "Machines automatiques de traitement de l'information, portables",
      de: "Tragbare automatische Datenverarbeitungsmaschinen",
      it: "Macchine automatiche per l'elaborazione dati, portatili",
    },
    chapter: "84",
    section: "XVI - Machinery and mechanical appliances",
  },
  {
    hsCode: "300490",
    descriptions: {
      "pt-BR": "Medicamentos (exceto produtos das posições 30.02/04), em doses",
      "pt-PT": "Medicamentos (exceto produtos das posições 30.02/04), em doses",
      es: "Medicamentos (excepto productos de 30.02/04), dosificados",
      fr: "Médicaments (sauf produits des 30.02/04), conditionnés pour la vente",
      de: "Arzneiwaren (ausgen. Waren der Pos. 30.02/04), in Aufmachungen für den Einzelverkauf",
      it: "Medicinali (esclusi i prodotti delle voci 30.02/04), in dosi",
    },
    chapter: "30",
    section: "VI - Products of the chemical industry",
  },
  {
    hsCode: "220421",
    descriptions: {
      "pt-BR": "Vinhos de uvas frescas, em recipientes até 2 litros",
      "pt-PT": "Vinhos de uvas frescas, em recipientes até 2 litros",
      es: "Vinos de uvas frescas, en recipientes hasta 2 litros",
      fr: "Vins de raisins frais, en récipients de 2 litres ou moins",
      de: "Wein aus frischen Weintrauben, in Behältnissen bis 2 Liter",
      it: "Vini di uve fresche, in recipienti fino a 2 litri",
    },
    chapter: "22",
    section: "IV - Foodstuffs",
  },
  {
    hsCode: "020230",
    descriptions: {
      "pt-BR": "Carnes desossadas de bovino, congeladas",
      "pt-PT": "Carnes desossadas de bovino, congeladas",
      es: "Carne deshuesada de bovino, congelada",
      fr: "Viandes désossées de bovins, congelées",
      de: "Rindfleisch ohne Knochen, gefroren",
      it: "Carni disossate di bovini, congelate",
    },
    chapter: "02",
    section: "I - Live animals; animal products",
  },
  {
    hsCode: "080510",
    descriptions: {
      "pt-BR": "Laranjas frescas ou secas",
      "pt-PT": "Laranjas frescas ou secas",
      es: "Naranjas frescas o secas",
      fr: "Oranges fraîches ou sèches",
      de: "Orangen, frisch oder getrocknet",
      it: "Arance fresche o secche",
    },
    chapter: "08",
    section: "II - Vegetable products",
  },
  {
    hsCode: "710812",
    descriptions: {
      "pt-BR": "Ouro em formas brutas, para uso não monetário",
      "pt-PT": "Ouro em formas brutas, para uso não monetário",
      es: "Oro en bruto, para usos no monetarios",
      fr: "Or sous formes brutes, pour usages non monétaires",
      de: "Gold in Rohformen, zu nichtmonetären Zwecken",
      it: "Oro in forme gregge, per usi non monetari",
    },
    chapter: "71",
    section: "XIV - Precious metals",
  },
  {
    hsCode: "240120",
    descriptions: {
      "pt-BR": "Tabaco total ou parcialmente destalado",
      "pt-PT": "Tabaco total ou parcialmente destalado",
      es: "Tabaco total o parcialmente desvenado",
      fr: "Tabacs partiellement ou totalement écôtés",
      de: "Tabak, ganz oder teilweise entrippt",
      it: "Tabacchi parzialmente o totalmente scostolati",
    },
    chapter: "24",
    section: "IV - Foodstuffs",
  },
  {
    hsCode: "440710",
    descriptions: {
      "pt-BR": "Madeira de coníferas, serrada, espessura > 6mm",
      "pt-PT": "Madeira de coníferas, serrada, espessura > 6mm",
      es: "Madera de coníferas, aserrada, espesor > 6mm",
      fr: "Bois de conifères, sciés, épaisseur > 6mm",
      de: "Nadelholz, gesägt, Dicke > 6mm",
      it: "Legno di conifere, segato, spessore > 6mm",
    },
    chapter: "44",
    section: "IX - Wood and articles of wood",
  },
  {
    hsCode: "847989",
    descriptions: {
      "pt-BR": "Máquinas e aparelhos mecânicos com função própria, outros",
      "pt-PT": "Máquinas e aparelhos mecânicos com função própria, outros",
      es: "Máquinas y aparatos mecánicos con función propia, otros",
      fr: "Machines et appareils mécaniques ayant une fonction propre, autres",
      de: "Maschinen und mechanische Geräte mit eigener Funktion, andere",
      it: "Macchine e apparecchi meccanici con funzione propria, altri",
    },
    chapter: "84",
    section: "XVI - Machinery and mechanical appliances",
  },
  {
    hsCode: "151190",
    descriptions: {
      "pt-BR": "Óleo de palma e suas frações, refinados",
      "pt-PT": "Óleo de palma e as suas frações, refinados",
      es: "Aceite de palma y sus fracciones, refinados",
      fr: "Huile de palme et ses fractions, raffinées",
      de: "Palmöl und seine Fraktionen, raffiniert",
      it: "Olio di palma e sue frazioni, raffinati",
    },
    chapter: "15",
    section: "III - Animal or vegetable fats",
  },
  {
    hsCode: "100199",
    descriptions: {
      "pt-BR": "Trigo e mistura de trigo com centeio, outros",
      "pt-PT": "Trigo e mistura de trigo com centeio, outros",
      es: "Trigo y morcajo, otros",
      fr: "Blé et méteil, autres",
      de: "Weizen und Mengkorn, andere",
      it: "Frumento e frumento segalato, altri",
    },
    chapter: "10",
    section: "II - Vegetable products",
  },
  {
    hsCode: "040690",
    descriptions: {
      "pt-BR": "Outros queijos",
      "pt-PT": "Outros queijos",
      es: "Otros quesos",
      fr: "Autres fromages",
      de: "Andere Käse",
      it: "Altri formaggi",
    },
    chapter: "04",
    section: "I - Live animals; animal products",
  },
  {
    hsCode: "271019",
    descriptions: {
      "pt-BR": "Outros óleos de petróleo e preparações",
      "pt-PT": "Outros óleos de petróleo e preparações",
      es: "Otros aceites de petróleo y preparaciones",
      fr: "Autres huiles de pétrole et préparations",
      de: "Andere Erdölerzeugnisse und Zubereitungen",
      it: "Altri oli di petrolio e preparazioni",
    },
    chapter: "27",
    section: "V - Mineral products",
  },
];

// Tariff schedule based on published Annex 2-A categories
export const tariffScheduleData: TariffEntry[] = [
  { hsCode: "090111", category: "A", baseMFN: 0, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, valueAdded: 40 } },
  { hsCode: "120190", category: "A", baseMFN: 0, quotaApplies: false, rulesOfOrigin: { tariffClassification: true } },
  { hsCode: "020130", category: "E", baseMFN: 12.8, quotaApplies: true, quotaVolume: 99000, rulesOfOrigin: { tariffClassification: true, valueAdded: 55, specificProcessing: "Slaughter and deboning must occur in originating party" } },
  { hsCode: "170114", category: "E", baseMFN: 33.9, quotaApplies: true, quotaVolume: 180000, rulesOfOrigin: { tariffClassification: true, valueAdded: 50 } },
  { hsCode: "230400", category: "A", baseMFN: 0, quotaApplies: false, rulesOfOrigin: { tariffClassification: true } },
  { hsCode: "260111", category: "A", baseMFN: 0, quotaApplies: false, rulesOfOrigin: { tariffClassification: true } },
  { hsCode: "870323", category: "D", baseMFN: 35, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, valueAdded: 60, specificProcessing: "Assembly in originating party with minimum local content" } },
  { hsCode: "847130", category: "B", baseMFN: 14, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, valueAdded: 40 } },
  { hsCode: "300490", category: "C", baseMFN: 8, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, valueAdded: 45 } },
  { hsCode: "220421", category: "C", baseMFN: 14.4, quotaApplies: true, quotaVolume: 50000, rulesOfOrigin: { tariffClassification: true, specificProcessing: "Wine must be produced entirely from grapes grown and vinified in the originating party" } },
  { hsCode: "020230", category: "E", baseMFN: 12.8, quotaApplies: true, quotaVolume: 99000, rulesOfOrigin: { tariffClassification: true, valueAdded: 55, specificProcessing: "Slaughter and deboning must occur in originating party" } },
  { hsCode: "080510", category: "B", baseMFN: 16, quotaApplies: false, rulesOfOrigin: { tariffClassification: true } },
  { hsCode: "710812", category: "A", baseMFN: 0, quotaApplies: false, rulesOfOrigin: { tariffClassification: true } },
  { hsCode: "240120", category: "D", baseMFN: 18.4, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, valueAdded: 50 } },
  { hsCode: "440710", category: "B", baseMFN: 4, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, specificProcessing: "EUDR compliance documentation required" } },
  { hsCode: "847989", category: "C", baseMFN: 4.7, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, valueAdded: 45 } },
  { hsCode: "151190", category: "D", baseMFN: 9, quotaApplies: false, rulesOfOrigin: { tariffClassification: true, specificProcessing: "EUDR compliance documentation required" } },
  { hsCode: "100199", category: "E", baseMFN: 12, quotaApplies: true, quotaVolume: 100000, rulesOfOrigin: { tariffClassification: true } },
  { hsCode: "040690", category: "D", baseMFN: 17.1, quotaApplies: true, quotaVolume: 30000, rulesOfOrigin: { tariffClassification: true, valueAdded: 50, specificProcessing: "Cheese must be processed in the originating party from locally sourced milk" } },
  { hsCode: "271019", category: "A", baseMFN: 3.5, quotaApplies: false, rulesOfOrigin: { tariffClassification: true } },
];

// Sample trade volume data (realistic magnitudes)
export const tradeVolumeData: TradeVolumeEntry[] = [
  // Coffee — Brazil to Germany
  { hsCode: "090111", reporter: "BR", partner: "DE", year: 2025, importValue: 2_800_000_000, exportValue: 0, importWeight: 420000, exportWeight: 0, yoyGrowth: 8.2 },
  { hsCode: "090111", reporter: "BR", partner: "IT", year: 2025, importValue: 1_200_000_000, exportValue: 0, importWeight: 180000, exportWeight: 0, yoyGrowth: 5.1 },
  { hsCode: "090111", reporter: "BR", partner: "FR", year: 2025, importValue: 680_000_000, exportValue: 0, importWeight: 95000, exportWeight: 0, yoyGrowth: 3.4 },
  { hsCode: "090111", reporter: "BR", partner: "ES", year: 2025, importValue: 520_000_000, exportValue: 0, importWeight: 72000, exportWeight: 0, yoyGrowth: 12.1 },
  { hsCode: "090111", reporter: "BR", partner: "BE", year: 2025, importValue: 890_000_000, exportValue: 0, importWeight: 130000, exportWeight: 0, yoyGrowth: 6.7 },
  // Soy — Brazil to EU
  { hsCode: "120190", reporter: "BR", partner: "NL", year: 2025, importValue: 4_100_000_000, exportValue: 0, importWeight: 8_500_000, exportWeight: 0, yoyGrowth: 4.5 },
  { hsCode: "120190", reporter: "BR", partner: "ES", year: 2025, importValue: 2_300_000_000, exportValue: 0, importWeight: 4_800_000, exportWeight: 0, yoyGrowth: 7.8 },
  { hsCode: "120190", reporter: "BR", partner: "DE", year: 2025, importValue: 1_800_000_000, exportValue: 0, importWeight: 3_700_000, exportWeight: 0, yoyGrowth: 2.3 },
  // Beef — Brazil/Argentina to EU
  { hsCode: "020130", reporter: "BR", partner: "NL", year: 2025, importValue: 890_000_000, exportValue: 0, importWeight: 95000, exportWeight: 0, yoyGrowth: 15.3 },
  { hsCode: "020130", reporter: "AR", partner: "DE", year: 2025, importValue: 420_000_000, exportValue: 0, importWeight: 45000, exportWeight: 0, yoyGrowth: 9.8 },
  { hsCode: "020130", reporter: "AR", partner: "NL", year: 2025, importValue: 380_000_000, exportValue: 0, importWeight: 42000, exportWeight: 0, yoyGrowth: 11.2 },
  { hsCode: "020130", reporter: "UY", partner: "DE", year: 2025, importValue: 210_000_000, exportValue: 0, importWeight: 22000, exportWeight: 0, yoyGrowth: 7.5 },
  // Automobiles — EU to Mercosur
  { hsCode: "870323", reporter: "DE", partner: "BR", year: 2025, importValue: 0, exportValue: 3_200_000_000, importWeight: 0, exportWeight: 280000, yoyGrowth: -2.1 },
  { hsCode: "870323", reporter: "DE", partner: "AR", year: 2025, importValue: 0, exportValue: 1_100_000_000, importWeight: 0, exportWeight: 95000, yoyGrowth: 4.3 },
  { hsCode: "870323", reporter: "FR", partner: "BR", year: 2025, importValue: 0, exportValue: 890_000_000, importWeight: 0, exportWeight: 75000, yoyGrowth: 1.8 },
  { hsCode: "870323", reporter: "IT", partner: "BR", year: 2025, importValue: 0, exportValue: 720_000_000, importWeight: 0, exportWeight: 60000, yoyGrowth: 6.2 },
  // Pharmaceuticals — EU to Mercosur
  { hsCode: "300490", reporter: "DE", partner: "BR", year: 2025, importValue: 0, exportValue: 2_400_000_000, importWeight: 0, exportWeight: 35000, yoyGrowth: 11.5 },
  { hsCode: "300490", reporter: "FR", partner: "BR", year: 2025, importValue: 0, exportValue: 1_600_000_000, importWeight: 0, exportWeight: 22000, yoyGrowth: 8.9 },
  { hsCode: "300490", reporter: "IE", partner: "BR", year: 2025, importValue: 0, exportValue: 980_000_000, importWeight: 0, exportWeight: 14000, yoyGrowth: 14.2 },
  // Wine — EU to Mercosur
  { hsCode: "220421", reporter: "FR", partner: "BR", year: 2025, importValue: 0, exportValue: 340_000_000, importWeight: 0, exportWeight: 48000, yoyGrowth: 5.6 },
  { hsCode: "220421", reporter: "IT", partner: "BR", year: 2025, importValue: 0, exportValue: 280_000_000, importWeight: 0, exportWeight: 42000, yoyGrowth: 7.1 },
  { hsCode: "220421", reporter: "ES", partner: "BR", year: 2025, importValue: 0, exportValue: 190_000_000, importWeight: 0, exportWeight: 35000, yoyGrowth: 3.2 },
  // Cheese — EU to Mercosur
  { hsCode: "040690", reporter: "FR", partner: "BR", year: 2025, importValue: 0, exportValue: 120_000_000, importWeight: 0, exportWeight: 18000, yoyGrowth: 9.4 },
  { hsCode: "040690", reporter: "IT", partner: "BR", year: 2025, importValue: 0, exportValue: 95_000_000, importWeight: 0, exportWeight: 14000, yoyGrowth: 12.3 },
  { hsCode: "040690", reporter: "NL", partner: "BR", year: 2025, importValue: 0, exportValue: 85_000_000, importWeight: 0, exportWeight: 13000, yoyGrowth: 6.8 },
];

// SME support programs
export const supportPrograms = [
  {
    id: "apex-peiex",
    country: "BR",
    flag: "🇧🇷",
    nameKey: "ApexBrasil PEIEX",
    descriptionKey: "Programa de apoio à exportação para PMEs brasileiras com capacitação e orientação técnica",
    url: "https://apexbrasil.com.br/peiex",
    category: "export-readiness",
  },
  {
    id: "sebrae-intl",
    country: "BR",
    flag: "🇧🇷",
    nameKey: "Sebrae Internacionalização",
    descriptionKey: "Trilhas de internacionalização com mentoria, capacitação e missões empresariais",
    url: "https://sebrae.com.br/sites/PortalSebrae/artigos/internacionalizacao",
    category: "capacity-building",
  },
  {
    id: "een",
    country: "EU",
    flag: "🇪🇺",
    nameKey: "Enterprise Europe Network",
    descriptionKey: "Rede europeia de apoio a PMEs para internacionalização, inovação e acesso ao mercado único",
    url: "https://een.ec.europa.eu",
    category: "market-access",
  },
  {
    id: "argentina-exporta",
    country: "AR",
    flag: "🇦🇷",
    nameKey: "Argentina Exporta",
    descriptionKey: "Programa de promoção comercial e apoio a exportadores argentinos",
    url: "https://www.argentina.gob.ar/produccion/comercio-exterior",
    category: "export-readiness",
  },
  {
    id: "uruguay-xxi",
    country: "UY",
    flag: "🇺🇾",
    nameKey: "Uruguay XXI",
    descriptionKey: "Agência de promoção de investimentos e exportações do Uruguai",
    url: "https://www.uruguayxxi.gub.uy",
    category: "trade-promotion",
  },
  {
    id: "rediex",
    country: "PY",
    flag: "🇵🇾",
    nameKey: "REDIEX Paraguay",
    descriptionKey: "Rede de investimentos e exportações do Paraguai, apoio integral a exportadores",
    url: "https://www.rediex.gov.py",
    category: "trade-promotion",
  },
];
