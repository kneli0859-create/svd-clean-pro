# SKILLS — кастъм агенти и helpers

Планирани skills/helper модули за бъдещи сесии:

1. **glanzwerk-design** — premium UI компоненти, glassmorphism, gradient text helpers
2. **german-business** — §19 UStG логика, AGB/Datenschutz/Impressum templates
3. **plz-engine** — PLZ → Tier mapping (вече има base в `src/lib/plz/germany-tiers.ts`)
4. **pdf-generator** — Auto-PDF Angebot/Vertrag на немски (`src/lib/pdf/`)
5. **three-d-effects** — Three.js helpers за hero (`src/components/hero/`)
6. **scroll-effects** — GSAP + Lenis smooth scroll и scroll-linked motion

Skills repo (за in-future installable skills):
`github.com/kneli0859-create/svd-clean-skills` (ще се създаде по-късно)

Команда (planned): `pnpm dlx skill-loader install [skill-name]`

## ИЗПОЛЗВАНЕ В CLAUDE CODE
- Local skills: виж `.claude/` folder на VPS-а
- Custom agents се регистрират в `.claude/agents/` (когато се направят)
