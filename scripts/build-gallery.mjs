#!/usr/bin/env node
// Builds gallery/index.html: palettes, layouts, tokens, motion, logo scope. Data embedded, no network. Run: node scripts/build-gallery.mjs
import { readFileSync, writeFileSync } from "node:fs";
const rd = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const pal = rd("../tokens/palette-registry.json"), lay = rd("../gallery/layouts.json"), tok = rd("../tokens/tokens.json"), roll = rd("../logos/rollout.json");
const oklab = (h) => { const [r,g,b]=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
  return [.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s]; };
const de=(a,b)=>Math.hypot(...oklab(a).map((v,i)=>v-oklab(b)[i]));
const lum=(h)=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const[x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+.05)/(y+.05)};
const P = Object.entries(pal.projects);
const clash = (n,a)=>P.filter(([k,p])=>k!==n&&de(p.accent,a)<pal.minAccentDeltaE).map(([k])=>k);
const esc=(s)=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const swatches = P.map(([n,p])=>{const c=clash(n,p.accent);const ratio=cr(p.bg,p.accent);
  return `<li class="sw${c.length?" clash":""}"><div class="chip" style="background:${p.bg}"><span style="background:${p.accent}"></span><b style="color:${p.accent}">Aa</b></div><h3>${esc(n)}</h3><p class="mono">${p.bg} · ${p.accent}</p><p class="mono sm">accent/bg ${ratio.toFixed(1)}:1${c.length?` · shares accent with ${esc(c.join(", "))}`:""}</p></li>`}).join("");
const wire = (l)=>{const hero={centered:'<i class="h c"></i>',split:'<i class="h s"><u></u><u></u></i>',fullbleed:'<i class="h f"></i>',terminal:'<i class="h t"></i>',chat:'<i class="h ch"></i>',magazine:'<i class="h m"><u></u><u></u><u></u></i>',bento:'<i class="h s"><u></u><u></u></i>','tool-first':'<i class="h s"><u></u><u></u></i>',story:'<i class="h m"><u></u><u></u></i>',search:'<i class="h c"><u></u></i>',map:'<i class="h f"></i>',compare:'<i class="h s"><u></u><u></u></i>'}[l.heroVariant]||'<i class="h c"></i>';
  const cards={grid:'<i class="cg"><u></u><u></u><u></u></i>',masonry:'<i class="cg ms"><u></u><u></u><u></u></i>',list:'<i class="cl"><u></u><u></u><u></u></i>',carousel:'<i class="cg"><u></u><u></u></i>','dashboard-panels':'<i class="cg dp"><u></u><u></u><u></u><u></u></i>',bento:'<i class="cg dp"><u></u><u></u><u></u><u></u></i>',kanban:'<i class="cg"><u></u><u></u><u></u></i>',timeline:'<i class="cl"><u></u><u></u><u></u></i>'}[l.cardStyle]||"";
  return `<div class="wf nav-${l.navStyle}"><em></em>${hero}${cards}</div>`};
const layouts = lay.map(l=>`<li class="lay"><div class="wfw">${wire(l)}</div><h3>${esc(l.name)}</h3><p>${esc(l.description)}</p><p class="mono sm">${esc(l.heroVariant)} hero · ${esc(l.navStyle)} nav · ${esc(l.cardStyle)} · ${esc(l.spacing)}</p><p class="tags">${l.bestFor.map(b=>`<span>${esc(b)}</span>`).join("")}</p></li>`).join("");
const tokrows = Object.entries(tok).filter(([k])=>!k.startsWith("_")&&k!=="dials").flatMap(([g,o])=>Object.entries(o).map(([k,v])=>`<tr><td class="mono">--${g}-${k}</td><td class="mono">${esc(v)}</td></tr>`)).join("");
const clashN = P.filter(([n,p])=>clash(n,p.accent).length).length;
const noTab = roll.filter(r=>r.tabIcon==="MISSING").length;
const html = `<title>Design System Gallery</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400&display=swap">
<style>
/* Layout: swatch-book index. Sticky section rail, dense specimen grids, one accent. */
:root{--bg:#f4f5f7;--surface:#fff;--fg:#14171f;--muted:#5a6272;--line:#d9dde5;--accent:#0b6bcb;--warn:#b4520a;--display:"Familjen Grotesk",system-ui,sans-serif;--body:"IBM Plex Sans",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0e1118;--surface:#161a23;--fg:#e8ebf2;--muted:#9aa3b5;--line:#2a3040;--accent:#5aa9ff;--warn:#f0a35c;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0e1118;--surface:#161a23;--fg:#e8ebf2;--muted:#9aa3b5;--line:#2a3040;--accent:#5aa9ff;--warn:#f0a35c;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font:15px/1.55 var(--body);padding-inline:max(16px,4vw);padding-block:0 64px}
.wrap{max-width:1180px;margin:0 auto}
header.top{padding-block:40px 20px}
h1{font:700 clamp(2rem,5vw,3.4rem)/1.05 var(--display);margin:0 0 12px;text-wrap:balance}
.lead{max-width:62ch;color:var(--muted);margin:0}
nav.rail{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--bg);border-bottom:1px solid var(--line);display:flex;gap:6px;flex-wrap:wrap;padding-block:10px;margin-bottom:8px}
nav.rail a{color:var(--fg);text-decoration:none;padding:6px 12px;border:1px solid var(--line);border-radius:6px;font:500 13px var(--body)}
nav.rail a:hover,nav.rail a:focus-visible{border-color:var(--accent);color:var(--accent);outline:none}
section{padding-block:36px 8px}
h2{font:700 1.6rem/1.2 var(--display);margin:0 0 6px}
.sub{color:var(--muted);margin:0 0 20px;max-width:70ch}
ul.grid{list-style:none;margin:0;padding:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}
ul.grid.wide{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
li{min-width:0}
.sw,.lay{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px}
.sw.clash{border-color:var(--warn)}
.sw h3,.lay h3{font:700 1rem var(--display);margin:10px 0 2px}
.chip{height:76px;border-radius:6px;border:1px solid var(--line);position:relative;display:flex;align-items:flex-end;justify-content:space-between;padding:8px 10px}
.chip span{position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:50%}
.chip b{font:700 1.7rem/1 var(--display)}
.mono{font-family:var(--mono);font-size:12.5px;margin:0;color:var(--fg)}
.sm{color:var(--muted);font-size:12px}
.lay p{margin:4px 0}
.tags{display:flex;gap:4px;flex-wrap:wrap}.tags span{font:12px var(--mono);border:1px solid var(--line);border-radius:4px;padding:1px 6px;color:var(--muted)}
.wfw{background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:8px}
.wf{display:flex;flex-direction:column;gap:5px;height:130px}
.wf em{height:8px;background:var(--line);border-radius:2px}
.wf.nav-sidebar{flex-direction:row;flex-wrap:wrap}.wf.nav-sidebar em{width:14px;height:100%}
.wf.nav-floating em{width:60%;align-self:center;border-radius:6px}.wf.nav-minimal em{width:30%}
.h{display:block;flex:1;background:color-mix(in srgb,var(--accent) 22%,transparent);border-radius:3px}
.h.s,.h.m{display:flex;gap:5px;background:none}.h.s u,.h.m u{flex:1;background:color-mix(in srgb,var(--accent) 22%,transparent);border-radius:3px}.h.s u+u{background:var(--line)}
.h.f{background:color-mix(in srgb,var(--accent) 45%,transparent)}.h.t{background:var(--fg);opacity:.85}.h.ch{margin-inline:18%;background:color-mix(in srgb,var(--accent) 30%,transparent);border-radius:12px}
.cg,.cl{display:grid;gap:4px;height:34px}.cg{grid-auto-flow:column;grid-auto-columns:1fr}.cl{grid-template-rows:repeat(3,1fr)}.cg.dp{height:44px;grid-template-columns:repeat(4,1fr)}
.cg u,.cl u{background:var(--line);border-radius:2px}.ms u:nth-child(2){transform:translateY(6px)}
table{width:100%;border-collapse:collapse;background:var(--surface);border:1px solid var(--line)}td{padding:6px 10px;border-bottom:1px solid var(--line)}
.scroll{overflow-x:auto;max-width:100%}
.note{border-left:3px solid var(--warn);padding:6px 12px;background:var(--surface);margin:0 0 16px;max-width:70ch}
.dem{display:flex;gap:12px;flex-wrap:wrap}.dem button{font:500 14px var(--body);color:var(--fg);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px 18px;min-height:44px;transition:transform .15s cubic-bezier(.22,1,.36,1)}.dem button:active{transform:scale(.97)}.dem button:focus-visible{outline:2px solid var(--accent)}
@media (prefers-reduced-motion:reduce){.dem button{transition:none}}
</style>
<div class="wrap">
<header class="top"><h1>Design System Gallery</h1><p class="lead">Everything the portfolio design system offers: ${P.length} registered project palettes, ${lay.length} layout archetypes, shared tokens, motion presets and the logo scope. Generated from the design-system repo.</p></header>
<nav class="rail" aria-label="Sections"><a href="#palettes">Palettes</a><a href="#layouts">Layouts</a><a href="#tokens">Tokens</a><a href="#motion">Motion</a><a href="#logos">Logos</a><a href="#hub">Hub controls</a></nav>
<section id="palettes"><h2>Colour palettes</h2><p class="sub">One background and accent per project. Each project gets a unique accent by default; sharing needs an explicit hub choice.</p>
<p class="note">${clashN} of ${P.length} projects currently share an accent with another (outlined). Not yet reassigned.</p><ul class="grid">${swatches}</ul></section>
<section id="layouts"><h2>Layout archetypes</h2><p class="sub">Pick one that differs from the last three projects. Wireframes show hero, nav and card style.</p><ul class="grid wide">${layouts}</ul></section>
<section id="tokens"><h2>Shared tokens</h2><p class="sub">Defaults in tokens/tokens.json. Taste dials: variance ${tok.dials.variance}, motion ${tok.dials.motion}, density ${tok.dials.density} (1-10).</p><div class="scroll"><table>${tokrows}</table></div></section>
<section id="motion"><h2>Motion</h2><p class="sub">Presets in motion/presets.ts: snappy, soft and bouncy springs; fast, base and slow durations; fadeUp, stagger and press; reduced-motion helper. Press a button to feel the press preset.</p><div class="dem"><button type="button">Press preset</button><button type="button">Press preset</button></div></section>
<section id="logos"><h2>Logos and tab icons</h2><p class="sub">Each project gets its own symbol concept, a wordmark with the key word in its accent, and a tab icon readable at 16px.</p><p class="note">Audit of ${roll.length} UI projects: ${noTab} have no tab icon, none has an apple-touch icon, no logo concept is recorded yet.</p></section>
<section id="hub"><h2>Hub controls</h2><p class="sub">Edge Config theme_&lt;siteId&gt; already sets background, primary, secondary, texture (aurora, mesh, dot grid, flat) and hero layout. New design field: taste dials, radius, extra brief text, shared-accent and template flags. A saved accent that matches another site's returns an error unless sharing is on.</p></section>
</div>`;
writeFileSync(new URL("../gallery/index.html", import.meta.url), html);
console.log("gallery/index.html", html.length, "bytes");
