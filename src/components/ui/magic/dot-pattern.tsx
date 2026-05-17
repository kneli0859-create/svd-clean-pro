'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

/**
 * Repeating SVG dot pattern — used as a subtle background texture
 * behind hero / feature sections. Adapted for Tailwind 4.
 */
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  glow = false,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-white/15',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
        {glow && (
          <radialGradient id={`${id}-glow`}>
            <stop offset="0%" stopColor="rgba(255,215,0,0.35)" />
            <stop offset="100%" stopColor="rgba(255,215,0,0)" />
          </radialGradient>
        )}
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
