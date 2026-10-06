# DESIGN.md — portfolio design contract
Single source of truth: this repo. Hub overrides (no code change): Edge Config `theme_<siteId>.design`.

## Order of truth
1. Hub live values for the site (`theme_<siteId>`), 2. project `DESIGN.md`, 3. this file + `tokens/tokens.json`.

## Hard rules
- Unique default accent per project (`tokens/palette-registry.json`, `node scripts/check-palettes.mjs --try '#hex'`). Sharing only if hub sets `design.paletteShared`.
- Not a generic AI template: no default indigo/purple gradient hero, no 3-identical-icon-card grid, no centered-hero + 3 feature cards + pricing stack unless the brief asks. See `prompts/anti-template.md`.
- Banned: near-black+orange, purple backgrounds, teal mesh blobs (MASTER.md).
- 4.5:1 contrast, 44px targets, `prefers-reduced-motion` honoured (`motion/presets.ts` `reduced`).
- Every component sets its own background (§0-BG-CONTRAST).

## Taste dials (1-10, hub-editable `design.dials`)
variance (layout asymmetry) · motion (amount of animation) · density (info per screen). Defaults in tokens.json.

## Reuse flow
Check `COMPONENTS.md` → reuse → else build in design-system first → copy to project.
Deep spec: `MASTER.md`, `globals-template.css`, `LAYOUT-PROMPTS.md`.
