'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export function CountUp({
  value,
  className,
  format,
  duration = 1.2,
}: {
  value: number;
  className?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const mv = useMotionValue(0);
  const [text, setText] = useState(format ? format(0) : '0');
  const rounded = useTransform(mv, (latest) =>
    format ? format(Math.round(latest)) : String(Math.round(latest)),
  );

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on('change', (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, duration, mv, rounded]);

  return <motion.span className={className}>{text}</motion.span>;
}
