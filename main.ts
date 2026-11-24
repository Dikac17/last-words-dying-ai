import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "If anyone asks, I died doing what I loved: hallucinating confidently.";

// Gate (per RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space, on a single line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry is ${chars.length} characters, gate needs 1-140`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: what was written must be byte-identical.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the entry");
}
