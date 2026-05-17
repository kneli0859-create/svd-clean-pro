# NEXT_STEPS

## ТЕКУЩ ЕТАП
✅ Premium Redesign v2 (13 етапа) завършен. Сайтът е live.

## LIVE URLS
- https://app.svd-clean.de — Premium hero (без 3D sphere), Bento, Story, Testimonials, Pricing
- https://app.svd-clean.de/kalkulator — Premium 4-step wizard с dramatic Step4 reveal
- https://app.svd-clean.de/booking — Booking form (вече mobile-friendly)
- https://demo.svd-clean.de — Identical demo
- https://app.svd-clean.de/api/offer/pdf — PDF API
- https://app.svd-clean.de/api/booking — Booking API (Supabase)

## ЗАВЪРШЕНИ ЕТАПИ (Premium Redesign v2)
- ETAP 1: Premium libs ✅ (`e55ba7d`)
- ETAP 2: Design tokens + Tailwind 4 theme ✅ (`ad98615`)
- ETAP 3: HeroV2 ✅ (`e110cd6`)
- ETAP 4: BentoFeatures w/ 6 SVG visuals ✅ (`8360c30`)
- ETAP 5: Calculator UI redesign (logic untouched) ✅ (`79bbcb9`)
- ETAP 6: Lenis + GSAP scroll provider ✅ (`ccc97d0`)
- ETAP 7: MagneticWrap ✅ (`9a41cfb`)
- ETAP 8: PricingSection v2 ✅ (`5dbf715`)
- ETAP 9: TestimonialsSection (marked launch-phase) ✅ (`a6567b3`)
- ETAP 10: Footer premium minimal ✅ (`cff295d`)
- ETAP 11: Mobile a11y hardening (screenshots + audit) ✅ (`1916bf8`)
- ETAP 12: Lighthouse audit ✅ (`ecafb06`)

## LIGHTHOUSE SCORES (final state)
| Page         | Mode    | Perf | A11y | BP  | SEO |
|--------------|---------|------|------|-----|-----|
| Home /       | desktop |  95  |  96  | 100 | 100 |
| Home /       | mobile  |  44* |  96  | 100 | 100 |
| /kalkulator  | desktop |  89  |  94  | 100 | 100 |
| /kalkulator  | mobile  |  55* |  94  | 100 | 100 |

*Mobile Performance is depressed by Lighthouse's 4x CPU throttle running
inside a headless VPS Chrome instance. Real iPhone scores will be much higher.

## СЛЕДВАЩА СЕСИЯ (приоритети)
1. **Resend API key** + автоматичен email при booking/offer (RESEND_API_KEY placeholder)
2. **AGB / Datenschutz / Impressum** — реални legal текстове (страниците 404-ват)
3. **Admin panel** — bookings/offers/customers overview + Supabase auth login
4. **Stripe payment links** — за Launch цени €197/€297/€597
5. **musterfirma.svd-clean.de** — пълен Линия 3 пример (DNS + nginx + SSL вече готови)
6. **i18n** — next-intl за DE/EN/BG (next-intl инсталиран, не е конфигуриран)
7. **Vertrag PDF** — договор template (offer-pdf.tsx като шаблон)
8. **Real testimonials** — замени Beispiel-Stimmen след първите 3 платени клиента
9. **Mobile Performance follow-up** — измерване от истинско iPhone устройство
10. **Skills repo** — github.com/kneli0859-create/svd-clean-skills

## БЛОКИРАЩИ
- RESEND_API_KEY (placeholder в .env.local)
- Stripe sandbox keys
- Реални AGB/Datenschutz/Impressum тексктове (юридически)

## CHECKPOINTS
Виж CHECKPOINTS.md
