'use client';

import { useCalculator } from '@/lib/calculator-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from './StepIndicator';
import { Step1Service } from './Step1Service';
import { Step2Details } from './Step2Details';
import { Step3Location } from './Step3Location';
import { Step4Result } from './Step4Result';
import { isValidPLZ } from '@/lib/plz/germany-tiers';

export function CalculatorWizard() {
  const { step, next, prev, service, plz } = useCalculator((s) => ({
    step: s.step,
    next: s.next,
    prev: s.prev,
    service: s.service,
    plz: s.plz,
  }));

  const canAdvance =
    (step === 0 && service !== null) ||
    (step === 1 && service !== null) ||
    (step === 2 && isValidPLZ(plz));

  return (
    <div className="mx-auto w-full max-w-4xl">
      <StepIndicator step={step} />

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && <Step1Service />}
            {step === 1 && <Step2Details />}
            {step === 2 && <Step3Location />}
            {step === 3 && <Step4Result />}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              size="lg"
              disabled={step === 0}
              onClick={prev}
              className="rounded-full text-slate-300 disabled:opacity-30"
            >
              <ArrowLeft className="mr-1 size-4" />
              Zurück
            </Button>

            <Button
              size="lg"
              disabled={!canAdvance}
              onClick={next}
              className="rounded-full bg-[#FFD700] px-6 font-semibold text-[#0F172A] hover:bg-[#FFC700] disabled:opacity-40"
            >
              {step === 2 ? 'Berechnen' : 'Weiter'}
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
