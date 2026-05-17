'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { MagneticWrap } from '@/components/ui/magnetic-button';
import { ShimmerButton } from '@/components/ui/magic/shimmer-button';
import { easings } from '@/lib/design-tokens';

interface Plan {
  name: string;
  description: string;
  normalPrice: string;
  launchPrice: string;
  monthly?: string;
  monthlyNormal?: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'Kalkulator',
    description: 'Einmalige Zahlung. Eigener Kalkulator auf Ihrer Subdomain.',
    normalPrice: '€497',
    launchPrice: '€197',
    features: [
      '4-Schritt Wizard',
      'PLZ-Engine für ganz DE',
      'Automatische PDFs',
      'Online-Buchung',
      'DE / EN / BG Sprachen',
      'Einmalzahlung — kein Abo',
    ],
    cta: 'Starten',
  },
  {
    name: 'Embed',
    description: 'In Ihre bestehende Webseite integrieren — iFrame Code.',
    normalPrice: '€897',
    launchPrice: '€297',
    monthly: '€29/Monat',
    monthlyNormal: '€89/Monat',
    features: [
      'Alles aus Kalkulator',
      'iFrame Embed Code',
      'WordPress · Wix · Squarespace',
      'Eigenes Branding · Farben · Logo',
      'Lead-Capture mit E-Mail-Versand',
      'Buchungs-Übersicht im Admin',
    ],
    cta: 'Empfohlen',
    featured: true,
    badge: 'Beliebteste Wahl',
  },
  {
    name: 'Komplett',
    description: 'Komplett neue Webseite + Kalkulator + Hosting.',
    normalPrice: '€1.497',
    launchPrice: '€597',
    monthly: '€49/Monat',
    monthlyNormal: '€149/Monat',
    features: [
      '8 professionelle Seiten',
      'Kalkulator integriert',
      'Kontaktformular + Blog',
      'AGB / Datenschutz / Impressum',
      'Eigene Domain & Hosting',
      'Premium-Support 7 Tage/Woche',
    ],
    cta: 'Premium',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      {/* Background ambient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 40% at 50% 0%, rgba(255,215,0,0.07), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center sm:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gold-400">
            <Sparkles className="size-3" />
            Launch-Aktion · Nur 10 Plätze
          </span>
          <h2 className="text-h1 mt-5 font-serif font-bold text-white">
            Drei Wege, <span className="text-gradient-gold">ein Ziel</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-2xl text-white/55">
            Wählen Sie die Linie, die zu Ihrem Geschäft passt. Upgrade jederzeit möglich.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PricingCard key={p.name} plan={p} delay={i * 0.08} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          Alle Preise zzgl. 19% MwSt. · Launch-Konditionen gelten für die ersten 10 Kunden,
          danach Normalpreis. · Monatliche Pauschalen für Hosting + Support + Updates.
        </p>
      </div>
    </section>
  );
}

function PricingCard({ plan, delay }: { plan: Plan; delay: number }) {
  const { name, description, normalPrice, launchPrice, monthly, monthlyNormal, features, cta, featured, badge } = plan;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
      transition={{ delay, duration: 0.5, ease: easings.smooth }}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 ${
        featured
          ? 'border-2 border-gold-400/35 bg-gradient-to-b from-gold-400/[0.12] via-gold-400/[0.04] to-transparent shadow-[0_24px_80px_-24px_rgba(255,215,0,0.35)]'
          : 'border border-white/[0.07] bg-white/[0.02]'
      }`}
    >
      {featured && badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-950 shadow-[0_8px_24px_-6px_rgba(255,215,0,0.7)]">
          {badge}
        </div>
      )}

      <h3 className="text-2xl font-serif font-bold text-white">{name}</h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-white/55">{description}</p>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-wider text-white/35 line-through">
          Normalpreis {normalPrice}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-5xl font-bold text-white">{launchPrice}</span>
          {monthly && (
            <span className="font-mono text-sm text-white/55">+ {monthly}</span>
          )}
        </div>
        {monthlyNormal && (
          <p className="mt-1 font-mono text-[11px] text-white/30 line-through">
            normal: + {monthlyNormal}
          </p>
        )}
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
            <Check className="mt-0.5 size-4 shrink-0 text-gold-400" strokeWidth={3} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {featured ? (
          <MagneticWrap strength={0.15} className="w-full">
            <Link href="/kalkulator" className="inline-flex w-full">
              <ShimmerButton className="w-full justify-center">
                <span className="flex items-center gap-2">
                  {cta}
                  <ArrowRight className="size-4" />
                </span>
              </ShimmerButton>
            </Link>
          </MagneticWrap>
        ) : (
          <Link
            href="/kalkulator"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] text-[15px] font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.07]"
          >
            {cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
