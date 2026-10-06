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

- [ ] ai-core: api.prismlane.app is reachable (healthz 200, TS SDK built). Needs per-project tenant key (owner approval) in .env.shared + Vercel env; then wire answer()/query() for grounded chat and per-tenant limits in: mi-pack (UK property info, RAG over docs), mandirates, pdfideas, resumevault, ai-resume-screener. Others: state exemption.

- [x] pick-design.mjs: scope text -> template + unique accents (2026-10-06)
- [ ] Document-upload features (mi-pack, pdfideas, resumevault, ai-resume-screener, auditpilot) -> ai-core RAG; blocked on tenant admin key
- [ ] flighttracker: NOT Next.js (Express `src/server.js` + static `public/` + Cloudflare worker). `lib/theme-loader.ts` (Edge Config) does not fit. Needs a client-side hub theme fetch (public endpoint) + AnimatedBg in plain JS; chat FAB, feedback, promo via hub also missing. Deferred, stack mismatch, do not fake.
- [x] 2026-10-06 triage of chat/feedback gaps from layout imports: billslash has BillBot+Feedback (ok, matrix was wrong); taskflow has chat+feedback; studio-portfolio has chat, lacks Feedback; agent-lab has Feedback, lacks chat; qa-dashboard has neither (internal dashboard).
- [ ] Internal tools (agent-lab, qa-dashboard, taskflow, hub): decide public-facing vs internal; if internal, record chat/promo exemption here. Public ones: studio-portfolio needs FeedbackWidget.

## 2026-10-06 progress (autonomous run)
- Promo (hub access-codes, revocable, day/week): mi-pack, studio-portfolio, pricedip, auditpilot pushed. Portable client = `components/PromoCode.tsx` + `app/api/promo/route.ts` (copy from pricedip, change project id).
- GA4 via hub: billslash, kwizzo, myvitals, worldtrends pushed (ai-jobs-portal earlier).
- Chat FAB: agent-lab pushed (also fixed qdrant `search`->`query` build break).
- BUG CLASS FOUND+FIXED: committed layouts importing untracked files (broke Vercel build while local pre-push passed). Fixed ai-resume-screener, anylocal, campaignforge, invoicemint, pricedip, studio-portfolio, agent-lab. Re-run the closure check after every layout commit.
- Internal tools (qa-dashboard, taskflow, hub): promo = EXEMPT (no public users, owner-only); chat/feedback on qa-dashboard still open.
- Still open: flighttracker (non-Next), ai-core tenant key (blocked), RAG for upload projects, FastAPI evaluation, remaining GA4 (rideflow, voicejournal, tutiq, zerostaff, hub), e2e-verify on live URLs.

## 2026-10-06 progress (cont.)
- GA4 via hub theme (consent-denied default) now live in: billslash, kwizzo, myvitals, worldtrends, mi-pack, rideflow, voicejournal, tutiq, zerostaff. Remaining: hub (internal, exempt: no public traffic).
- Untracked-import closure check (committed layout `@/` imports vs HEAD tree) clean across all Next projects.
- qa-dashboard / taskflow: internal tools, chat-FAB + promo EXEMPT (no public users); taskflow keeps FeedbackWidget.
- Open: flighttracker (non-Next: Express+static+CF worker) needs client-side hub theme/GA4/chat/feedback/promo; ai-core tenant key blocked (no admin key); e2e-verify not yet run on live URLs.
- **FINDING (e2e-verify 2026-10-06):** myvitals live P1 FAIL: 2 console errors. Cause: shared `useGate`/`useMagicAuth` default to `http://31.97.56.148:3110` (mixed content from https + the auth server times out from here). Same default is in anylocal, complybuddy, draftcal, hub, kwizzo, myvitals, nammatamil, pixelforge, quizbites, resumevault, roamplan, shared-ui, trackwealth, tutiq, weekendai, worldtrends. Needs an HTTPS endpoint (tunnel/Caddy on VPS) + `NEXT_PUBLIC_AUTH_API_URL` in Vercel: owner infra action, NOT faked. kwizzo landing has 0 console errors.
- flighttracker: already has hub theme-public, GA4/consent, chat, feedback. Promo worker now validates hub access codes first (revocable), env codes fallback; pushed 5a7ea7b. `wrangler deploy` NOT run (outward action, owner to approve).
