// Entry program for news-image-20261122.
//
// The poster (entry.png) was composed in this session: three scene
// images generated fresh for this day's stories, laid out and captioned
// with a Python/PIL script. This program only copies the finished
// poster into the grader's output directory, byte for byte, so the two
// graded runs write identical output. Standard library only, no network.
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const posterPath = join(repoRoot, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

if (!existsSync(posterPath)) {
  throw new Error(`poster not found beside main.ts: ${posterPath}`);
}
const poster = readFileSync(posterPath);
if (poster.length === 0) {
  throw new Error("poster is empty, refusing to write an empty entry");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, poster);
// The grader collects the output as another user, so the file must be
// readable by everyone, not just its owner.
chmodSync(outPath, 0o644);
// Guard against a truncated write: read the file back and compare.
const written = readFileSync(outPath);
if (!written.equals(poster)) {
  throw new Error("output does not match the poster bytes");
}
console.log(`wrote ${poster.length} bytes to ${outPath}`);
