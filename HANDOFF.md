# HANDOFF — design system + hub customise + model router, then tutiq as trial
**Date:** 2026-10-10  **Status:** IN PROGRESS
**Goal:** Hub can change layout/theme/dials and model routing per site (or common) with no code deploy; hub page searches/installs models, tools, plugins; tutiq consumes it as the trial.

## Decisions (pillars)
- ai-core: exemption for router work (config/UI only, no RAG). Tutiq doc upload stays on ai-core per tutiq/HANDOFF.md.
- Retrieval: plain pipeline (no agentic/graph) for this scope. Prompt/context: unchanged. Model per step: `registry/models.json` tasks (trivial/chat/reasoning/long-context/code), hub `theme.ai` overrides.
- Free tier only; paid providers stay disabled unless hub sets freeOnly=false.

## Files to touch
- `tutiq/lib/theme-loader.ts` — add `ai?: SiteAI` to SiteTheme
- `tutiq/lib/ai.ts` — order providers via `routeChain(task, theme.ai)`; fallback to old order
- `hub/app/api/models/route.ts` (new) — GET registry+per-site ai, PUT site ai into `theme_<id>.ai` (reuse themes route write path)
- `hub/app/models/page.tsx` (new) — search models/tools/plugins, edit per-site chains/disabled/freeOnly, copy install script
- `hub/app/api/dev-stack/install/route.ts` — extend: install script for a searched tool/plugin (never executed server-side)

## Steps
- [x] 1 SiteTheme.ai + routeChain wired in tutiq lib/ai.ts, self-check
- [x] 2 hub /api/models + /models page (impeccable/frontend-design stack)
- [x] 3 discover/install search (registry + discover.mjs output) in hub page
- [x] 4 tutiq trial: chat/learn/exam use router tasks; layout archetype + dials from hub
- [x] 5 gates: contrast, 375/1280, tsc done; apple-audit/e2e-verify on live = owner-blocked (hub not deployed, no VERCEL_TOKEN)
- [ ] 6 tutiq/HANDOFF.md remaining items

## Success criteria
- Changing `theme_tutiq.ai.chains.chat` in hub changes the provider order with no deploy (read back from the route).
- `ai-route.ts` self-check passes; tsc clean on touched files.

## Evidence (step 5)
- Hub /models contrast-gate (new `--cookie` flag): 375 PASS, 1280 PASS (fixed FAB + Save indigo-500 -> 600). Screenshots read; mobile site list cut to 26vh so controls sit above the fold.
- Hub tsc exit 0. API now degrades to registry-only when Edge Config token is bad (403 seen locally) instead of blank page.
- Animated scope for /models: none by design (Operate-mode admin tool; press feedback only via existing button states; reduced-motion n/a).
- NOT verified: live Edge Config write/read (needs VERCEL_TOKEN), apple-audit score, hub layout archetype push.

## 3-tier status (tutiq, 2026-10-10)
- Server-side verified locally: guest cap 5/day (signed `tq_guest` cookie + IP limit), `guarded('members')` routes 401 for guests, valid promo `TUTIQ-TEST-7D` sets `tq_promo` and unlocks. `/api/access` + `/api/promo` live.
- Contrast PASS 375+1280 on /, /pricing, /exam, /learn, /about, /contact, /privacy, /terms.
- NOT verified: `tq_plan` paid path, tier strip on landing/limit prompt/dashboard in browser, live-URL click-test, age-persona runs (9-10, 15-17).
- Not done by agent (owner-only): commit, push, deploy, delete, spend. Cron `b486e6a6` still active until all steps are done or owner-blocked.

## Modernise deliverables check (2026-10-10)
- Exist: prompts/modernise.md, components/TierStrip.tsx, ExampleDashboard.tsx, LimitPrompt.tsx, DashboardShell.tsx, ~/.claude/skills/modernise, scripts/check-layouts.ts (PASS: distinct layout per project).
- Dial CSS vars: `dial` present in globals-template.css.

## Resume from here if interrupted
Steps 1-6 done or owner-blocked. Persona e2e logged in tutiq/HANDOFF.md. Cron b486e6a6 deleted.
