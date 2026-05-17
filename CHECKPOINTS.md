# CHECKPOINTS (safe rollback points)

## v1 — Initial build (sessions 1–2)
- C1 ETAP 1 Foundation — `3d2029b`
- C2 ETAP 2 Brain files — `1631937`
- C3 ETAP 3 PLZ engine — `03d34a8`
- C4 ETAP 4 Nginx + SSL — `10eeb04`
- C5 ETAP 5 Hero3D — `c343780`
- C6 ETAP 6 Calculator v1 — `93c6ae2`
- C7 ETAP 7 PDF generator — `5b8bb5f`
- C8 ETAP 8 Supabase + booking — `4d55e18`
- C9 ETAP 9 PM2 deploy — `7f3a8e7`
- C10 ETAP 10 docs+push — `167ed94`
- HOTFIX /kalkulator hydration — `fec420b`

## v2 — Premium Redesign (session 3)
- C11 ETAP 1 Premium libs       — `e55ba7d`
- C12 ETAP 2 Design tokens      — `ad98615`
- C13 ETAP 3 HeroV2             — `e110cd6`
- C14 ETAP 4 BentoFeatures      — `8360c30`
- C15 ETAP 5 Calculator UI v2   — `79bbcb9`
- C16 ETAP 6 Lenis + GSAP       — `ccc97d0`
- C17 ETAP 7 MagneticWrap       — `9a41cfb`
- C18 ETAP 8 PricingSection v2  — `5dbf715`
- C19 ETAP 9 Testimonials       — `a6567b3`
- C20 ETAP 10 Footer v2         — `cff295d`
- C21 ETAP 11 Mobile a11y       — `1916bf8`
- C22 ETAP 12 Lighthouse + tweaks — `ecafb06`

## ROLLBACK RECIPES
```bash
cd /root/svd-clean-pro
git fetch origin
git reset --hard <hash>
pnpm install
pnpm build
pm2 restart svd-clean-app svd-clean-demo
```

## BACKUP FILES IN REPO
All redesigned files keep `.backup` siblings for fast revert:
- src/app/globals.css.backup
- src/components/SmoothScroll.tsx.backup (entire old impl)
- src/components/hero/Hero3D.tsx.backup + SphereScene.tsx.backup
- src/components/calculator/*.tsx.backup (all 7 files)
- src/components/sections/Footer.tsx.backup
- src/components/sections/PricingSection.tsx.backup
