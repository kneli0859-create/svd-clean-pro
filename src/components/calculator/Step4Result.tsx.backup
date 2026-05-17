'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowDownRight, ArrowDown, Sparkles } from 'lucide-react';
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
import { CountUp } from './CountUp';
import { LinkButton } from '@/components/ui/link-button';
import { Button } from '@/components/ui/button';

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
    return (
      <p className="text-slate-400">
        Bitte alle vorherigen Schritte abschließen.
      </p>
    );
  }

  const svc = SERVICES[state.service];
  const tier = getPLZTier(state.plz);
  const savings = calculateSavings(breakdown.brutto);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-[#FFD700]" />
        <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700]">
          Ihre Berechnung
        </span>
      </div>
      <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
        Angebot für {svc.name}
      </h2>
      <p className="mt-2 text-slate-400">
        {state.quantity} {svc.unit} • {FREQUENCY_LABELS[state.frequency]} • {tier.city} (Tier {tier.tier})
      </p>

      {/* Big price comparison */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <PriceCard
          label="Konkurrenz"
          sub="Markt-Durchschnitt"
          value={savings.konkurrenz}
          tone="strike"
        />
        <PriceCard
          label="Empfohlen"
          sub="Branchenpreis"
          value={savings.empfohlen}
          tone="muted"
        />
        <PriceCard
          label="Ihr Preis"
          sub="mit SVD Clean Pro"
          value={savings.ihrPreis}
          tone="gold"
          highlight
        />
      </div>

      {/* Savings banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
            <ArrowDownRight className="size-5" />
          </span>
          <div>
            <div className="text-sm font-semibold text-emerald-200">
              Sie sparen
            </div>
            <div className="text-xs text-emerald-200/80">
              gegenüber Marktpreis
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-emerald-200">
            <CountUp value={savings.sieSparen} format={formatEUR} duration={1.2} />
          </div>
          <div className="font-mono text-xs text-emerald-200/80">
            −{savings.sparenProzent}%
          </div>
        </div>
      </motion.div>

      {/* Itemized */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="font-serif text-lg font-semibold">Aufschlüsselung</h3>
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
            <Row
              label="MwSt (§19 UStG – Kleinunternehmer)"
              value="—"
              muted
            />
          ) : (
            <Row
              label="MwSt 19%"
              value={formatEURPrecise(breakdown.mwst)}
            />
          )}
          <Separator />
          <Row
            label="Gesamtsumme"
            value={
              <span className="font-mono text-2xl font-bold text-[#FFD700]">
                <CountUp value={breakdown.brutto} format={formatEURPrecise} duration={1} />
              </span>
            }
            bold
          />
        </dl>
        {breakdown.isKleinunternehmer && (
          <p className="mt-4 text-xs text-slate-400">
            Hinweis: Gemäß §19 UStG wird keine Umsatzsteuer berechnet.
          </p>
        )}
      </div>

      {/* CTAs */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <LinkButton
          href={`/api/offer/pdf?service=${state.service}&qty=${state.quantity}&plz=${state.plz}&freq=${state.frequency}&kun=${state.isKleinunternehmer ? '1' : '0'}&name=${encodeURIComponent(state.customerName)}&email=${encodeURIComponent(state.customerEmail)}`}
          size="lg"
          className="h-12 rounded-full bg-[#FFD700] font-semibold text-[#0F172A] hover:bg-[#FFC700]"
        >
          <Download className="mr-2 size-4" />
          PDF-Angebot herunterladen
        </LinkButton>
        <Button
          size="lg"
          variant="outline"
          className="h-12 rounded-full border-white/15 bg-white/[0.02] font-medium text-slate-100 hover:bg-white/[0.06]"
          render={(p) => (
            <a {...p} href="/booking">
              <Calendar className="mr-2 size-4" />
              Termin online buchen
            </a>
          )}
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ArrowDown className="size-3" />
        <span>Druckbares PDF + Online-Buchungslink in einem Klick</span>
      </div>
    </div>
  );
}

function PriceCard({
  label,
  sub,
  value,
  tone,
  highlight,
}: {
  label: string;
  sub: string;
  value: number;
  tone: 'strike' | 'muted' | 'gold';
  highlight?: boolean;
}) {
  const fmt = formatEUR(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: tone === 'gold' ? 0.2 : tone === 'muted' ? 0.1 : 0 }}
      className={`rounded-2xl border p-5 ${
        highlight
          ? 'border-[#FFD700]/40 bg-[#FFD700]/10 ring-1 ring-[#FFD700]/20'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div
        className={`mt-2 font-mono text-3xl font-bold ${
          tone === 'strike'
            ? 'text-red-400 line-through decoration-red-500/60'
            : tone === 'muted'
            ? 'text-slate-300'
            : 'text-[#FFD700]'
        }`}
      >
        {tone === 'gold' ? (
          <CountUp value={value} format={formatEUR} duration={1.2} />
        ) : (
          fmt
        )}
      </div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
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
        bold ? 'text-slate-100' : muted ? 'text-slate-500' : 'text-slate-300'
      }`}
    >
      <dt>{label}</dt>
      <dd
        className={`${bold ? 'font-semibold' : ''} ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </dd>
    </div>
  );
}

function Separator() {
  return <div className="my-2 h-px bg-white/5" />;
}
