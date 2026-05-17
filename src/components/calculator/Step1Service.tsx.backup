'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useCalculator } from '@/lib/calculator-store';
import { SERVICES, type ServiceKey } from '@/lib/plz/germany-tiers';

export function Step1Service() {
  const service = useCalculator((s) => s.service);
  const setKey = useCalculator((s) => s.set);
  const next = useCalculator((s) => s.next);

  const choose = (k: ServiceKey) => {
    setKey('service', k);
    setTimeout(() => next(), 220);
  };

  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
        Welche Reinigung benötigen Sie?
      </h2>
      <p className="mt-2 text-slate-400">
        Wählen Sie eine der 12 professionellen Reinigungsarten.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(SERVICES).map((s, idx) => {
          const Icon = (Icons[
            s.icon as keyof typeof Icons
          ] ?? Icons.Sparkles) as React.ComponentType<{
            className?: string;
          }>;
          const selected = service === s.key;
          return (
            <motion.button
              key={s.key}
              type="button"
              onClick={() => choose(s.key)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-colors ${
                selected
                  ? 'border-[#FFD700]/60 bg-[#FFD700]/10 ring-1 ring-[#FFD700]/30'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                  selected
                    ? 'bg-[#FFD700] text-[#0F172A]'
                    : 'bg-white/5 text-[#FFD700]'
                }`}
              >
                <Icon className="size-5" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold text-slate-100">{s.name}</span>
                <span className="text-xs leading-relaxed text-slate-400">
                  {s.description}
                </span>
                <span className="mt-1 font-mono text-xs text-[#FFD700]">
                  ab €{s.base} / {s.unit}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
