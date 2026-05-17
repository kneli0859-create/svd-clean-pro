# CHECKPOINTS (safe rollback points)

## CHECKPOINT 1 — ETAP 1 Foundation Setup
- Date: 2026-05-17
- Git hash: `3d2029b`
- Status: VPS provisioned + GitHub repo + DNS обновен + Next.js 16 init
- Rollback: `git reset --hard 3d2029b`

## CHECKPOINT 2 — ETAP 2 Brain files
- Git hash: `1631937`
- Status: CLAUDE/NEXT_STEPS/DECISIONS/CHECKPOINTS/SKILLS written

## CHECKPOINT 3 — ETAP 3 PLZ engine
- Git hash: `03d34a8`
- Status: src/lib/plz/germany-tiers.ts — full Germany coverage, services, savings

## CHECKPOINT 4 — ETAP 4 Nginx + SSL
- Git hash: `10eeb04`
- Status: Reverse proxy + Let's Encrypt SSL live for 5 domains

## CHECKPOINT 5 — ETAP 5 Premium hero
- Git hash: `c343780`
- Status: Three.js sphere + Framer parallax + Story + Pricing + Nav/Footer

## CHECKPOINT 6 — ETAP 6 Calculator wizard
- Git hash: `93c6ae2`
- Status: 4-step wizard + Zustand store + count-up + §19 toggle

## CHECKPOINT 7 — ETAP 7 PDF generator
- Git hash: `5b8bb5f`
- Status: @react-pdf/renderer Angebot template + /api/offer/pdf route

## CHECKPOINT 8 — ETAP 8 Supabase + booking
- Git hash: `4d55e18`
- Status: customers/offers/bookings tables + Database types + booking API + form

## CHECKPOINT 9 — ETAP 9 PM2 deployment
- Git hash: `7f3a8e7`
- Status: PM2 ecosystem.config.js + systemd startup + saved process list

## CHECKPOINT 10 — ETAP 10 Final docs + push
- Git hash: (this commit)
- Status: All 10 etaps shipped + live URLs verified + GitHub mirror

## ROLLBACK RECIPES
```bash
# Soft rollback to checkpoint N
cd /root/svd-clean-pro
git fetch origin
git reset --hard <hash>
pnpm install
pnpm build
pm2 restart svd-clean-app svd-clean-demo

# Stop everything
pm2 stop svd-clean-app svd-clean-demo

# Tail logs
pm2 logs svd-clean-app --lines 50
pm2 logs svd-clean-demo --lines 50
```
