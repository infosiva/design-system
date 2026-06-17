# Layout Prompt Library — Portfolio Design System
**Purpose:** Copy these prompts into Claude / 21st.dev / Canvas to generate production-ready hero/page layouts per project type.
Each prompt produces a Next.js App Router component with Tailwind CSS, Framer Motion, and the correct design tokens.

---

## HOW TO USE

1. Pick the template matching your project category below
2. Replace `%%` placeholders with real project values
3. Paste into **Claude canvas** (`claude.ai/design`) or **21st.dev** prompt box
4. Copy the output HTML/JSX into your project's `app/page.tsx` or `components/Hero.tsx`
5. Run `/emil-design-eng` polish pass + `/animate` for motion
6. Run `/ui-ux-pro-max` quality check

---

## TEMPLATE 1 — Finance / Billing SaaS
*(invoicemint, trackwealth, billslash)*

```
Build a modern finance SaaS hero section as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%% (max 8 words, outcome-focused)
CTA: %%CTA_TEXT%%

Design tokens:
  BG: %%BG_HEX%%
  Accent: %%ACCENT_HEX%%
  Font: Archivo (headings) + Space Grotesk (body)

Layout: Split lg:grid-cols-2
Left: 
  - Badge pill (accent bg, "AI-Powered" or similar)
  - H1 headline max 8 words
  - Subhead 1-2 lines, describes outcome
  - 3 trust pills (✓ No credit card, ✓ Free to start, etc.)
  - Primary CTA button (accent color, rounded-xl, shadow)
  - "Have a promo code?" link under CTA

Right (animated demo panel):
  A self-contained animated React component showing:
  - Act 1: Project card appears, user clicks "Generate Invoice"
  - Act 2: Invoice skeleton types field-by-field (client, amount, due date)
  - Act 3: Status: "Sent" ✓ green badge
  - Act 4: +7 days calendar tick → "Overdue" badge → AI chaser email types
  - Act 5: "Payment received £2,400" — confetti tick
  Loop repeats every 9s with fade transitions.

Animation rules:
  - Entry: opacity:0 + translateY(24px) → opacity:1 + translateY(0)
  - Easing: cubic-bezier(0.23, 1, 0.32, 1)
  - Duration: 400ms entrance, 200ms UI interactions
  - Stagger children: delay 60ms each
  - prefers-reduced-motion: skip all transforms

Below fold:
  - Stats row: 3 numbers (e.g. "8s", "£0 Fees", "2m setup")
  - How it works: numbered steps 1→2→3→4
  - Feature grid: 4 cards with Lucide icons
  - No fake testimonials or fabricated user counts

Chatbot FAB: fixed bottom-right, accent color circle 52px, z-50
Feedback link: footer, "Share feedback" → /api/feedback

Output: complete JSX + Tailwind. No placeholder images. Use Lucide icons.
```

---

## TEMPLATE 2 — Education / Quiz / Learning
*(quizbites, tutiq, speakiq, kwizzo)*

```
Build a gamified education SaaS hero as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
CTA: %%CTA_TEXT%%

Design tokens:
  BG: %%BG_HEX%%
  Accent: %%ACCENT_HEX%%
  Font: Archivo (headings) + Space Grotesk (body)

Layout: Split lg:grid-cols-2
Left:
  - Playful badge pill with emoji-free icon
  - H1 headline: action-oriented, max 8 words
  - Subhead: specific audience (e.g. "for curious minds, not classrooms")
  - Feature pills row (3): what's free, what's fast, what's unique
  - CTA button (large, accent)
  - Secondary CTA: ghost button

Right (animated quiz demo):
  - Input field shows topic being typed (typewriter): "Black holes"
  - 3 quiz cards slide in with question + 4 options
  - Correct answer lights up (green flash 150ms)
  - Score counter ticks up
  - New topic cycles in: "The French Revolution" → "Python decorators"
  - Each cycle: 3.5s
  - Card entry: scale(0.95)→scale(1) + opacity, 150ms ease

Mobile (lg:hidden):
  - 4-card snap-scroll strip showing sample quiz cards
  - Swipeable, snaps to each card

Stats row: 3 real product metrics (time-to-quiz, topics covered range, quiz length)

Animation: Framer Motion layoutId for card transitions, stagger 0.06s
Output: complete JSX. Use Lucide icons only (no emojis as icons).
```

---

## TEMPLATE 3 — Productivity / SaaS Tool
*(replydesk, draftcal, zerostaff, pdfideas)*

```
Build a clean productivity SaaS landing as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
CTA: %%CTA_TEXT%%

Design tokens:
  BG: %%BG_HEX%%  (light)
  Accent: %%ACCENT_HEX%%
  Font: Archivo (headings) + Space Grotesk (body)

Layout: Split lg:grid-cols-2
Left:
  - Small eyebrow label ("AI-Powered · Free to start")
  - H1: Speed + outcome ("Draft perfect replies in 4 seconds")
  - Subhead: one killer differentiator + who it's for
  - 3 feature pills with Lucide icons inline
  - CTA: full-width on mobile, auto on desktop
  - Trust line: "Works with Zendesk, Gmail, Freshdesk — no migration"

Right (animated product demo):
  - Show the BEFORE/AFTER workflow:
  - Ticket arrives (raw customer message in left pane)
  - "Drafting..." shimmer bar runs 1.5s
  - AI reply types word-by-word in right pane
  - Tone badge appears ("Empathetic" / "Formal" / "Friendly")
  - Edit button + "Send" button appear
  - Second ticket cycles showing different tone
  - Loop 6s per cycle

Navbar: sticky glass, logo left, links right, CTA button right
Footer: 3 columns (product/company/legal), no dead links
All links must point to real routes or # — never 404

Animation rules:
  - No transitions > 300ms for UI feedback
  - Button :active scale(0.97)
  - Intersection Observer for below-fold sections
Output: complete JSX + Tailwind. Lucide icons only.
```

---

## TEMPLATE 4 — AI Dev Tools / Agent Infrastructure
*(agenttrace, neuralos, rideflow, resumevault)*

```
Build a dark-theme AI infrastructure SaaS hero as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
CTA: %%CTA_TEXT%%

Design tokens:
  BG: %%DARK_BG_HEX%%  (dark navy/near-black)
  Accent: %%ACCENT_HEX%%  (cyan/indigo/violet)
  Font: Archivo (headings) + Space Grotesk (body) + JetBrains Mono (code snippets)

Layout: Split lg:grid-cols-2
Left:
  - Small code-style badge: `v2.0 • Open Beta`
  - H1: Technical + powerful, max 8 words
  - Subhead: exactly who this is for (e.g. "for teams running LLM agents in production")
  - Feature list with Lucide Check icons (3 items max)
  - Two CTAs: primary (accent) + ghost ("View docs →")
  - GitHub star badge if applicable

Right (terminal/trace animation):
  - Dark terminal panel, monospace font
  - Log stream scrolls: agent traces appear line by line with timestamps
  - Span visualization: nested bars showing trace depth
  - Error highlighted red → "Resolved" green flash
  - Real-time feel (new log every 400ms)
  - OR: For resumevault — resume fields populate line by line + ATS score ring fills

Background effect:
  - Subtle grid pattern (not dot-grid overlay)
  - One accent-color glow at top-center, opacity 0.08
  - No radial blobs

Dark mode standards:
  --card: rgba(255,255,255,0.04)
  --border: rgba(255,255,255,0.08)
  Text contrast 4.5:1 minimum against dark bg

Output: complete JSX + Tailwind. Lucide icons. No gradients on text unless accent only.
```

---

## TEMPLATE 5 — Health / Wellness / Personal
*(myvitals, voicejournal, aicoachlab)*

```
Build a calm, trustworthy health/wellness SaaS hero as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
CTA: %%CTA_TEXT%%

Design tokens:
  BG: %%LIGHT_TINT_HEX%%  (teal-tint or lavender-tint, not pure white)
  Accent: %%ACCENT_HEX%%
  Font: Archivo (headings) + Space Grotesk (body)

Style direction: Clean, calm, trustworthy. No hard angles. Rounded corners (24px cards).
No aggressive marketing language. Copy tone: empathetic, outcome-focused.

Layout: Split lg:grid-cols-2
Left:
  - Badge: "Personal · Free to start"
  - H1: Personal outcome ("Track your health in 60 seconds a day")
  - Subhead: What's unique + who for
  - 3 value props with Lucide icons (calm language)
  - CTA (accent, rounded-full pill style)
  - Privacy note: "Your data stays private"

Right (animated product UI):
  - myvitals: Health score ring fills 0→87% → metric cards count up (steps, sleep, mood)
  - voicejournal: Waveform bars pulse → transcript types → mood auto-detected → saved
  - aicoachlab: AI question appears → candidate answer types → feedback card slides in

No fake data. No testimonials with names unless real.
Chatbot FAB visible bottom-right. Feedback widget in footer.

Animation: Framer Motion spring({ stiffness:80, damping:20 }) for ring/score animations
Output: complete JSX + Tailwind. Lucide icons. Soft box-shadows (no hard drops).
```

---

## TEMPLATE 6 — Creative / Photo / Media
*(photorestore, pixelforge, clipforge)*

```
Build a creative/media SaaS hero as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
CTA: %%CTA_TEXT%%

Design tokens (photorestore):
  BG: #faf7f4 (warm cream)
  Accent: #c8894a (amber)
  Card bg: #ffffff
  Font: Playfair Display (headings, italic emphasis) + DM Sans (body)

Design tokens (pixelforge — dark):
  BG: #0e0e16 (near-black)
  Accent: #a78bfa (violet)
  Font: Archivo + Space Grotesk

Layout: Split lg:grid-cols-2
Left:
  - Badge pill
  - H1 with italic emphasis on key word (Playfair italic)
  - Subhead: benefit-first, specific (not generic "AI-powered")
  - Trust pills: ✓ Free, ✓ No account, ✓ High resolution
  - CTA: pill-shaped, large (rounded-full)

Right (before/after demo):
  - photorestore: Draggable before/after slider — old faded photo left, restored right
    Drag handle animates back and forth every 4s if user hasn't touched it
  - pixelforge: Game canvas preview animating, pixel art tiles rendering
  - Add "Drag to compare" label with Lucide hand icon

Below fold (photorestore):
  - "Try it now" section: full UploadZone inline — drop zone, click to upload
  - How it works: 3 steps (upload → AI processes → download)
  - Feature cards: 4 AI capabilities with icons

Output: complete JSX + Tailwind. For photorestore, Playfair Display import included.
```

---

## TEMPLATE 7 — Travel / Local / Discovery
*(roamplan, anylocal, homecanvas)*

```
Build a travel/local discovery SaaS hero as a Next.js React component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
CTA: %%CTA_TEXT%%

Design tokens:
  BG: %%TINT_HEX%%  (green-tint or ivory)
  Accent: %%ACCENT_HEX%%  (emerald or warm stone)
  Font: Archivo + Space Grotesk

Mood: Inviting, exploratory, warm. Images of real places (use Unsplash URL in placeholders).
Copy: Adventure-forward, specific destination/locale language.

Layout: Full-width hero with centered content OR split
  - roamplan: Full-width, translucent map background (CSS only), centered hero
  - anylocal: Split — left hero, right animated local business listing cards
  - homecanvas: Split — left hero, right interior room render image (generate via Higgsfield)

Animated right panel:
  - roamplan: Itinerary cards fly in for a destination ("Tokyo 5 days") → Day 1, Day 2...
  - anylocal: Business cards appear (café, salon, gym) with rating + CTA
  - homecanvas: Interior room image carousel with subtle Ken Burns zoom

No fake stats. Feature pills instead of fabricated user counts.
CTA: prominent, accent color, above fold.

Output: complete JSX + Tailwind. Real Unsplash image URLs as placeholder only.
```

---

## 21st.dev Integration Notes

When using **21st.dev** to generate components:
1. Use search: `nextjs hero split layout animated demo panel`
2. Filter: shadcn/ui + Tailwind + Framer Motion
3. Pick component closest to template above → copy code → adapt tokens
4. Always verify: no hardcoded colors (should use CSS vars), no fake data

Key 21st.dev prompt additions (append to any template above):
```
Additional requirements:
- Use shadcn/ui primitives where applicable (Button, Card, Badge, Input)
- All colors via CSS custom properties (var(--accent) etc), not hardcoded hex
- Export as named export, not default (for tree-shaking)
- TypeScript strict mode
- No `any` types
- Props interface exported
```

---

## protofast Integration
**protofast** is in the portfolio as a rapid prototyping tool. It should use this design system natively:

- `app/page.tsx`: Use TEMPLATE 4 (dark dev tools) — `#080d1a` + `#6366f1` indigo
- Right panel: Shows a code snippet being typed + preview renders in real time
- CTA: "Prototype in 60 seconds" → inline code editor opens on page (no redirect)
- Export: `/api/export/route.ts` — zips generated code, no auth needed for 1 download

```css
/* protofast tokens */
--background: #080d1a;
--foreground: #f8fafc;
--accent: #6366f1;
--accent-2: #818cf8;
--card: rgba(255,255,255,0.04);
--border: rgba(99,102,241,0.2);
```
