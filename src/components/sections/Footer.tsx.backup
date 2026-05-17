import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-[#FFD700] font-mono text-xs font-bold text-[#0F172A]">
            S
          </span>
          <span>
            <span className="font-semibold text-slate-200">SVD Clean Pro</span>
            <span className="ml-1 text-slate-500">
              — © {new Date().getFullYear()} svd-clean.de
            </span>
          </span>
        </div>
        <nav className="flex gap-6">
          <Link href="/impressum" className="hover:text-slate-200">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-slate-200">
            Datenschutz
          </Link>
          <Link href="/agb" className="hover:text-slate-200">
            AGB
          </Link>
        </nav>
      </div>
    </footer>
  );
}
