'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SparklesProps {
  density?: number;
  color?: string;
  className?: string;
  /** Animation speed multiplier — higher is faster */
  speed?: number;
  /** Maximum opacity of each sparkle */
  opacity?: number;
  /** Minimum sparkle size, px */
  minSize?: number;
  /** Maximum sparkle size, px */
  maxSize?: number;
}

interface Spark {
  id: number;
  x: number;        // percent
  y: number;        // percent
  size: number;     // px
  delay: number;    // s
  duration: number; // s
  scale: number;
}

/**
 * Lightweight CSS-only sparkles overlay. Random positions, twinkling opacity.
 * Designed to replace a heavy Three.js particle field for the hero section.
 */
export function Sparkles({
  density = 40,
  color = '#FFD700',
  speed = 0.4,
  opacity = 0.5,
  minSize = 1,
  maxSize = 3,
  className,
}: SparklesProps) {
  // Random state must be generated on the client to avoid SSR hydration drift.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sparks: Spark[] = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      delay: Math.random() * 4,
      duration: (2 + Math.random() * 3) / speed,
      scale: 0.6 + Math.random() * 0.6,
    }));
  }, [mounted, density, speed, minSize, maxSize]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, opacity, 0],
            scale: [0, s.scale, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '999px',
            background: color,
            boxShadow: `0 0 ${s.size * 4}px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
