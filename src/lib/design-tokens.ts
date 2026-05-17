// Design tokens — single source of truth for the SVD Clean Pro UI.
// Mirrored as Tailwind 4 @theme tokens in globals.css; keep these two in sync.

export const colors = {
  navy: {
    50: '#E6EBF2',
    100: '#BDC9DC',
    900: '#0A1628',
    950: '#050B16', // primary background
    975: '#020610', // deeper background
  },
  gold: {
    50: '#FFFBEB',
    400: '#FFD700', // primary gold
    500: '#E6C200',
    600: '#B89B00',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.10)',
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
} as const;

export const typography = {
  display: 'clamp(2.5rem, 8vw, 6rem)',
  h1: 'clamp(2rem, 5vw, 4rem)',
  h2: 'clamp(1.75rem, 4vw, 3rem)',
  h3: 'clamp(1.5rem, 3vw, 2.25rem)',
  body: 'clamp(1rem, 1.5vw, 1.125rem)',
  small: '0.875rem',
} as const;

export const radius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
} as const;

// Cubic-bezier easings for framer-motion / GSAP. Const-tuple so TS treats them
// as `[number, number, number, number]` (acceptable by framer-motion).
export const easings = {
  smooth: [0.32, 0.72, 0, 1] as const,  // Apple-like
  spring: [0.16, 1, 0.3, 1] as const,   // bouncy premium
  sharp: [0.83, 0, 0.17, 1] as const,   // Linear-style crisp
} as const;

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  cinematic: 1.2,
} as const;

// Convenience: framer-motion transition presets
export const transitions = {
  smooth: { duration: durations.normal, ease: easings.smooth },
  smoothSlow: { duration: durations.slow, ease: easings.smooth },
  spring: { type: 'spring' as const, stiffness: 150, damping: 18 },
  cinematic: { duration: durations.cinematic, ease: easings.spring },
} as const;
