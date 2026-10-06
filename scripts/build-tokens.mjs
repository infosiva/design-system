#!/usr/bin/env node
// tokens.json -> tokens/tokens.css (:root vars) + tokens/theme.css (Tailwind v4 @theme). No deps.
import { readFileSync, writeFileSync } from "node:fs";
const t = JSON.parse(readFileSync(new URL("../tokens/tokens.json", import.meta.url)));
const flat = Object.entries(t).filter(([k]) => !k.startsWith("_") && k !== "dials")
  .flatMap(([g, o]) => Object.entries(o).map(([k, v]) => [`${g}-${k}`, v]));
const body = (pre) => flat.map(([k, v]) => `  ${pre}${k}: ${v};`).join("\n");
writeFileSync(new URL("../tokens/tokens.css", import.meta.url), `:root {\n${body("--")}\n}\n`);
writeFileSync(new URL("../tokens/theme.css", import.meta.url), `@theme {\n${body("--")}\n}\n`);
console.log(`${flat.length} tokens -> tokens.css, theme.css`);
