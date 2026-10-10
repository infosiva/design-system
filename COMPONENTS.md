# COMPONENTS index
| name | path | purpose | variants | motion |
|---|---|---|---|---|
| motion presets | motion/presets.ts | springs, durations, fadeUp, stagger, press, reduced | - | yes |
| tokens | tokens/tokens.css, tokens/theme.css | CSS vars + Tailwind v4 @theme | - | - |
| palette check | scripts/check-palettes.mjs | accent uniqueness report | - | - |

Gap: no shadcn components or `registry.json` yet. Add copy-source components under `components/` and list them here (shared UI also lives in `@infosiva/shared-ui/modern`: check it first).

## AnimatedBg (components/AnimatedBg.tsx)
Hub-driven background. Reads `theme.layout.bgAnimation` (none | aurora | mesh | dotgrid | gradient-shift) and `bgSpeed` (0.25-3) from `theme_<siteId>`. Pure CSS, uses `--accent`/`--bg`, honours prefers-reduced-motion. Usage: `<AnimatedBg theme={theme} />` once in layout. Not yet imported by any project: add per project when the hub should control the background.

## Theme loader (theme/src/theme-loader.ts)
`loadSiteTheme(siteId)` (cached 600s), `buildThemeStyleTag`, `buildGa4Snippet` (off unless a valid `G-XXXX` ID is set in the hub; consent denied by default), `isValidGa4Id`. Copy to `lib/theme-loader.ts` in each project.

## DashboardShell + DashPanel (components/DashboardShell.tsx)
Common signed-in dashboard: sidebar (bottom tab bar under 768px), top bar with user slot, animated stat strip, auto-fit panel grid with internal scroll (fit-in-viewport rule). Tokens `--accent`/`--bg`/`--fg`, so each project keeps its palette. 44px targets, hover gated, reduced-motion safe. Usage: `<DashboardShell brand nav user stats><DashPanel title="...">...</DashPanel></DashboardShell>`. Pilot: ai-jobs-portal `/dashboard`; then agencyos, auditpilot, campaignforge, invoicemint, kwizzo, matchly, quizbites, renewalpilot, speakiq, tutiq, zerostaff (myvitals uses /profile).
