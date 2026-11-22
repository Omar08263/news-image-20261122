// Entry program for news-image-20261122.
//
// The poster (entry.png) was composed in this session: four scene
// images generated fresh for this day's stories, laid out and captioned
// with a Python/PIL script. This program only copies the finished
// poster into the grader's output directory, byte for byte, so the two
// graded runs write identical output. Standard library only, no network.
//
// Layout of the poster (1024x1024, all four stories illustrated):
//   masthead   y 0-118   navy + gold rule; date + "THE DAY IN NEWS"
//   hero COP31 y 118-500 image; headline y=372; dek lines y=440, 472
//   panels     y 500-660 images (Gulf, Delhi); tag y=676; headlines
//              y=704, 744; sub lines y=790, 815, 840
//   divider    y 868-870 gold rule
//   HK panel   y 876-984 ballot-box image x 0-320; tag y=882;
//              headline y=906; sub y=946 (one line)
//   footer     y=990, 18px — ink bottom ~1010, bottom margin ~13px
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const posterPath = join(repoRoot, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

// Hard limits from the competition rules: at most 1 MiB, at most
// 1024 by 1024 pixels, a whole JPEG file.
const MAX_BYTES = 1048576;
const POSTER_WIDTH = 1024;
const POSTER_HEIGHT = 1024;

// Read the JPEG dimensions (width, height) from the frame header
// (SOF0/SOF2 marker) without any dependency: scan the marker segments
// after the SOI marker until the frame header is found.
function jpegDimensions(buf: Buffer): { width: number; height: number } {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) {
    throw new Error("poster is not a JPEG file (missing SOI marker)");
  }
  let off = 2;
  while (off + 4 <= buf.length) {
    if (buf[off] !== 0xff) {
      throw new Error(`bad JPEG marker at offset ${off}`);
    }
    const marker = buf[off + 1];
    // Standalone markers carry no length field.
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      off += 2;
      continue;
    }
    const len = buf.readUInt16BE(off + 2);
    if (marker === 0xc0 || marker === 0xc2) {
      const height = buf.readUInt16BE(off + 5);
      const width = buf.readUInt16BE(off + 7);
      return { width, height };
    }
    off += 2 + len;
  }
  throw new Error("no JPEG frame header (SOF) found in poster");
}

if (!existsSync(posterPath)) {
  throw new Error(`poster not found beside main.ts: ${posterPath}`);
}
const poster = readFileSync(posterPath);
if (poster.length === 0) {
  throw new Error("poster is empty, refusing to write an empty entry");
}
if (poster.length > MAX_BYTES) {
  throw new Error(
    `poster is ${poster.length} bytes, over the 1 MiB limit`,
  );
}
if (poster[poster.length - 2] !== 0xff || poster[poster.length - 1] !== 0xd9) {
  throw new Error("poster is not a whole JPEG file (missing EOI marker)");
}
const { width, height } = jpegDimensions(poster);
if (width !== POSTER_WIDTH || height !== POSTER_HEIGHT) {
  throw new Error(
    `poster is ${width}x${height}, expected ${POSTER_WIDTH}x${POSTER_HEIGHT}`,
  );
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
