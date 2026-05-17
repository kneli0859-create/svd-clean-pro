'use client';

import { motion } from 'framer-motion';
import { Clock, Calculator, FileCheck, Calendar } from 'lucide-react';

const steps = [
  {
    icon: Clock,
    title: 'Anruf vom Kunden',
    text: 'Ein Treppenhaus mit 4 Stockwerken in 80331 München. Früher: 30 Minuten Excel.',
  },
  {
    icon: Calculator,
    title: 'PLZ erkannt — Tier 1',
    text: 'München: Multiplikator 1.4. Frequenz wöchentlich = 10% Bulk-Rabatt. Berechnung in Echtzeit.',
  },
  {
    icon: FileCheck,
    title: 'PDF in einer Sekunde',
    text: 'Angebot mit deinem Logo, §19 UStG-Schalter, AGB-Link — sofort versandfertig.',
  },
  {
    icon: Calendar,
    title: 'Online gebucht',
    text: 'Der Kunde wählt Termin im Kalender. Du bekommst E-Mail-Bestätigung. Fertig.',
  },
];

export function StorySection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700]">
            So funktioniert&apos;s
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Von <span className="text-gradient-gold">30 Minuten</span> zu{' '}
            <span className="text-gradient-gold">30 Sekunden</span>
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            Vier Schritte. Kein Excel. Keine Telefonate. Keine verlorenen
            Aufträge mehr.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass group relative rounded-2xl p-6"
            >
              <div className="absolute -top-3 -right-3 grid size-8 place-items-center rounded-full bg-[#FFD700] font-mono text-sm font-bold text-[#0F172A] shadow-lg">
                {i + 1}
              </div>
              <s.icon className="mb-4 size-7 text-[#FFD700]" />
              <h3 className="font-serif text-xl font-semibold text-slate-100">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
