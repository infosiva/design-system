# Modernise this site (one prompt, any project)

Paste: `Modernise <route|whole site> using design-system/prompts/modernise.md. Dials: <variance 1-10> <motion 1-10> <density 1-10>. Brief: <one line>.`

Defaults (hub `theme_<siteId>.design` overrides): variance 6, motion 5, density 7.

Run in order, no skipping; skip a step only if it truly does not apply:
1. `ds-source`: reuse design-system components first (StickyCrumb, tier strip, tokens). New reusable piece goes here first.
2. `impeccable shape` then `ui-ux-pro-max` (palette/style) then `taste-skill` (anti-slop) with `prompts/anti-template.md`.
3. Build: `frontend-design` + `emil-design-eng` (press/entry feel) + `animate` (CSS first; reduced-motion honoured).
4. Fit-in-viewport: app-shell, internal scroll panes, no dead bands, sticky orientation (StickyCrumb).
5. Honest copy: no "free forever/unlimited/money-back" unless true; tier strip + "Example data" sample.
6. Gates: `scripts/contrast-gate.mjs` PASS at 375+1280, tsc, `apple-audit`, `impeccable critique`, screenshots 375+1280 read.
7. Age personas if audience spans ages (see global hard rule: usable for every age).

Customise without code: hub Edge Config dials, palette, `paletteShared`, `templateOk`.

## Skill stack (ordered, default)
1. `ds-source` reuse -> 2. `impeccable shape` -> 3. `ui-ux-pro-max` + `taste-skill` (+ anti-template.md) -> 4. `frontend-design` -> 5. `emil-design-eng` + `animate` -> 6. `fixing-accessibility` -> 7. `impeccable polish` -> 8. `impeccable critique` + `apple-audit` -> 9. `contrast-gate.mjs` PASS at 375+1280.
## Layout variance
Run `scripts/check-layouts.ts` (PASS = distinct archetype per project) and `check-palettes.mjs` (unique accent). A clash means pick another archetype via `pickArchetype(project, avoid)`.
## Dials
`--dial-variance/motion/density` in globals-template.css; hub `design.dials` overrides.
