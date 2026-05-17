'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const labels = ['Service', 'Details', 'Standort', 'Angebot'];

export function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center gap-2">
      {labels.map((l, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={l} className="flex flex-1 items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: done
                  ? '#FFD700'
                  : active
                  ? 'rgba(255,215,0,0.15)'
                  : 'rgba(255,255,255,0.06)',
                color: done ? '#0F172A' : active ? '#FFD700' : '#94A3B8',
              }}
              transition={{ duration: 0.3 }}
              className="grid size-9 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold ring-1 ring-white/10"
            >
              {done ? <Check className="size-4" /> : i + 1}
            </motion.div>
            <span
              className={`hidden text-sm sm:inline ${
                active ? 'text-slate-100' : 'text-slate-500'
              }`}
            >
              {l}
            </span>
            {i < labels.length - 1 && (
              <div className="ml-1 h-px flex-1 bg-white/10" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
