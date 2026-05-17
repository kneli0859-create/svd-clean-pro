'use client';

import { motion } from 'framer-motion';
import { Check, FileText } from 'lucide-react';
import { NumberTicker } from '@/components/ui/magic/number-ticker';

/** Animated 30-second timer ring with count-up. */
export function TimerVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#timer-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="326.726"
          initial={{ strokeDashoffset: 326.726 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 60 60)"
        />
        <defs>
          <linearGradient id="timer-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="font-mono text-3xl font-bold text-gold-400">
          <NumberTicker value={30} duration={1.6} />
          <span className="ml-0.5 text-base text-white/40">s</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-white/40">Schnitt-Zeit</div>
      </div>
    </div>
  );
}

/** Mini-Germany silhouette with 5 tier dots positioned roughly on the map. */
export function GermanyMapVisual() {
  // Approximate dot positions (percent of the bounding box)
  const dots = [
    { x: 30, y: 18, tier: 1, label: 'Hamburg' },
    { x: 32, y: 70, tier: 1, label: 'München' },
    { x: 22, y: 50, tier: 1, label: 'Frankfurt' },
    { x: 75, y: 28, tier: 2, label: 'Berlin' },
    { x: 28, y: 72, tier: 2, label: 'Augsburg' },
    { x: 62, y: 70, tier: 5, label: 'Bautzen' },
  ];
  return (
    <div className="relative h-full w-full">
      {/* Outline silhouette */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <motion.path
          d="M52 6 C58 8 63 12 67 18 C73 22 78 26 80 32 C82 38 78 44 76 50 C80 56 84 60 82 66 C78 72 70 76 64 80 C58 84 52 88 46 86 C40 84 36 78 30 76 C24 72 18 68 16 62 C14 56 18 50 20 44 C18 38 22 32 26 28 C30 22 34 16 40 12 C44 8 48 6 52 6 Z"
          fill="rgba(255,215,0,0.04)"
          stroke="rgba(255,215,0,0.30)"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {dots.map((d, i) => (
          <motion.g
            key={`${d.x}-${d.y}`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
          >
            <circle cx={d.x} cy={d.y} r="2.4" fill="#FFD700" />
            <circle cx={d.x} cy={d.y} r="2.4" fill="rgba(255,215,0,0.4)">
              <animate attributeName="r" values="2.4;5;2.4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/** Mock PDF page preview floating with shimmer. */
export function PDFVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        initial={{ y: 8 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/95 p-3 text-slate-900 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]"
      >
        <div className="mb-2 h-1 w-12 rounded bg-[#003B73]" />
        <div className="mb-3 h-2 w-24 rounded bg-slate-700/80" />
        <div className="space-y-1.5">
          <div className="h-1 w-full rounded bg-slate-300" />
          <div className="h-1 w-3/4 rounded bg-slate-300" />
          <div className="h-1 w-5/6 rounded bg-slate-300" />
          <div className="h-1 w-2/3 rounded bg-slate-300" />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-sm bg-[#003B73] px-2 py-1.5">
          <span className="text-[8px] font-semibold uppercase tracking-wide text-white">
            Gesamt
          </span>
          <span className="text-[10px] font-bold text-gold-400">€ 234,12</span>
        </div>
      </motion.div>
      <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success ring-1 ring-success/30">
        <FileText className="h-3 w-3" />
        PDF bereit
      </div>
    </div>
  );
}

/** Calendar grid with one date highlighted. */
export function CalendarVisual() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const highlighted = 17;
  return (
    <div className="grid h-full grid-cols-7 gap-1 p-2">
      {days.map((d) => (
        <motion.div
          key={d}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: d * 0.012 }}
          className={`grid place-items-center rounded-md text-[10px] font-mono ${
            d === highlighted
              ? 'bg-gold-400 font-bold text-navy-950'
              : 'bg-white/[0.04] text-white/40'
          }`}
        >
          {d}
        </motion.div>
      ))}
    </div>
  );
}

/** Language switcher pill cycling DE/EN/BG. */
export function LanguageVisual() {
  const langs = [
    { flag: '🇩🇪', code: 'DE' },
    { flag: '🇬🇧', code: 'EN' },
    { flag: '🇧🇬', code: 'BG' },
  ];
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5">
        {langs.map((l, i) => (
          <motion.button
            key={l.code}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              i === 0
                ? 'bg-gold-400 text-navy-950'
                : 'text-white/70 hover:bg-white/5'
            }`}
          >
            <span>{l.flag}</span>
            <span>{l.code}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/** §19 UStG toggle visual. */
export function TaxToggleVisual() {
  return (
    <div className="grid h-full w-full place-items-center gap-4">
      <div className="flex w-full max-w-[14rem] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <div>
          <div className="font-mono text-xs font-medium text-white/70">§19 UStG</div>
          <div className="text-[10px] text-white/40">Kleinunternehmer</div>
        </div>
        <motion.div
          initial={{ x: 0 }}
          whileInView={{ x: 22 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="relative h-6 w-11 rounded-full bg-gold-400"
        >
          <motion.span
            initial={{ x: 0 }}
            whileInView={{ x: 22 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-1 left-1 h-4 w-4 rounded-full bg-navy-950 shadow-md"
          />
        </motion.div>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-success">
        <Check className="h-3 w-3" />
        MwSt ausgeblendet
      </div>
    </div>
  );
}
