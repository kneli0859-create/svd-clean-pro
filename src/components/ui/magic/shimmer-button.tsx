'use client';

import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

/**
 * Premium CTA button with a continuous shimmering border.
 * Pure CSS — no JS animation cost.
 */
export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  function ShimmerButton(
    {
      shimmerColor = '#FFD700',
      shimmerSize = '0.08em',
      shimmerDuration = '3s',
      borderRadius = '9999px',
      background = 'linear-gradient(135deg, #FFD700 0%, #FFE45A 50%, #FFA500 100%)',
      className,
      children,
      ...props
    },
    ref,
  ) {
    const cssVars = {
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
    } as CSSProperties;

    return (
      <button
        ref={ref}
        style={cssVars}
        className={cn(
          'group relative z-0 inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-7 text-[15px] font-semibold text-navy-950 transition-transform duration-300 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
          '[border-radius:var(--radius)] [background:var(--bg)]',
          'shadow-[0_8px_30px_-8px_rgba(255,215,0,0.55)] hover:shadow-[0_12px_40px_-8px_rgba(255,215,0,0.7)]',
          // shimmer layer
          'before:absolute before:inset-0 before:-z-10 before:overflow-hidden before:[border-radius:var(--radius)] before:[background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] before:[animation:shimmer-spin_var(--speed)_linear_infinite] before:opacity-80',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

if (typeof document !== 'undefined') {
  // Inject keyframes once
  const id = 'shimmer-button-keyframes';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `@keyframes shimmer-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
}
