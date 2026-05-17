# CHECKPOINTS (safe rollback points)

## CHECKPOINT 1 — ETAP 1 Foundation Setup
- Date: 2026-05-17
- Git hash: `3d2029b11005a71b024f0b0973ef3c619411478c`
- Status: VPS provisioned + GitHub repo + DNS обновен + Next.js 16 init
- Working:
  - Domain DNS records създадени (изчакване на propagation)
  - Next.js + shadcn UI компоненти present
  - `pnpm exec tsc --noEmit` минава
- Rollback: `git reset --hard 3d2029b`
