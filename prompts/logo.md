# Logo brief (per project, from its real context)
Input: product (one line), audience, core action, accent hex from tokens/palette-registry.json, one concrete metaphor.
Step 1: propose 3 symbol directions (concept name + 1-line rationale). Each must differ from every `concept` in logos/registry.json. Wait for the owner's pick.
Step 2: draw SVG by hand (no image-gen API, no paid tools). Outputs: mark.svg, wordmark.svg (key word in accent), icon.svg (tab icon, own background, readable at 16px), favicon.ico, apple-touch-icon 180, icon-192, icon-512, og.png, dark-tab variant via prefers-color-scheme inside icon.svg.
Step 3: verify 16/32/48px renders, 4.5:1 mark vs its background, then record concept + paths in logos/registry.json and hub logo_<siteId>.
Banned: stock icon + plain text, generic gradient blob, letter-in-circle, a stray app/icon.tsx shadowing the real favicon, the same silhouette as another project.
