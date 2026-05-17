# DECISIONS (заключени решения)

## БИЗНЕС
- Целеви пазар: немски почистващи фирми (B2B), стартиращ Bayern (Augsburg)
- 3 продуктови линии (виж CLAUDE.md)
- Launch цени само за първи 10 клиента — после Normalpreis
- Domain: svd-clean.de (поддомейни за продукти)
- Език по подразбиране: DE (формално "Sie"). Преводи EN + BG.

## ТЕХНОЛОГИЧНИ
- Stack: Next.js 16 App Router + Supabase + VPS hosting
- БЕЗ Vercel, БЕЗ Lovable — всичко на VPS-а
- Хостинг: Nginx reverse proxy + PM2 process manager
- Database: Supabase (existing project `dlbnjiomldlijbshxysh`) — Postgres + Auth + Storage
- Mail: Resend (трябва API key)
- PDF: @react-pdf/renderer
- 3D: Three.js + @react-three/fiber + @react-three/drei
- Animation: Framer Motion + GSAP + Lenis (smooth scroll)
- State: Zustand
- Forms: react-hook-form + Zod
- i18n: next-intl

## ДИЗАЙН
- Цветове и шрифтове — виж CLAUDE.md
- Premium ефекти ЗАДЪЛЖИТЕЛНИ: 3D hero, parallax, storytelling sections, scroll-linked motion
- Mobile-first (iPhone Safari като еталон)

## ИНФРАСТРУКТУРА
- VPS: Contabo (6 vCPU / 12 GB / 200 GB SSD)
- DNS: INWX, A records to VPS IP
- SSL: Let's Encrypt чрез certbot + nginx
- Firewall: ufw (22/80/443 only) + fail2ban
