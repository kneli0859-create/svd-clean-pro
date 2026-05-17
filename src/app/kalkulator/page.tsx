import { CalculatorWizard } from '@/components/calculator/CalculatorWizard';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Kalkulator — SVD Clean Pro',
  description: 'Berechnen Sie Ihr Reinigungs-Angebot in 30 Sekunden.',
};

export default function KalkulatorPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-spotlight bg-grid pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-6 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700]">
            Sofort-Angebot
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Ihr <span className="text-gradient-gold">PLZ-genaues</span> Angebot
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Vier kurze Schritte — und Sie erhalten ein druckbares Angebot mit
            Ihrem Logo, AGB-Link und Online-Buchung.
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
