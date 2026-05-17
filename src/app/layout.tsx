import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'latin-ext'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SVD Clean Pro — Angebote in 30 Sekunden statt 30 Minuten',
  description:
    'Der professionelle Kalkulator für deutsche Reinigungsfirmen. Sofort-Angebote, PLZ-genaue Preise, automatische PDF-Erstellung.',
  metadataBase: new URL('https://app.svd-clean.de'),
  openGraph: {
    title: 'SVD Clean Pro',
    description: 'Angebote in 30 Sekunden statt 30 Minuten',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-navy-950 text-[#F8FAFC] font-sans">
        {children}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
