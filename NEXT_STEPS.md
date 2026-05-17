# NEXT_STEPS

## ТЕКУЩ ЕТАП
✅ Всичките 10 етапа от MEGA_PROMPT.md завършени. Сайтът е live.

## LIVE URLS
- https://app.svd-clean.de — главен SaaS landing (HTTP 200)
- https://app.svd-clean.de/kalkulator — 4-step wizard (HTTP 200)
- https://app.svd-clean.de/booking — online buchung (HTTP 200)
- https://demo.svd-clean.de — live demo (HTTP 200)
- https://app.svd-clean.de/api/offer/pdf — PDF API (валиден PDF v1.3)
- https://app.svd-clean.de/api/booking — booking API (записва в Supabase)

## ЗАВЪРШЕНИ ЕТАПИ
- ETAP 1: Foundation ✅
- ETAP 2: Brain files ✅
- ETAP 3: PLZ engine ✅ (75+ PLZ префикса, 5 tiers)
- ETAP 4: Nginx + SSL ✅ (Let's Encrypt за 5 поддомейна)
- ETAP 5: Premium Hero ✅ (Three.js sphere + Framer parallax + Lenis)
- ETAP 6: Calculator wizard ✅
- ETAP 7: PDF generator ✅ (@react-pdf, Helvetica fallback)
- ETAP 8: Supabase schema + booking ✅
- ETAP 9: PM2 deployment ✅ (auto-startup на boot)
- ETAP 10: Push към GitHub ✅

## СЛЕДВАЩИ СЕСИИ (по приоритет)
1. **musterfirma.svd-clean.de** — Линия 3 пример (port 3002, нов apps entry в ecosystem.config.js)
2. **Resend интеграция** — auto email на новата booking + offer (трябва RESEND_API_KEY)
3. **Admin panel** — bookings/offers/customers overview (Supabase auth)
4. **i18n** — next-intl за DE/EN/BG превключване
5. **Vertrag PDF** — договор (срещу `offer-pdf.tsx` template)
6. **Logo upload** — replace placeholder "S" gold square
7. **Skills repo** — `github.com/kneli0859-create/svd-clean-skills`
8. **Stripe / payment links** — за Launch цени €197/€297/€597
9. **AGB / Datenschutz / Impressum** — реални текстове (placeholder routes)
10. **Customer dedup** — при booking — search customers by email и линкни

## БЛОКИРАЩИ
- RESEND_API_KEY липсва (placeholder в .env.local)
- Stripe sandbox/live keys — за реални плащания
- Реални AGB/Datenschutz тексктове (юридически)

## CHECKPOINTS
Виж CHECKPOINTS.md
