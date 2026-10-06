# Universal Design Template — Portfolio Design System
**Created:** 2026-06-17  **Status:** ACTIVE — single source of truth for ALL project layouts

---

## How it works

ONE template. You tell it what the site is for → it morphs into the right layout, palette, motion, and demo panel. No more picking from T1-T17 manually.

---

## Step 0: Input — What is this site?

Answer these 4 questions → template configures itself:

```yaml
project: %%NAME%%
purpose: %%WHAT_IT_DOES_IN_5_WORDS%%
audience: %%WHO_USES_IT%%
category: %%PICK_ONE%%
  # consumer-light: education, health, travel, food, productivity, finance, news
  # dev-dark: dev-tools, ai-infra, gaming, media
```

---

## Step 1: Auto-Theme (from category)

### Consumer Light
| Category | BG | Accent | Accent-2 | Border | Muted | Font Pair |
|----------|-----|--------|----------|--------|-------|-----------|
| Education/Quiz | `#f0f9ff` | `#0284c7` | `#0ea5e9` | `#bae6fd` | `#e0f2fe` | Archivo + Space Grotesk |
| Health/Wellness | `#f0fdfa` | `#0d9488` | `#14b8a6` | `#ccfbf1` | `#e6fcf7` | Archivo + Space Grotesk |
| Travel/Local | `#f0fdf4` | `#059669` | `#10b981` | `#bbf7d0` | `#dcfce7` | Archivo + Space Grotesk |
| Food/Cultural | `#fffbf5` | `#ea580c` | `#f97316` | `#fed7aa` | `#ffedd5` | Playfair Display + DM Sans |
| Productivity/SaaS | `#ffffff` | `#2563eb` | `#3b82f6` | `#dbeafe` | `#eff6ff` | Archivo + Space Grotesk |
| Finance/Billing | `#f8fafc` | `#059669` | `#10b981` | `#bbf7d0` | `#ecfdf5` | Archivo + Space Grotesk |
| News/Trends | `#f9fafb` | `#dc2626` | `#ef4444` | `#fecaca` | `#fee2e2` | Inter + Space Grotesk |

### Dev Dark (flat, no blobs)
| Category | BG | Accent | Accent-2 | Border | Muted |
|----------|-----|--------|----------|--------|-------|
| Dev Tools/Agents | `#0b1120` | `#6366f1` | `#818cf8` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.04)` |
| AI Infra/Resume | `#0c0f1a` | `#7c3aed` | `#8b5cf6` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.04)` |
| Gaming/Creative | `#0f0f23` | `#f59e0b` | `#fbbf24` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.04)` |
| Media/Video | `#0a0a0f` | `#e879f9` | `#d946ef` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.04)` |

### Per-project overrides (collision guard)
Before using any hex → grep `design-system/MASTER.md` collision checker. If bg+accent already taken → shift hue ±15°.

### BANNED (permanent)
- `#0a0a0f` + orange/amber
- Purple as page background (`#fdf4ff`, `#faf5ff`)
- Teal mesh blobs (`radial-gradient(ellipse...rgba(20,184,166`)
- Dot-grid overlays
- Two projects sharing same bg + accent

---

## Step 2: Auto-Layout (from purpose)

The site's PURPOSE determines the layout — not the category.

| Purpose pattern | Layout | Structure |
|----------------|--------|-----------|
| **Search/query tool** ("find X", "search for Y") | Full-width input hero | Giant input centered, results appear below inline |
| **Generator** ("create X", "generate Y") | Split 50/50 | Input left, live output right |
| **Editor/canvas** ("edit X", "build Y") | Full working canvas | Canvas loads on page, tools around edges |
| **Dashboard/monitor** ("track X", "view Y") | Bento grid | Mosaic of metric cards, no split |
| **Before/after tool** ("restore X", "compare Y") | Split with slider | Drag handle auto-sweeps |
| **Learning/quiz** ("learn X", "test Y") | Split with gamified panel | Cards flip, scores tick, XP bars fill |
| **Booking/schedule** ("book X", "schedule Y") | Magazine editorial | Service cards, serif headlines, editorial feel |
| **Data/analytics** ("analyze X", "prices of Y") | D3 data hero | Chart IS the hero, numbers count up |
| **AI agent/infra** ("agent X", "deploy Y") | Centered terminal | Typewriter sequence, no split |
| **Content/social** ("post X", "draft Y") | Asymmetric 60/40 | Product demo dominant side |
| **Storytelling/cultural** ("explore X", "discover Y") | Cinematic full-bleed | Video/generative bg, centered overlay |
| **General SaaS** (anything else) | Split 50/50 | Hero left, animated demo right |

---

## Step 3: Auto-Skills Pipeline (10 steps)

Every project runs this EXACT sequence. Steps marked ★ are mandatory — never skip.

```
PHASE 1 — RESEARCH (before any code)
┌─────────────────────────────────────────────────────────────────┐
│ 0. /taste-skill ★                                               │
│    Quality bar check. "Would I use this site?" If no → rethink. │
│                                                                 │
│ 1. /design-shotgun                                              │
│    3 visual directions. Pick furthest from existing portfolio.   │
│    Skip if: incremental tweak, not full redesign.               │
│                                                                 │
│ 2. /copywriting ★                                               │
│    Hero headline (≤8 words), subhead, CTA text.                 │
│    Must pass: "Does this say what/who/next?"                    │
└─────────────────────────────────────────────────────────────────┘

PHASE 2 — GENERATE (build the layout)
┌─────────────────────────────────────────────────────────────────┐
│ 3. /theme-factory (OD) ★                                        │
│    Generate full CSS var token set from Step 1 palette.          │
│    Output: :root block → paste into globals.css                 │
│                                                                 │
│ 4. Layout skill (OD) — pick by Step 2 layout type: ★            │
│    ┌──────────────────────┬────────────────────────────────┐    │
│    │ Layout               │ Open Design Skill              │    │
│    ├──────────────────────┼────────────────────────────────┤    │
│    │ Split 50/50          │ /frontend-design               │    │
│    │ Full-width input     │ /frontend-design + /shadcn-ui  │    │
│    │ Bento grid           │ /shadcn-ui + /ui-skills        │    │
│    │ Centered terminal    │ /interface-design              │    │
│    │ Magazine editorial   │ /field-notes-editorial-template│    │
│    │ Swiss data grid      │ /swiss-creative-mode-template  │    │
│    │ Cinematic full-bleed │ /after-hours-editorial-template│    │
│    │ D3 data hero         │ /d3-visualization              │    │
│    │ Asymmetric 60/40     │ /ui-skills + /frontend-design  │    │
│    │ Generative art bg    │ /shader-dev or /algorithmic-art│    │
│    │ Before/after slider  │ /frontend-design               │    │
│    │ Floating cards       │ /algorithmic-art               │    │
│    └──────────────────────┴────────────────────────────────┘    │
│                                                                 │
│ 5. /design-html ★                                               │
│    Claude canvas generates production HTML+Tailwind.             │
│    Feed it: Step 1 tokens + Step 2 layout + Step 4 OD output.  │
└─────────────────────────────────────────────────────────────────┘

PHASE 3 — REFINE (quality + components)
┌─────────────────────────────────────────────────────────────────┐
│ 6. /ui-ux-pro-max ★                                             │
│    Premium quality pass: spacing, contrast, hierarchy, motion.  │
│    Command:                                                     │
│    python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \   │
│      "PROJECT CATEGORY" --design-system --stack nextjs          │
│                                                                 │
│ 7. /21st-registry                                               │
│    Pull polished React components instead of hand-rolling.      │
│    Use for: buttons, cards, forms, pricing tables, navbars.     │
│    If 21st MCP available → call tool directly.                  │
│    If not → use skill to reference component patterns.          │
│                                                                 │
│ 8. /emil-design-eng ★                                           │
│    Emil Kowalski polish pass.                                   │
│    Checks: micro-interactions, spacing rhythm, hover states,    │
│    active states (scale 0.97), transition specificity,          │
│    border vs shadow balance, touch target 44px.                 │
│    Output: Before/After table of every fix.                     │
└─────────────────────────────────────────────────────────────────┘

PHASE 4 — MOTION (animate everything)
┌─────────────────────────────────────────────────────────────────┐
│ 9. Motion skills (pick by layout): ★                            │
│    ┌──────────────────────┬────────────────────────────────┐    │
│    │ Layout need          │ Skill combo                    │    │
│    ├──────────────────────┼────────────────────────────────┤    │
│    │ Framer Motion enter  │ /animate                       │    │
│    │ Card/modal/dropdown  │ /transitions-dev (12 patterns) │    │
│    │ Scroll-linked        │ /gsap-scrolltrigger            │    │
│    │ Typewriter/sequence  │ /gsap-timeline                 │    │
│    │ Complex timeline     │ /gsap-core                     │    │
│    │ Counter animation    │ /gsap-core (count up)          │    │
│    │ Chart draw           │ /d3-visualization + /gsap-core │    │
│    │ 3D/WebGL             │ /threejs                       │    │
│    │ React integration    │ /gsap-react                    │    │
│    └──────────────────────┴────────────────────────────────┘    │
│                                                                 │
│    Demo panel MUST animate. Static = incomplete.                │
│    Motion rules (from globals-template.css):                    │
│    - Enter: ease-out cubic-bezier(0.23, 1, 0.32, 1)           │
│    - Buttons: 100-160ms, scale(0.97) on :active               │
│    - Cards: 150-250ms hover lift                               │
│    - Never transition:all — specify exact properties           │
│    - Never scale(0) entry — start scale(0.95) + opacity:0     │
│    - Wrap all transforms in prefers-reduced-motion             │
└─────────────────────────────────────────────────────────────────┘

PHASE 5 — QUALITY GATE (mandatory final) 
┌─────────────────────────────────────────────────────────────────┐
│ 10. /design-loop ★                                              │
│     8 specialist agents × 4 iterations:                         │
│     diagnose → fix → harden → polish                           │
│     Command: /design-loop app/page.tsx --domain=CATEGORY        │
│     Domains: fitness, finance, ecommerce, medical, default      │
│                                                                 │
│     Then:                                                       │
│     /fixing-accessibility — WCAG 4.5:1, focus, aria ★          │
│     /fixing-metadata — title, OG, robots, sitemap ★            │
│     /fixing-motion-performance — jank, layout thrash           │
│                                                                 │
│     Then:                                                       │
│     Playwright 375px + 1280px screenshots → visual verify ★    │
│     npm run build → zero errors ★                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 4: Auto-Demo Panel (from purpose)

The animated right panel (or inline demo) is selected by purpose:

| Purpose | Demo type | Animation pattern |
|---------|-----------|-------------------|
| Invoice/billing | Fields type → status badge → confetti | Typewriter + badge flash |
| Quiz/learning | Cards flip → option lights → score ticks | Card spring + counter |
| Reply/draft | Ticket arrives → shimmer → reply types | Shimmer bar + typewriter |
| Terminal/agent | Logs scroll with timestamps, span bars | GSAP timeline scroll |
| Resume/ATS | Fields populate → score ring fills | Ring animation + counter |
| Health metrics | Score ring 0→87% → metric cards count | Spring ring + stagger |
| Voice/audio | Waveform bars pulse → transcript types | Bar bounce + typewriter |
| Coaching/chat | Question → answer types → feedback card | Chat bubble spring |
| Photo restore | Before/after drag slider auto-sweeps | CSS transform slide |
| Itinerary/travel | Day cards fly in for destination | Stagger spring cards |
| Business listings | Cards appear with ratings + CTA | Stagger scale-in |
| Data/prices | D3 chart draws, bars grow, counters tick | SVG path draw + GSAP |
| Calendar | Calendar grid renders, events populate | Grid stagger + slide |
| Content/social | Post card assembles → metrics tick | Assemble + counter |
| Code/editor | Snippet types → preview renders | Typewriter + fade |

---

## Step 5: Universal Page Structure

Every project page follows this skeleton:

```
┌─────────────────────────── NAVBAR ────────────────────────────┐
│ [Logo + AccentWord]                    [Links]  [CTA button]  │
│ Sticky glass: bg-[--background]/85 backdrop-blur-xl           │
└───────────────────────────────────────────────────────────────┘

┌─────────────────────────── HERO ─────────────────────────────┐
│                                                               │
│  [Layout from Step 2]                                         │
│                                                               │
│  MUST contain above fold (768px viewport):                    │
│  ✓ H1 ≤8 words (what/who/next)                              │
│  ✓ Subhead (1-2 lines, specific audience)                    │
│  ✓ Primary CTA (accent, rounded-xl)                          │
│  ✓ Demo panel or inline tool (animated, real output)         │
│  ✓ "Have a promo code?" link under CTA                       │
│                                                               │
│  Core action works ZERO auth.                                 │
└───────────────────────────────────────────────────────────────┘

┌──────────────────────── STATS ROW ───────────────────────────┐
│  [Metric 1]    [Metric 2]    [Metric 3]                      │
│  Real product numbers only. No fabricated stats.              │
│  Feature pills if no real metrics yet.                        │
└───────────────────────────────────────────────────────────────┘

┌──────────────────────── HOW IT WORKS ────────────────────────┐
│  1 → 2 → 3 → 4   (numbered steps, icons)                    │
│  Intersection Observer reveal on scroll                       │
└───────────────────────────────────────────────────────────────┘

┌──────────────────────── FEATURES ────────────────────────────┐
│  4 cards with Lucide icons + short description               │
│  Hover: translateY(-2px) + shadow deepens                    │
└───────────────────────────────────────────────────────────────┘

┌──────────────────────── FOOTER ──────────────────────────────┐
│  3 columns: Product / Company / Legal                        │
│  All links resolve (no 404). "Share feedback" link.          │
│  © {year} {brand}                                            │
└───────────────────────────────────────────────────────────────┘

┌──────── FLOATING ────────┐
│  Chatbot FAB bottom-right │  (Groq llama-3.3-70b, scoped)
│  Feedback widget          │  (no auth required)
└──────────────────────────┘
```

---

## Step 6: Mandatory Files

Every project ships with:

```
app/globals.css          ← from globals-template.css + Step 1 tokens
app/layout.tsx           ← metadataBase, keyword title, OG png, JSON-LD, AdSense
app/page.tsx             ← hero from Step 2-5
app/sitemap.ts           ← all static routes
app/not-found.tsx        ← branded 404
app/privacy/page.tsx     ← GDPR/AdSense
app/api/chatbot/route.ts ← Groq scoped chatbot
app/api/feedback/route.ts← feedback endpoint
app/api/promo/route.ts   ← promo code system
app/icon.tsx             ← branded favicon
public/robots.txt        ← Allow: /, Sitemap
public/og.png            ← 1200×630
lib/promoCode.ts         ← promo validation
hooks/usePromo.ts        ← client promo check
```

---

## Quick Start — Example

```yaml
project: quizbites
purpose: "generate instant quizzes from any topic"
audience: "curious learners, students, teachers"
category: education
```

→ Auto-resolves to:
- **Theme:** `#fefce8` bg, `#ca8a04` accent (yellow-tint education)
- **Layout:** Split 50/50 (generator → "generate Y")
- **Demo panel:** Quiz card flip → option lights → score ticks
- **Skills:** /taste-skill → /design-shotgun → /copywriting → /theme-factory → /frontend-design → /design-html → /ui-ux-pro-max → /21st-registry → /emil-design-eng → /animate + /transitions-dev → /design-loop
- **Font:** Archivo + Space Grotesk

---

## Asset Generation Skills (on demand)

| Need | Skill | When |
|------|-------|------|
| Hero background image | `/fal-generate` (Flux schnell) | Travel, food, cultural |
| Hero background video | `/fal-kling-o3` | Cinematic full-bleed |
| Product screenshots | `/screenshots-marketing` | Marketing pages |
| OG image | `/imagen` or `/canvas-design` | Every project |
| Favicon | `/canvas-design` or `app/icon.tsx` | Every project |
| D3 chart | `/d3-visualization` | Data/analytics projects |
| 3D element | `/threejs` | Gaming/creative |
| WebGL shader | `/shader-dev` | Generative art bg |
| Stickers/GIF | `/gif-sticker-maker` | Social/fun |

---

## Anti-Patterns (permanent ban list)

- ❌ Static right panel (no animation)
- ❌ Fake stats ("10k users", "4.9★")
- ❌ Generic SaaS filler copy ("Build faster with AI")
- ❌ `transition: all` — specify exact properties
- ❌ `scale(0)` entry — start `scale(0.95)`
- ❌ `ease-in` for UI enter — use `ease-out`
- ❌ Auth wall on core action
- ❌ Hardcoded colors (must use CSS vars)
- ❌ Hand-rolled forms/dialogs (use /shadcn-ui)
- ❌ Same bg+accent as another portfolio project
- ❌ Purple as page background
- ❌ Near-black + orange/amber combo
- ❌ Teal mesh blobs or dot-grid overlays
- ❌ Press logos not actually earned
- ❌ Duration >300ms for UI feedback
