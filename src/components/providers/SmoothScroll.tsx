'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Global Lenis smooth-scroll provider. Wraps the entire app body so every
 * route gets the same scroll feel. Honours prefers-reduced-motion by
 * disabling smoothing entirely.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced]);

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        autoRaf: false, // we drive RAF manually above
      }}
    >
      {children}
    </ReactLenis>
  );
}
