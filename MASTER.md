# Portfolio Design System — MASTER
**Generated:** 2026-06-17 via ui-ux-pro-max skill + competitor research
**Rule:** No two projects share same bg hex + accent hex. Every new project checks this file first.

---

## Global Style: Motion-Driven
- **Animation duration:** 150–300ms UI, 400ms entrance, 600ms page transitions
- **Easing (enter):** `cubic-bezier(0.23, 1, 0.32, 1)` — never `ease-in` for UI enter
- **Button active:** `transform: scale(0.97)` — every interactive element, no exceptions
- **Entry pattern:** `scale(0.95) opacity(0)` → `scale(1) opacity(1)` — never `scale(0)`
- **Scroll reveal:** Intersection Observer, `translateY(24px) → 0` + opacity
- **`prefers-reduced-motion`:** Wrap ALL transform animations
- **Stagger children:** `animation-delay: calc(N * 0.06s)`
- **Never:** `transition: all` — always specific properties only
- **Framework:** Framer Motion `spring({ stiffness:80, damping:20 })` for entrance

## Global Typography
- **Display / Hero:** Archivo (700, 300 weight range)
- **Body / UI:** Space Grotesk (400, 500, 600)
- **Mono / Code:** JetBrains Mono (agenttrace only)
- **Font import:**
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  ```
- **Base:** 16px, line-height 1.5, letter-spacing -0.01em on headings
- **H1:** clamp(2.5rem, 5vw, 4rem) — never px fixed
- **Touch targets:** 44×44px minimum

## Global Layout Rules (every project)
- **Split hero (desktop):** `lg:grid-cols-2` — left=hero+CTA, right=animated demo panel
- **Above fold:** headline + tagline + CTA + demo all visible at 768px height
- **Right panel:** Animated live product simulation — NEVER static illustration
- **Mobile demo:** `lg:hidden` swipeable 4-card snap-scroll strip
- **Mobile:** Single column, no horizontal overflow at 375px (test with Playwright)
- **Navbar:** Sticky glass `bg-white/60 backdrop-blur-xl border-b border-[--border]`
- **Logo:** Brand icon + product name, key word in `var(--accent)` color
- **Chatbot FAB:** Fixed bottom-right `z-index:9999`, always visible

## Global Component Standards

### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--accent);
  color: #fff;
  border-radius: 12px;
  padding: 14px 28px;
  font-weight: 700;
  transition: box-shadow 160ms cubic-bezier(0.23,1,0.32,1),
              transform 100ms cubic-bezier(0.23,1,0.32,1);
}
.btn-primary:hover { box-shadow: 0 6px 28px color-mix(in srgb, var(--accent) 40%, transparent); }
.btn-primary:active { transform: scale(0.97); }
```

### Cards
```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: box-shadow 200ms cubic-bezier(0.23,1,0.32,1),
              transform 150ms cubic-bezier(0.23,1,0.32,1);
}
.card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
```

### Inputs
```css
input, textarea {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 16px; /* iOS zoom prevention */
  transition: border-color 200ms;
}
input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent); }
```

---

## Per-Category Theme Registry

### EDUCATION / QUIZ
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| tutiq | `#f0f9ff` | `#0284c7` | `#0ea5e9` | LOCKED |
| quizbites | `#fefce8` | `#854d0e` | `#ca8a04` | LOCKED |
| kwizzo | `#0f0f23` | `#a78bfa` | `#f59e0b` | LOCKED (dark) |
| speakiq | `#fdf4ff` | `#7e22ce` | `#9333ea` | ASSIGNED |

**tutiq CSS tokens:**
```css
--background: #f0f9ff; --foreground: #0f172a;
--accent: #0284c7; --accent-2: #0ea5e9;
--card: #ffffff; --border: #bae6fd; --muted: #e0f2fe;
```

**quizbites CSS tokens (NEW — replaces old sky-blue collision):**
```css
--background: #fefce8; --foreground: #0f172a;
--accent: #ca8a04; --accent-2: #eab308;
--card: #ffffff; --border: #fef08a; --muted: #fef9c3;
```

**kwizzo CSS tokens:**
```css
--background: #0f0f23; --foreground: #f8fafc;
--accent: #f59e0b; --accent-2: #a78bfa;
--card: rgba(255,255,255,0.04); --border: rgba(255,255,255,0.08);
```

**speakiq CSS tokens:**
```css
--background: #fdf4ff; --foreground: #0f172a;
--accent: #9333ea; --accent-2: #a855f7;
--card: #ffffff; --border: #f3e8ff; --muted: #fae8ff;
```

---

### FINANCE / BILLING
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| invoicemint | `#f0fdf4` | `#1e3a5f` | `#059669` | ASSIGNED |
| trackwealth | `#0b1420` | `#f59e0b` | `#fbbf24` | ASSIGNED (dark) |
| billslash | `#f8fafc` | `#1e293b` | `#0284c7` | RESERVED |

**invoicemint CSS tokens (redesign — finance green):**
```css
--background: #f0fdf4; --foreground: #0f172a;
--accent: #059669; --accent-2: #10b981;
--card: #ffffff; --border: #bbf7d0; --muted: #dcfce7;
--primary: #1e3a5f;
```

**trackwealth CSS tokens:**
```css
--background: #0b1420; --foreground: #f8fafc;
--accent: #f59e0b; --accent-2: #fbbf24;
--card: rgba(255,255,255,0.04); --border: rgba(251,191,36,0.15);
```

---

### HEALTH / WELLNESS
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| myvitals | `#f0fdfa` | `#0d9488` | `#14b8a6` | LOCKED |
| voicejournal | `#f5f0ff` | `#7c3aed` | `#8b5cf6` | LOCKED |
| aicoachlab | `#fff7ed` | `#ea580c` | `#f97316` | ASSIGNED |

**myvitals CSS tokens:**
```css
--background: #f0fdfa; --foreground: #0f172a;
--accent: #0d9488; --accent-2: #14b8a6;
--card: #ffffff; --border: #ccfbf1; --muted: #e6fcf7;
```

**voicejournal CSS tokens:**
```css
--background: #f5f0ff; --foreground: #0f172a;
--accent: #8b5cf6; --accent-2: #a78bfa;
--card: #ffffff; --border: #ede9fe; --muted: #f5f3ff;
```

**aicoachlab CSS tokens (career coaching = warm/energetic):**
```css
--background: #fff7ed; --foreground: #0f172a;
--accent: #ea580c; --accent-2: #f97316;
--card: #ffffff; --border: #fed7aa; --muted: #ffedd5;
```

---

### PRODUCTIVITY / SAAS
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| zerostaff | `#0b1120` | `#10b981` | `#34d399` | LOCKED (dark) |
| replydesk | `#f8f9ff` | `#4f46e5` | `#6366f1` | ASSIGNED |
| draftcal | `#fffbf5` | `#92400e` | `#d97706` | ASSIGNED |
| pdfideas | `#fafafe` | `#4338ca` | `#6366f1` | LOCKED |

**replydesk CSS tokens:**
```css
--background: #f8f9ff; --foreground: #0f172a;
--accent: #4f46e5; --accent-2: #6366f1;
--card: #ffffff; --border: #e0e7ff; --muted: #eef2ff;
```

**draftcal CSS tokens:**
```css
--background: #fffbf5; --foreground: #0f172a;
--accent: #d97706; --accent-2: #f59e0b;
--card: #ffffff; --border: #fde68a; --muted: #fef3c7;
```

**pdfideas CSS tokens:**
```css
--background: #fafafe; --foreground: #0f172a;
--accent: #6366f1; --accent-2: #818cf8;
--card: #ffffff; --border: #e0e7ff; --muted: #eef2ff;
```

---

### DEV TOOLS / AI INFRA
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| agenttrace | `#0c111a` | `#22d3ee` | `#67e8f9` | ASSIGNED (dark) |
| neuralos | `#080d1a` | `#6366f1` | `#818cf8` | LOCKED (dark) |
| resumevault | `#0c0f1a` | `#7c3aed` | `#a78bfa` | ASSIGNED (dark) |

**agenttrace CSS tokens:**
```css
--background: #0c111a; --foreground: #f8fafc;
--accent: #22d3ee; --accent-2: #67e8f9;
--card: rgba(255,255,255,0.04); --border: rgba(34,211,238,0.15);
```

**resumevault CSS tokens:**
```css
--background: #0c0f1a; --foreground: #f8fafc;
--accent: #7c3aed; --accent-2: #a78bfa;
--card: rgba(255,255,255,0.04); --border: rgba(124,58,237,0.2);
```

---

### MEDIA / CREATIVE
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| photorestore | `#faf7f4` | `#a16207` | `#c8894a` | LOCKED |
| pixelforge | `#0e0e16` | `#7c3aed` | `#a78bfa` | LOCKED (dark) |

**photorestore CSS tokens (warm cream — nostalgic photo restoration):**
```css
--color-bg: #faf7f4; --color-primary: #1a1209;
--color-accent: #c8894a; --color-border: #e4d9cc;
```

---

### TRAVEL / LOCAL
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| roamplan | `#f0fdf4` | `#065f46` | `#059669` | NOTE: same bg as invoicemint, diff accent shade ✓ |
| anylocal | `#fffbf5` | `#9a3412` | `#ea580c` | LOCKED |
| homecanvas | `#fffdf7` | `#57534e` | `#78716c` | ASSIGNED |

---

### NEWS / TRENDS
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| worldtrends | `#f9fafb` | `#dc2626` | `#ef4444` | LOCKED |

---

### GAMING
| Project | BG | Primary | Accent | Status |
|---------|-----|---------|--------|--------|
| rideflow | `#080f1a` | `#2563eb` | `#3b82f6` | LOCKED |

---

## Design Tool Pipeline (per project, every touch)
1. **Theme check** → grep this file, confirm no bg+accent collision
2. **`/design-shotgun`** → 3 visual directions (pick furthest from existing portfolio)
3. **`/design-html`** → Claude canvas generates hero HTML+Tailwind
4. **`/ui-ux-pro-max`** → quality pass (this skill — run `--design-system --persist`)
5. **`/21st-registry`** → pull polished components (don't hand-roll buttons/cards/forms)
6. **`/emil-design-eng`** → polish (spacing, micro-interactions, taste layer)
7. **`/animate`** → Framer Motion, spring physics, stagger sequences
8. **`/transitions-dev`** → card-resize, modal, page-slide, state-swap patterns
9. **`/fixing-accessibility`** → WCAG 4.5:1 contrast, focus states, aria labels
10. **`/fixing-metadata`** → metadataBase, OG image, JSON-LD, robots.txt
11. Playwright 375px + 1280px screenshots → visual confirm
12. `npm run build` → exit 0 → push

## Animated Demo Panel (right panel) — per project
Every right panel must animate the actual product. Reference:

| Project | Animation |
|---------|-----------|
| invoicemint | Invoice skeleton types field-by-field → "Sent" ✓ → calendar +7 days → "Overdue" → chaser email types → "Paid" 🎉 |
| quizbites | Topic typed → 3 quiz cards slide in → answer lights up green → new topic cycles |
| aicoachlab | AI asks behavioral question → answer types word-by-word → feedback card slides in (score + 2 bullets + rephrased) |
| replydesk | Raw angry ticket appears → "Drafting..." shimmer → AI reply types out → tone badge shows → cycles |
| voicejournal | Waveform bars pulse → transcript text appears → mood tag auto-detected → entry saved |
| resumevault | Resume fields populate line by line → score ring fills → "ATS: 94%" badge appears |
| myvitals | Health score ring fills → metric cards count up → trend arrow appears |
| agenttrace | Terminal log stream scrolls → trace spans stack → error highlighted → resolved |
| draftcal | Calendar fills with AI-drafted posts → schedule slots animate → "Published" badge |

## Favicon / Icon standard (ALL projects)
Every project must have `app/icon.tsx` — branded SVG, NOT default Next.js triangle.

```tsx
// app/icon.tsx — template (customize color/letter per project)
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export default function Icon() {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="VAR_ACCENT" />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
        fill="#fff" fontSize="16" fontWeight="800" fontFamily="system-ui">
        INITIAL
      </text>
    </svg>
  )
}
```

## Chatbot (every project — §Z5)
- Component: `FloatingChatWrapper` imported in `app/layout.tsx`
- Model: Groq `llama-3.1-8b-instant`, max 300 tokens
- Rate limit: 60 req/hr per IP
- System prompt ends: "If asked outside [TOPIC], say: I'm trained for [SITE]. Try Google or ChatGPT!"
- Fallback chain: Groq → Gemini → Cerebras → graceful "Chat resting, try again"
- FAB: fixed bottom-right, `z-index:9999`, accent color

## Feedback Widget (every project — §Z5)
- Route: `app/api/feedback/route.ts`
- Fields: `{rating, message, email?, page, site}`
- Log to console + Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)
- No auth required

---

## Quick Collision Checker
Before assigning any new project theme, check these BANNED combos (already in use):
```
#f0f9ff + #0284c7  → tutiq ONLY
#fefce8 + #ca8a04  → quizbites ONLY
#0f0f23 + #f59e0b  → kwizzo ONLY
#fdf4ff + #9333ea  → speakiq ONLY
#f0fdf4 + #059669  → invoicemint ONLY (roamplan uses same bg, diff accent #065f46)
#0b1420 + #f59e0b  → trackwealth ONLY
#f0fdfa + #0d9488  → myvitals ONLY
#f5f0ff + #8b5cf6  → voicejournal ONLY
#fff7ed + #ea580c  → aicoachlab ONLY
#0b1120 + #10b981  → zerostaff ONLY
#f8f9ff + #4f46e5  → replydesk ONLY
#fffbf5 + #d97706  → draftcal ONLY
#fafafe + #6366f1  → pdfideas ONLY
#0c111a + #22d3ee  → agenttrace ONLY
#080d1a + #6366f1  → neuralos ONLY
#0c0f1a + #7c3aed  → resumevault ONLY
#faf7f4 + #c8894a  → photorestore ONLY
#0e0e16 + #7c3aed  → pixelforge ONLY
#fffdf7 + #78716c  → homecanvas ONLY
#fffbf5 + #ea580c  → anylocal ONLY
#080f1a + #3b82f6  → rideflow ONLY
#f9fafb + #dc2626  → worldtrends ONLY
```

New project → pick a combo NOT in this list. Add to list when assigned.
