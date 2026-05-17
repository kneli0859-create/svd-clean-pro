'use client';

import { MapPin, AlertCircle, Info } from 'lucide-react';
import { useCalculator } from '@/lib/calculator-store';
import { getPLZTier, isValidPLZ } from '@/lib/plz/germany-tiers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const tierLabel = (tier: number) =>
  ({
    1: 'Premium-Region',
    2: 'Großstadt',
    3: 'Mittlere Stadt',
    4: 'Kleinere Stadt',
    5: 'Ländliche Region',
  }[tier] ?? 'Region');

const tierColor = (tier: number) =>
  ({
    1: 'text-[#FFD700] bg-[#FFD700]/15 border-[#FFD700]/30',
    2: 'text-amber-300 bg-amber-300/10 border-amber-300/30',
    3: 'text-emerald-300 bg-emerald-300/10 border-emerald-300/30',
    4: 'text-sky-300 bg-sky-300/10 border-sky-300/30',
    5: 'text-slate-300 bg-slate-300/10 border-slate-300/30',
  }[tier] ?? 'text-slate-300 bg-slate-300/10');

export function Step3Location() {
  const plz = useCalculator((s) => s.plz);
  const isK = useCalculator((s) => s.isKleinunternehmer);
  const set = useCalculator((s) => s.set);
  const valid = isValidPLZ(plz);
  const tier = valid ? getPLZTier(plz) : null;

  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
        Standort & Steuern
      </h2>
      <p className="mt-2 text-slate-400">
        Postleitzahl bestimmt die regionale Preisanpassung.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <Label htmlFor="plz" className="text-sm font-medium text-slate-200">
            Postleitzahl
          </Label>
          <div className="relative mt-2">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#FFD700]" />
            <Input
              id="plz"
              inputMode="numeric"
              maxLength={5}
              value={plz}
              onChange={(e) =>
                set('plz', e.target.value.replace(/\D/g, '').slice(0, 5))
              }
              placeholder="80331"
              className="bg-white/[0.04] pl-9 font-mono text-lg text-slate-100"
            />
          </div>
          {plz.length > 0 && !valid && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
              <AlertCircle className="size-3.5" />
              5-stellige deutsche PLZ erforderlich
            </p>
          )}
        </div>

        <AnimatePresence>
          {tier && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex flex-col gap-2 rounded-2xl border p-5 ${tierColor(
                tier.tier,
              )}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.15em]">
                  {tierLabel(tier.tier)} (Tier {tier.tier})
                </span>
                <span className="font-mono text-sm">
                  Multiplikator x{tier.multiplier.toFixed(2)}
                </span>
              </div>
              <span className="text-lg font-semibold">
                {tier.city}, {tier.region}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                §19 UStG — Kleinunternehmer
                <Info className="size-3.5 text-slate-500" />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Wenn aktiviert, wird keine 19% Mehrwertsteuer ausgewiesen.
                Standard: deaktiviert (Regelbesteuerung).
              </p>
            </div>
            <button
              type="button"
              onClick={() => set('isKleinunternehmer', !isK)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                isK ? 'bg-[#FFD700]' : 'bg-white/15'
              }`}
              aria-pressed={isK}
              aria-label="Kleinunternehmer §19 UStG"
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`absolute top-1 size-5 rounded-full bg-white shadow ${
                  isK ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
