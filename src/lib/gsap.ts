'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Idempotent ScrollTrigger registration. Call once from any client component
 * that needs scroll-driven animations.
 */
export function useGsapScroll() {
  if (typeof window === 'undefined') return { gsap, ScrollTrigger };
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
