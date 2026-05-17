import { Clock, MapPin, FileText, Calendar, Globe, Sparkles } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid';
import {
  TimerVisual,
  GermanyMapVisual,
  PDFVisual,
  CalendarVisual,
  LanguageVisual,
  TaxToggleVisual,
} from './BentoVisuals';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
  span?: string;
}

const features: Feature[] = [
  {
    title: 'Angebot in 30 Sekunden',
    description:
      'Statt 30 Minuten Excel-Arbeit. Klient gibt Daten ein — System rechnet, formatiert und liefert PDF.',
    icon: <Clock className="h-5 w-5 text-gold-400" />,
    visual: <TimerVisual />,
    span: 'lg:col-span-2',
  },
  {
    title: 'PLZ-genaue Preise',
    description:
      'Tier 1–5 für ganz Deutschland. München x1.40, Augsburg x1.15, Provinz x0.85.',
    icon: <MapPin className="h-5 w-5 text-gold-400" />,
    visual: <GermanyMapVisual />,
  },
  {
    title: 'Automatische PDFs',
    description: 'Angebot + Vertrag auf Deutsch, mit Ihrem Logo, DSGVO-konform.',
    icon: <FileText className="h-5 w-5 text-gold-400" />,
    visual: <PDFVisual />,
  },
  {
    title: 'Online-Buchung',
    description: 'Kunde wählt Termin direkt im Kalender. Sie sehen alles in der Übersicht.',
    icon: <Calendar className="h-5 w-5 text-gold-400" />,
    visual: <CalendarVisual />,
  },
  {
    title: '3 Sprachen',
    description: 'Deutsch, Englisch, Bulgarisch — der Klient wählt selbst.',
    icon: <Globe className="h-5 w-5 text-gold-400" />,
    visual: <LanguageVisual />,
  },
  {
    title: '§19 UStG Support',
    description:
      'Kleinunternehmer-Schalter — Preise mit oder ohne 19% MwSt., je nach Status.',
    icon: <Sparkles className="h-5 w-5 text-gold-400" />,
    visual: <TaxToggleVisual />,
    span: 'lg:col-span-2',
  },
];

export function BentoFeatures() {
  return (
    <section
      id="features"
      className="relative bg-navy-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center sm:mb-20">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-400">
            Alles in einer Plattform
          </span>
          <h2 className="text-h1 mt-4 font-serif font-bold text-white">
            Vier Schritte. <span className="text-white/35">Kein Excel.</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-2xl text-white/55">
            Jede Funktion ist auf den deutschen Markt zugeschnitten — von der PLZ-Tiefe
            bis zum §19-Schalter.
          </p>
        </div>

        <BentoGrid>
          {features.map((f, i) => (
            <BentoGridItem
              key={f.title}
              title={f.title}
              description={f.description}
              icon={f.icon}
              visual={f.visual}
              delay={i * 0.06}
              className={f.span}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
