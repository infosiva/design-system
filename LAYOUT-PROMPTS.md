# Layout Prompt Library — Portfolio Design System
**Purpose:** Copy these prompts into Claude / 21st.dev / Canvas to generate production-ready hero/page layouts per project type.
Each prompt produces a Next.js App Router component with Tailwind CSS, Framer Motion, and the correct design tokens.

---

## §PROTO — HARD RULE: PROTOTYPE IN PROTOFAST FIRST (NO EXCEPTIONS)

**Before implementing ANY layout or skill demo in a real project:**

1. **Build it in protofast first** — `https://protofast.app` (or local `agents/protoforge/`)
2. Protofast = our own rapid prototyping tool. It IS the demo. Use it to validate:
   - Layout archetype looks right at 375px + 1280px
   - Animated demo panel works as intended
   - Skill output quality is acceptable
   - Color/accent not colliding with other portfolio sites
3. Only after protofast prototype passes visual check → implement in real project
4. **Protofast also promotes itself**: every skill used in a prototype = a demo page on protofast.app showing that skill in action. This is protofast's own marketing.

### Why this rule
- Prevents wasted work: 10 projects redesigned then redone because layout wrong
- Protofast gets real content from portfolio work (self-reinforcing)
- Forces validation before committing to a full project implementation

### Protofast prototype steps
```
1. cd agents/protoforge (or open https://protofast.app)
2. Run the Open Design skill for the layout: /swiss-creative-mode-template OR /field-notes-editorial-template etc
3. Paste generated HTML into protofast inline editor
4. Screenshot 375px + 1280px
5. If looks good → copy to real project + commit
6. Protofast auto-publishes as demo at /demos/[layout-name]
```

---

## HOW TO USE

1. Pick the template matching your project category below (T1–T18)
2. **Build prototype in protofast first** (see §PROTO above)
3. Replace `%%` placeholders with real project values
4. Paste into **Claude canvas** (`claude.ai/design`) or **21st.dev** prompt box — OR use the matching Open Design skill directly
5. Copy the output HTML/JSX into your project's `app/page.tsx` or `components/Hero.tsx`
6. Run the skill pipeline for that template (see MASTER.md Layout→Skills Map)
7. Run `/ui-ux-pro-max` quality check + Playwright screenshots

### Open Design editorial templates (NEW — T8–T17)
These skills in `~/.claude/open-design/skills/` unlock archetypes beyond split layout:
| Skill | Archetype |
|-------|-----------|
| `swiss-creative-mode-template` | T8 Swiss Editorial Grid |
| `digits-fintech-swiss-template` | T8 variant — black/lime data story |
| `editorial-burgundy-principles-template` | T12 Magazine/Manifesto |
| `field-notes-editorial-template` | T12 Magazine — serif + pastel insight cards |
| `after-hours-editorial-template` | T10 Cinematic Full-Bleed dark |
| `shader-dev` | T14 Generative Art WebGL |
| `algorithmic-art` | T14 Generative Art CSS/canvas |
| `threejs` | T14 3D hero scene |
| `gsap-scrolltrigger` | T10/T12/T17 scroll-driven storytelling |
| `d3-visualization` | T15 Live Data Hero |
| `gsap-timeline` | T11 Typewriter Terminal sequences |

### HARD RULE — AI-tool layer mandatory on every template (added 2026-06-18)

**Every template prompt (T1–T18) must specify which AI tool generates its hero visual/demo asset, not just which Open Design skill lays out the markup.** Markup-only output without a real generated asset = incomplete. Check this table before running any template:

| Template need | AI tool | Why |
|---|---|---|
| Photographic/illustrative hero image (T6, T7, T10, T12) | Gemini Nano Banana via `/image-gen` (primary) → fal.ai Flux fallback | Free tier, best prompt adherence, native edit for before/after (T6) |
| Structured wireframe before any new archetype | Google Stitch (manual, stitch.withgoogle.com) | Skeleton before visual direction — required unless template already approved in this file |
| Competitive/research gap before a new category template | NotebookLM (manual) | Synthesize competitor specs before inventing a layout |
| Video/motion background (T10 Cinematic) | Veo (manual) or `gsap-scrolltrigger` for code-driven motion | Veo for filmed-feel loops; GSAP for code-driven scroll motion — pick based on whether a literal video asset is needed |
| Generative/algorithmic background (T14) | `shader-dev` / `algorithmic-art` / `threejs` — code-generated, no external AI image call needed | These ARE the AI-tool layer for T14; don't also call Nano Banana here |
| Data-driven hero (T15) | `d3-visualization` — real data, no generated image | Chart IS the asset |
| Quick internal prototyping of a new template before committing it to this file | Opal (manual, opal.withgoogle.com) | No-code mockup pass — optional, use when unsure a new archetype works before writing the full prompt spec |

**Rule: when adding or revising ANY template in this file, fill in its AI-tool row above (or note "code-generated, no external image needed" for T14/T15-style templates). A template with a visual/photographic need and no AI-tool line = incomplete, redo it.**

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

---

## TEMPLATE 8 — Swiss Editorial / Data Grid
*(worldtrends, mandirates)*

```
Build a Swiss editorial data-hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
Tagline: %%TAGLINE%%
BG: #0a0a0a (near-black) or #f9fafb (white)
Accent: #dc2626 (red/worldtrends) or #ca8a04 (yellow/mandirates)
Font: Inter or Space Grotesk — heavy weight, strict grid

Layout: 12-column strict grid, NO split hero
- Full-width headline in large type (clamp 3rem→6rem), left-aligned
- Beneath: horizontal rule, then 3–4 large metric cards in a row
- Each metric card: huge number (clamp 2rem→4rem), 1-line label, subtle border
- Below fold: data table or chart (D3) showing live data

Right panel: NONE — full-width layout, data IS the hero
Interaction: Numbers count up on load (0→value, 800ms, ease-out)

Open Design skill: /swiss-creative-mode-template OR /digits-fintech-swiss-template
Additional skills: /d3-visualization, /gsap-core (counter animation)
Output: complete JSX + Tailwind. Monospace for numbers. No illustrations.
```

---

## TEMPLATE 9 — Bento Grid Dashboard
*(meetscribe, weekendai, zerostaff)*

```
Build a bento grid hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: #ffffff white
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk

Layout: Above-fold bento mosaic (CSS grid, unequal cells)
- Large cell (col-span-2): hero headline + CTA
- Medium cell: animated product preview (mini version of core feature)
- Small cells (3): feature pills / stats / social proof snippets
- All cells: rounded-2xl, border, subtle shadow, hover lifts 4px

No traditional split. No right-panel. Grid IS the layout.

Interaction:
- Cells stagger-enter: scale(0.96)→1 + opacity, 60ms delay each
- Hover: translateY(-4px) + shadow deepens, 150ms ease
- Mini product preview in large cell animates on loop

Open Design skill: /shadcn-ui (card primitives) + /ui-skills
Additional skills: /animate, /transitions-dev (card-resize pattern)
Output: complete JSX + Tailwind. shadcn Card primitives. No fake data.
```

---

## TEMPLATE 10 — Cinematic Full-Bleed
*(clipforge, nammatamil, ninjapa)*

```
Build a cinematic full-bleed hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: Video or generative canvas background, near-black overlay
Accent: %%ACCENT_HEX%%
Font: Archivo Black (display) + Space Grotesk (body)

Layout: Full-viewport hero, centered content on dark overlay
- BG: autoplay muted loop video (clipforge: editing reel) OR CSS generative animation
- Overlay: rgba(0,0,0,0.55)
- Center: badge → H1 (large, white) → subhead → CTA row
- Below: scroll indicator ("↓ scroll") with bounce animation

Scroll interaction:
- On scroll: video scrubs OR parallax bg shifts
- Each section reveals with gsap-scrolltrigger pin+scrub

Open Design skill: /after-hours-editorial-template
Additional skills: /gsap-scrolltrigger, /fal-kling-o3 (generate hero video)
Output: complete JSX. No static placeholder images — use CSS animation fallback if no video.
```

---

## TEMPLATE 11 — Typewriter Terminal (Centered)
*(neuralos, ninjapa, rideflow)*

```
Build a centered typewriter terminal hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: #060d1a deep dark
Accent: %%ACCENT_HEX%% (cyan/indigo/violet)
Font: JetBrains Mono (terminal lines) + Archivo (headline above)

Layout: Single centered column, max-w-2xl, vertically centered in viewport
- Above: small accent-colored label ("AI Infrastructure" etc)
- H1: 2-line headline, white, large
- Terminal block (below headline):
  - Dark card with monospace font
  - Lines appear one by one: "$ initializing agent..." → "✓ connected" → "$ running task..."
  - Cursor blink after last line
  - Loop after 4s pause
- CTA button fades in after terminal sequence completes

NO split. NO right panel. Sequence IS the demo.

Open Design skill: /interface-design (OD) for shell structure
Additional skills: /gsap-timeline (sequence control), /animate (fade/cursor)
Output: complete JSX. JetBrains Mono via Google Fonts. Cursor blink via CSS animation.
```

---

## TEMPLATE 12 — Magazine Editorial
*(nammatamil, bookingcall)*

```
Build a magazine editorial hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: #fffbf5 warm paper OR #1a0a00 dark editorial
Accent: %%ACCENT_HEX%%
Font: Playfair Display (serif headlines) + DM Sans (body)

Layout: Editorial newspaper column feel
- Top: thin horizontal rule + date/category label (serif, small)
- H1: Extra-large serif headline, 2-3 lines, left-aligned
- Subhead: italic serif, muted color
- Below H1: 2-column text grid + image/card panel (asymmetric)
- Feature card grid: masonry of topic/service cards, stagger-reveal on scroll

Interaction:
- Scroll reveal: cards slide up with stagger (gsap-scrolltrigger)
- Image hover: subtle Ken Burns zoom within card

Open Design skill: /field-notes-editorial-template OR /editorial-burgundy-principles-template
Additional skills: /gsap-scrolltrigger, /emil-design-eng
Output: complete JSX. Playfair Display import. No generic stock photos.
```

---

## TEMPLATE 13 — Floating Cards / Orbit
*(aicoachlab, weekendai, playsmart)*

```
Build a floating cards orbit hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: %%BG_HEX%% (light)
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk

Layout: Center headline, feature cards float at angles around it
- Center: H1 + subhead + CTA (z-10, above cards)
- Surrounding: 4–6 feature/topic cards at randomised rotation (-8deg to +8deg)
  - Cards have subtle drop shadow, rounded-2xl
  - Each shows a mini product snippet (topic, metric, action)
- Cards drift with slow CSS animation (translateY: -8px→8px, 3–5s, alternate)

Hover: Card snaps to 0 rotation + lifts (scale 1.04), others dim to 0.7 opacity

Open Design skill: /design-shotgun (direction) + /algorithmic-art (floating math)
Additional skills: /animate (drift keyframes), /emil-design-eng
Output: complete JSX. CSS custom properties for drift timing. prefers-reduced-motion respected.
```

---

## TEMPLATE 14 — Generative Art Background
*(pixelforge, playsmart, clipforge)*

```
Build a generative art hero as a Next.js component with Tailwind CSS + canvas/WebGL.

Project: %%PROJECT_NAME%%
BG: Procedurally generated — NOT static color
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk

Layout: Full-viewport canvas behind content
- Canvas: WebGL shader OR 2D canvas with particle/noise pattern
  - pixelforge: pixel grid pattern that shuffles colors (game aesthetic)
  - playsmart: particle field responding to mouse (sports energy)
  - clipforge: film grain + color shift noise
- Overlay: semi-transparent dark scrim
- Content: centered headline + CTA (same as T10 but bg is generative not video)

Interaction: Canvas reseeds on each visit (Math.random seed). Mouse moves shift particles.

Open Design skill: /shader-dev (WebGL) OR /algorithmic-art (canvas 2D)
Additional skills: /animate, /threejs (if 3D needed)
Output: complete JSX. Canvas/WebGL in useEffect. SSR-safe (typeof window check). prefers-reduced-motion: static bg fallback.
```

---

## TEMPLATE 15 — D3 Live Data Hero
*(trackwealth, mandirates, agenttrace)*

```
Build a D3 data-hero as a Next.js component with Tailwind CSS + D3.js.

Project: %%PROJECT_NAME%%
BG: %%BG_HEX%%
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk + monospace for axes

Layout: Split lg:grid-cols-2 BUT right panel = live D3 chart (not product mockup)
Left:
  - H1 outcome headline
  - Subhead: specific data insight the tool surfaces
  - CTA

Right (D3 chart):
  - trackwealth: animated line chart (portfolio value over time), area fill, tooltip
  - mandirates: bar chart (mandi commodity prices), bars animate in sequentially
  - agenttrace: horizontal gantt/timeline (agent spans), bars expand left→right

Chart rules:
  - Animates in on mount (paths draw, bars grow)
  - Updates every 5s with new seed data (simulates live)
  - Accessible: aria-label on SVG, role="img"
  - Accent color for primary series, muted for others

Open Design skill: /d3-visualization
Additional skills: /gsap-core (chart animation), /animate
Output: complete JSX. D3 in useEffect, SSR-safe. No recharts/chart.js — raw D3 only.
```

---

## TEMPLATE 16 — Full-Width Input Hero
*(speakiq, resumevault, pdfideas)*

```
Build a full-width input hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: %%BG_HEX%% (light)
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk

Layout: Single centered column, input IS the hero
- H1: small, above input (2-3 words, outcome)
- Giant input/textarea: full width, large font (1.25rem), rounded-2xl, shadow
  - Placeholder cycles through sample inputs (typewriter, 3s each)
  - speakiq: "Type a word in any language..."
  - resumevault: "Paste your resume here..."
  - pdfideas: "Drop your PDF or paste text..."
- Submit button: right side of input or below, accent color
- Result area: appears below input inline, slides down with smooth height animation

Key UX rules:
  - Core action on this page, zero auth
  - Real API call on submit, real response shown
  - Loading: shimmer skeleton in result area
  - Error: inline, never toast

Open Design skill: /frontend-design (OD) for page shell + /shadcn-ui for input primitives
Additional skills: /transitions-dev (height animation), /animate
Output: complete JSX. Input must be accessible (label, aria). No redirect on submit.
```

---

## TEMPLATE 17 — Asymmetric Split (60/40)
*(quizbytesdaily, replydesk, draftcal)*

```
Build an asymmetric split hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: %%BG_HEX%%
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk

Layout: lg:grid-cols-[3fr_2fr] (60/40) OR lg:grid-cols-[2fr_3fr] (40/60)
- quizbytesdaily: quiz card DOMINANT right (3fr), minimal left (2fr)
- replydesk: product demo dominant left (3fr), copy right (2fr)
- draftcal: calendar dominant left (3fr), headline right (2fr)

Dominant side:
  - Contains the animated product demo — large, takes visual weight
  - Sticky on scroll while minor side scrolls through copy

Minor side:
  - H1 (smaller than usual — not competing with dominant panel)
  - 2-line subhead
  - CTA + feature pills
  - On scroll: reveals 3 key benefits sequentially

Open Design skill: /ui-skills + /frontend-design (OD)
Additional skills: /gsap-scrolltrigger (sticky dominant panel), /animate, /transitions-dev
Output: complete JSX. CSS sticky for dominant panel. Mobile: full-width stacked (dominant first).
```

---

## TEMPLATE 18 — AI-Generated Live Visual Hero
*(new archetype — for projects whose core value IS a generated visual: image/photo tools, design tools, AI art/avatar products)*

```
Build an AI-generated visual hero as a Next.js component with Tailwind CSS.

Project: %%PROJECT_NAME%%
BG: %%BG_HEX%%
Accent: %%ACCENT_HEX%%
Font: Archivo + Space Grotesk

Layout: Single centered column OR split lg:grid-cols-2 (pick split if there's real copy to carry; centered if the generated visual is the entire pitch)
- H1: outcome-first, ≤8 words
- Hero visual slot: real image generated via Gemini Nano Banana (`lib/geminiImage.ts`, see ~/.claude/skills/image-gen/SKILL.md) on page load using a fixed seed prompt specific to the product
  - Falls back to fal.ai Flux/schnell if GEMINI_API_KEY missing or call fails
  - NEVER a static stock photo or illustration placeholder — must be a real API-generated image, regenerated periodically (e.g. daily cron or on-demand regenerate button)
- Below/beside visual: 1-line caption describing what was generated + "Generate yours →" CTA leading into the zero-auth core action
- Optional: small thumbnail strip of 3-4 previously generated real outputs (rotating gallery, not fake)

Key UX rules:
  - The generated image on this page must be REAL, not a hardcoded asset — this is the whole point of T18
  - Core action (generate own version) must work with zero auth, gated only on save/export
  - Loading state while generating: skeleton shimmer in the exact visual slot, no full-page spinner

AI tool: Gemini Nano Banana via /image-gen (primary), fal.ai Flux/schnell (fallback) — this IS the template's defining feature, not an optional layer
Open Design skill: /frontend-design (OD) for shell + /shadcn-ui for input/regenerate controls
Additional skills: /animate (image fade-in on load), /transitions-dev (loading→result swap)
Output: complete JSX + the actual /api/hero-image route calling geminiGenerateImage. No fake images, no stock placeholders.
```

---

## FULL 33-SITE ASSIGNMENT (canonical — check here before any redesign)

| Project | Template | Bg | Accent | Animated Panel | Key differentiator |
|---------|----------|----|--------|---------------|-------------------|
| invoicemint | T1 Finance | `#f8fafc` | `#059669` | Invoice fields type → sent badge | Green finance light |
| trackwealth | T15 D3 Data | `#0b1420` | `#059669` | Live portfolio line chart | Chart IS the hero (was amber, switched 2026-08-04 to category-correct emerald) |
| billslash | T1 Finance | `#f0fdf4` | `#16a34a` | Bill comparison slide | Slightly greener than invoicemint |
| quizbites | T2 Quiz | `#fefce8` | `#ca8a04` | Cards flip, score ticks | Yellow-tint, distinct from tutiq |
| tutiq | T2 Quiz | `#f0f9ff` | `#0284c7` | Lesson cards, XP bar | Sky-blue, teacher-focused |
| kwizzo | T2 Quiz | `#0f0f23` | `#f59e0b` | Dark quiz, amber cards | Only dark quiz template |
| speakiq | T16 Input | `#fdf4ff` | `#9333ea` | Language input → pronunciation | Input IS hero |
| replydesk | T17 Asymmetric | `#f8f9ff` | `#4f46e5` | Reply drafter dominant left | 60/40 product-dominant |
| draftcal | T17 Asymmetric | `#fffbf5` | `#d97706` | Calendar dominant | Calendar takes visual weight |
| zerostaff | T9 Bento | `#ffffff` | `#2563eb` | Staff role cards mosaic | Bento grid, no split |
| pdfideas | T16 Input | `#fafafe` | `#6366f1` | PDF drop → ideas stream | Input hero, indigo |
| agenttrace | T15 D3 | `#0c111a` | `#22d3ee` | Trace timeline gantt | Chart = span visualization |
| neuralos | T11 Terminal | `#080d1a` | `#6366f1` | Centered typewriter terminal | No split, sequence only |
| rideflow | T4 Terminal | `#080f1a` | `#3b82f6` | Route log stream | Side split dark |
| resumevault | T16 Input | `#0c0f1a` | `#7c3aed` | Paste resume → ATS ring | Dark input hero, violet |
| myvitals | T5 Health | `#f0fdfa` | `#0d9488` | Score ring 0→87% | Calm teal, ring animation |
| voicejournal | T5 Health | `#f5f0ff` | `#8b5cf6` | Waveform → transcript | Lavender, voice-specific |
| aicoachlab | T13 Floating | `#fff7ed` | `#ea580c` | Coach topic cards orbit | Floating cards, orange |
| photorestore | T6 Before/After | `#faf7f4` | `#c8894a` | Drag slider auto-sweeps | Before/after, cream |
| pixelforge | T14 Generative | `#0e0e16` | `#a78bfa` | Pixel grid shuffles colors | WebGL canvas bg |
| clipforge | T10 Cinematic | `#0a0a0f` | `#e879f9` | Video bg, editorial overlay | Full-bleed, fuchsia |
| roamplan | T7 Travel | `#f0fdf4` | `#059669` | Itinerary cards fly in | Green travel |
| anylocal | T7 Travel | `#fffbf5` | `#ea580c` | Business listing cards | Warm orange local |
| homecanvas | T7 Travel | `#fffdf7` | `#78716c` | Higgsfield interior image | Ivory, stone accent |
| worldtrends | T8 Swiss | `#f9fafb` | `#dc2626` | News metrics count up | Swiss editorial, red |
| mandirates | T15 D3 | `#fffbf5` | `#ca8a04` | Live commodity price bars | D3 bar chart hero |
| bookingcall | T12 Magazine | `#fffbf5` | `#f97316` | Editorial local service grid | Serif, magazine |
| nammatamil | T12 Magazine | `#1a0a00` | `#f97316` | Dark editorial cinematic | Dark magazine, Tamil |
| meetscribe | T9 Bento | `#f8fafc` | `#0ea5e9` | Meeting notes mosaic | Bento, sky accent |
| weekendai | T9 Bento | `#fff7ed` | `#f59e0b` | Weekend activity cards | Bento, warm amber |
| playsmart | T14 Generative | `#0f0f23` | `#22c55e` | Sports particle field | WebGL, green sports |
| quizbytesdaily | T17 Asymmetric | `#f0f9ff` | `#7c3aed` | Daily quiz card dominant | 40/60 quiz-dominant |
| ninjapa | T11 Terminal | `#060d1a` | `#22d3ee` | AI coding prompt types | Centered terminal, cyan |

