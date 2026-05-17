'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberTickerProps {
  value: number;
  /** Decimal places to show */
  decimals?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Manual delay before animating */
  delay?: number;
  /** Custom formatter (e.g. EUR currency) */
  format?: (n: number) => string;
  className?: string;
  /** Direction: 'up' from 0 (default) or 'down' from value */
  direction?: 'up' | 'down';
}

/**
 * Count-up number animation that only triggers once the element scrolls into
 * view. Replaces our older CountUp component for the redesign — same API.
 */
export function NumberTicker({
  value,
  decimals = 0,
  duration = 1.4,
  delay = 0,
  format,
  className,
  direction = 'up',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(direction === 'up' ? 0 : value);

  useEffect(() => {
    if (!inView) return;
    const from = direction === 'up' ? 0 : value;
    const to = direction === 'up' ? value : 0;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(latest);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, delay, direction]);

  const formatted = format
    ? format(display)
    : display.toLocaleString('de-DE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {formatted}
    </span>
  );
}
