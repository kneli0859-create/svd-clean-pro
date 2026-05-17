# CLAUDE.md — SVD Clean Pro

## ВЛАДЕЛЕЦ
Шефе (Симеон Василев), Augsburg, iPhone-only workflow, B1/B2 немски.

## ПРОЕКТ
SaaS калкулатор за немски почистващи фирми.
- app.svd-clean.de — главен SaaS landing + калкулатор
- demo.svd-clean.de — живо демо за продажби
- musterfirma.svd-clean.de — Линия 3 пример (цял сайт)

## STACK
Next.js 16 / React 19 / Tailwind 4 / shadcn/ui / Framer Motion / Three.js / GSAP / Lenis / Supabase / Resend / @react-pdf/renderer / Zustand / next-intl

## ПРАВИЛА
1. Auto режим — малки safe commits
2. Truth audit преди голяма промяна
3. Mobile-first (iPhone Safari тестване)
4. Български в коментари, немски в UI ("Sie" форма)
5. Commit формат: `[claude]: feat|fix|chore: описание`
6. Питай само за: реални плащания, изтриване на данни, production deploy с реални клиенти

## РЕД ЗА ЧЕТЕНЕ В НОВ ЧАТ
1. NEXT_STEPS.md (където сме)
2. CHECKPOINTS.md (последен safe point)
3. DECISIONS.md (заключени решения)
4. SKILLS.md (агенти)
5. MEGA_PROMPT.md (само ако нужно)

## ЛАУНЧ ЦЕНИ (първи 10 клиента)
- Линия 1: €197 (Normalpreis €497) — само калкулатор
- Линия 2: €297 + €29/м (Normalpreis €897 + €89/м) — embed
- Линия 3: €597 + €49/м (Normalpreis €1497 + €149/м) — нов сайт

## BRAND
- Primary `#003B73` / Accent `#FFD700` / BG `#0F172A` / Text `#F8FAFC`
- Success `#10B981` / Warning `#F59E0B` / Error `#EF4444`
- Fonts: Playfair Display (headlines), Inter (UI), JetBrains Mono (numbers)

## ИНФРАСТРУКТУРА
- VPS Contabo 109.199.110.61 (Ubuntu 24.04)
- Domain INWX svd-clean.de (всички A records → VPS)
- Supabase project: `dlbnjiomldlijbshxysh`
- Хостинг: VPS + Nginx + PM2 (БЕЗ Vercel, БЕЗ Lovable)

## ПОРТОВЕ
- 3000 = app.svd-clean.de
- 3001 = demo.svd-clean.de
- 3002 = musterfirma.svd-clean.de
