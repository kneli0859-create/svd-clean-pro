'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const labels = ['Service', 'Details', 'Standort', 'Angebot'];

/**
 * Premium step indicator — circle scale + glow on active step, gold fill on
 * completed segment of the connector line. Mobile-friendly: minimum 44x44 touch
 * area on the circles.
 */
export function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center gap-2">
      {labels.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li
            key={label}
            className="flex flex-1 items-center gap-2"
          >
            <motion.div
              animate={{
                scale: active ? 1.08 : 1,
                boxShadow: active
                  ? '0 0 0 8px rgba(255,215,0,0.08), 0 0 28px rgba(255,215,0,0.45)'
                  : '0 0 0 0 rgba(255,215,0,0)',
              }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className={`relative grid size-11 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold ring-1 ring-inset ${
                done
                  ? 'bg-gold-400 text-navy-950 ring-gold-400'
                  : active
                  ? 'bg-gold-400/10 text-gold-400 ring-gold-400/40'
                  : 'bg-white/[0.03] text-white/40 ring-white/10'
              }`}
            >
              {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
            </motion.div>

            <span
              className={`hidden text-[13px] font-medium sm:inline ${
                active
                  ? 'text-white'
                  : done
                  ? 'text-white/70'
                  : 'text-white/35'
              }`}
            >
              {label}
            </span>

            {i < labels.length - 1 && (
              <div className="relative ml-2 h-px flex-1 overflow-hidden bg-white/[0.06]">
                <motion.div
                  initial={false}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400"
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
