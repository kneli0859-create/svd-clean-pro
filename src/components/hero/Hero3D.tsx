'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, Euro } from 'lucide-react';
import { LinkButton } from '@/components/ui/link-button';

// Three.js scene lazy-loaded — keeps initial bundle small and gives non-WebGL
// devices a graceful fallback.
const SphereScene = dynamic(() => import('./SphereScene'), {
  ssr: false,
  loading: () => null,
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 110, damping: 18 },
  },
};

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-spotlight bg-grid min-h-[100svh] flex items-center pt-24 pb-16"
    >
      {/* 3D layer */}
      <motion.div
        style={{ scale: sphereScale, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 mx-auto max-w-[1100px]">
          <SphereScene />
        </div>
        {/* Bottom fade to seamlessly enter next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0F172A]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={itemVariants}
            className="glass-gold inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-[#FFD700]"
          >
            <Sparkles className="size-3.5" />
            Launch-Aktion — nur für die ersten 10 Kunden
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-balance font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Angebote in{' '}
            <span className="text-gradient-gold">30 Sekunden</span>{' '}
            <span className="block text-slate-300">statt 30 Minuten</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300/90 sm:text-xl"
          >
            Der professionelle Kalkulator für deutsche Reinigungsfirmen.
            PLZ-genaue Preise, automatische PDFs, Online-Buchung — alles
            in einer einzigen Plattform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <LinkButton
              href="/demo"
              size="lg"
              className="h-12 rounded-full bg-[#FFD700] px-7 text-base font-semibold text-[#0F172A] shadow-[0_8px_30px_-8px_rgba(255,215,0,0.6)] hover:bg-[#FFC700]"
            >
              Demo ansehen
              <ArrowRight className="ml-2 size-4" />
            </LinkButton>
            <LinkButton
              href="/#pricing"
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-white/[0.02] px-7 text-base font-medium text-slate-100 backdrop-blur hover:bg-white/[0.06]"
            >
              Jetzt starten ab €197
            </LinkButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3"
          >
            <TrustItem
              icon={<Clock className="size-4" />}
              label="Angebot in 30 Sek."
              value="vs. 30 Min."
            />
            <TrustItem
              icon={<Euro className="size-4" />}
              label="Normalpreis €497"
              value="Launch €197"
            />
            <TrustItem
              icon={<Sparkles className="size-4" />}
              label="PLZ Tier 1-5"
              value="ganz Deutschland"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-32 z-0 h-64 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.15),_transparent_70%)]"
      />
    </section>
  );
}

function TrustItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass flex items-center gap-3 rounded-2xl px-5 py-3 text-left">
      <span className="grid size-8 place-items-center rounded-full bg-[#FFD700]/15 text-[#FFD700]">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <span className="text-sm font-semibold text-slate-100">{value}</span>
      </span>
    </div>
  );
}
