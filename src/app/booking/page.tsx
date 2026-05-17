import { BookingForm } from '@/components/booking/BookingForm';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Termin buchen — SVD Clean Pro',
  description: 'Buchen Sie online Ihren Reinigungstermin.',
};

export default function BookingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-spotlight bg-grid pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6 pt-6 pb-10 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[#FFD700]">
            Online-Buchung
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            Termin in <span className="text-gradient-gold">unter 1 Minute</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Wir bestätigen Ihren Wunschtermin per E-Mail innerhalb von 24 Stunden.
          </p>
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
