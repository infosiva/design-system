# 15 Unique Layout Templates — Portfolio Design System
**Created:** 2026-06-17  **Status:** ACTIVE
**Rule:** Every project gets ONE template. No two projects on same template share same color palette.

---

## Template Map — 15 layouts × 33 projects

| # | Template Name | Visual Identity | Projects |
|---|--------------|----------------|----------|
| L1 | **Split Hero + Live Demo** | Classic 50/50, animated product simulation right | invoicemint, billslash |
| L2 | **Gamified Card Arena** | Quiz cards flip/stack center-stage, score HUD overlay | quizbites, tutiq, kwizzo |
| L3 | **Full-Width Command Bar** | Giant input hero, results stream below inline | speakiq, pdfideas, resumevault |
| L4 | **Bento Mosaic** | Unequal grid cells, each a live widget/metric | zerostaff, meetscribe, weekendai |
| L5 | **Swiss Editorial Grid** | 12-col strict grid, huge numbers, horizontal rules | worldtrends, mandirates |
| L6 | **Cinematic Full-Bleed** | Video/generative bg, centered text on dark overlay | clipforge, nammatamil |
| L7 | **Terminal Sequence** | Centered typewriter, command-line aesthetic, no split | neuralos, ninjapa, rideflow |
| L8 | **Magazine Longform** | Serif headlines, editorial columns, masonry cards | bookingcall, anylocal |
| L9 | **Floating Card Orbit** | Cards at random angles drift around center headline | aicoachlab, weekendai, playsmart |
| L10 | **D3 Data Canvas** | Live interactive chart IS the hero, no mockup | trackwealth, agenttrace |
| L11 | **Before/After Theater** | Drag-reveal slider, auto-sweeps, side-by-side proof | photorestore |
| L12 | **Asymmetric Product Stage** | 60/40 or 40/60, dominant panel sticky on scroll | replydesk, draftcal, quizbytesdaily |
| L13 | **Generative Art Backdrop** | WebGL/Canvas procedural bg, content floats above | pixelforge, playsmart |
| L14 | **Scroll-Driven Story** | Full-page sections pin+scrub, narrative unfolds on scroll | roamplan, homecanvas |
| L15 | **Dashboard Preview** | Mini working dashboard embedded in hero, live data | myvitals, voicejournal |

---

## L1 — Split Hero + Live Demo
**Visual:** Classic balanced split. Left = copy + CTA. Right = fully animated product UI cycling through real workflows.

**What makes it unique:** Right panel is a COMPLETE product simulation — not a screenshot, not an illustration. Real UI components animating through a user workflow loop.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR — sticky glass                                       │
├──────────────────────┬─────────────────────────────────────┤
│                      │                                      │
│  Badge pill          │   ┌──────────────────────────┐      │
│                      │   │ Animated Product Demo     │      │
│  H1 (≤8 words)      │   │                          │      │
│  Subhead             │   │ Act 1: Card appears      │      │
│                      │   │ Act 2: Fields type        │      │
│  ✓ Feature pill      │   │ Act 3: Status badge ✓    │      │
│  ✓ Feature pill      │   │ Act 4: Result confetti   │      │
│  ✓ Feature pill      │   │                          │      │
│                      │   │ Loop every 8-10s         │      │
│  [Primary CTA]       │   └──────────────────────────┘      │
│  "promo code?" link  │                                      │
│                      │                                      │
├──────────────────────┴─────────────────────────────────────┤
│ Stats row: 3 metrics │ How it works: 1→2→3→4               │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /frontend-design (OD) → /design-html → /ui-ux-pro-max
→ /21st-registry → /emil-design-eng
→ /animate + /transitions-dev (card-resize, badge patterns)
→ /design-loop --domain=finance
→ /fixing-accessibility + /fixing-metadata
```

**Key skills unique to L1:**
- `/transitions-dev` — 12 production patterns for the demo panel state changes
- `/frontend-design` (OD) — marketing split layout generation

**Animation personality:** Smooth, professional. Spring stiffness 80, damping 20. Demo panel loops with cross-fade between acts.

**Projects:** invoicemint (`#f0fdf4` + `#059669`), billslash (`#f8fafc` + `#16a34a`)

---

## L2 — Gamified Card Arena
**Visual:** Quiz/learning cards are the HERO — not pushed to a side panel. Cards stack, flip, score in the center of the viewport. Headline wraps around the card stack. Score HUD in corner.

**What makes it unique:** Cards aren't in a side panel — they ARE the layout. Headline and CTA orbit around the card stack. Feels like opening a game, not a SaaS tool.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│        H1 (arced or split around cards)                     │
│                                                             │
│    ┌──────────────────────────────┐     Score: 3/5          │
│    │                              │     ┌─────┐             │
│    │     Quiz Card                │     │ HUD │             │
│    │     ──────────               │     │     │             │
│    │     ○ Option A               │     │ XP  │             │
│    │     ● Option B  ← correct!   │     │ bar │             │
│    │     ○ Option C               │     └─────┘             │
│    │     ○ Option D               │                         │
│    │                              │                         │
│    └──────────────────────────────┘                         │
│         ↑ stacked cards behind (offset 4px, rotated ±2°)   │
│                                                             │
│        Subhead + [Start Quiz CTA]                           │
│                                                             │
├────────────────────────────────────────────────────────────┤
│  Topic carousel: scrolling pill chips (Science, History..)  │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /design-shotgun (3 gamified directions)
→ /design-html → /ui-ux-pro-max
→ /shadcn-ui (OD) (card primitives)
→ /emil-design-eng
→ /animate (card flip spring, stack offset)
→ /transitions-dev (card-resize, badge, number-pop patterns)
→ /gsap-timeline (score counter, XP bar fill)
→ /design-loop --domain=default
→ /fixing-accessibility
```

**Key skills unique to L2:**
- `/gsap-timeline` — score counter + XP bar orchestrated sequence
- `/shadcn-ui` (OD) — card primitives for quiz cards
- Card stack physics: `rotate(calc(var(--i) * 2deg))` + `translateY(calc(var(--i) * -4px))`

**Animation personality:** Playful, bouncy. Spring stiffness 120, damping 14. Cards have slight overshoot on flip. Correct answer: green flash 150ms + confetti burst. Score: number-pop pattern from `/transitions-dev`.

**Projects:** quizbites (`#fefce8` + `#ca8a04`), tutiq (`#f0f9ff` + `#0284c7`), kwizzo (`#0f0f23` + `#f59e0b`)

---

## L3 — Full-Width Command Bar
**Visual:** The input IS the hero. Massive search/input bar dominates the viewport. Everything else is secondary. Results stream below inline — no redirect, no new page.

**What makes it unique:** No split layout. No side panel. One giant input that screams "type something NOW." Placeholder cycles through example queries. Results appear inline with smooth height animation.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR (minimal — logo + 2 links only)                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│              Small H1 (2-3 words above input)               │
│              Subhead: one line, muted                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │  ░░ Type a word in any language...  ░░    [Go →]     │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│        ↑ full-width, large font (1.5rem), rounded-2xl      │
│        ↑ placeholder typewriter cycles 3 examples           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Results stream here (slides down with height anim)  │  │
│  │  Real API response, shimmer skeleton while loading   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  "Try: Black holes • Python decorators • French Revolution" │
│         ↑ clickable suggestion chips                        │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /frontend-design (OD) + /shadcn-ui (OD) (input primitives)
→ /design-html → /ui-ux-pro-max
→ /21st-registry (input component)
→ /emil-design-eng
→ /animate (result area height spring)
→ /transitions-dev (text-swap for placeholder, panel expand)
→ /design-loop
→ /fixing-accessibility (input label, aria-live for results)
```

**Key skills unique to L3:**
- `/shadcn-ui` input primitives — never hand-roll the search bar
- `/transitions-dev` text-swap pattern — cycling placeholder
- Height animation spring for inline results

**Animation personality:** Minimal, focused. Input has subtle glow on focus (`box-shadow: 0 0 0 4px var(--accent-dim)`). Results slide down with `spring({ stiffness: 100, damping: 22 })`. Suggestion chips fade-up stagger 60ms.

**Projects:** speakiq (`#fdf4ff` + `#9333ea`), pdfideas (`#fafafe` + `#6366f1`), resumevault (`#0c0f1a` + `#7c3aed`)

---

## L4 — Bento Mosaic
**Visual:** No split. No single hero. A GRID of unequal cells — each cell is a live mini-widget. The mosaic IS the product tour. One large cell has the headline + CTA.

**What makes it unique:** Every cell is alive — mini charts, counters, status indicators, preview cards. Like a dashboard promoted to the landing page. Zero wasted space.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┬───────────┬───────────┐          │
│  │                      │           │           │          │
│  │  H1 + Subhead        │  Mini     │  Counter  │          │
│  │  + CTA button        │  chart    │  widget   │          │
│  │                      │  (live)   │  (ticks)  │          │
│  │  (col-span-2)        │           │           │          │
│  ├──────────────────────┼───────────┴───────────┤          │
│  │                      │                       │          │
│  │  Feature preview     │  Status card          │          │
│  │  (animated mini UI)  │  + social proof       │          │
│  │                      │                       │          │
│  ├──────────┬───────────┼───────────────────────┤          │
│  │          │           │                       │          │
│  │  Stat    │  Stat     │  CTA card (accent)    │          │
│  │  card    │  card     │  "Get started free"   │          │
│  │          │           │                       │          │
│  └──────────┴───────────┴───────────────────────┘          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /shadcn-ui (OD) (Card, Badge primitives)
→ /ui-skills (OD) (grid patterns)
→ /design-html → /ui-ux-pro-max
→ /21st-registry (bento grid component)
→ /emil-design-eng
→ /animate (stagger enter: scale(0.96)→1, 60ms each)
→ /transitions-dev (card-resize for responsive cells)
→ /d3-visualization (mini chart in one cell)
→ /design-loop
→ /fixing-accessibility
```

**Key skills unique to L4:**
- `/ui-skills` (OD) — grid layout patterns for unequal cells
- `/d3-visualization` — mini inline chart widget
- `/transitions-dev` card-resize — cells reflow smoothly on mobile

**Animation personality:** Stagger cascade. Each cell enters with `scale(0.96) → 1 + opacity`, stagger 60ms. Mini widgets have internal loops (counter ticks, chart updates). Hover: cell lifts 4px + shadow deepens.

**Projects:** zerostaff (`#ffffff` + `#2563eb`), meetscribe (`#f8fafc` + `#0ea5e9`), weekendai (`#fff7ed` + `#f59e0b`)

---

## L5 — Swiss Editorial Grid
**Visual:** Strict 12-column grid. MASSIVE numbers. Thin horizontal rules. No images. Data speaks. Like a financial newspaper front page.

**What makes it unique:** Zero illustrations. Zero demo panels. Pure typography + data. Numbers are the visual weight. Clean as a Swiss watch.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR (minimal, small text)                                │
├────────────────────────────────────────────────────────────┤
│ ────────────────────────────────────────────────────────── │
│                                                             │
│  WORLD TRENDS                          June 17, 2026       │
│  ═══════════════════════════════════════════════            │
│                                                             │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │            │            │            │            │     │
│  │  42.8M     │  +12.4%    │  187        │  3.2s      │     │
│  │  articles  │  today     │  countries  │  avg read  │     │
│  │            │            │            │            │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
│  ────────────────────────────────────────────────────────── │
│                                                             │
│  [Live data table or D3 chart below fold]                   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /swiss-creative-mode-template (OD) ★ primary skill
→ /digits-fintech-swiss-template (OD) ★ data number styling
→ /design-html → /ui-ux-pro-max
→ /d3-visualization (live chart below fold)
→ /gsap-core (number count-up animation)
→ /emil-design-eng
→ /design-loop --domain=finance
→ /fixing-accessibility + /fixing-metadata
```

**Key skills unique to L5:**
- `/swiss-creative-mode-template` (OD) — strict Swiss grid generation
- `/digits-fintech-swiss-template` (OD) — number-first fintech styling
- `/gsap-core` — counter animation (0 → 42.8M in 800ms ease-out)

**Animation personality:** Restrained, precise. Numbers count up with `ease-out`. Horizontal rules draw left→right. No bounce, no overshoot. Monospace for numbers (Tabular figures).

**Projects:** worldtrends (`#f9fafb` + `#dc2626`), mandirates (`#fffbf5` + `#ca8a04`)

---

## L6 — Cinematic Full-Bleed
**Visual:** Full-viewport video or generative background. Dark overlay. White text centered. Feels like a movie trailer, not a SaaS landing page. Scroll reveals chapters.

**What makes it unique:** No grid. No cards. No side panel. Full immersion. Background is ALIVE — either a real video loop or a generative CSS animation. Content reveals on scroll with pin+scrub.

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓              │
│        ▓▓  VIDEO / GENERATIVE BG (loop)  ▓▓▓              │
│        ▓▓                                ▓▓▓              │
│        ▓▓       BRAND NAME               ▓▓▓              │
│        ▓▓                                ▓▓▓              │
│        ▓▓    Tagline in large white       ▓▓▓              │
│        ▓▓                                ▓▓▓              │
│        ▓▓      [CTA Button]              ▓▓▓              │
│        ▓▓                                ▓▓▓              │
│        ▓▓      ↓ scroll                  ▓▓▓              │
│        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓              │
│                                                             │
│ SECTION 2 (pinned): Feature reveals on scroll               │
│ SECTION 3 (pinned): Proof/demo section                      │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /after-hours-editorial-template (OD) ★ cinematic dark layout
→ /cinematic-flow ★ hero section design
→ /design-html → /ui-ux-pro-max
→ /fal-kling-o3 (generate hero video) OR /shader-dev (generative bg)
→ /gsap-scrolltrigger ★ (pin+scrub scroll chapters)
→ /animate
→ /emil-design-eng
→ /remotion (code-driven video fallback)
→ /design-loop
→ /fixing-accessibility + /fixing-motion-performance
```

**Key skills unique to L6:**
- `/after-hours-editorial-template` (OD) — dark cinematic layout base
- `/cinematic-flow` — hero section design philosophy
- `/gsap-scrolltrigger` — scroll-driven chapter reveals (pin + scrub)
- `/fal-kling-o3` — AI-generated hero background video
- `/remotion` — fallback code-driven video if no fal.ai

**Animation personality:** Dramatic, slow. Transitions 600ms+. Parallax depth. Text fades in from deep below. Scroll-driven, not time-driven. Dark overlay 55%.

**Projects:** clipforge (`#0a0a0f` + `#e879f9`), nammatamil (`#1a0a00` + `#f97316`)

---

## L7 — Terminal Sequence
**Visual:** Centered terminal window. No split. Commands type one by one. Cursor blinks. Feels like watching a live coding session. Product IS the terminal.

**What makes it unique:** Entire hero is a terminal — dark card, monospace, prompt symbols. Lines type in real-time with realistic delays. No images, no illustrations, no side content.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR (dark glass)                                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│            AI Infrastructure for Production                 │
│                  (small accent label above)                  │
│                                                             │
│    ┌──────────────────────────────────────────────┐         │
│    │ ● ● ●  terminal                              │         │
│    │──────────────────────────────────────────────│         │
│    │ $ omp agent deploy --model claude-sonnet     │         │
│    │ ✓ Agent initialized                          │         │
│    │ ✓ Connected to production cluster            │         │
│    │ $ Running task: analyze-codebase              │         │
│    │   ├─ scan: 142 files                         │         │
│    │   ├─ trace: 3 critical paths                 │         │
│    │   └─ report: generated in 2.1s               │         │
│    │ $ _                                          │         │
│    └──────────────────────────────────────────────┘         │
│                                                             │
│          [Get Started] [View Docs →]                        │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /interface-design (OD) ★ terminal/shell structure
→ /design-html → /ui-ux-pro-max
→ /gsap-timeline ★ (line-by-line type sequence)
→ /animate (cursor blink, fade-in CTA after sequence)
→ /emil-design-eng
→ /design-loop --domain=default
→ /fixing-accessibility
```

**Key skills unique to L7:**
- `/interface-design` (OD) — shell/terminal structure
- `/gsap-timeline` — orchestrated type sequence (line delays, checkmarks appear)
- JetBrains Mono font, cursor blink via CSS `@keyframes blink`

**Animation personality:** Mechanical, precise. Each line types at ~40ms/char. Checkmarks appear with 100ms flash. Cursor blinks 530ms interval. CTA fades in 400ms after last line.

**Projects:** neuralos (`#080d1a` + `#6366f1`), ninjapa (`#060d1a` + `#22d3ee`), rideflow (`#080f1a` + `#3b82f6`)

---

## L8 — Magazine Longform
**Visual:** Serif headlines, editorial spacing, 2-column text + image layout. Masonry card grid for services/features. Feels like opening a premium magazine, not a tech tool.

**What makes it unique:** Typography-first. Playfair Display headlines, large italic pull quotes, generous whitespace. Content flows like an article. Cards arranged in masonry, not uniform grid.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR (serif logo, editorial style)                        │
├────────────────────────────────────────────────────────────┤
│ ────────────────────────── June 2026 ──── Local Services ── │
│                                                             │
│  Your Neighbourhood,                                        │
│  Reimagined.                                                │
│     (Playfair Display, extra large, italic "Reimagined")    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌───────────────┬──────────┐                               │
│  │               │          │                               │
│  │  Service card │  Service │  ← masonry layout             │
│  │  (tall)       │  card    │                               │
│  │               │  (short) │                               │
│  ├───────────────┼──────────┤                               │
│  │  Service card │          │                               │
│  │  (short)      │  Service │                               │
│  │               │  card    │                               │
│  │               │  (tall)  │                               │
│  └───────────────┴──────────┘                               │
│                                                             │
│  [Explore Services →]                                       │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting ★ (editorial voice) → /theme-factory (OD)
→ /field-notes-editorial-template (OD) ★ magazine layout
→ /editorial-burgundy-principles-template (OD) ★ manifesto variant
→ /design-html → /ui-ux-pro-max
→ /gsap-scrolltrigger (masonry card reveal on scroll)
→ /emil-design-eng
→ /animate (Ken Burns zoom on card images)
→ /fal-generate (editorial hero imagery)
→ /design-loop
→ /fixing-accessibility
```

**Key skills unique to L8:**
- `/field-notes-editorial-template` (OD) — serif + pastel insight cards
- `/editorial-burgundy-principles-template` (OD) — manifesto editorial
- `/copywriting` — editorial voice (not SaaS marketing speak)
- `/fal-generate` — editorial-quality hero images (Flux schnell)

**Animation personality:** Elegant, slow reveal. Cards slide up with stagger (gsap-scrolltrigger). Images have subtle Ken Burns zoom in card hover. Horizontal rules draw left→right.

**Font:** Playfair Display (italic for emphasis) + DM Sans (body)

**Projects:** bookingcall (`#fffbf5` + `#f97316`), anylocal (`#fffbf5` + `#ea580c`)

---

## L9 — Floating Card Orbit
**Visual:** Feature/topic cards float at random angles around a center headline. Cards drift with slow CSS animation. Hovering one snaps it flat + dims others.

**What makes it unique:** Nothing is aligned to a grid. Cards have physical presence — shadows, slight rotation, gentle drift. Feels organic and playful. Center is empty except headline + CTA.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│      ┌────────┐                                             │
│      │Topic 1 │ (rotated -6°)                               │
│      └────────┘                                             │
│                     H1: Your AI Coach                       │
│   ┌──────────┐      Subhead line                            │
│   │ Topic 3  │      [Start Free →]          ┌──────────┐   │
│   │          │ (rotated +4°)                │ Topic 2  │   │
│   └──────────┘                              │          │   │
│                                              └──────────┘   │
│              ┌──────────┐                    (rotated -3°)  │
│              │ Topic 4  │                                    │
│              └──────────┘ (rotated +8°)                     │
│                                    ┌────────────┐           │
│                                    │  Topic 5   │           │
│                                    └────────────┘ (-5°)     │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /design-shotgun (3 playful directions)
→ /algorithmic-art ★ (positioning math, drift paths)
→ /design-html → /ui-ux-pro-max
→ /animate ★ (drift keyframes per card)
→ /transitions-dev (avatar-hover pattern for card focus)
→ /emil-design-eng
→ /design-loop
→ /fixing-accessibility
→ /fixing-motion-performance (many simultaneous animations)
```

**Key skills unique to L9:**
- `/algorithmic-art` — mathematical positioning of cards (golden angle spiral or randomized grid with min-distance)
- `/transitions-dev` avatar-hover pattern — one focuses, others dim
- `/fixing-motion-performance` — critical with many floating elements

**Animation personality:** Organic, dreamy. Cards drift `translateY: -8px ↔ 8px` with 3-5s ease-in-out alternate, each card offset. Hover: snap to `rotate(0)` + `scale(1.04)`, others to `opacity(0.6)`. Touch: cards are tappable, snap to center.

**Projects:** aicoachlab (`#fff7ed` + `#ea580c`), playsmart (`#0f0f23` + `#22c55e`)

---

## L10 — D3 Data Canvas
**Visual:** A live, interactive D3 chart IS the hero. Not a screenshot of a chart. Not a static SVG. A real chart that updates, has tooltips, and animates data in.

**What makes it unique:** No text hero. The chart dominates. Headline is small, above the chart. CTA is integrated into the chart area. Data updates every 5s with transition.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│  H1 (small, above chart) + [CTA button right-aligned]      │
│ ────────────────────────────────────────────────────────── │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │   ╱╲                                                 │  │
│  │  ╱  ╲    ╱╲                     ← line draws in      │  │
│  │ ╱    ╲  ╱  ╲   ╱╲                                    │  │
│  │╱      ╲╱    ╲ ╱  ╲                                   │  │
│  │              ╲╱    ╲╱                                 │  │
│  │                                                      │  │
│  │ Jan  Feb  Mar  Apr  May  Jun                         │  │
│  │                                                      │  │
│  │  [Tooltip on hover: "Mar 2026: £12,450"]             │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  3 metric cards below: [Total] [Change] [Avg]               │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /d3-visualization ★★ (primary skill — chart generation)
→ /design-html → /ui-ux-pro-max
→ /gsap-core ★ (path draw animation, counter)
→ /animate (metric card entrance)
→ /emil-design-eng
→ /design-loop --domain=finance
→ /fixing-accessibility (aria-label on SVG, role="img")
```

**Key skills unique to L10:**
- `/d3-visualization` — raw D3.js chart (never recharts/chart.js)
- `/gsap-core` — SVG path draw animation (`stroke-dashoffset` transition)
- Chart has real hover tooltips, responsive axes, accessible labels

**Animation personality:** Data-driven. Line draws in with `stroke-dashoffset` transition 1.2s. Area fill fades in 800ms after line completes. Metric cards count up below. Chart updates with smooth data transition every 5s.

**Projects:** trackwealth (`#0b1420` + `#f59e0b`), agenttrace (`#0c111a` + `#22d3ee`)

---

## L11 — Before/After Theater
**Visual:** Full-width before/after comparison with a draggable divider. The divider auto-sweeps back and forth if user hasn't touched it. "Drag to compare" label with hand icon.

**What makes it unique:** No split hero. No text-dominant layout. The VISUAL PROOF is the hero. Two states of the product output, side by side, with a physical drag interaction.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│  H1 (centered above) + Subhead                             │
│                                                             │
│  ┌─────────────────────┼─────────────────────┐             │
│  │                     │                     │             │
│  │    BEFORE           │     AFTER           │             │
│  │    (faded, damaged) │◄──►│ (restored,     │             │
│  │                     │     │  vibrant)      │             │
│  │                     │     │                │             │
│  │                     │  drag handle         │             │
│  │                     │  (accent-colored)    │             │
│  │                     │                     │             │
│  └─────────────────────┼─────────────────────┘             │
│        👆 Drag to compare                                   │
│                                                             │
│  [Restore Your Photo →]        (CTA below comparison)       │
│                                                             │
│  How it works: 1→2→3 (upload → AI → download)              │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /frontend-design (OD) → /design-html
→ /ui-ux-pro-max
→ /fal-restore ★ (actual AI restore demo images)
→ /fal-image-edit ★ (before/after sample generation)
→ /animate (drag handle, auto-sweep)
→ /emil-design-eng
→ /design-loop
→ /fixing-accessibility (drag handle keyboard-accessible)
```

**Key skills unique to L11:**
- `/fal-restore` — generate actual restored image samples for the demo
- `/fal-image-edit` — create before/after pairs
- Drag interaction: CSS `clip-path` or `overflow: hidden` with JS drag
- Auto-sweep: CSS `@keyframes sweep { 0%,100% { left: 30% } 50% { left: 70% } }` 4s if no touch

**Animation personality:** Physical. Drag handle has resistance feel. Auto-sweep smooth 4s ease-in-out. "Before" label fades as handle moves right.

**Projects:** photorestore (`#faf7f4` + `#c8894a`)

---

## L12 — Asymmetric Product Stage
**Visual:** 60/40 or 40/60 split. The PRODUCT DEMO takes the dominant side (60%). Copy takes the minor side (40%). Dominant panel is sticky on scroll — copy scrolls past it.

**What makes it unique:** Unequal split creates visual tension. One side is clearly the star. On scroll, the minor side reveals benefits while the dominant panel stays locked in view.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────┬──────────────────┐        │
│  │                             │                  │        │
│  │   PRODUCT DEMO (60%)        │  H1              │        │
│  │                             │  Subhead          │        │
│  │   Animated reply drafter    │                  │        │
│  │   OR calendar grid          │  ✓ Feature 1     │        │
│  │   OR quiz card              │  ✓ Feature 2     │        │
│  │                             │  ✓ Feature 3     │        │
│  │   (sticky: position sticky  │                  │        │
│  │    top: 80px)               │  [CTA Button]    │        │
│  │                             │                  │        │
│  │                             │  (scrolls to     │        │
│  │                             │   reveal more    │        │
│  │                             │   benefits)      │        │
│  └─────────────────────────────┴──────────────────┘        │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /ui-skills (OD) + /frontend-design (OD) ★ asymmetric grid
→ /design-html → /ui-ux-pro-max
→ /21st-registry
→ /gsap-scrolltrigger ★ (sticky dominant panel)
→ /animate + /transitions-dev
→ /emil-design-eng
→ /design-loop
→ /fixing-accessibility
```

**Key skills unique to L12:**
- `/gsap-scrolltrigger` — sticky dominant panel while minor side scrolls
- `/ui-skills` (OD) — asymmetric grid patterns
- CSS `position: sticky` + scroll-linked benefit reveals

**Animation personality:** Controlled asymmetry. Dominant panel has internal animation loop. Minor side benefits fade-up on scroll intersection. Mobile: full-width stacked, dominant first.

**Projects:** replydesk (`#f8f9ff` + `#4f46e5`), draftcal (`#fffbf5` + `#d97706`), quizbytesdaily (`#f0f9ff` + `#7c3aed`)

---

## L13 — Generative Art Backdrop
**Visual:** Full-viewport WebGL shader or canvas-2D generative art as background. Content floats above on semi-transparent scrim. Every page load = unique pattern (seeded random).

**What makes it unique:** Background is ALIVE and unique per visit. Not a video — procedurally generated. Responds to mouse movement. Creates wonder before reading any text.

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
│  ▒▒  GENERATIVE CANVAS (WebGL/2D)                     ▒▒  │
│  ▒▒  - Particles / noise / pixel grid                 ▒▒  │
│  ▒▒  - Responds to mouse position                     ▒▒  │
│  ▒▒  - New seed each visit                            ▒▒  │
│  ▒▒                                                   ▒▒  │
│  ▒▒     ┌──────────────────────────────────┐          ▒▒  │
│  ▒▒     │  H1 (white, large)               │          ▒▒  │
│  ▒▒     │  Subhead                          │          ▒▒  │
│  ▒▒     │  [CTA]                            │          ▒▒  │
│  ▒▒     └──────────────────────────────────┘          ▒▒  │
│  ▒▒                                                   ▒▒  │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /shader-dev ★★ (WebGL fragment shader) OR /algorithmic-art ★ (canvas 2D)
→ /threejs ★ (3D particle system if needed)
→ /design-html → /ui-ux-pro-max
→ /animate
→ /emil-design-eng
→ /design-loop
→ /fixing-accessibility
→ /fixing-motion-performance ★ (GPU performance critical)
```

**Key skills unique to L13:**
- `/shader-dev` — custom GLSL fragment shader for background
- `/threejs` — 3D particle field if WebGL shader too complex
- `/algorithmic-art` — canvas 2D generative patterns (lighter option)
- `/fixing-motion-performance` — essential (canvas + UI = potential jank)

**Animation personality:** Generative, alive. Background runs at 60fps. Mouse causes ripple/attraction. `prefers-reduced-motion`: static fallback gradient. Content on scrim `rgba(0,0,0,0.5)`.

**Projects:** pixelforge (`#0e0e16` + `#a78bfa`)

---

## L14 — Scroll-Driven Story
**Visual:** Full-page sections that pin and scrub on scroll. Each section is a chapter telling the product story. Progress indicator on the side. Feels like a guided tour.

**What makes it unique:** No above-fold CTA pressure. The SCROLL is the experience. Each section pins, reveals content, then unpins. Visitor discovers features by scrolling, not clicking.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR (transparent, appears on scroll-up)                  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  SECTION 1 (pinned, 100vh)                  ● ← progress   │
│  ┌──────────────────────────────────┐       ○              │
│  │  "Plan your trip"                │       ○              │
│  │  Map illustration fades in       │       ○              │
│  │  Destination cards fly in        │                      │
│  └──────────────────────────────────┘                      │
│                                                             │
│  SECTION 2 (pinned, 100vh)                  ○              │
│  ┌──────────────────────────────────┐       ● ← current    │
│  │  "Day-by-day itinerary"          │       ○              │
│  │  Day cards stack with stagger    │       ○              │
│  └──────────────────────────────────┘                      │
│                                                             │
│  SECTION 3 (pinned, 100vh)                  ○              │
│  ┌──────────────────────────────────┐       ○              │
│  │  "Book with one click"           │       ● ← current    │
│  │  CTA appears centered            │       ○              │
│  └──────────────────────────────────┘                      │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /frontend-design (OD) → /design-html
→ /gsap-scrolltrigger ★★ (pin + scrub for every section)
→ /gsap-timeline ★ (per-section animation sequences)
→ /ui-ux-pro-max
→ /animate (card fly-in, map reveal)
→ /fal-generate (travel imagery)
→ /emil-design-eng
→ /design-loop
→ /fixing-accessibility + /fixing-motion-performance
```

**Key skills unique to L14:**
- `/gsap-scrolltrigger` ★★ — primary interaction model (pin + scrub)
- `/gsap-timeline` — coordinated animations within each pinned section
- Progress indicator: `position: fixed` right side, dots fill on scroll

**Animation personality:** Narrative, paced. Each section pins for ~200vh of scroll. Content reveals within pin: fade-up, slide-in, scale-in. Progress dots fill with accent color. Mobile: simpler (no pin, just intersection reveals).

**Projects:** roamplan (`#f0fdf4` + `#059669`), homecanvas (`#fffdf7` + `#78716c`)

---

## L15 — Dashboard Preview
**Visual:** A mini working dashboard embedded right in the hero. Not a screenshot — a LIVE dashboard with real (or seeded) data, charts, and status indicators. Proves the product instantly.

**What makes it unique:** Visitor sees the actual product dashboard — shrunk to fit the hero, but functional. Metrics tick, status dots pulse, charts update. It's the product itself, not a description of it.

```
┌────────────────────────────────────────────────────────────┐
│ NAVBAR                                                      │
├────────────────────────────────────────────────────────────┤
│  H1 (centered, above dashboard) + Subhead                   │
│  [Get Started Free →]                                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │  │
│  │ │ Heart   │ │ Sleep   │ │ Steps   │ │ Mood    │    │  │
│  │ │ ❤️ 72   │ │ 💤 7.2h │ │ 🏃 8.4k │ │ 😊 Good │    │  │
│  │ │ bpm     │ │         │ │         │ │         │    │  │
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │  │
│  │                                                      │  │
│  │  ┌────────────────────────────┐  ┌──────────────┐   │  │
│  │  │  Weekly trend chart (D3)   │  │  Score ring   │   │  │
│  │  │  ╱╲  ╱╲                    │  │  0 → 87%     │   │  │
│  │  │ ╱  ╲╱  ╲                   │  │  (animates)  │   │  │
│  │  └────────────────────────────┘  └──────────────┘   │  │
│  │                                                      │  │
│  │  Status: ● Connected   Last sync: 2m ago             │  │
│  └──────────────────────────────────────────────────────┘  │
│     ↑ actual mini dashboard, not a screenshot               │
│                                                             │
│  How it works: 1→2→3 below fold                             │
└────────────────────────────────────────────────────────────┘
```

**Skills pipeline:**
```
/taste-skill → /copywriting → /theme-factory (OD)
→ /interface-design (OD) ★ (dashboard layout)
→ /shadcn-ui (OD) ★ (card/badge/progress primitives)
→ /design-html → /ui-ux-pro-max
→ /d3-visualization ★ (inline mini chart)
→ /21st-registry (dashboard card components)
→ /animate (ring fill, counter tick, pulse dot)
→ /gsap-core (score ring animation)
→ /emil-design-eng
→ /design-loop --domain=medical
→ /fixing-accessibility
```

**Key skills unique to L15:**
- `/interface-design` (OD) — dashboard structure + sidebar pattern
- `/d3-visualization` — inline mini trend chart
- `/gsap-core` — score ring fill animation (SVG circle `stroke-dashoffset`)
- Combined: mini dashboard = card grid + chart + ring + status dots

**Animation personality:** Precise, medical. Score ring fills with spring. Metric numbers count up stagger. Status dot pulses `pulse-ring`. Chart line draws. Everything on a 3s stagger sequence.

**Projects:** myvitals (`#f0fdfa` + `#0d9488`), voicejournal (`#f5f0ff` + `#8b5cf6`)

---

## Skills Coverage Matrix

Every skill used at least once across the 15 templates:

| Skill | Used in templates |
|-------|-------------------|
| `/taste-skill` | ALL (step 0) |
| `/copywriting` | ALL (step 2) |
| `/theme-factory` (OD) | ALL (step 3) |
| `/design-html` | ALL (step 5) |
| `/ui-ux-pro-max` | ALL (step 6) |
| `/emil-design-eng` | ALL (step 8) |
| `/animate` | ALL (step 9) |
| `/design-loop` | ALL (step 10) |
| `/fixing-accessibility` | ALL (step 10) |
| `/frontend-design` (OD) | L1, L3, L8, L11, L12, L14 |
| `/interface-design` (OD) | L7, L15 |
| `/shadcn-ui` (OD) | L2, L3, L4, L15 |
| `/ui-skills` (OD) | L4, L12 |
| `/21st-registry` | L1, L3, L4, L12, L15 |
| `/transitions-dev` | L1, L2, L3, L9 |
| `/design-shotgun` | L2, L6, L9 |
| `/gsap-scrolltrigger` | L6, L8, L12, L14 |
| `/gsap-timeline` | L2, L7, L14 |
| `/gsap-core` | L5, L10, L15 |
| `/gsap-react` | L10, L13 |
| `/d3-visualization` | L4, L5, L10, L15 |
| `/swiss-creative-mode-template` (OD) | L5 |
| `/digits-fintech-swiss-template` (OD) | L5 |
| `/after-hours-editorial-template` (OD) | L6 |
| `/cinematic-flow` | L6 |
| `/field-notes-editorial-template` (OD) | L8 |
| `/editorial-burgundy-principles-template` (OD) | L8 |
| `/algorithmic-art` | L9, L13 |
| `/shader-dev` | L13 |
| `/threejs` | L13 |
| `/remotion` | L6 |
| `/fal-generate` | L8, L14 |
| `/fal-kling-o3` | L6 |
| `/fal-restore` | L11 |
| `/fal-image-edit` | L11 |
| `/stitch-loop` | L6, L14 |
| `/design-review` (OD) | L5, L8 |
| `/platform-design` (OD) | L4 |
| `/login-flow` (OD) | L1, L3 |
| `/design-brief` (OD) | L5 |
| `/design-motion-principles` | L6, L9, L13 |
| `/baseline-ui` | L2, L7 |
| `/fixing-metadata` | ALL |
| `/fixing-motion-performance` | L6, L9, L13, L14 |
| `/marketing-psychology` | L1, L8, L12 |
| `/web-design-guidelines` (OD) | L4, L5 |
| `/color-expert` | L5, L8 |
| `/hand-drawn-diagrams` | L14 (progress indicator) |
| `/screenshots-marketing` | L11, L15 |
| `/paywall-upgrade-cro` | L1, L3 |
| `/ugc-product-flow` | L2 |
| `/canvas-design` | L5 (OG image, favicon) |
| `/imagen` | L14 (hero imagery) |
| `/web-artifacts-builder` | L4 (bento widget prototyping) |
| `/brand-guidelines` | L5 |
| `/creative-director` | L6, L13 |
| `/faq-page` | L1, L3 (below fold FAQ section) |
| `/release-notes-one-pager` | L7 (changelog-style terminal output) |
| `/apple-hig` | L15 (health dashboard HIG compliance) |
| `/gif-sticker-maker` | L2 (quiz result shareable GIF) |
| `/image-enhancer` | L11 (sharpen before/after demo) |
| `/higgsfield-marketplace-cards` | L8 (editorial service cards) |
| `/remotion-best-practices` | L6 |
| `/frontend-slides` | L14 (slide-like section transitions) |

---

## Project → Template Assignment (final)

| Project | Template | BG | Accent |
|---------|----------|----|--------|
| invoicemint | L1 Split Hero | `#f0fdf4` | `#059669` |
| billslash | L1 Split Hero | `#f8fafc` | `#16a34a` |
| quizbites | L2 Card Arena | `#fefce8` | `#ca8a04` |
| tutiq | L2 Card Arena | `#f0f9ff` | `#0284c7` |
| kwizzo | L2 Card Arena | `#0f0f23` | `#f59e0b` |
| speakiq | L3 Command Bar | `#fdf4ff` | `#9333ea` |
| pdfideas | L3 Command Bar | `#fafafe` | `#6366f1` |
| resumevault | L3 Command Bar | `#0c0f1a` | `#7c3aed` |
| zerostaff | L4 Bento | `#ffffff` | `#2563eb` |
| meetscribe | L4 Bento | `#f8fafc` | `#0ea5e9` |
| weekendai | L4 Bento | `#fff7ed` | `#f59e0b` |
| worldtrends | L5 Swiss | `#f9fafb` | `#dc2626` |
| mandirates | L5 Swiss | `#fffbf5` | `#ca8a04` |
| clipforge | L6 Cinematic | `#0a0a0f` | `#e879f9` |
| nammatamil | L6 Cinematic | `#1a0a00` | `#f97316` |
| neuralos | L7 Terminal | `#080d1a` | `#6366f1` |
| ninjapa | L7 Terminal | `#060d1a` | `#22d3ee` |
| rideflow | L7 Terminal | `#080f1a` | `#3b82f6` |
| bookingcall | L8 Magazine | `#fffbf5` | `#f97316` |
| anylocal | L8 Magazine | `#fffbf5` | `#ea580c` |
| aicoachlab | L9 Orbit | `#fff7ed` | `#ea580c` |
| playsmart | L9 Orbit | `#0f0f23` | `#22c55e` |
| trackwealth | L10 D3 Data | `#0b1420` | `#f59e0b` |
| agenttrace | L10 D3 Data | `#0c111a` | `#22d3ee` |
| photorestore | L11 Before/After | `#faf7f4` | `#c8894a` |
| replydesk | L12 Asymmetric | `#f8f9ff` | `#4f46e5` |
| draftcal | L12 Asymmetric | `#fffbf5` | `#d97706` |
| quizbytesdaily | L12 Asymmetric | `#f0f9ff` | `#7c3aed` |
| pixelforge | L13 Generative | `#0e0e16` | `#a78bfa` |
| roamplan | L14 Scroll Story | `#f0fdf4` | `#059669` |
| homecanvas | L14 Scroll Story | `#fffdf7` | `#78716c` |
| myvitals | L15 Dashboard | `#f0fdfa` | `#0d9488` |
| voicejournal | L15 Dashboard | `#f5f0ff` | `#8b5cf6` |

---

## MANDATORY: Landing Page Experience Spec (applies to ALL 15 templates)

Every project landing page must include these 5 experience layers. Template-specific structure varies, but every project ships all 5.

### EX1 — Animated Background (per-category)

No static flat backgrounds. Every landing page has subtle motion in the background layer.

| Category | BG Animation Type | Implementation |
|----------|------------------|----------------|
| Light themes (education, health, productivity, finance, travel, food) | Floating gradient orbs (2-3, 20% opacity, 8-12s drift) | CSS `@keyframes float-orb` on `::before`/`::after` pseudo-elements |
| Dark dev tools (neuralos, agenttrace, rideflow, ninjapa) | Particle grid dots + subtle scan line | Canvas 2D at 30fps, 200-400 dots, mouse-attracted nearest 3 |
| Dark creative (pixelforge, clipforge, kwizzo) | Generative noise grain + accent color pulse | `/shader-dev` for WebGL, or CSS `background-image: url(grain.svg)` + `@keyframes pulse-glow` |
| Magazine/editorial (bookingcall, anylocal) | Ken Burns zoom on hero section bg image | `@keyframes ken-burns { from { transform: scale(1) } to { transform: scale(1.05) } }` 20s |

**Skills:** `/animate`, `/shader-dev` (dark creative), `/algorithmic-art` (particles), `/fixing-motion-performance`

**Rules:**
- `prefers-reduced-motion`: disable all bg animation, show static gradient/color
- Never >20% opacity on animated bg elements (must not compete with content)
- Mobile: reduce particle count by 50%, disable shader, fallback to static gradient

```css
/* Light theme floating orbs (copy-paste base) */
.hero-bg::before, .hero-bg::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: float-orb 10s ease-in-out infinite alternate;
  pointer-events: none;
}
.hero-bg::before {
  width: 400px; height: 400px;
  background: var(--accent);
  top: -100px; right: -100px;
}
.hero-bg::after {
  width: 300px; height: 300px;
  background: var(--accent-2);
  bottom: -80px; left: -80px;
  animation-delay: -5s;
}
@keyframes float-orb {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(30px, -20px) scale(1.1); }
}
@media (prefers-reduced-motion: reduce) {
  .hero-bg::before, .hero-bg::after { animation: none; }
}
```

---

### EX2 — Branded Toolbar + Header

Every project navbar must feel like a premium product, not a Next.js default.

```
┌────────────────────────────────────────────────────────────┐
│ 🔥 Brand·Name     Features  Pricing  Demo    [Get Started]│
│ ↑ icon + accent    ↑ links   ↑ plan   ↑ demo    ↑ CTA pill│
│ colored word                  anchor   anchor              │
└────────────────────────────────────────────────────────────┘
```

**Required elements:**
1. **Brand icon** — emoji or SVG icon (`app/icon.tsx`) + product name with accent-colored key word
2. **Nav links** — Features (scroll anchor), Pricing (scroll anchor), Demo (scroll anchor)
3. **CTA pill** — accent bg, white text, `border-radius: 999px`, right-aligned
4. **Glass effect** — `bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border)]`
5. **Mobile** — hamburger menu → bottom sheet drawer (not dropdown)
6. **Scroll behavior** — sticky, compact on scroll (height 60px → 48px), shadow appears

**Skills:** `/21st-registry` (navbar component), `/shadcn-ui` (OD) (sheet for mobile), `/animate` (compact transition)

**Logo generation:** For each project, use `/image-gen` or `/fal-generate` to create app/icon.tsx programmatically:
```tsx
// app/icon.tsx — generates favicon with brand initial + accent bg
import { ImageResponse } from 'next/og'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export default function Icon() {
  return new ImageResponse(
    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent, #2563eb)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>
      K
    </div>,
    { ...size }
  )
}
```

---

### EX3 — Guided Demo Walkthrough (Before Login)

**Every project must show a guided product demo on the landing page — no login required.** Visitor sees exactly what the tool does, step by step, before any signup prompt.

#### Demo structure (3-4 steps, auto-plays):

```
┌────────────────────────────────────────────────────────────┐
│  ● Step 1 of 4   ○ ○ ○                    [Skip to tool →]│
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │   ANIMATED DEMO STEP                                 │  │
│  │   Shows real product UI doing real action             │  │
│  │   (typing query, getting result, downloading output)  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  "Type your question and get instant AI analysis"           │
│  ↑ step description, below demo area                        │
│                                                             │
│  [← Back]                                    [Next Step →]  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Per-template demo content:**

| Template | Demo walkthrough shows |
|----------|----------------------|
| L1 Split Hero | Invoice creation flow: select template → fill details → preview → download |
| L2 Card Arena | Quiz game: pick topic → answer card flip → score reveal → share result |
| L3 Command Bar | Search → type query → results stream → copy/save |
| L4 Bento | Dashboard widgets loading one by one with real data |
| L5 Swiss | Data tables populating, charts drawing, filters applying |
| L6 Cinematic | Full hero video walkthrough of product capabilities |
| L7 Terminal | Command sequence: init → process → output → success |
| L8 Magazine | Service discovery: browse → filter → view → enquire |
| L9 Orbit | Cards representing features float in, user clicks one to expand |
| L10 D3 Data | Chart types switching: line → bar → pie, with real data transitions |
| L11 Before/After | Upload → AI processing → before/after reveal → download |
| L12 Asymmetric | Product working in real-time on left, features appearing right |
| L13 Generative | Art generation: prompt → loading → result → variations |
| L14 Scroll Story | Story chapters auto-scroll: discover → plan → execute → result |
| L15 Dashboard | Dashboard widgets populating: vitals → trends → insights → score |

**Skills:** `/animate`, `/transitions-dev`, `/gsap-timeline` (step orchestration), `/marketing-psychology` (progress indicators drive completion)

**Rules:**
- Auto-plays with 4s per step, progress bar visible
- Manual navigation (next/back) always available
- "Skip to tool" link in top-right — goes directly to free action
- Demo uses REAL product output (pre-seeded data), never fake mockups
- On mobile: same steps but simplified, full-width cards with snap-scroll

---

### EX4 — Plan Comparison Section (Motivate Upgrade)

**Every project landing page includes a visible plan comparison section — shows what free gets vs what Pro unlocks.** This is NOT a pricing page — it's a "glance at what you're missing" section on the landing page itself.

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│          What You Get                                       │
│                                                             │
│  ┌─────────────────────┐  ┌──────────────────────────────┐ │
│  │  FREE               │  │  PRO ★                       │ │
│  │  ───────────────     │  │  ─────────────               │ │
│  │  ✓ 3 uses/day       │  │  ✓ Unlimited uses            │ │
│  │  ✓ Basic features   │  │  ✓ All features              │ │
│  │  ✓ Standard output  │  │  ✓ HD/Premium output         │ │
│  │  ✗ Export (locked)   │  │  ✓ Export PDF/CSV            │ │
│  │  ✗ History (locked)  │  │  ✓ Full history              │ │
│  │  ✗ API access        │  │  ✓ API access               │ │
│  │                      │  │                              │ │
│  │  [Using Free Plan]   │  │  [Upgrade to Pro →]          │ │
│  │                      │  │  "or enter promo code"       │ │
│  └─────────────────────┘  └──────────────────────────────┘ │
│                                                             │
│  💡 "Try it free first — upgrade only when you need more"   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Per-project free vs pro:**

| Project | Free (zero auth) | Pro (gated) |
|---------|-----------------|-------------|
| quizbites/tutiq/kwizzo | Play unlimited quizzes, see score | Save scores, leaderboard, custom quizzes |
| speakiq | Translate 5 phrases/day | Unlimited translation, pronunciation, export |
| invoicemint/billslash | Generate 3 invoices/day | Unlimited, custom templates, bulk, PDF |
| trackwealth | View 1 portfolio snapshot | Multi-portfolio, alerts, export, API |
| resumevault | Analyze 1 resume/day | Unlimited analysis, ATS tips, export |
| myvitals | Log 3 entries/day | Unlimited, charts, export, share |
| pdfideas | Extract 2 PDFs/day | Unlimited, batch, OCR, export |
| agenttrace | View 10 traces | Unlimited traces, filters, export |
| photorestore | Restore 1 photo/day | Unlimited, HD output, batch |
| draftcal | Create 3 posts/day | Unlimited, scheduling, analytics |
| roamplan | Generate 1 itinerary/day | Unlimited, booking links, export |

**Skills:** `/paywall-upgrade-cro`, `/marketing-psychology` (anchoring, loss aversion), `/shadcn-ui` (OD) (card/badge primitives)

**Rules:**
- Comparison visible on scroll (below fold, before footer)
- Pro card has subtle accent border glow (`box-shadow: 0 0 20px var(--accent-dim)`)
- "Enter promo code" link under Pro CTA → opens inline input, validates via `/api/promo`
- Free plan card is NOT a dead-end — "Using Free Plan" is a satisfied state, not a nag
- Checkmark icons use accent color; X icons use `var(--text-3)` muted
- Animation: cards enter with stagger, Pro card lifts 4px higher than Free (`translateY(-4px)`)

---

### EX5 — After-Login Experience Preview

**Below the plan comparison, show a "peek" at the logged-in dashboard/workspace.** Visitor sees what the full product looks like AFTER login — motivates both signup and upgrade.

```
┌────────────────────────────────────────────────────────────┐
│                                                             │
│     See What's Inside ↓                                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │ Dashboard / Workspace Preview                │    │  │
│  │  │                                              │    │  │
│  │  │ [Sidebar] [Main content] [Right panel]       │    │  │
│  │  │                                              │    │  │
│  │  │ Shows: saved items, history, analytics,      │    │  │
│  │  │ settings, team features, export options      │    │  │
│  │  │                                              │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │  ↑ browser chrome frame (macOS dots + URL bar)       │  │
│  │  ↑ scale(0.85) + perspective(1000px) rotateY(-3deg)  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [Create Free Account →]    "No credit card required"       │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**Implementation:**
- Screenshot or live embed of the actual `/dashboard` or `/app` view
- Wrapped in browser chrome frame (macOS window dots: red/yellow/green, URL bar showing domain)
- Slight 3D perspective tilt (`perspective(1000px) rotateY(-3deg) scale(0.85)`) for depth
- On scroll into view: tilts from -8deg to -3deg + scale 0.8 → 0.85 (parallax feel)
- Optional: blurred overlay on pro-only sections with lock icon + "Pro" badge

**Skills:** `/interface-design` (OD) (dashboard preview), `/animate` (scroll-driven tilt), `/gsap-scrolltrigger` (parallax), `/screenshots-marketing` (generate dashboard screenshots)

**Rules:**
- Preview is read-only — no clickable elements inside the preview
- Must show REAL dashboard UI, never a generic template
- "No credit card required" text mandatory under CTA
- Mobile: flat (no 3D tilt), scrollable horizontal preview strip
- If project has no dashboard yet: use `/interface-design` to generate a realistic mockup

---

### Per-Template Background Animations (Quick Reference)

| Template | BG Animation | Intensity |
|----------|-------------|-----------|
| L1 Split Hero | 2 floating gradient orbs | Subtle (15% opacity) |
| L2 Card Arena | Confetti particles (fall + disappear) | Playful (20% opacity) |
| L3 Command Bar | Horizontal scan line (top to bottom) | Minimal (8% opacity) |
| L4 Bento | Soft radial pulse from center | Subtle (12% opacity) |
| L5 Swiss | None — pure white, thin rules only | Zero (Swiss purity) |
| L6 Cinematic | Full video/generative bg | Dominant (primary visual) |
| L7 Terminal | Matrix-style falling characters | Atmospheric (10% opacity) |
| L8 Magazine | Ken Burns zoom on section images | Editorial (photo only) |
| L9 Orbit | Orbital ring lines (thin, rotating) | Ambient (8% opacity) |
| L10 D3 Data | Grid dots with accent pulse | Technical (10% opacity) |
| L11 Before/After | Split gradient: muted left ↔ vibrant right | Structural (15% opacity) |
| L12 Asymmetric | Diagonal gradient sweep (slow) | Subtle (10% opacity) |
| L13 Generative | Full WebGL shader | Dominant (primary visual) |
| L14 Scroll Story | Per-section gradients (shift on scroll) | Narrative (15% opacity) |
| L15 Dashboard | Subtle dot grid pulse | Clinical (8% opacity) |

---

## How to use this document

1. Find your project in the assignment table above
2. Go to that template section (L1-L15)
3. Follow the skills pipeline listed — IN ORDER
4. Use the ASCII wireframe as structural reference
5. Use the animation personality notes for motion decisions
6. Implement ALL 5 EX layers (EX1-EX5) on every project
7. Run `/design-loop` as final quality gate before push

### Full landing page section order (top to bottom):
```
1. Navbar (EX2: branded toolbar, glass, sticky)
2. Hero section (template-specific layout L1-L15)
3. Background animation (EX1: per-category animated bg)
4. Guided demo walkthrough (EX3: 3-4 step product tour)
5. Stats/trust row (real metrics only)
6. How it works (1→2→3→4 steps)
7. Plan comparison (EX4: Free vs Pro cards)
8. After-login preview (EX5: dashboard peek with 3D tilt)
9. Testimonials/social proof (real only, or omit)
10. FAQ (collapse/expand)
11. Footer (links, chatbot FAB, feedback)
```
