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

## Production-ready gate (2026-10-07)
Declared by migration run; file evidence only, exemptions need owner review. Project type: **lib**. Shared library/design source; no end-user site. It is the SOURCE of items 1/14/17, not a consumer.

| # | Item | Status | Evidence / reason |
|---|---|---|---|
| 1 | Design system / theme-loader | N/A | This dir IS the design source; palette collisions checked by design-system/scripts/check-palettes.mjs. |
| 2 | Hub control (flags, limits, GA4) | N/A | No public site to control. Config via env vars, none hardcoded (secret scan clean). |
| 3 | ai-core use | EXEMPT | No doc upload / RAG / memory feature here; any LLM call goes through the free chain (Ollama>Groq>Gemini>Cerebras). Revisit if a RAG feature is added. |
| 4 | User state | N/A | No end users. |
| 5 | Promo / trial access | N/A | Nothing to unlock; no paid tier. |
| 6 | Monitoring | EXEMPT | No public traffic; logs to stdout/files. Add health endpoint + hub usage log if exposed publicly. |
| 7 | Chatbot + Feedback | N/A | No end-user UI. |
| 8 | Landing / SEO / 404 | N/A | Not a public landing site. |
| 9 | Verify | DONE | node scripts/prod-ready-check-tools.mjs: secret scan, .env ignored+untracked, no hardcoded VPS IP, README present. Push/e2e-verify: n/a until deployed. |
| 10 | UI skill stack | N/A | No UI touched. |
| 11 | Animated demo / logo | N/A | No public product page. |
| 12 | ai-core tenant key | N/A | No ai-core feature (see 3). |
| 13 | Hub access codes | N/A | No gated feature. |
| 14 | Global design library | N/A | Source library. |
| 15 | Analytics floor | N/A | No public pages to instrument. |
| 16 | Document upload pipeline | N/A | No document upload feature. |
| 17 | Design pick by scope | N/A | No UI. |
| 18 | AI tooling + Python backend | EXEMPT | Uses existing stack; adopt orchestrator/ai-core when an AI feature is added. |
| 19 | UI stack evidence gate | N/A | No UI code changed. |
| 20 | Showcase-before-update | N/A | No UI/animation change. |
