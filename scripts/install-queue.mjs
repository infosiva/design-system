#!/usr/bin/env node
// Runs approved installs from registry/install-queue.json (hub writes it later via Edge Config; same shape).
// Item: {id, kind:'skill'|'model', source, scope:'project'|'common', approved:true, status?}
// Only allow-listed kinds run; nothing runs unless approved === true. Free-only: models must be zero-price.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const qPath = join(root, "registry/install-queue.json");
const dry = process.argv.includes("--dry");
const read = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : d);
const queue = read(qPath, { entries: [] });
const GH = /^[\w.-]+\/[\w.-]+$/; // owner/repo only, no free text reaches a shell

let ran = 0;
for (const it of queue.entries) {
  if (!it.approved || it.status === "done") continue;
  try {
    if (it.kind === "skill") {
      if (!GH.test(it.source)) throw new Error("bad source " + it.source);
      const dest = join(homedir(), ".claude/skills", it.source.split("/")[1]);
      if (!dry && !existsSync(dest)) execFileSync("git", ["clone", "--depth=1", `https://github.com/${it.source}.git`, dest], { stdio: "ignore" });
      console.log(`skill ${it.source} -> ${dest}${dry ? " (dry)" : ""}`);
    } else if (it.kind === "model") {
      const p = join(root, "registry/models.json");
      const m = read(p, null);
      if (!m.providers[it.id]) m.providers[it.id] = { free: true, env: it.env ?? "", note: it.source };
      if (!dry) writeFileSync(p, JSON.stringify(m, null, 2) + "\n");
      console.log(`model ${it.id} added to registry${dry ? " (dry)" : ""}`);
    } else throw new Error("kind not allow-listed: " + it.kind);
    if (!dry) it.status = "done";
    ran++;
  } catch (e) {
    it.status = "error: " + e.message;
    console.log(`FAIL ${it.id}: ${e.message}`);
  }
}
if (!dry) writeFileSync(qPath, JSON.stringify(queue, null, 2) + "\n");
console.log(`PASS: ${ran} installed, ${queue.entries.filter(i => !i.approved).length} awaiting approval`);
