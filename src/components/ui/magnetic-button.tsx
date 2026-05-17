'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  /** Spring stiffness — higher snaps back faster. */
  stiffness?: number;
  /** Spring damping. */
  damping?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Generic magnetic wrapper — gently tracks the cursor when nearby.
 * Use this around a button/link to add a premium tactile feel.
 * No-ops on touch devices and when prefers-reduced-motion is on.
 */
export const MagneticWrap = forwardRef<HTMLDivElement, MagneticProps>(
  function MagneticWrap(
    { strength = 0.25, stiffness = 220, damping = 18, className, children },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLDivElement>(null);
    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const reduced = useReducedMotion();
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
      setIsTouch(
        typeof window !== 'undefined' &&
          (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window),
      );
    }, []);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || isTouch || !localRef.current) return;
      const rect = localRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setPos({ x, y });
    };
    const reset = () => setPos({ x: 0, y: 0 });

    return (
      <motion.div
        ref={setRefs}
        onMouseMove={onMove}
        onMouseLeave={reset}
        animate={pos}
        transition={{ type: 'spring', stiffness, damping, mass: 0.6 }}
        className={cn('inline-flex', className)}
      >
        {children}
      </motion.div>
    );
  },
);
