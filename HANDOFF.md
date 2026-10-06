# HANDOFF — design-system rollout
**Date:** 2026-10-05  **Status:** IN PROGRESS
**Goal:** Shared design system, hub-customisable, unique accent+logo+layout per project, GA4 + usage logging via hub.

## Done
- [x] 19 layout archetypes; pickArchetype(brief, avoid, seed) dynamic
- [x] palette uniqueness (check-palettes, suggest-accents), hub 409 guard
- [x] hub Themes tabs: Design (archetype, bg animation/speed, dials, flags, brief) + Tracking (GA4 id)
- [x] theme-loader: analytics.ga4Id, buildGa4Snippet (consent denied by default), shared copy in theme/src
- [x] agents done: speakiq, resumevault, rideflow, kwizzo
## In progress
- [ ] trackwealth, invoicemint agents
- [ ] registry merge (palette-registry, logos/registry, rollout.json)
- [ ] wave 2: aicoachlab anylocal neuralos pdfideas pixelforge replydesk + 12 no-tab-icon projects
- [ ] gallery republish
## Resume from here
Collect trackwealth/invoicemint reports, merge registries, launch wave 2.
## Known issues
lightningcss binary missing (speakiq/resumevault build; reinstall node_modules), rideflow t.js script, kwizzo dashboard /pro link, stripe apiVersion tsc errors in kwizzo.
