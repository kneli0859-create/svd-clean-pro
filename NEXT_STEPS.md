# NEXT_STEPS

## ТЕКУЩ ЕТАП
ETAP 2 — Brain files (в процес).

## ЗАВЪРШЕНИ
- ETAP 1: Foundation ✅ (commit `3d2029b`)
  - VPS пакети (nginx, certbot, ufw, fail2ban, pnpm, pm2, supabase CLI)
  - Firewall активен (22/80/443)
  - GitHub repo `kneli0859-create/svd-clean-pro` създаден
  - DNS на INWX: svd-clean.de + www + wildcard + app/demo/musterfirma/api → 109.199.110.61
  - Next.js 16 + Tailwind 4 + shadcn/ui + всички deps
  - .env.local с credentials (600 perms, gitignored)

## СЛЕДВА
- ETAP 3: PLZ engine за цяла Германия
- ETAP 4: Nginx reverse proxy + Let's Encrypt SSL
- ETAP 5: Hero3D (Three.js floating sphere + parallax)
- ETAP 6: Calculator wizard (4 steps)
- ETAP 7: PDF generator (@react-pdf/renderer)
- ETAP 8: Supabase schema + booking flow
- ETAP 9: PM2 deployment
- ETAP 10: Final commit & push

## БЛОКИРАЩИ НЕЩА
- RESEND_API_KEY липсва (placeholder в .env.local) — за email automation в по-късна сесия
- DNS propagation за certbot — изчакай ~5-15 мин преди SSL

## CHECKPOINTS
Виж CHECKPOINTS.md
