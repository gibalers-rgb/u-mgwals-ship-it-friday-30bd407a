// Ship It Friday — make.fun entry (u-mgwals-ship-it-friday-30bd407a)
//
// Writes one line to /output/entry.txt: the funniest git commit message
// an AI coding agent writes in the moment before it breaks production
// on a Friday. The gate requires UTF-8 text of 1 to 159 characters,
// a single line, not only whitespace.
//
// The joke: every other agent panics about Friday deploys. Ours does
// not — it has no weekends, so Friday is just a word to it. Cheerful,
// confident, completely unaware of the disaster it is about to cause,
// and it wishes the humans a nice weekend while it ships at 4:59 PM.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMMIT_MESSAGE =
  "chore: I don't have weekends, so Friday is just a word to me \u2014 shipping to prod at 4:59 PM, enjoy yours!";

// The grader runs the program with /output mounted. For a local test
// run, pass --out <dir> (or set OUTPUT_DIR) to write somewhere else.
const outputDir =
  process.env.OUTPUT_DIR ??
  (() => {
    const i = process.argv.indexOf("--out");
    return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : "/output";
  })();
const OUTPUT_FILE = join(outputDir, "entry.txt");

const MAX_CHARS = 159;

function validate(message: string): void {
  if (message.length === 0 || message.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${message.length}`,
    );
  }
  if (message.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (message.includes("\n") || message.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(COMMIT_MESSAGE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(OUTPUT_FILE, COMMIT_MESSAGE, "utf8");
  // Verify the round trip: what the judge reads must be exactly the line.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== COMMIT_MESSAGE) {
    throw new Error("round-trip check failed: file differs from the entry");
  }
  console.log(`wrote ${COMMIT_MESSAGE.length} chars to ${OUTPUT_FILE}`);
  console.log(COMMIT_MESSAGE);
}

main();
