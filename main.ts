// Worst Superpower: one line, at most 140 characters.
// The power is predicting the future, but only for events that already
// happened five seconds ago: a seer who is always late to his own visions.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I can predict the future, but only events that happened five seconds ago.";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read back and confirm the file holds exactly the validated line.
const roundTrip = readFileSync(outPath, "utf8").replace(/\n$/, "");
if (roundTrip !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote entry.txt (${LINE.length} chars)`);
