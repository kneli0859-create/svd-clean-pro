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
          ? 'border-b border-white/10 bg-[#0F172A]/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-[#FFD700] font-mono text-sm font-bold text-[#0F172A]">
            S
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            SVD <span className="text-[#FFD700]">Clean Pro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="/#story" className="hover:text-slate-100">
            So funktioniert&apos;s
          </Link>
          <Link href="/kalkulator" className="hover:text-slate-100">
            Kalkulator
          </Link>
          <Link href="/#pricing" className="hover:text-slate-100">
            Preise
          </Link>
          <Link href="/demo" className="hover:text-slate-100">
            Demo
          </Link>
        </nav>

        <LinkButton
          href="/kalkulator"
          size="sm"
          className="h-9 rounded-full bg-[#FFD700] px-4 text-sm font-semibold text-[#0F172A] hover:bg-[#FFC700]"
        >
          Jetzt starten
        </LinkButton>
      </div>
    </motion.header>
  );
}
