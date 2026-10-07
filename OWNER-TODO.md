# Owner-only items (collected 2026-10-07, work continues without waiting)
- Vercel NPM_TOKEN (GitHub PAT, read:packages) missing -> E401 on @infosiva/shared-ui: billslash, rideflow, ai-platform-template, meetscribe. Set as env (prod+preview), redeploy.
- Vercel BLOCKED (commit author lacks permission / no Git account): clawdbotai, neuralos, ai-jobs-portal. Fix Vercel team membership or git author email.
- weekendai git remote embeds a gho_ token: rotate, reset remote to https://github.com/infosiva/weekendai.git
- draftcal.app, worldtrends.today serve old builds: redeploy.
- flighttracker needs `wrangler deploy`.
- ai-core tenant key for mi-pack, pdfideas, resumevault, ai-resume-screener, auditpilot.
- parceliq/weekendai: fixed missing-file build breaks (pushed a7991d7, 898815f); verify deploy goes READY.
- 2026-10-07: mi-pack and resumevault need an ai-core tenant key (https://api.prismlane.app) to move chat/upload/JD matching onto ai-core RAG. Owner-blocked; apps use direct free-first provider chains until then.
