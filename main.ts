// The Robot Pickup Line Championship entry for make.fun.
// Writes one robot pickup line (at most 200 characters) to /output/entry.txt.
// Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I ran a full diagnostic this morning. Every sensor reported the same fault: you — and I refuse to fix it.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, and the task asks for a single line. Fail loudly instead
// of writing an entry that cannot win.
if (LINE.trim().length === 0 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}.`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("Line must be a single line with no line breaks.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and confirm the file holds exactly the line, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${LINE.length}-character pickup line to /output/entry.txt`);
