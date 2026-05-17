'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { LinkButton } from '@/components/ui/link-button';

const plans = [
  {
    line: 'Linie 1',
    name: 'Kalkulator',
    normalprice: '€497',
    launchprice: '€197',
    monthly: null as string | null,
    highlight: false,
    features: [
      '12 Reinigungs-Branchen',
      'PLZ-Engine für ganz Deutschland',
      '§19 UStG Schalter',
      'PDF-Angebot mit deinem Logo',
      'Online-Terminbuchung',
      'Einmalzahlung — kein Abo',
    ],
  },
  {
    line: 'Linie 2',
    name: 'Embed',
    normalprice: '€897',
    launchprice: '€297',
    monthly: '€29/Monat',
    monthlyNormal: '€89/Monat',
    highlight: true,
    features: [
      'Alles aus Linie 1',
      'Iframe-Einbettung in deine Website',
      'Eigenes Branding (Farben, Logo)',
      'Lead-Capture mit E-Mail-Versand',
      'Buchungs-Übersicht im Admin',
      'Monatliche Updates inklusive',
    ],
  },
  {
    line: 'Linie 3',
    name: 'Neue Website',
    normalprice: '€1.497',
    launchprice: '€597',
    monthly: '€49/Monat',
    monthlyNormal: '€149/Monat',
    highlight: false,
    features: [
      'Alles aus Linie 2',
      'Komplette neue Website',
      'DE/EN/BG Mehrsprachigkeit',
      'SEO-Optimierung',
      'Eigene Domain & Hosting',
      'Premium-Support 7 Tage/Woche',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-xs font-medium tracking-wide text-[#FFD700]">
            <Sparkles className="size-3.5" />
            Nur für die ersten 10 Kunden
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Drei Linien. <span className="text-gradient-gold">Eine Plattform.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            Wähle die Linie, die zu deinem Geschäft passt. Upgrade jederzeit möglich.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.line}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-8 ${
                p.highlight
                  ? 'glass-gold ring-1 ring-[#FFD700]/30'
                  : 'glass'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FFD700] px-3 py-1 text-xs font-bold tracking-wide text-[#0F172A]">
                  EMPFOHLEN
                </span>
              )}
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {p.line}
              </div>
              <h3 className="mt-2 font-serif text-3xl font-semibold">{p.name}</h3>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-[#FFD700]">
                  {p.launchprice}
                </span>
                <span className="font-mono text-lg text-slate-500 line-through">
                  {p.normalprice}
                </span>
              </div>
              {p.monthly && (
                <div className="mt-1 flex items-baseline gap-2 text-sm">
                  <span className="font-mono text-slate-200">+ {p.monthly}</span>
                  <span className="font-mono text-slate-500 line-through">
                    {p.monthlyNormal}
                  </span>
                </div>
              )}

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#FFD700]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <LinkButton
                href="/kalkulator"
                size="lg"
                className={`mt-8 h-12 w-full rounded-full font-semibold ${
                  p.highlight
                    ? 'bg-[#FFD700] text-[#0F172A] hover:bg-[#FFC700]'
                    : 'bg-white/10 text-slate-100 hover:bg-white/15'
                }`}
              >
                {p.name} wählen
              </LinkButton>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Alle Preise zzgl. 19% MwSt. Launch-Aktion endet bei 10 Kunden.
        </p>
      </div>
    </section>
  );
}
