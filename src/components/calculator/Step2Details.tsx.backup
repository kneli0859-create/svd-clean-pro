'use client';

import { useCalculator } from '@/lib/calculator-store';
import {
  SERVICES,
  FREQUENCY_LABELS,
  type FrequencyKey,
} from '@/lib/plz/germany-tiers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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

  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
        Details zu Ihrer Reinigung
      </h2>
      <p className="mt-2 text-slate-400">
        {svc.name} — geben Sie Umfang und Frequenz an.
      </p>

      <div className="mt-8 space-y-8">
        <div>
          <div className="flex items-baseline justify-between">
            <Label className="text-sm font-medium text-slate-200">
              Umfang ({unitLabel})
            </Label>
            <span className="font-mono text-2xl font-semibold text-[#FFD700]">
              {quantity}
              <span className="ml-1 text-base text-slate-400">{svc.unit}</span>
            </span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={Math.min(max, Math.max(min, quantity))}
            onChange={(e) => set('quantity', Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#FFD700]"
          />
          <div className="mt-1 flex justify-between font-mono text-xs text-slate-500">
            <span>
              {min} {svc.unit}
            </span>
            <span>
              {max} {svc.unit}
            </span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-200">
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
                  className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#FFD700] text-[#0F172A]'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                  }`}
                >
                  {FREQUENCY_LABELS[f]}
                </button>
              );
            })}
          </div>
        </div>

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
      <Label htmlFor="cname" className="text-sm font-medium text-slate-200">
        Ihr Name
      </Label>
      <Input
        id="cname"
        value={customerName}
        onChange={(e) => set('customerName', e.target.value)}
        placeholder="Max Mustermann"
        className="mt-2 bg-white/[0.04] text-slate-100"
      />
    </div>
  );
}

function EmailField() {
  const customerEmail = useCalculator((s) => s.customerEmail);
  const set = useCalculator((s) => s.set);
  return (
    <div>
      <Label htmlFor="cmail" className="text-sm font-medium text-slate-200">
        E-Mail
      </Label>
      <Input
        id="cmail"
        type="email"
        value={customerEmail}
        onChange={(e) => set('customerEmail', e.target.value)}
        placeholder="ihre@email.de"
        className="mt-2 bg-white/[0.04] text-slate-100"
      />
    </div>
  );
}
