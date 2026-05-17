'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Item {
  quote: string;
  name: string;
  title: string;
}

interface Props {
  items: Item[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite marquee of cards. Duplicates the list and animates the container
 * by exactly -50% which lines up the second copy seamlessly under the first.
 * Speed is set via a CSS variable, paused on hover by default.
 */
export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    container.style.setProperty(
      '--animation-direction',
      direction === 'left' ? 'forwards' : 'reverse',
    );
    container.style.setProperty(
      '--animation-duration',
      speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s',
    );
    setReady(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]',
        className,
      )}
    >
      <ul
        ref={trackRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
          ready &&
            'animate-scroll [animation-direction:var(--animation-direction)] [animation-duration:var(--animation-duration)]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {[...items, ...items].map((it, i) => (
          <li
            key={`${it.name}-${i}`}
            className="relative w-[320px] shrink-0 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-7 py-6 sm:w-[420px]"
          >
            <blockquote className="text-sm leading-relaxed text-white/85">
              &ldquo;{it.quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-gold-400/10 font-mono text-xs font-bold text-gold-400 ring-1 ring-gold-400/30">
                {it.name
                  .split(' ')
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-white">{it.name}</span>
                <span className="text-[11px] text-white/45">{it.title}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
