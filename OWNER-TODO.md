# Owner-only items (collected 2026-10-07, work continues without waiting)
- Vercel NPM_TOKEN (GitHub PAT, read:packages) missing -> E401 on @infosiva/shared-ui: billslash, rideflow, ai-platform-template, meetscribe. Set as env (prod+preview), redeploy.
- Vercel BLOCKED (commit author lacks permission / no Git account): clawdbotai, neuralos, ai-jobs-portal. Fix Vercel team membership or git author email.
- weekendai git remote embeds a gho_ token: rotate, reset remote to https://github.com/infosiva/weekendai.git
- draftcal.app, worldtrends.today serve old builds: redeploy.
- flighttracker needs `wrangler deploy`.
- ai-core tenant key for mi-pack, pdfideas, resumevault, ai-resume-screener, auditpilot.
- parceliq/weekendai: fixed missing-file build breaks (pushed a7991d7, 898815f); verify deploy goes READY.
- 2026-10-07: mi-pack and resumevault need an ai-core tenant key (https://api.prismlane.app) to move chat/upload/JD matching onto ai-core RAG. Owner-blocked; apps use direct free-first provider chains until then.
- 2026-10-07 flighttracker: story-mode/.env.production was tracked (key NAME: NEXT_PUBLIC_API_URL only, public URL) and is in git history; untracked now, history not purged. Rotate keys in that file if it ever held more (in git history).

## vidrush (added 2026-10-07)
- Working tree holds an unfinished redesign by another agent (HANDOFF.md "IN PROGRESS, no commit") plus an untracked `.npmrc` containing a token. Review, move the token to an env var / gitignore `.npmrc`, then commit. Gate files (AnimatedBg, Logo, icon.svg, DESIGN.md) are already on disk.
- homecanvas accent `#e11d48` collides with worldtrends: pick a new accent (`check-palettes.mjs --try`).
- tutiq (own `lib/ai.ts`) and neuralos (vault notes) should move to ai-core once a tenant key exists.
- flighttracker: chat/feedback/promo/theme need Worker-side implementation (static export cannot host app/api).

## Live QA findings (added 2026-10-07)
- Vercel CLI token invalid (VERCEL_TOKEN rejected): re-auth so domains/deploys can be listed.
- Documented URL wrong/dead, give real URL: rideflow (rideflow.app -> atom.com), taskflow (parked), voicejournal (dead), zerostaff (no DNS), bookingcall (none documented), invoicemint (unconfirmed).
- Live URL serves a DIFFERENT app than repo code: parceliq, photorestore, ai-resume-screener, clipforge-ai, studio-portfolio. Fix Vercel project/domain mapping (hub/lib/sites.ts entries likely wrong).
- Stale live deploy (gate commit not live): matchly, replydesk (chat button img /meetbookprofilowe.png 404), neuralos, mandirates, clawdbotai, ai-toolkit and playsmart (only JS redirect to /lander).
- VPS tracker :3098 hangs; /t.js rewrite stalls P10 on homecanvas and likely other sites.
- Console errors to inspect after redeploy: worldtrends (3), neuralos (2), quizbytes (1). invoicemint: 3 broken links.
- Logo gap ("Match ly", "Quiz BytesDaily" at 375) in matchly and quizbytesdaily: verify live after redeploy.
- e2e re-run 2026-10-07 (live, pre-redeploy): clawdbotai 7/10 (P1 console, P8 nav, P4 core action; stale deploy), complybuddy 9/10 (P1 2 console errors), pdfideas 8/10 (P1 4 console errors, P3 1 broken link), aicoachlab 10/10, campaignforge 10/10. Re-check after redeploy.
