import { create } from 'zustand';
import type { ServiceKey, FrequencyKey } from '@/lib/plz/germany-tiers';

export type StepIndex = 0 | 1 | 2 | 3;

export interface CalcState {
  step: StepIndex;
  service: ServiceKey | null;
  quantity: number; // m² или Stunden
  frequency: FrequencyKey;
  plz: string;
  isKleinunternehmer: boolean;
  customerName: string;
  customerEmail: string;

  setStep: (s: StepIndex) => void;
  next: () => void;
  prev: () => void;
  set: <K extends keyof Omit<CalcState, 'setStep' | 'next' | 'prev' | 'set' | 'reset'>>(
    key: K,
    value: Pick<CalcState, K>[K],
  ) => void;
  reset: () => void;
}

const initial = {
  step: 0 as StepIndex,
  service: null as ServiceKey | null,
  quantity: 200,
  frequency: 'woechentlich' as FrequencyKey,
  plz: '',
  isKleinunternehmer: false,
  customerName: '',
  customerEmail: '',
};

export const useCalculator = create<CalcState>((set) => ({
  ...initial,
  setStep: (s) => set({ step: s }),
  next: () =>
    set((st) => ({ step: Math.min(3, st.step + 1) as StepIndex })),
  prev: () =>
    set((st) => ({ step: Math.max(0, st.step - 1) as StepIndex })),
  set: (key, value) => set({ [key]: value } as Partial<CalcState>),
  reset: () => set(initial),
}));
