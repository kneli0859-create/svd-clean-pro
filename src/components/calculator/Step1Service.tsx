'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Check } from 'lucide-react';
import { useCalculator } from '@/lib/calculator-store';
import { SERVICES, type ServiceKey } from '@/lib/plz/germany-tiers';

export function Step1Service() {
  // Individual selectors only (Zustand v5 safe shape — do NOT batch into objects).
  const service = useCalculator((s) => s.service);
  const setKey = useCalculator((s) => s.set);
  const next = useCalculator((s) => s.next);

  const choose = (k: ServiceKey) => {
    setKey('service', k);
    // Brief delay so user sees the selection animation before advancing.
    setTimeout(() => next(), 240);
  };

  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-400">
        Schritt 1 von 4
      </div>
      <h2 className="text-h2 font-serif font-bold text-white">
        Welche Reinigung benötigen Sie?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/55">
        Wählen Sie eine der 12 professionellen Reinigungsarten — alle Preise basieren auf
        deutschen Marktdurchschnitten.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(SERVICES).map((s, idx) => {
          const Icon = (Icons[s.icon as keyof typeof Icons] ?? Icons.Sparkles) as React.ComponentType<{ className?: string }>;
          const selected = service === s.key;
          return (
            <motion.button
              key={s.key}
              type="button"
              onClick={() => choose(s.key)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.025, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 ${
                selected
                  ? 'border-gold-400/55 bg-gold-400/[0.07]'
                  : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
              }`}
            >
              {/* Subtle gold corner glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(70% 70% at 100% 0%, rgba(255,215,0,0.10), transparent 60%)',
                }}
              />

              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                  selected
                    ? 'bg-gold-400 text-navy-950'
                    : 'bg-white/[0.04] text-gold-400'
                }`}
              >
                <Icon className="size-5" />
              </span>
              <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="font-medium text-white">{s.name}</span>
                <span className="text-[11px] leading-relaxed text-white/45">
                  {s.description}
                </span>
                <span className="mt-1.5 font-mono text-[11px] text-gold-400">
                  ab €{s.base} / {s.unit}
                </span>
              </span>

              {selected && (
                <motion.span
                  layoutId="step1-selected-check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
