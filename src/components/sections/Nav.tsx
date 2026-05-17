'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { LinkButton } from '@/components/ui/link-button';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'border-b border-white/10 bg-navy-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="SVD Clean Pro — Startseite"
          className="-mx-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gold-400 font-mono text-sm font-bold text-navy-950">
            S
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-white">
            SVD <span className="text-gold-400">Clean Pro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-white/70 md:flex">
          <Link href="/#story" className="rounded-md px-3 py-2 hover:bg-white/[0.04] hover:text-white">
            So funktioniert&apos;s
          </Link>
          <Link href="/kalkulator" className="rounded-md px-3 py-2 hover:bg-white/[0.04] hover:text-white">
            Kalkulator
          </Link>
          <Link href="/#pricing" className="rounded-md px-3 py-2 hover:bg-white/[0.04] hover:text-white">
            Preise
          </Link>
          <Link href="/demo" className="rounded-md px-3 py-2 hover:bg-white/[0.04] hover:text-white">
            Demo
          </Link>
        </nav>

        <LinkButton
          href="/kalkulator"
          size="sm"
          className="h-10 rounded-full bg-gold-400 px-4 text-sm font-semibold text-navy-950 hover:bg-gold-500"
        >
          Jetzt starten
        </LinkButton>
      </div>
    </motion.header>
  );
}
