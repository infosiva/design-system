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

## Production-readiness gap matrix (2026-10-06 audit, heuristic: verify each before fixing)
Source: scratchpad audit.py over 59 app projects. Baseline: 48 wired to theme-loader.
- [ ] Design migration missing: ai-jobs-portal, flighttracker (hub = admin, ai-platform-template = template: exempt)
- [ ] Not in palette-registry: mandirates, matchly, mi-pack
- [ ] Chat FAB missing: agent-lab, billslash, flighttracker, mi-pack, qa-dashboard
- [ ] Feedback widget missing: flighttracker, mi-pack, qa-dashboard, studio-portfolio
- [ ] Promo/trial-code (day/week access, section R) missing: agent-lab, auditpilot, flighttracker, mi-pack, pricedip, qa-dashboard, studio-portfolio, taskflow
- [ ] GA4 via hub (buildGa4Snippet) missing in ~16 layouts (billslash draftcal kwizzo myvitals resumevault rideflow speakiq trackwealth tutiq voicejournal worldtrends zerostaff ...)
- [ ] Usage/monitoring: no project shows posthog/sentry/usage-log by grep; confirm how hub usage logging is wired before claiming gap
- [ ] ai-core adoption: grep finds NO project using ai-core/prismlane. Known blocker: ai-core not reachable from Vercel yet. State per-project exemption, do not fake.
- [ ] AnimatedBg: 30 projects do not import it in layout (may use own bg); verify visually
## Resume from here
Fix cheap verified gaps in order: registry (3), chat/feedback (6), promo (8), then design migration of ai-jobs-portal + flighttracker. Push each repo after its own build.
