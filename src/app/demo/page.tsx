import { CalculatorWizard } from '@/components/calculator/CalculatorWizard';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata = {
  title: 'Demo — SVD Clean Pro',
  description:
    'Sehen Sie sich SVD Clean Pro in Aktion an — voll funktionsfähige Demo.',
};

export default function DemoPage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="flex-1 bg-spotlight bg-grid pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6 pt-6 pb-10 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700]">
            Live-Demo
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Probieren Sie es <span className="text-gradient-gold">jetzt</span> aus
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Identisch mit der Live-Anwendung. Keine Anmeldung nötig.
          </p>
        </div>
        <div className="px-4 sm:px-6">
          <CalculatorWizard />
        </div>
      </main>
      <Footer />
    </>
  );
}
