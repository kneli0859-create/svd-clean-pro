import Link from 'next/link';

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Produkt',
    links: [
      { label: 'Kalkulator', href: '/kalkulator' },
      { label: 'Demo', href: '/demo' },
      { label: 'Buchung', href: '/booking' },
      { label: 'Preise', href: '/#pricing' },
    ],
  },
  {
    heading: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'AGB', href: '/agb' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Dokumentation', href: '/dokumentation' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-navy-975 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="-mx-2 inline-flex min-h-[44px] items-center rounded-md px-2 text-sm text-white/65 transition-colors hover:bg-white/[0.03] hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Kontakt
            </h4>
            <div className="mt-4 text-sm leading-relaxed text-white/65">
              <div className="font-medium text-white">SVD Clean Pro</div>
              <div className="mt-1">Augsburg, Deutschland</div>
              <a
                href="mailto:info@svd-clean.de"
                className="-mx-2 mt-1 inline-flex min-h-[44px] items-center rounded-md px-2 text-gold-400 hover:underline"
              >
                info@svd-clean.de
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-gold-400 font-mono text-xs font-bold text-navy-950">
              S
            </span>
            <span className="text-sm text-white/45">
              <span className="text-white/85 font-medium">SVD Clean Pro</span>
              <span className="ml-1.5">· © {new Date().getFullYear()}</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-white/40">
            <span>Made in Augsburg 🇩🇪</span>
            <span aria-hidden>·</span>
            <span>DSGVO-konform</span>
            <span aria-hidden>·</span>
            <span>§19 UStG Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
