'use client';

import { useCalculator } from '@/lib/calculator-store';
import {
  SERVICES,
  FREQUENCY_LABELS,
  type FrequencyKey,
} from '@/lib/plz/germany-tiers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const frequencies: FrequencyKey[] = [
  'einmalig',
  'woechentlich',
  'zweiwoechentlich',
  'monatlich',
  'taeglich',
];

export function Step2Details() {
  const service = useCalculator((s) => s.service);
  const quantity = useCalculator((s) => s.quantity);
  const frequency = useCalculator((s) => s.frequency);
  const set = useCalculator((s) => s.set);

  if (!service) return null;
  const svc = SERVICES[service];

  const unitLabel = svc.unit === 'Stunde' ? 'Stunden / Termin' : svc.unit;
  const min = svc.unit === 'm²' ? 20 : svc.unit === 'Stück' ? 1 : 1;
  const max = svc.unit === 'm²' ? 5000 : svc.unit === 'Stück' ? 50 : 40;
  const step = svc.unit === 'm²' ? 10 : 1;
  const clamped = Math.min(max, Math.max(min, quantity));
  const pct = ((clamped - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-400">
        Schritt 2 von 4
      </div>
      <h2 className="text-h2 font-serif font-bold text-white">
        Details zu Ihrer Reinigung
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/55">
        {svc.name} — geben Sie Umfang und Frequenz an. Echtzeit-Berechnung.
      </p>

      <div className="mt-10 space-y-10">
        {/* Quantity slider with big number */}
        <div>
          <div className="flex items-baseline justify-between">
            <Label className="text-xs uppercase tracking-wider text-white/55">
              Umfang ({unitLabel})
            </Label>
            <div>
              <motion.span
                key={quantity}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-3xl font-bold text-gold-400 sm:text-4xl"
              >
                {quantity}
              </motion.span>
              <span className="ml-1 text-base text-white/40">{svc.unit}</span>
            </div>
          </div>

          {/* Premium slider with gold-filled track */}
          <div className="mt-4 relative h-2 rounded-full bg-white/[0.06]">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
              style={{ width: `${pct}%` }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={clamped}
              onChange={(e) => set('quantity', Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-400 [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(255,215,0,0.18),0_4px_16px_rgba(255,215,0,0.45)] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gold-400"
              aria-label={`Umfang in ${svc.unit}`}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-white/35">
            <span>{min} {svc.unit}</span>
            <span>{max} {svc.unit}</span>
          </div>
        </div>

        {/* Frequency pills */}
        <div>
          <Label className="text-xs uppercase tracking-wider text-white/55">
            Wie oft soll gereinigt werden?
          </Label>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {frequencies.map((f) => {
              const active = frequency === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => set('frequency', f)}
                  className={`relative h-11 rounded-xl px-3 text-sm font-medium transition-all ${
                    active
                      ? 'bg-gold-400 text-navy-950 shadow-[0_8px_24px_-8px_rgba(255,215,0,0.55)]'
                      : 'bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'
                  }`}
                >
                  {FREQUENCY_LABELS[f]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer name/email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NameField />
          <EmailField />
        </div>
      </div>
    </div>
  );
}

function NameField() {
  const customerName = useCalculator((s) => s.customerName);
  const set = useCalculator((s) => s.set);
  return (
    <div>
      <Label htmlFor="cname" className="text-xs uppercase tracking-wider text-white/55">
        Ihr Name (optional)
      </Label>
      <Input
        id="cname"
        value={customerName}
        onChange={(e) => set('customerName', e.target.value)}
        placeholder="Max Mustermann"
        className="mt-2 h-11 border-white/10 bg-white/[0.04] text-white placeholder:text-white/30"
      />
    </div>
  );
}

function EmailField() {
  const customerEmail = useCalculator((s) => s.customerEmail);
  const set = useCalculator((s) => s.set);
  return (
    <div>
      <Label htmlFor="cmail" className="text-xs uppercase tracking-wider text-white/55">
        E-Mail (optional)
      </Label>
      <Input
        id="cmail"
        type="email"
        value={customerEmail}
        onChange={(e) => set('customerEmail', e.target.value)}
        placeholder="ihre@email.de"
        className="mt-2 h-11 border-white/10 bg-white/[0.04] text-white placeholder:text-white/30"
      />
    </div>
  );
}
