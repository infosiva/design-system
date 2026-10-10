import { get } from "@vercel/edge-config";
import { unstable_cache } from "next/cache";
import { mergeScopes } from "./scope-merge";
import typography from "../../registry/typography.json";

export interface SiteWidgets {
  chatbot?: boolean;
  usagePill?: boolean;
  streak?: boolean;
  banner?: boolean;
  stickyFooterCTA?: boolean;
  backToTop?: boolean;
  pageStats?: boolean;
  cookieConsent?: boolean;
}

export interface SiteLayout {
  hideSections?: string[];
  heroVariant?: "split" | "centered" | "minimal";
  archetype?: string; // id from design-system/layout-archetypes.ts; wins over auto pick
  bgAnimation?: "none" | "aurora" | "mesh" | "dotgrid" | "gradient-shift";
  bgSpeed?: number; // 1-10
}

/** Per-site tracking. Off until ga4Id is set. Hub-editable, no code change. */
export interface SiteAnalytics {
  ga4Id?: string; // G-XXXXXXXXXX
}

export interface SiteCopy {
  headline?: string;
  subheadline?: string;
  ctaPrimary?: string;
  badge?: string;
}

export interface SiteFont {
  heading?: string;
  body?: string;
}

/** Hub-editable design-system overrides (delta only). Defaults live in design-system/tokens. */
export interface SiteDesign {
  dials?: { variance?: number; motion?: number; density?: number }; // 1-10
  radius?: number; // px
  spacingUnit?: number; // rem
  fontPair?: string; // id in registry/typography.json
  template?: string; // id in registry/templates.json
  logoVariant?: string;
  paletteShared?: boolean; // owner explicitly allows a non-unique accent
  templateOk?: boolean; // owner explicitly allows the stock template look
  brief?: string; // extra prompt text appended to UI tasks for this site
}

export interface SiteTheme {
  layoutId?: string; // id in registry/layouts.json
  design?: SiteDesign;
  analytics?: SiteAnalytics;
  background?: string;
  primary?: string;
  secondary?: string;
  texture?: string;
  widgets?: SiteWidgets;
  layout?: SiteLayout;
  copy?: SiteCopy;
  font?: SiteFont;
}

/**
 * Reads ds_common (all projects) merged under theme_<siteId> (one project), cached.
 * Both are Edge Config keys, so the hub changes either with no code deploy.
 * Returns null if neither is set — caller should use its own defaults.
 */
export async function loadSiteTheme(siteId: string): Promise<SiteTheme | null> {
  try {
    const [common, site] = await unstable_cache(
      () => Promise.all([get<SiteTheme>("ds_common"), get<SiteTheme>(`theme_${siteId}`)]),
      ["site-theme", siteId],
      { revalidate: 600 },
    )();
    if (!common && !site) return null;
    const t = mergeScopes<SiteTheme>(common, site);
    // design.fontPair (registry id) fills font.heading/body unless the hub set them explicitly
    const pair = typography.entries.find((e: { id: string }) => e.id === t.design?.fontPair);
    return pair ? mergeScopes<SiteTheme>({ font: { heading: pair.display, body: pair.body } }, t) : t;
  } catch {
    return null;
  }
}

/**
 * Generates a <style> tag string injecting CSS custom properties.
 * Drop into layout.tsx dangerouslySetInnerHTML to apply theme globally.
 */
export function buildThemeStyleTag(theme: SiteTheme | null, defaults?: {
  background?: string;
  primary?: string;
  secondary?: string;
}): string {
  const bg  = theme?.background ?? defaults?.background;
  const pri = theme?.primary    ?? defaults?.primary;
  const sec = theme?.secondary  ?? defaults?.secondary;

  const vars: string[] = [];
  if (bg)  vars.push(`--background: ${bg}; --theme-base: ${bg};`);
  if (pri) vars.push(`--theme-primary: ${pri}; --color-primary: ${pri};`);
  if (sec) vars.push(`--theme-secondary: ${sec}; --color-secondary: ${sec};`);

  // Dials (globals-template.css derives --dur-* and --space-unit from these); hub values win.
  const dials: string[] = [];
  if (typeof theme?.design?.dials?.motion === "number") dials.push(`--dial-motion: ${theme.design.dials.motion};`);
  if (typeof theme?.design?.dials?.density === "number") dials.push(`--dial-density: ${theme.design.dials.density};`);
  if (dials.length) vars.push(dials.join(" "));

  // Shape/space overrides from hub (design.radius px, design.spacingUnit rem).
  if (typeof theme?.design?.radius === "number") vars.push(`--radius: ${theme.design.radius}px;`);
  if (typeof theme?.design?.spacingUnit === "number") vars.push(`--space-unit: ${theme.design.spacingUnit}rem;`);

  // Font overrides
  const headingFont = theme?.font?.heading;
  const bodyFont    = theme?.font?.body;

  const rules: string[] = [];
  if (vars.length > 0) rules.push(`:root:root { ${vars.join(" ")} }`);
  if (headingFont) rules.push(`h1,h2,h3,.display { font-family: '${headingFont}', sans-serif !important; }`);
  if (bodyFont)    rules.push(`body { font-family: '${bodyFont}', system-ui, sans-serif !important; }`);

  return rules.join("\n");
}

/**
 * Checks if a specific widget is hidden for this site.
 * Default: shown unless explicitly set to false.
 */
export function isWidgetHidden(theme: SiteTheme | null, widgetKey: keyof SiteWidgets): boolean {
  return theme?.widgets?.[widgetKey] === false;
}

/**
 * Returns true if the given section should be hidden.
 */
export function isSectionHidden(theme: SiteTheme | null, sectionId: string): boolean {
  return theme?.layout?.hideSections?.includes(sectionId) ?? false;
}

/**
 * Returns copy override or falls back to provided default.
 */
export function getCopy(theme: SiteTheme | null, key: keyof SiteCopy, fallback: string): string {
  return theme?.copy?.[key] ?? fallback;
}

const GA4_RE = /^G-[A-Z0-9]{6,12}$/;
export const isValidGa4Id = (id?: string) => !!id && GA4_RE.test(id);

/**
 * GA4 bootstrap (inline script) or "" when no valid id. Anonymised IP, consent-denied by default
 * until the site's cookie consent calls gtag('consent','update',{analytics_storage:'granted'}).
 * Usage events: window.gtag?.('event','layout_view',{archetype}) — anonymous only, no personal data.
 */
export function buildGa4Snippet(theme: SiteTheme | null): string {
  const id = theme?.analytics?.ga4Id;
  if (!isValidGa4Id(id)) return "";
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;
}

/** Attributes for <html>: sites style off data-layout/data-template/data-logo, so a hub change re-skins with no site code. */
export function buildDesignAttrs(theme: any): Record<string, string> {
  const d = theme?.design ?? {};
  const out: Record<string, string> = {};
  if (theme?.layoutId) out["data-layout"] = String(theme.layoutId);
  if (d.template) out["data-template"] = String(d.template);
  if (d.logoVariant) out["data-logo"] = String(d.logoVariant);
  return out;
}
