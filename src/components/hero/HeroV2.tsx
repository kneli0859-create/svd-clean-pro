'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { DotPattern } from '@/components/ui/magic/dot-pattern';
import { Sparkles } from '@/components/ui/aceternity/sparkles';
import { ShimmerButton } from '@/components/ui/magic/shimmer-button';
import { MagneticWrap } from '@/components/ui/magnetic-button';
import { easings } from '@/lib/design-tokens';

export function HeroV2() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-32">
      {/* Background layer 1 — dot pattern with radial mask */}
      <DotPattern
        cr={1}
        className="opacity-30 [mask-image:radial-gradient(60vw_circle_at_center,white,transparent_80%)]"
      />

      {/* Background layer 2 — premium gradient mesh */}
      <div className="bg-mesh-hero pointer-events-none absolute inset-0" />

      {/* Background layer 3 — subtle sparkles (denser on desktop, lighter on mobile) */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <Sparkles density={36} color="#FFD700" speed={0.35} opacity={0.45} />
      </div>
      <div className="absolute inset-0 z-0 sm:hidden">
        <Sparkles density={14} color="#FFD700" speed={0.35} opacity={0.4} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
        {/* Eyebrow badge with pulsing dot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="mx-auto mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
          <span className="text-xs font-medium tracking-wide text-white/85">
            Launch-Aktion · Nur 10 Plätze verfügbar
          </span>
        </motion.div>

        {/* Massive headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easings.smooth }}
          className="text-display mx-auto max-w-5xl font-serif font-bold text-white"
        >
          Angebote in{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-gold-400 via-[#FFE45A] to-gold-400 bg-clip-text text-transparent">
              30 Sekunden
            </span>
            {/* Animated underline */}
            <svg
              aria-hidden
              className="absolute -bottom-2 left-0 h-3 w-full"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0 8 Q 150 0 300 8"
                stroke="url(#gold-underline)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.8, ease: easings.smooth }}
              />
              <defs>
                <linearGradient id="gold-underline" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="mt-2 block text-white/35">statt 30 Minuten</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easings.smooth }}
          className="text-body mx-auto mt-7 max-w-2xl text-white/60"
        >
          Der professionelle Kalkulator für deutsche Reinigungsfirmen.
          <br className="hidden sm:block" />
          <span className="text-white/85">PLZ-genaue Preise</span>, automatische PDFs, Online-Buchung.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: easings.smooth }}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <MagneticWrap strength={0.18}>
            <Link href="/kalkulator" className="inline-flex">
              <ShimmerButton className="group w-full justify-center sm:w-auto">
                <span className="flex items-center gap-2">
                  Jetzt starten — €197
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </ShimmerButton>
            </Link>
          </MagneticWrap>

          <Link
            href="/demo"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-[15px] font-medium text-white backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <Play className="h-4 w-4 fill-white/90" />
            <span>Demo ansehen · 2 Min</span>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/45"
        >
          {[
            'DSGVO-konform',
            'Made in Germany',
            '§19 UStG Support',
            '24h Setup',
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-success" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent"
      />
    </section>
  );
}
