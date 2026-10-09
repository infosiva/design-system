# Design-system gap tracker (Production-Ready Gate)
**Generated:** 2026-10-09 by `scripts/prod-ready-check.mjs` (heuristic grep; verify by hand)

| project | chatbot | feedback | analytics | promo | theme | notFound | handoff |
|---|---|---|---|---|---|---|---|
| agencyos | Y | Y | Y | Y | Y | Y | Y |
| agent-lab | Y | Y | Y | Y | Y | - | Y |
| ai-jobs-portal | Y | Y | Y | Y | Y | Y | Y |
| ai-platform-template | Y | Y | Y | Y | Y | Y | Y |
| ai-resume-screener | Y | Y | Y | Y | Y | Y | Y |
| ai-social-content | Y | Y | Y | Y | Y | Y | Y |
| ai-toolkit | Y | Y | Y | Y | Y | Y | Y |
| aicoachlab | Y | Y | Y | Y | Y | Y | Y |
| aigotitwrong | - | - | - | - | - | - | Y |
| anylocal | Y | Y | Y | Y | Y | Y | Y |
| auditpilot | Y | Y | Y | Y | Y | Y | Y |
| billslash | Y | Y | Y | Y | Y | Y | Y |
| bookingcall | Y | Y | Y | Y | Y | Y | Y |
| business-agent | - | - | - | - | - | - | Y |
| campaignforge | Y | Y | Y | Y | Y | Y | Y |
| clawdbotai | Y | Y | Y | Y | Y | Y | Y |
| clipforge-ai | Y | Y | Y | Y | Y | Y | Y |
| coding-quiz-shorts | - | - | Y | - | Y | - | Y |
| complybuddy | Y | Y | Y | Y | Y | Y | Y |
| daily-agent | - | - | Y | - | Y | - | Y |
| draftcal | Y | Y | Y | Y | Y | Y | Y |
| firstline | Y | Y | Y | Y | Y | Y | Y |
| flighttracker | Y | Y | Y | Y | Y | Y | Y |
| growth-agent | - | - | Y | Y | Y | - | Y |
| homecanvas | Y | Y | Y | Y | Y | Y | Y |
| hub | Y | Y | Y | Y | Y | Y | - |
| idea-agent | Y | Y | Y | Y | Y | Y | Y |
| idea-factory | - | - | Y | Y | Y | - | Y |
| invoicemint | Y | Y | Y | Y | Y | Y | Y |
| kwizzo | Y | Y | Y | Y | Y | Y | - |
| leadscout | - | - | - | - | - | - | Y |
| mandirates | Y | Y | Y | Y | Y | Y | Y |
| matchly | Y | Y | Y | Y | Y | Y | Y |
| meetscribe | Y | Y | Y | Y | Y | Y | Y |
| mi-pack | Y | Y | Y | Y | Y | Y | Y |
| monetization-agent | - | - | Y | - | Y | - | Y |
| myvitals | Y | Y | Y | Y | Y | Y | Y |
| nammatamil | Y | Y | Y | Y | Y | Y | Y |
| nammatamil-crawler | - | - | - | - | - | - | - |
| neuralos | Y | Y | Y | Y | Y | Y | Y |
| news-spin-agent | - | - | Y | - | Y | - | Y |
| ninjapa | - | - | Y | - | Y | - | Y |
| outreach-crm | Y | Y | Y | Y | Y | Y | Y |
| parceliq | Y | Y | Y | Y | Y | Y | Y |
| pdfideas | Y | Y | Y | Y | Y | Y | Y |
| photorestore | Y | Y | Y | Y | Y | Y | Y |
| pixelforge | Y | Y | Y | Y | Y | Y | Y |
| playsmart | Y | Y | Y | Y | Y | Y | Y |
| pricedip | Y | Y | Y | Y | Y | Y | Y |
| prismlane-site | Y | Y | Y | - | - | - | Y |
| protoforge | Y | Y | Y | Y | Y | Y | Y |
| qa-dashboard | Y | Y | Y | - | Y | Y | Y |
| quicktech | Y | Y | Y | Y | Y | Y | Y |
| quizbites | Y | Y | Y | Y | Y | Y | Y |
| quizbytesdaily | Y | Y | Y | Y | Y | Y | Y |
| renewalpilot | Y | Y | Y | Y | Y | Y | Y |
| replydesk | Y | Y | Y | Y | Y | Y | Y |
| resumevault | Y | Y | Y | Y | Y | Y | Y |
| rideflow | Y | Y | Y | Y | Y | Y | Y |
| roamplan | Y | Y | Y | Y | Y | Y | Y |
| speakiq | Y | Y | Y | Y | Y | Y | Y |
| studio-portfolio | Y | Y | Y | Y | Y | Y | Y |
| taskflow | Y | Y | Y | Y | Y | Y | Y |
| trackwealth | Y | Y | Y | Y | Y | Y | Y |
| tutiq | Y | Y | Y | Y | Y | Y | Y |
| vidrush | Y | Y | Y | Y | Y | Y | Y |
| voicejournal | Y | Y | Y | Y | Y | Y | Y |
| weekendai | Y | Y | Y | Y | Y | Y | Y |
| worldtrends | Y | Y | Y | Y | Y | Y | Y |
| yt-portal | Y | Y | Y | Y | Y | Y | Y |
| zerostaff | Y | Y | Y | Y | Y | Y | Y |


## Gaps by check
- **chatbot** missing (11): aigotitwrong, business-agent, coding-quiz-shorts, daily-agent, growth-agent, idea-factory, leadscout, monetization-agent, nammatamil-crawler, news-spin-agent, ninjapa
- **feedback** missing (11): aigotitwrong, business-agent, coding-quiz-shorts, daily-agent, growth-agent, idea-factory, leadscout, monetization-agent, nammatamil-crawler, news-spin-agent, ninjapa
- **analytics** missing (4): aigotitwrong, business-agent, leadscout, nammatamil-crawler
- **promo** missing (11): aigotitwrong, business-agent, coding-quiz-shorts, daily-agent, leadscout, monetization-agent, nammatamil-crawler, news-spin-agent, ninjapa, prismlane-site, qa-dashboard
- **theme** missing (5): aigotitwrong, business-agent, leadscout, nammatamil-crawler, prismlane-site
- **notFound** missing (13): agent-lab, aigotitwrong, business-agent, coding-quiz-shorts, daily-agent, growth-agent, idea-factory, leadscout, monetization-agent, nammatamil-crawler, news-spin-agent, ninjapa, prismlane-site
- **handoff** missing (3): hub, kwizzo, nammatamil-crawler

## Triage 2026-10-09 (manual review of the 11 flagged)
- **Exempt, internal agent dashboards / static tools (no public users):** business-agent, daily-agent, growth-agent, idea-agent, idea-factory, monetization-agent, news-spin-agent, nammatamil-crawler, leadscout. Chatbot/feedback/promo/404 n/a; no public traffic.
- **Exempt, Telegram bot + static page:** ninjapa (feedback through the bot; design lock + telemetry done 2026-10-06).
- **Real gaps (public):** aigotitwrong, coding-quiz-shorts: static `public/index.html`, need chatbot + feedback + 404 + analytics (owner decision: are they live products?).
- **Fixed 2026-10-09:** prismlane-site `app/not-found.tsx` added (uncommitted). prismlane-site is dark (#0b0e13 + teal) by design; hub theme wiring still open.
- **Still open:** hub, kwizzo, nammatamil-crawler lack HANDOFF.md; agent-lab, qa-dashboard 404/promo.

## 2026-10-09 design-record sweep
- ai-jobs-portal, invoicemint, mi-pack: design pass + animated scope already recorded. ai-jobs-portal still TODO: impeccable critique, /review-animations.
- kwizzo: HANDOFF.md added (design lock + animated scope).
- nammatamil-crawler: internal dashboard, design N/A, noted in DESIGN.md.
- aigotitwrong, coding-quiz-shorts: have prod-gate-2026-10-07 records (earlier 'real gap' call was wrong).
