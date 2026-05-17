// PLZ → Tier mapping за цяла Германия.
// Логика: prefix (първи 2 цифри на PLZ) → tier + multiplier + city.
// Tier 1 = премиум градове (München, Frankfurt, Hamburg)  — x1.35-1.40
// Tier 2 = големи градове (Berlin, Augsburg, Nürnberg)     — x1.15-1.20
// Tier 3 = средни градове (Dresden, Leipzig, Essen)        — x1.00 (baseline)
// Tier 4 = по-малки градове (Halle, Chemnitz)              — x0.85-0.90
// Tier 5 = селски/източна провинция                        — x0.80-0.85

export type TierLevel = 1 | 2 | 3 | 4 | 5;

export interface PLZTier {
  tier: TierLevel;
  multiplier: number;
  region: string;
  city: string;
}

export const PLZ_TIERS: Record<string, PLZTier> = {
  // Tier 1 — Премиум градове
  '80': { tier: 1, multiplier: 1.4, region: 'Bayern', city: 'München' },
  '81': { tier: 1, multiplier: 1.4, region: 'Bayern', city: 'München' },
  '82': { tier: 1, multiplier: 1.4, region: 'Bayern', city: 'München-Umland' },
  '83': { tier: 1, multiplier: 1.35, region: 'Bayern', city: 'Rosenheim/Oberbayern' },
  '85': { tier: 1, multiplier: 1.35, region: 'Bayern', city: 'Ingolstadt' },
  '60': { tier: 1, multiplier: 1.4, region: 'Hessen', city: 'Frankfurt am Main' },
  '61': { tier: 1, multiplier: 1.35, region: 'Hessen', city: 'Frankfurt-Umland' },
  '63': { tier: 1, multiplier: 1.3, region: 'Hessen', city: 'Aschaffenburg/Offenbach' },
  '65': { tier: 1, multiplier: 1.3, region: 'Hessen', city: 'Wiesbaden' },
  '20': { tier: 1, multiplier: 1.4, region: 'Hamburg', city: 'Hamburg' },
  '21': { tier: 1, multiplier: 1.3, region: 'Hamburg-Umland', city: 'Hamburg-Süd' },
  '22': { tier: 1, multiplier: 1.4, region: 'Hamburg', city: 'Hamburg' },
  '70': { tier: 1, multiplier: 1.4, region: 'Baden-Württemberg', city: 'Stuttgart' },
  '71': { tier: 1, multiplier: 1.3, region: 'Baden-Württemberg', city: 'Stuttgart-Umland' },
  '50': { tier: 1, multiplier: 1.35, region: 'Nordrhein-Westfalen', city: 'Köln' },
  '40': { tier: 1, multiplier: 1.35, region: 'Nordrhein-Westfalen', city: 'Düsseldorf' },
  '41': { tier: 1, multiplier: 1.25, region: 'Nordrhein-Westfalen', city: 'Mönchengladbach' },
  '76': { tier: 1, multiplier: 1.3, region: 'Baden-Württemberg', city: 'Karlsruhe' },
  '79': { tier: 1, multiplier: 1.3, region: 'Baden-Württemberg', city: 'Freiburg im Breisgau' },
  '88': { tier: 1, multiplier: 1.25, region: 'Baden-Württemberg', city: 'Ravensburg/Bodensee' },

  // Tier 2 — Големи градове
  '10': { tier: 2, multiplier: 1.2, region: 'Berlin', city: 'Berlin-Mitte/West' },
  '12': { tier: 2, multiplier: 1.2, region: 'Berlin', city: 'Berlin-Süd' },
  '13': { tier: 2, multiplier: 1.2, region: 'Berlin', city: 'Berlin-Nord' },
  '14': { tier: 2, multiplier: 1.15, region: 'Brandenburg', city: 'Potsdam' },
  '86': { tier: 2, multiplier: 1.15, region: 'Bayern', city: 'Augsburg' }, // Шефе тук!
  '90': { tier: 2, multiplier: 1.2, region: 'Bayern', city: 'Nürnberg' },
  '91': { tier: 2, multiplier: 1.15, region: 'Bayern', city: 'Erlangen/Fürth' },
  '93': { tier: 2, multiplier: 1.1, region: 'Bayern', city: 'Regensburg' },
  '95': { tier: 2, multiplier: 1.05, region: 'Bayern', city: 'Bayreuth/Hof' },
  '97': { tier: 2, multiplier: 1.1, region: 'Bayern', city: 'Würzburg' },
  '28': { tier: 2, multiplier: 1.15, region: 'Bremen', city: 'Bremen' },
  '30': { tier: 2, multiplier: 1.15, region: 'Niedersachsen', city: 'Hannover' },
  '31': { tier: 2, multiplier: 1.05, region: 'Niedersachsen', city: 'Hildesheim' },
  '33': { tier: 2, multiplier: 1.1, region: 'Nordrhein-Westfalen', city: 'Bielefeld/Paderborn' },
  '48': { tier: 2, multiplier: 1.15, region: 'Nordrhein-Westfalen', city: 'Münster' },
  '53': { tier: 2, multiplier: 1.2, region: 'Nordrhein-Westfalen', city: 'Bonn' },
  '55': { tier: 2, multiplier: 1.15, region: 'Rheinland-Pfalz', city: 'Mainz' },
  '67': { tier: 2, multiplier: 1.1, region: 'Rheinland-Pfalz', city: 'Ludwigshafen/Kaiserslautern' },
  '68': { tier: 2, multiplier: 1.2, region: 'Baden-Württemberg', city: 'Mannheim' },
  '69': { tier: 2, multiplier: 1.2, region: 'Baden-Württemberg', city: 'Heidelberg' },
  '72': { tier: 2, multiplier: 1.1, region: 'Baden-Württemberg', city: 'Tübingen/Reutlingen' },
  '78': { tier: 2, multiplier: 1.1, region: 'Baden-Württemberg', city: 'Konstanz' },
  '89': { tier: 2, multiplier: 1.15, region: 'Bayern', city: 'Ulm' },

  // Tier 3 — Средни градове / baseline
  '01': { tier: 3, multiplier: 1.0, region: 'Sachsen', city: 'Dresden' },
  '04': { tier: 3, multiplier: 1.0, region: 'Sachsen', city: 'Leipzig' },
  '24': { tier: 3, multiplier: 1.0, region: 'Schleswig-Holstein', city: 'Kiel' },
  '25': { tier: 3, multiplier: 0.95, region: 'Schleswig-Holstein', city: 'Heide/Itzehoe' },
  '23': { tier: 3, multiplier: 1.0, region: 'Schleswig-Holstein', city: 'Lübeck' },
  '26': { tier: 3, multiplier: 0.95, region: 'Niedersachsen', city: 'Oldenburg/Wilhelmshaven' },
  '27': { tier: 3, multiplier: 0.95, region: 'Niedersachsen', city: 'Bremerhaven' },
  '29': { tier: 3, multiplier: 0.95, region: 'Niedersachsen', city: 'Lüneburg' },
  '34': { tier: 3, multiplier: 1.0, region: 'Hessen', city: 'Kassel' },
  '35': { tier: 3, multiplier: 1.0, region: 'Hessen', city: 'Marburg/Gießen' },
  '36': { tier: 3, multiplier: 0.95, region: 'Hessen', city: 'Fulda' },
  '37': { tier: 3, multiplier: 1.0, region: 'Niedersachsen', city: 'Göttingen' },
  '38': { tier: 3, multiplier: 1.0, region: 'Niedersachsen', city: 'Braunschweig' },
  '39': { tier: 3, multiplier: 0.95, region: 'Sachsen-Anhalt', city: 'Magdeburg' },
  '42': { tier: 3, multiplier: 1.05, region: 'Nordrhein-Westfalen', city: 'Wuppertal/Solingen' },
  '44': { tier: 3, multiplier: 1.0, region: 'Nordrhein-Westfalen', city: 'Dortmund' },
  '45': { tier: 3, multiplier: 1.0, region: 'Nordrhein-Westfalen', city: 'Essen' },
  '46': { tier: 3, multiplier: 1.0, region: 'Nordrhein-Westfalen', city: 'Oberhausen' },
  '47': { tier: 3, multiplier: 1.0, region: 'Nordrhein-Westfalen', city: 'Duisburg' },
  '49': { tier: 3, multiplier: 0.95, region: 'Niedersachsen', city: 'Osnabrück' },
  '51': { tier: 3, multiplier: 1.05, region: 'Nordrhein-Westfalen', city: 'Leverkusen' },
  '52': { tier: 3, multiplier: 1.05, region: 'Nordrhein-Westfalen', city: 'Aachen' },
  '54': { tier: 3, multiplier: 0.95, region: 'Rheinland-Pfalz', city: 'Trier' },
  '56': { tier: 3, multiplier: 1.0, region: 'Rheinland-Pfalz', city: 'Koblenz' },
  '57': { tier: 3, multiplier: 0.95, region: 'Nordrhein-Westfalen', city: 'Siegen' },
  '58': { tier: 3, multiplier: 1.0, region: 'Nordrhein-Westfalen', city: 'Hagen' },
  '59': { tier: 3, multiplier: 0.95, region: 'Nordrhein-Westfalen', city: 'Soest' },
  '64': { tier: 3, multiplier: 1.05, region: 'Hessen', city: 'Darmstadt' },
  '66': { tier: 3, multiplier: 0.95, region: 'Saarland', city: 'Saarbrücken' },
  '73': { tier: 3, multiplier: 1.0, region: 'Baden-Württemberg', city: 'Schwäbisch Gmünd' },
  '74': { tier: 3, multiplier: 1.0, region: 'Baden-Württemberg', city: 'Heilbronn' },
  '75': { tier: 3, multiplier: 1.0, region: 'Baden-Württemberg', city: 'Pforzheim' },
  '77': { tier: 3, multiplier: 0.95, region: 'Baden-Württemberg', city: 'Offenburg' },
  '84': { tier: 3, multiplier: 0.95, region: 'Bayern', city: 'Landshut' },
  '87': { tier: 3, multiplier: 0.95, region: 'Bayern', city: 'Kempten/Allgäu' },
  '92': { tier: 3, multiplier: 0.95, region: 'Bayern', city: 'Amberg/Weiden' },
  '94': { tier: 3, multiplier: 0.95, region: 'Bayern', city: 'Passau/Deggendorf' },
  '96': { tier: 3, multiplier: 0.95, region: 'Bayern', city: 'Bamberg/Coburg' },
  '98': { tier: 3, multiplier: 0.9, region: 'Thüringen', city: 'Suhl' },
  '99': { tier: 3, multiplier: 0.9, region: 'Thüringen', city: 'Erfurt/Weimar' },

  // Tier 4 — По-малки градове
  '06': { tier: 4, multiplier: 0.9, region: 'Sachsen-Anhalt', city: 'Halle' },
  '07': { tier: 4, multiplier: 0.9, region: 'Thüringen', city: 'Gera/Jena' },
  '08': { tier: 4, multiplier: 0.9, region: 'Sachsen', city: 'Zwickau/Plauen' },
  '09': { tier: 4, multiplier: 0.9, region: 'Sachsen', city: 'Chemnitz' },
  '17': { tier: 4, multiplier: 0.85, region: 'Mecklenburg-Vorpommern', city: 'Neubrandenburg/Stralsund' },

  // Tier 5 — Селски райони / източна провинция
  '02': { tier: 5, multiplier: 0.85, region: 'Sachsen', city: 'Bautzen/Görlitz' },
  '03': { tier: 5, multiplier: 0.85, region: 'Brandenburg', city: 'Cottbus' },
  '15': { tier: 5, multiplier: 0.85, region: 'Brandenburg', city: 'Frankfurt (Oder)' },
  '16': { tier: 5, multiplier: 0.85, region: 'Brandenburg', city: 'Eberswalde' },
  '18': { tier: 5, multiplier: 0.85, region: 'Mecklenburg-Vorpommern', city: 'Rostock' },
  '19': { tier: 5, multiplier: 0.85, region: 'Mecklenburg-Vorpommern', city: 'Schwerin' },
};

export function getPLZTier(plz: string): PLZTier {
  const prefix = plz.trim().substring(0, 2);
  return (
    PLZ_TIERS[prefix] ?? {
      tier: 3,
      multiplier: 1.0,
      region: 'Deutschland',
      city: 'Unbekannt',
    }
  );
}

export function isValidPLZ(plz: string): boolean {
  return /^[0-9]{5}$/.test(plz.trim());
}

// Service definitions — base prices (€ за час, освен ако unit е m²/Stück)
export type ServiceKey =
  | 'bueroreinigung'
  | 'treppenhaus'
  | 'grundreinigung'
  | 'baureinigung'
  | 'fenster'
  | 'boden'
  | 'teppich'
  | 'polster'
  | 'kueche'
  | 'aussen'
  | 'garage'
  | 'end';

export interface ServiceDef {
  key: ServiceKey;
  name: string; // немски
  description: string; // немски
  base: number; // base price
  unit: 'Stunde' | 'Woche' | 'm²' | 'Stück';
  icon: string; // lucide-react icon name
}

export const SERVICES: Record<ServiceKey, ServiceDef> = {
  bueroreinigung: {
    key: 'bueroreinigung',
    name: 'Büroreinigung',
    description: 'Regelmäßige Reinigung von Büroräumen',
    base: 18,
    unit: 'Stunde',
    icon: 'Building2',
  },
  treppenhaus: {
    key: 'treppenhaus',
    name: 'Treppenhausreinigung',
    description: 'Wöchentliche Reinigung von Treppenhäusern',
    base: 45,
    unit: 'Woche',
    icon: 'TrendingUp',
  },
  grundreinigung: {
    key: 'grundreinigung',
    name: 'Grundreinigung',
    description: 'Intensive Tiefenreinigung',
    base: 30,
    unit: 'Stunde',
    icon: 'Sparkles',
  },
  baureinigung: {
    key: 'baureinigung',
    name: 'Baureinigung',
    description: 'Reinigung nach Bauarbeiten',
    base: 35,
    unit: 'Stunde',
    icon: 'HardHat',
  },
  fenster: {
    key: 'fenster',
    name: 'Fensterreinigung',
    description: 'Innen- und Außenreinigung von Fenstern',
    base: 28,
    unit: 'Stunde',
    icon: 'Square',
  },
  boden: {
    key: 'boden',
    name: 'Bodenreinigung',
    description: 'Reinigung und Pflege aller Bodenarten',
    base: 22,
    unit: 'Stunde',
    icon: 'Layers',
  },
  teppich: {
    key: 'teppich',
    name: 'Teppichreinigung',
    description: 'Professionelle Teppich-Tiefenreinigung',
    base: 18,
    unit: 'm²',
    icon: 'Grid3x3',
  },
  polster: {
    key: 'polster',
    name: 'Polsterreinigung',
    description: 'Reinigung von Sofas und Sesseln',
    base: 60,
    unit: 'Stück',
    icon: 'Armchair',
  },
  kueche: {
    key: 'kueche',
    name: 'Küchenreinigung',
    description: 'Gewerbliche Küchenreinigung',
    base: 40,
    unit: 'Stunde',
    icon: 'ChefHat',
  },
  aussen: {
    key: 'aussen',
    name: 'Außenreinigung',
    description: 'Außenflächen, Fassaden, Hofeinfahrten',
    base: 25,
    unit: 'Stunde',
    icon: 'Trees',
  },
  garage: {
    key: 'garage',
    name: 'Garagenreinigung',
    description: 'Tiefgaragen und Stellplatzreinigung',
    base: 30,
    unit: 'Stunde',
    icon: 'Car',
  },
  end: {
    key: 'end',
    name: 'Endreinigung',
    description: 'Umzugs- und Endreinigung pro m²',
    base: 8,
    unit: 'm²',
    icon: 'Home',
  },
};

// Frequency multipliers — колкото по-често, толкова по-голям bulk discount
export const FREQUENCY_DISCOUNT = {
  einmalig: 1.0,
  woechentlich: 0.9,
  zweiwoechentlich: 0.95,
  monatlich: 1.0,
  taeglich: 0.85,
} as const;

export type FrequencyKey = keyof typeof FREQUENCY_DISCOUNT;

export const FREQUENCY_LABELS: Record<FrequencyKey, string> = {
  einmalig: 'Einmalig',
  woechentlich: 'Wöchentlich',
  zweiwoechentlich: 'Alle 2 Wochen',
  monatlich: 'Monatlich',
  taeglich: 'Täglich',
};

// MwSt rates
export const MWST_RATE = 0.19; // 19% Mehrwertsteuer Deutschland

export interface PriceBreakdown {
  base: number;
  multiplier: number;
  frequencyDiscount: number;
  netto: number;
  mwst: number;
  brutto: number;
  isKleinunternehmer: boolean;
}

export interface SavingsBreakdown {
  konkurrenz: number; // конкуренти (56% по-скъпо)
  empfohlen: number; // препоръчано (22% по-скъпо)
  ihrPreis: number; // твоята цена
  sieSparen: number; // спестявате
  sparenProzent: number;
}

export function calculatePrice(args: {
  service: ServiceKey;
  quantity: number; // m² или Stunden или Stück
  plz: string;
  frequency: FrequencyKey;
  isKleinunternehmer?: boolean;
}): PriceBreakdown {
  const svc = SERVICES[args.service];
  const tier = getPLZTier(args.plz);
  const freqDiscount = FREQUENCY_DISCOUNT[args.frequency];

  const base = svc.base * args.quantity;
  const netto = Math.round(base * tier.multiplier * freqDiscount * 100) / 100;
  const mwst = args.isKleinunternehmer
    ? 0
    : Math.round(netto * MWST_RATE * 100) / 100;
  const brutto = Math.round((netto + mwst) * 100) / 100;

  return {
    base,
    multiplier: tier.multiplier,
    frequencyDiscount: freqDiscount,
    netto,
    mwst,
    brutto,
    isKleinunternehmer: !!args.isKleinunternehmer,
  };
}

// "Колко спестявате" — сравнение спрямо средни конкурентни цени
export function calculateSavings(yourPrice: number): SavingsBreakdown {
  const konkurrenz = Math.round(yourPrice * 1.56);
  const empfohlen = Math.round(yourPrice * 1.22);
  const sieSparen = konkurrenz - yourPrice;
  const sparenProzent = Math.round((sieSparen / konkurrenz) * 100);
  return {
    konkurrenz,
    empfohlen,
    ihrPreis: yourPrice,
    sieSparen,
    sparenProzent,
  };
}

export function formatEUR(n: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatEURPrecise(n: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
