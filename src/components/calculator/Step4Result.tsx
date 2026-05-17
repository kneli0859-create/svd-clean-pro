'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Calendar,
  ArrowDownRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useCalculator } from '@/lib/calculator-store';
import {
  SERVICES,
  FREQUENCY_LABELS,
  calculatePrice,
  calculateSavings,
  getPLZTier,
  formatEUR,
  formatEURPrecise,
} from '@/lib/plz/germany-tiers';
import { NumberTicker } from '@/components/ui/magic/number-ticker';
import { LinkButton } from '@/components/ui/link-button';
import { Button } from '@/components/ui/button';
import { easings } from '@/lib/design-tokens';

export function Step4Result() {
  const state = useCalculator((s) => s);

  const breakdown = useMemo(() => {
    if (!state.service || state.plz.length !== 5) return null;
    return calculatePrice({
      service: state.service,
      quantity: state.quantity,
      plz: state.plz,
      frequency: state.frequency,
      isKleinunternehmer: state.isKleinunternehmer,
    });
  }, [state.service, state.quantity, state.plz, state.frequency, state.isKleinunternehmer]);

  if (!state.service || !breakdown) {
    return <p className="text-sm text-white/55">Bitte alle vorherigen Schritte abschließen.</p>;
  }

  const svc = SERVICES[state.service];
  const tier = getPLZTier(state.plz);
  const savings = calculateSavings(breakdown.brutto);

  return (
    <div>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <Sparkles className="size-4 text-gold-400" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold-400">
          Ihre Berechnung
        </span>
      </motion.div>

      {/* Dramatic price reveal */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: easings.spring, delay: 0.1 }}
        className="mt-8 text-center"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/40">
          Ihr Preis · {svc.name}
        </p>
        <div className="font-mono font-bold leading-none">
          <span className="bg-gradient-to-b from-gold-400 to-gold-600 bg-clip-text text-[clamp(4rem,15vw,9rem)] text-transparent">
            <NumberTicker value={Math.round(breakdown.brutto)} duration={1.4} />
          </span>
          <span className="ml-2 text-3xl text-white/40 sm:text-4xl">€</span>
        </div>
        <p className="mt-3 text-[11px] tracking-wide text-white/40">
          {state.quantity} {svc.unit} · {FREQUENCY_LABELS[state.frequency]} ·{' '}
          {tier.city} (Tier {tier.tier})
        </p>
      </motion.div>

      {/* Comparison cards */}
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <CompareCard
          label="Konkurrenz"
          sub="Markt-Durchschnitt"
          value={savings.konkurrenz}
          tone="strike"
          delay={0.2}
        />
        <CompareCard
          label="Empfohlen"
          sub="Branchenpreis"
          value={savings.empfohlen}
          tone="muted"
          delay={0.3}
        />
        <CompareCard
          label="Ihr Preis"
          sub="mit SVD Clean Pro"
          value={savings.ihrPreis}
          tone="gold"
          delay={0.4}
        />
      </div>

      {/* Savings callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-8 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-3 rounded-full border border-success/25 bg-success/10 px-5 py-2.5">
          <ArrowDownRight className="size-4 text-success" />
          <span className="text-sm font-medium text-success">
            Sie sparen{' '}
            <NumberTicker value={savings.sieSparen} format={formatEUR} duration={1.3} />{' '}
            <span className="ml-1 font-mono text-xs text-success/70">
              (−{savings.sparenProzent}%) gegenüber Konkurrenz
            </span>
          </span>
        </div>
      </motion.div>

      {/* Itemized breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
      >
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          Aufschlüsselung
        </h3>
        <dl className="mt-4 space-y-2 text-sm">
          <Row
            label={`${svc.name} (${state.quantity} ${svc.unit})`}
            value={formatEURPrecise(breakdown.base)}
          />
          <Row
            label={`Regionaler Faktor (${tier.city})`}
            value={`x${tier.multiplier.toFixed(2)}`}
            mono
          />
          <Row
            label={`Frequenz-Rabatt (${FREQUENCY_LABELS[state.frequency]})`}
            value={`x${breakdown.frequencyDiscount.toFixed(2)}`}
            mono
          />
          <Separator />
          <Row label="Netto" value={formatEURPrecise(breakdown.netto)} bold />
          {breakdown.isKleinunternehmer ? (
            <Row label="MwSt (§19 UStG)" value="—" muted />
          ) : (
            <Row label="MwSt 19%" value={formatEURPrecise(breakdown.mwst)} />
          )}
          <Separator />
          <Row
            label="Gesamtsumme"
            value={
              <span className="font-mono text-xl font-bold text-gold-400">
                <NumberTicker value={breakdown.brutto} format={formatEURPrecise} duration={1} />
              </span>
            }
            bold
          />
        </dl>
        {breakdown.isKleinunternehmer && (
          <p className="mt-3 text-[11px] text-white/40">
            Hinweis: Gemäß §19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer ausgewiesen.
          </p>
        )}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        <LinkButton
          href={`/api/offer/pdf?service=${state.service}&qty=${state.quantity}&plz=${state.plz}&freq=${state.frequency}&kun=${state.isKleinunternehmer ? '1' : '0'}&name=${encodeURIComponent(state.customerName)}&email=${encodeURIComponent(state.customerEmail)}`}
          size="lg"
          className="h-12 rounded-full bg-gold-400 px-6 font-semibold text-navy-950 hover:bg-gold-500"
        >
          <Download className="mr-2 size-4" />
          PDF-Angebot
        </LinkButton>
        <Button
          size="lg"
          variant="outline"
          className="h-12 rounded-full border-white/15 bg-white/[0.04] font-medium text-white hover:bg-white/[0.08]"
          render={(p) => (
            <a {...p} href="/booking">
              <Calendar className="mr-2 size-4" />
              Termin online buchen
              <ArrowRight className="ml-2 size-4" />
            </a>
          )}
        />
      </motion.div>
    </div>
  );
}

function CompareCard({
  label,
  sub,
  value,
  tone,
  delay = 0,
}: {
  label: string;
  sub: string;
  value: number;
  tone: 'strike' | 'muted' | 'gold';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: easings.smooth }}
      className={`rounded-2xl border p-5 ${
        tone === 'gold'
          ? 'border-gold-400/40 bg-gradient-to-b from-gold-400/[0.10] to-gold-400/[0.03] ring-1 ring-gold-400/15'
          : 'border-white/[0.07] bg-white/[0.02]'
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</div>
      <div
        className={`mt-2 font-mono text-3xl font-bold ${
          tone === 'strike'
            ? 'text-red-400 line-through decoration-red-500/60'
            : tone === 'muted'
            ? 'text-white/70'
            : 'text-gold-400'
        }`}
      >
        {tone === 'gold' ? (
          <NumberTicker value={value} format={formatEUR} duration={1.2} />
        ) : (
          formatEUR(value)
        )}
      </div>
      <div className="mt-1 text-[11px] text-white/40">{sub}</div>
    </motion.div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  bold?: boolean;
  muted?: boolean;
  mono?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between ${
        bold ? 'text-white' : muted ? 'text-white/45' : 'text-white/70'
      }`}
    >
      <dt>{label}</dt>
      <dd className={`${bold ? 'font-semibold' : ''} ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  );
}

function Separator() {
  return <div className="my-2 h-px bg-white/5" />;
}
