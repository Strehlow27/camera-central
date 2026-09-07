import fs from "fs";

const filePath = "./src/data/cameras.js";

const scores = {
  "canon-r50": [3, 3],
  "canon-r10": [4, 3],
  "canon-r7": [5, 3],
  "canon-rp": [2, 4],
  "canon-r8": [4, 5],
  "canon-r": [2, 4],
  "canon-r6": [5, 5],
  "canon-r6m2": [5, 5],
  "canon-r5": [5, 5],
  "canon-r3": [5, 5],
  "canon-90d": [4, 3],
  "canon-m6m2": [2, 3],

  "sony-a6100": [4, 3],
  "sony-a6400": [4, 3],
  "sony-a6600": [4, 3],
  "sony-a6700": [5, 4],
  "sony-a7ii": [2, 4],
  "sony-a7iii": [3, 5],
  "sony-a7iv": [5, 5],
  "sony-a7cii": [4, 5],
  "sony-a7riv": [4, 5],
  "sony-a7rv": [5, 5],
  "sony-a7siii": [4, 4],
  "sony-a1": [5, 5],

  "nikon-z50": [3, 3],
  "nikon-zfc": [2, 3],
  "nikon-z5": [2, 4],
  "nikon-z6": [3, 4],
  "nikon-z6ii": [3, 4],
  "nikon-z7": [2, 5],
  "nikon-z7ii": [3, 5],
  "nikon-z8": [5, 5],

  "fuji-x-t30-ii": [2, 4],
  "fuji-x-e4": [2, 4],
  "fuji-xs20": [3, 4],
  "fuji-xt4": [3, 4],
  "fuji-xt5": [4, 4],
  "fuji-xh2": [4, 4],
  "fuji-xh2s": [5, 4],
  "fuji-gfx-50s-ii": [1, 5],
  "fuji-gfx-100s": [1, 5],

  "panasonic-s5": [2, 4],
  "panasonic-s5ii": [3, 4],
  "panasonic-s5iix": [2, 4],
  "panasonic-g9": [4, 3],
  "panasonic-g9ii": [5, 3],

  "om-om5": [3, 3],
  "om-om1": [5, 3],
  "olympus-em1m3": [4, 3],
  "olympus-em5m3": [2, 3],

  "leica-sl2": [2, 5],
  "leica-sl2s": [2, 5],

  "sigma-fp": [1, 4],
  "sigma-fp-l": [1, 4],

  "sony-rx100-vii": [3, 2],
  "sony-zv1": [1, 2],
  "canon-g7x-mark-iii": [1, 2],
  "ricoh-gr-iii": [1, 3],
  "fuji-x100v": [1, 4],
};

let text = fs.readFileSync(filePath, "utf8");

for (const [id, [wildlife, portrait]] of Object.entries(scores)) {
  const objectRegex = new RegExp(
    `(id:\\s*"${id}"[\\s\\S]*?landscape:\\s*\\d+,)`
  );

  const match = text.match(objectRegex);

  if (!match) {
    console.warn(`Could not find ${id}`);
    continue;
  }

  if (
    match[0].includes("wildlife:") ||
    match[0].includes("portrait:")
  ) {
    console.log(`Skipping ${id} — scores already exist`);
    continue;
  }

  text = text.replace(
    objectRegex,
    `$1\n    wildlife: ${wildlife},\n    portrait: ${portrait},`
  );

  console.log(`Updated ${id}`);
}

fs.writeFileSync(filePath, text);

console.log("\nDone. cameras.js has been updated.");