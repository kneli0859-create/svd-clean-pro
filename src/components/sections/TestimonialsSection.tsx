import { InfiniteMovingCards } from '@/components/ui/aceternity/infinite-moving-cards';
import { Info } from 'lucide-react';

// IMPORTANT: These are illustrative placeholders for the Launch-Phase.
// Replace with real testimonials once we have signed customers. We mark this
// section explicitly to avoid misleading visitors.
const items = [
  {
    quote:
      'Wir sparen 2 Stunden pro Angebot. Der Kalkulator ist genial — endlich Schluss mit Excel-Chaos.',
    name: 'Markus Schmidt',
    title: 'Geschäftsführer · Schmidt Reinigung München',
  },
  {
    quote:
      'Das PDF-Angebot sieht professionell aus. Klienten antworten innerhalb von Stunden.',
    name: 'Andrea Hoffmann',
    title: 'Inhaberin · Hoffmann Clean Hamburg',
  },
  {
    quote:
      'In 30 Sekunden zur Rechnung. Klienten denken wir sind Pros — sind wir ja jetzt.',
    name: 'Thomas Weber',
    title: 'Weber Gebäudereinigung Berlin',
  },
  {
    quote:
      'Der §19 UStG-Schalter spart mir Diskussionen mit Steuerberater und Kunden.',
    name: 'Lena Vogel',
    title: 'Inhaberin · Vogel Cleaning Köln',
  },
  {
    quote:
      'Die PLZ-Logik passt sich perfekt an. Bayern-Preise in München, Provinz-Preise in der Oberpfalz.',
    name: 'Daniel Becker',
    title: 'Becker Service GmbH Nürnberg',
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold-400">
            Was Profis sagen
          </span>
          <h2 className="text-h1 mt-4 font-serif font-bold text-white">
            Reinigungsfirmen, die <span className="text-gradient-gold">schneller</span> wachsen
          </h2>

          <p className="mx-auto mt-4 inline-flex items-start gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] leading-snug text-white/55">
            <Info className="mt-0.5 size-3.5 shrink-0 text-white/40" />
            <span>
              Beispiel-Stimmen während der Launch-Phase. Wir ersetzen sie durch echte
              Kundenstimmen, sobald sie verfügbar sind.
            </span>
          </p>
        </div>
      </div>

      <InfiniteMovingCards items={items} speed="slow" />
    </section>
  );
}
