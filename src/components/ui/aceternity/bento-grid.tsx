'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-[20rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
  visual?: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoGridItem({
  title,
  description,
  icon,
  visual,
  className,
  delay = 0,
}: BentoGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.32, 0.72, 0, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-colors duration-500 hover:border-white/[0.14] sm:p-7',
        className,
      )}
    >
      {/* Subtle gold glow that intensifies on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 0%, rgba(255,215,0,0.10), transparent 70%)',
        }}
      />

      {/* Visual block */}
      {visual && (
        <div className="pointer-events-none relative mb-4 flex-1 overflow-hidden rounded-2xl">
          {visual}
        </div>
      )}

      <div className="relative z-10">
        {icon && (
          <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-gold-400/10 p-2.5 ring-1 ring-gold-400/20">
            {icon}
          </div>
        )}
        <h3 className="text-h3 font-serif font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
      </div>
    </motion.div>
  );
}
