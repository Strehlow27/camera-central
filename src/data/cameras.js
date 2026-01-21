// camera.js

const bh = (q) =>
  `https://www.bhphotovideo.com/c/search?Ntt=${encodeURIComponent(
    q
  )}&N=0&InitialSearch=yes&sts=ma`;

const amz = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
const mpb = (q) =>
  `https://www.mpb.com/en-us/search?q=${encodeURIComponent(q)}`;

// ✅ Default image helper:
// By default, each camera uses /public/images/cameras/<id>.jpg
// You can override per camera by adding: image: "/images/cameras/<whatever>.png"
function defaultCameraImage(cam) {
  // If you add an explicit image on the camera object, use it.
  if (typeof cam.image === "string" && cam.image.trim()) return cam.image.trim();

  // Otherwise, assume an image exists using the camera's id
  // (Put your images in: public/images/cameras/<id>.jpg)
  const id = typeof cam.id === "string" ? cam.id.trim() : "";
  return id ? `/images/cameras/${id}` : null;
}

function defaultCameraAlt(cam) {
  if (typeof cam.imageAlt === "string" && cam.imageAlt.trim())
    return cam.imageAlt.trim();

  const brand = cam.brand ?? "";
  const model = cam.model ?? "";
  const alt = `${brand} ${model}`.trim();
  return alt || "Camera";
}

// --- normalize fields so scoring can rely on them later ---
function normalizeCamera(cam) {
  const isIL =
    typeof cam.isInterchangeableLens === "boolean"
      ? cam.isInterchangeableLens
      : cam.system === "Mirrorless" || cam.system === "DSLR";

  return {
    ...cam,
    isInterchangeableLens: isIL,
    cameraType: isIL ? "detachable" : "fixed",

    // ✅ images
    image: defaultCameraImage(cam),
    imageAlt: defaultCameraAlt(cam),
  };
}

const RAW_CAMERAS = [
  // =========================
  // Canon
  // =========================

  // ---- APS-C (Entry / Travel) ----
  {
    id: "canon-r50",
    slug: "canon-eos-r50",
    brand: "Canon",
    model: "EOS R50",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "APS-C",
    isInterchangeableLens: true,

    mp: 24,
    ibis: false,
    weightGrams: 375,
    price: 679,

    strengths: ["Extremely light", "Excellent autofocus", "Very beginner friendly"],
    tradeoffs: ["No IBIS", "Small battery and grip"],

    priceTier: "budget",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 5,
    video: 4,

    buyLinks: {
      bh: bh("Canon EOS R50"),
      amazon: amz("Canon EOS R50"),
      used: mpb("Canon EOS R50"),
    },
  },

  {
    id: "canon-r10",
    slug: "canon-eos-r10",
    brand: "Canon",
    model: "EOS R10",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "APS-C",

    mp: 24,
    ibis: false,
    weightGrams: 429,
    price: 879,

    strengths: ["Fast AF", "Great travel camera", "Good value"],
    tradeoffs: ["No IBIS", "APS-C low-light limits"],

    priceTier: "budget",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 5,
    video: 4,

    buyLinks: {
      bh: bh("Canon EOS R10"),
      amazon: amz("Canon EOS R10"),
      used: mpb("Canon EOS R10"),
    },
  },

  {
    id: "canon-r7",
    slug: "canon-eos-r7",
    brand: "Canon",
    model: "EOS R7",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "APS-C",

    mp: 33,
    ibis: true,
    weightGrams: 612,
    price: 1399,

    strengths: ["IBIS", "High-res APS-C", "Great for travel + wildlife"],
    tradeoffs: ["More complex menus", "APS-C low light vs FF"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 3,
    travel: 4,
    landscape: 5,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("Canon EOS R7"),
      amazon: amz("Canon EOS R7"),
      used: mpb("Canon EOS R7"),
    },
  },

  // ---- Full Frame (Budget → Mid) ----
  {
    id: "canon-rp",
    slug: "canon-eos-rp",
    brand: "Canon",
    model: "EOS RP",
    year: 2019,
    discontinued: true,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 26,
    ibis: false,
    weightGrams: 485,
    price: 999,

    strengths: ["Budget full frame", "Light"],
    tradeoffs: ["Older AF", "Weak video"],

    priceTier: "budget",
    weightClass: "light",

    lowLight: 3,
    travel: 4,
    landscape: 3,
    beginnerFriendly: 4,
    video: 2,

    buyLinks: {
      bh: bh("Canon EOS RP"),
      amazon: amz("Canon EOS RP"),
      used: mpb("Canon EOS RP"),
    },
  },

  {
    id: "canon-r8",
    slug: "canon-eos-r8",
    brand: "Canon",
    model: "EOS R8",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 24,
    ibis: false,
    weightGrams: 461,
    price: 1699,

    strengths: ["Very light FF", "Excellent AF", "Great travel body"],
    tradeoffs: ["No IBIS", "Small battery"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 4,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Canon EOS R8"),
      amazon: amz("Canon EOS R8"),
      used: mpb("Canon EOS R8"),
    },
  },

  {
    id: "canon-r",
    slug: "canon-eos-r",
    brand: "Canon",
    model: "EOS R",
    year: 2018,
    discontinued: true,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 30,
    ibis: false,
    weightGrams: 660,
    price: 1299,

    strengths: ["Good image quality", "Often a strong used deal"],
    tradeoffs: ["No IBIS", "Older AF/video"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 3,

    buyLinks: {
      bh: bh("Canon EOS R"),
      amazon: amz("Canon EOS R"),
      used: mpb("Canon EOS R"),
    },
  },

  // ---- Full Frame (Enthusiast / Pro) ----
  {
    id: "canon-r6",
    slug: "canon-eos-r6",
    brand: "Canon",
    model: "EOS R6",
    year: 2020,
    discontinued: true,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 20,
    ibis: true,
    weightGrams: 680,
    price: 1799,

    strengths: ["Excellent low light", "IBIS", "Strong AF"],
    tradeoffs: ["Lower resolution"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 5,
    travel: 4,
    landscape: 3,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Canon EOS R6"),
      amazon: amz("Canon EOS R6"),
      used: mpb("Canon EOS R6"),
    },
  },

  {
    id: "canon-r6m2",
    slug: "canon-eos-r6-mark-ii",
    brand: "Canon",
    model: "EOS R6 Mark II",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 670,
    price: 1999,

    strengths: ["Top-tier AF", "Excellent low light", "Great hybrid"],
    tradeoffs: ["More expensive"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 5,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Canon EOS R6 Mark II"),
      amazon: amz("Canon EOS R6 Mark II"),
      used: mpb("Canon EOS R6 Mark II"),
    },
  },

  {
    id: "canon-r5",
    slug: "canon-eos-r5",
    brand: "Canon",
    model: "EOS R5",
    year: 2020,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 45,
    ibis: true,
    weightGrams: 738,
    price: 3499,

    strengths: ["High resolution", "IBIS", "Pro build"],
    tradeoffs: ["Expensive", "Overkill for many"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 5,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 3,
    video: 5,

    buyLinks: {
      bh: bh("Canon EOS R5"),
      amazon: amz("Canon EOS R5"),
      used: mpb("Canon EOS R5"),
    },
  },

  {
    id: "canon-r3",
    slug: "canon-eos-r3",
    brand: "Canon",
    model: "EOS R3",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 1015,
    price: 5999,

    strengths: ["Elite AF and speed", "Tank-like build"],
    tradeoffs: ["Very heavy", "Very expensive"],

    priceTier: "pro",
    weightClass: "heavy",

    lowLight: 5,
    travel: 1,
    landscape: 3,
    beginnerFriendly: 2,
    video: 5,

    buyLinks: {
      bh: bh("Canon EOS R3"),
      amazon: amz("Canon EOS R3"),
      used: mpb("Canon EOS R3"),
    },
  },

  // ---- Legacy / Used Market ----
  {
    id: "canon-90d",
    slug: "canon-eos-90d",
    brand: "Canon",
    model: "EOS 90D",
    year: 2019,
    discontinued: true,

    system: "DSLR",
    mount: "EF",
    sensor: "APS-C",

    mp: 33,
    ibis: false,
    weightGrams: 701,
    price: 999,

    strengths: ["High-res APS-C", "Huge EF lens ecosystem"],
    tradeoffs: ["Large/heavy", "DSLR future"],

    priceTier: "budget",
    weightClass: "heavy",

    lowLight: 3,
    travel: 2,
    landscape: 4,
    beginnerFriendly: 3,
    video: 3,

    buyLinks: {
      bh: bh("Canon EOS 90D"),
      amazon: amz("Canon EOS 90D"),
      used: mpb("Canon EOS 90D"),
    },
  },

  {
    id: "canon-m6m2",
    slug: "canon-eos-m6-mark-ii",
    brand: "Canon",
    model: "EOS M6 Mark II",
    year: 2019,
    discontinued: true,

    system: "Mirrorless",
    mount: "EF-M",
    sensor: "APS-C",

    mp: 33,
    ibis: false,
    weightGrams: 408,
    price: 799,

    strengths: ["Very compact", "Sharp APS-C detail"],
    tradeoffs: ["EF-M is discontinued", "No IBIS"],

    priceTier: "budget",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("Canon EOS M6 Mark II"),
      amazon: amz("Canon EOS M6 Mark II"),
      used: mpb("Canon EOS M6 Mark II"),
    },
  },

  // =========================
  // Sony
  // =========================

  // ---- APS-C (Entry / Travel) ----
  {
    id: "sony-a6100",
    slug: "sony-a6100",
    brand: "Sony",
    model: "a6100",
    year: 2019,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "APS-C",
    isInterchangeableLens: true,

    mp: 24,
    ibis: false,
    weightGrams: 396,
    price: 748,

    strengths: ["Great autofocus for price", "Very compact", "Good travel starter"],
    tradeoffs: ["No IBIS", "Older ergonomics/EVF"],

    priceTier: "budget",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 5,
    video: 3,

    buyLinks: {
      bh: bh("Sony a6100"),
      amazon: amz("Sony a6100"),
      used: mpb("Sony a6100"),
    },
  },

  {
    id: "sony-a6400",
    slug: "sony-a6400",
    brand: "Sony",
    model: "a6400",
    year: 2019,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "APS-C",

    mp: 24,
    ibis: false,
    weightGrams: 403,
    price: 898,

    strengths: ["Excellent AF", "Compact", "Huge lens ecosystem (E-mount)"],
    tradeoffs: ["No IBIS", "Menu/ergonomics not for everyone"],

    priceTier: "budget",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Sony a6400"),
      amazon: amz("Sony a6400"),
      used: mpb("Sony a6400"),
    },
  },

  {
    id: "sony-a6600",
    slug: "sony-a6600",
    brand: "Sony",
    model: "a6600",
    year: 2019,
    discontinued: true,

    system: "Mirrorless",
    mount: "E",
    sensor: "APS-C",

    mp: 24,
    ibis: true,
    weightGrams: 503,
    price: 1198,

    strengths: ["IBIS", "Great battery", "Strong travel hybrid"],
    tradeoffs: ["Older sensor/menus vs a6700"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Sony a6600"),
      amazon: amz("Sony a6600"),
      used: mpb("Sony a6600"),
    },
  },

  {
    id: "sony-a6700",
    slug: "sony-a6700",
    brand: "Sony",
    model: "a6700",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "APS-C",

    mp: 26,
    ibis: true,
    weightGrams: 493,
    price: 1398,

    strengths: ["Best Sony APS-C all-rounder", "IBIS", "Great AF + video"],
    tradeoffs: ["More expensive", "Can get warm in long video"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 5,

    buyLinks: {
      bh: bh("Sony a6700"),
      amazon: amz("Sony a6700"),
      used: mpb("Sony a6700"),
    },
  },

  // ---- Full Frame (Classic Debates / Used Value) ----
  {
    id: "sony-a7ii",
    slug: "sony-a7-ii",
    brand: "Sony",
    model: "a7 II",
    year: 2014,
    discontinued: true,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 599,
    price: 998,

    strengths: ["Cheap used full frame entry", "IBIS"],
    tradeoffs: ["Old AF", "Old battery", "Weak modern video"],

    priceTier: "budget",
    weightClass: "medium",

    lowLight: 3,
    travel: 3,
    landscape: 3,
    beginnerFriendly: 4,
    video: 2,

    buyLinks: {
      bh: bh("Sony a7 II"),
      amazon: amz("Sony a7 II"),
      used: mpb("Sony a7 II"),
    },
  },

  {
    id: "sony-a7iii",
    slug: "sony-a7-iii",
    brand: "Sony",
    model: "a7 III",
    year: 2018,
    discontinued: true,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 650,
    price: 1999,

    strengths: ["Legendary used value", "Great photo quality", "Solid low light"],
    tradeoffs: ["Older UI/menus", "Not as modern video as a7 IV"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 3,

    buyLinks: {
      bh: bh("Sony a7 III"),
      amazon: amz("Sony a7 III"),
      used: mpb("Sony a7 III"),
    },
  },

  // ---- Full Frame (Modern All-Rounders) ----
  {
    id: "sony-a7iv",
    slug: "sony-a7-iv",
    brand: "Sony",
    model: "a7 IV",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 33,
    ibis: true,
    weightGrams: 658,
    price: 2499,

    strengths: ["Best Sony all-rounder", "Great AF", "Excellent video"],
    tradeoffs: ["Menus", "Lenses can get pricey"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 5,

    buyLinks: {
      bh: bh("Sony a7 IV"),
      amazon: amz("Sony a7 IV"),
      used: mpb("Sony a7 IV"),
    },
  },

  {
    id: "sony-a7cii",
    slug: "sony-a7c-ii",
    brand: "Sony",
    model: "a7C II",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 33,
    ibis: true,
    weightGrams: 514,
    price: 2199,

    strengths: ["Compact full frame", "Modern AF", "Great travel body"],
    tradeoffs: ["Small grip", "Less pro controls"],

    priceTier: "high",
    weightClass: "light",

    lowLight: 4,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Sony a7C II"),
      amazon: amz("Sony a7C II"),
      used: mpb("Sony a7C II"),
    },
  },

  // ---- Full Frame (High Resolution) ----
  {
    id: "sony-a7riv",
    slug: "sony-a7r-iv",
    brand: "Sony",
    model: "a7R IV",
    year: 2019,
    discontinued: true,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 61,
    ibis: true,
    weightGrams: 665,
    price: 3498,

    strengths: ["Massive resolution", "Great for landscapes", "Strong detail"],
    tradeoffs: ["Big files", "Overkill for many"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 2,
    video: 3,

    buyLinks: {
      bh: bh("Sony a7R IV"),
      amazon: amz("Sony a7R IV"),
      used: mpb("Sony a7R IV"),
    },
  },

  {
    id: "sony-a7rv",
    slug: "sony-a7r-v",
    brand: "Sony",
    model: "a7R V",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 61,
    ibis: true,
    weightGrams: 723,
    price: 3898,

    strengths: ["Best Sony landscape/detail body", "Excellent AF", "Modern handling"],
    tradeoffs: ["Expensive", "Big files"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 2,
    video: 4,

    buyLinks: {
      bh: bh("Sony a7R V"),
      amazon: amz("Sony a7R V"),
      used: mpb("Sony a7R V"),
    },
  },

  // ---- Full Frame (Video / Hybrid) ----
  {
    id: "sony-a7siii",
    slug: "sony-a7s-iii",
    brand: "Sony",
    model: "a7S III",
    year: 2020,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 12,
    ibis: true,
    weightGrams: 699,
    price: 3498,

    strengths: ["Top-tier low light video", "Excellent codecs", "Great stabilization"],
    tradeoffs: ["Low megapixels for landscapes", "Expensive"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 5,
    travel: 3,
    landscape: 2,
    beginnerFriendly: 2,
    video: 5,

    buyLinks: {
      bh: bh("Sony a7S III"),
      amazon: amz("Sony a7S III"),
      used: mpb("Sony a7S III"),
    },
  },

  // ---- Full Frame (Flagship) ----
  {
    id: "sony-a1",
    slug: "sony-a1",
    brand: "Sony",
    model: "a1",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 50,
    ibis: true,
    weightGrams: 737,
    price: 6498,

    strengths: ["Flagship everything", "High-res + speed", "Elite AF"],
    tradeoffs: ["Extremely expensive"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 5,
    travel: 2,
    landscape: 5,
    beginnerFriendly: 1,
    video: 5,

    buyLinks: {
      bh: bh("Sony a1"),
      amazon: amz("Sony a1"),
      used: mpb("Sony a1"),
    },
  },

  // =========================
  // Nikon
  // =========================

  {
    id: "nikon-z50",
    slug: "nikon-z50",
    brand: "Nikon",
    model: "Z50",
    year: 2019,
    discontinued: false,

    system: "Mirrorless",
    mount: "Z",
    sensor: "APS-C",
    isInterchangeableLens: true,

    mp: 20,
    ibis: false,
    weightGrams: 450,
    price: 859,

    strengths: ["Compact", "Good AF", "Great beginner/APS-C choice"],
    tradeoffs: ["No IBIS", "APS-C sensor limits low light"],

    priceTier: "budget",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 5,
    video: 4,

    buyLinks: {
      bh: bh("Nikon Z50"),
      amazon: amz("Nikon Z50"),
      used: mpb("Nikon Z50"),
    },
  },

  {
    id: "nikon-zfc",
    slug: "nikon-zfc",
    brand: "Nikon",
    model: "Zfc",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "Z",
    sensor: "APS-C",

    mp: 20,
    ibis: false,
    weightGrams: 445,
    price: 959,

    strengths: ["Retro style", "Good image quality", "Great enthusiast APS-C"],
    tradeoffs: ["No IBIS", "Not as video-centric"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Nikon Zfc"),
      amazon: amz("Nikon Zfc"),
      used: mpb("Nikon Zfc"),
    },
  },

  // ---- Full Frame (Classic / All-Round) ----
  {
    id: "nikon-z5",
    slug: "nikon-z5",
    brand: "Nikon",
    model: "Z5",
    year: 2020,
    discontinued: false,

    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 675,
    price: 1396,

    strengths: ["Great entry FF", "IBIS", "Comfortable handling"],
    tradeoffs: ["AF a bit behind Sony/Canon", "Lower burst speed"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("Nikon Z5"),
      amazon: amz("Nikon Z5"),
      used: mpb("Nikon Z5"),
    },
  },

  {
    id: "nikon-z6",
    slug: "nikon-z6",
    brand: "Nikon",
    model: "Z6",
    year: 2018,
    discontinued: true,

    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 675,
    price: 1596,

    strengths: ["Well-rounded FF hybrid", "Great low light for price"],
    tradeoffs: ["Older AF vs modern bodies"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("Nikon Z6"),
      amazon: amz("Nikon Z6"),
      used: mpb("Nikon Z6"),
    },
  },

  {
    id: "nikon-z6ii",
    slug: "nikon-z6-ii",
    brand: "Nikon",
    model: "Z6 II",
    year: 2020,
    discontinued: false,

    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 705,
    price: 1999,

    strengths: ["Strong all-arounder", "IBIS", "Great for photo/video"],
    tradeoffs: ["AF still behind Sony/Canon in some edge cases"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Nikon Z6 II"),
      amazon: amz("Nikon Z6 II"),
      used: mpb("Nikon Z6 II"),
    },
  },

  {
    id: "nikon-z7",
    slug: "nikon-z7",
    brand: "Nikon",
    model: "Z7",
    year: 2018,
    discontinued: true,

    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 45,
    ibis: true,
    weightGrams: 675,
    price: 2696,

    strengths: ["High resolution", "Great for landscapes"],
    tradeoffs: ["Slower burst + older AF"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 3,
    video: 3,

    buyLinks: {
      bh: bh("Nikon Z7"),
      amazon: amz("Nikon Z7"),
      used: mpb("Nikon Z7"),
    },
  },

  {
    id: "nikon-z7ii",
    slug: "nikon-z7-ii",
    brand: "Nikon",
    model: "Z7 II",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 45,
    ibis: true,
    weightGrams: 705,
    price: 2996,

    strengths: ["Modern high resolution", "IBIS", "Great landscape detail"],
    tradeoffs: ["Price", "Lens ecosystem still growing"],

    priceTier: "pro",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("Nikon Z7 II"),
      amazon: amz("Nikon Z7 II"),
      used: mpb("Nikon Z7 II"),
    },
  },

  {
    id: "nikon-z8",
    slug: "nikon-z8",
    brand: "Nikon",
    model: "Z8",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 45,
    ibis: true,
    weightGrams: 1015,
    price: 4499,

    strengths: ["Pro hybrid powerhouse", "Excellent video capabilities"],
    tradeoffs: ["Pricey", "Heavy for travel"],

    priceTier: "pro",
    weightClass: "heavy",

    lowLight: 5,
    travel: 2,
    landscape: 4,
    beginnerFriendly: 2,
    video: 5,

    buyLinks: {
      bh: bh("Nikon Z8"),
      amazon: amz("Nikon Z8"),
      used: mpb("Nikon Z8"),
    },
  },

  // =========================
  // Fujifilm
  // =========================

  {
    id: "fuji-x-t30-ii",
    slug: "fujifilm-x-t30-ii",
    brand: "Fujifilm",
    model: "X-T30 II",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",
    isInterchangeableLens: true,

    mp: 26,
    ibis: false,
    weightGrams: 378,
    price: 899,

    strengths: ["Very compact", "Great colors (Fuji look)", "Strong value"],
    tradeoffs: ["No IBIS", "Smaller grip/controls"],

    priceTier: "budget",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("Fujifilm X-T30 II"),
      amazon: amz("Fujifilm X-T30 II"),
      used: mpb("Fujifilm X-T30 II"),
    },
  },

  {
    id: "fuji-x-e4",
    slug: "fujifilm-x-e4",
    brand: "Fujifilm",
    model: "X-E4",
    year: 2021,
    discontinued: true,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 26,
    ibis: false,
    weightGrams: 364,
    price: 849,

    strengths: ["Ultra-compact travel body", "Great image quality", "Rangefinder style"],
    tradeoffs: ["No IBIS", "Discontinued / can be hard to find"],

    priceTier: "budget",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("Fujifilm X-E4"),
      amazon: amz("Fujifilm X-E4"),
      used: mpb("Fujifilm X-E4"),
    },
  },

  {
    id: "fuji-xs20",
    slug: "fujifilm-x-s20",
    brand: "Fujifilm",
    model: "X-S20",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 26,
    ibis: true,
    weightGrams: 491,
    price: 1299,

    strengths: ["Great hybrid (photo+video)", "IBIS", "Excellent travel value"],
    tradeoffs: ["Not as photo-focused as X-T5"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 4,

    buyLinks: {
      bh: bh("Fujifilm X-S20"),
      amazon: amz("Fujifilm X-S20"),
      used: mpb("Fujifilm X-S20"),
    },
  },

  {
    id: "fuji-xt4",
    slug: "fujifilm-x-t4",
    brand: "Fujifilm",
    model: "X-T4",
    year: 2020,
    discontinued: true,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 26,
    ibis: true,
    weightGrams: 607,
    price: 1699,

    strengths: ["IBIS", "Great all-rounder", "Strong stills + video"],
    tradeoffs: ["Older AF vs newest bodies", "Discontinued"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 3,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("Fujifilm X-T4"),
      amazon: amz("Fujifilm X-T4"),
      used: mpb("Fujifilm X-T4"),
    },
  },

  {
    id: "fuji-xt5",
    slug: "fujifilm-x-t5",
    brand: "Fujifilm",
    model: "X-T5",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 40,
    ibis: true,
    weightGrams: 557,
    price: 1699,

    strengths: ["High-res APS-C", "IBIS", "Excellent for travel + landscape"],
    tradeoffs: ["Low light behind full frame", "Video not its main focus"],

    priceTier: "high",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 5,
    beginnerFriendly: 3,
    video: 3,

    buyLinks: {
      bh: bh("Fujifilm X-T5"),
      amazon: amz("Fujifilm X-T5"),
      used: mpb("Fujifilm X-T5"),
    },
  },

  {
    id: "fuji-xh2",
    slug: "fujifilm-x-h2",
    brand: "Fujifilm",
    model: "X-H2",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 40,
    ibis: true,
    weightGrams: 660,
    price: 1999,

    strengths: ["High resolution", "Pro handling", "Great for landscape/detail"],
    tradeoffs: ["Bigger/heavier", "More expensive"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 3,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 2,
    video: 4,

    buyLinks: {
      bh: bh("Fujifilm X-H2"),
      amazon: amz("Fujifilm X-H2"),
      used: mpb("Fujifilm X-H2"),
    },
  },

  {
    id: "fuji-xh2s",
    slug: "fujifilm-x-h2s",
    brand: "Fujifilm",
    model: "X-H2S",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 26,
    ibis: true,
    weightGrams: 660,
    price: 2499,

    strengths: ["Best Fuji for video + action", "Great AF for Fuji", "IBIS"],
    tradeoffs: ["Expensive", "Not the highest resolution"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 4,
    beginnerFriendly: 2,
    video: 5,

    buyLinks: {
      bh: bh("Fujifilm X-H2S"),
      amazon: amz("Fujifilm X-H2S"),
      used: mpb("Fujifilm X-H2S"),
    },
  },

  {
    id: "fuji-gfx-50s-ii",
    slug: "fujifilm-gfx-50s-ii",
    brand: "Fujifilm",
    model: "GFX 50S II",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "GFX",
    sensor: "Medium Format",

    mp: 51,
    ibis: true,
    weightGrams: 900,
    price: 3499,

    strengths: ["Medium format look", "Great for landscapes", "IBIS"],
    tradeoffs: ["Heavy", "Expensive lenses", "Not for fast action"],

    priceTier: "pro",
    weightClass: "heavy",

    lowLight: 4,
    travel: 1,
    landscape: 5,
    beginnerFriendly: 1,
    video: 2,

    buyLinks: {
      bh: bh("Fujifilm GFX 50S II"),
      amazon: amz("Fujifilm GFX 50S II"),
      used: mpb("Fujifilm GFX 50S II"),
    },
  },

  {
    id: "fuji-gfx-100s",
    slug: "fujifilm-gfx-100s",
    brand: "Fujifilm",
    model: "GFX 100S",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "GFX",
    sensor: "Medium Format",

    mp: 102,
    ibis: true,
    weightGrams: 900,
    price: 5999,

    strengths: ["Insane detail", "Premium landscape output", "IBIS"],
    tradeoffs: ["Very expensive", "Not travel friendly"],

    priceTier: "pro",
    weightClass: "heavy",

    lowLight: 4,
    travel: 1,
    landscape: 5,
    beginnerFriendly: 1,
    video: 3,

    buyLinks: {
      bh: bh("Fujifilm GFX 100S"),
      amazon: amz("Fujifilm GFX 100S"),
      used: mpb("Fujifilm GFX 100S"),
    },
  },

  // =========================
  // Panasonic
  // =========================

  {
    id: "panasonic-s5",
    slug: "panasonic-lumix-s5",
    brand: "Panasonic",
    model: "Lumix S5",
    year: 2020,
    discontinued: true,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",
    isInterchangeableLens: true,

    mp: 24,
    ibis: true,
    weightGrams: 714,
    price: 1499,

    strengths: ["Great value used", "Excellent video features", "IBIS"],
    tradeoffs: ["AF not best for fast action", "Heavier travel kit"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 4,
    beginnerFriendly: 3,
    video: 5,

    buyLinks: {
      bh: bh("Panasonic Lumix S5"),
      amazon: amz("Panasonic Lumix S5"),
      used: mpb("Panasonic Lumix S5"),
    },
  },

  {
    id: "panasonic-s5ii",
    slug: "panasonic-lumix-s5-ii",
    brand: "Panasonic",
    model: "Lumix S5 II",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 740,
    price: 1999,

    strengths: ["Excellent video", "IBIS", "Great value for hybrid shooters"],
    tradeoffs: ["Heavier kit", "AF still not Sony/Canon level for sports"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 4,
    beginnerFriendly: 4,
    video: 5,

    buyLinks: {
      bh: bh("Panasonic Lumix S5 II"),
      amazon: amz("Panasonic Lumix S5 II"),
      used: mpb("Panasonic Lumix S5 II"),
    },
  },

  {
    id: "panasonic-s5iix",
    slug: "panasonic-lumix-s5-iix",
    brand: "Panasonic",
    model: "Lumix S5 IIX",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 740,
    price: 2199,

    strengths: ["Creator-focused video features", "IBIS", "Strong codecs/workflow"],
    tradeoffs: ["More niche than S5 II", "Not for action AF"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 4,
    travel: 3,
    landscape: 4,
    beginnerFriendly: 3,
    video: 5,

    buyLinks: {
      bh: bh("Panasonic Lumix S5 IIX"),
      amazon: amz("Panasonic Lumix S5 IIX"),
      used: mpb("Panasonic Lumix S5 IIX"),
    },
  },

  {
    id: "panasonic-g9",
    slug: "panasonic-lumix-g9",
    brand: "Panasonic",
    model: "Lumix G9",
    year: 2017,
    discontinued: true,

    system: "Mirrorless",
    mount: "Micro Four Thirds",
    sensor: "Micro Four Thirds",

    mp: 20,
    ibis: true,
    weightGrams: 658,
    price: 999,

    strengths: ["Great handling", "IBIS", "Strong value used (travel/wildlife)"],
    tradeoffs: ["Older AF", "Lower low-light than FF"],

    priceTier: "budget",
    weightClass: "medium",

    lowLight: 2,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("Panasonic Lumix G9"),
      amazon: amz("Panasonic Lumix G9"),
      used: mpb("Panasonic Lumix G9"),
    },
  },

  {
    id: "panasonic-g9ii",
    slug: "panasonic-lumix-g9-ii",
    brand: "Panasonic",
    model: "Lumix G9 II",
    year: 2023,
    discontinued: false,

    system: "Mirrorless",
    mount: "Micro Four Thirds",
    sensor: "Micro Four Thirds",

    mp: 26,
    ibis: true,
    weightGrams: 658,
    price: 1899,

    strengths: ["Best modern Panasonic MFT hybrid", "IBIS", "Great travel kit size"],
    tradeoffs: ["Low light vs FF", "Body still not tiny"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 2,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 5,

    buyLinks: {
      bh: bh("Panasonic Lumix G9 II"),
      amazon: amz("Panasonic Lumix G9 II"),
      used: mpb("Panasonic Lumix G9 II"),
    },
  },

  // =========================
  // OM System / Olympus
  // =========================

  {
    id: "om-om5",
    slug: "om-system-om-5",
    brand: "OM System",
    model: "OM-5",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "Micro Four Thirds",
    sensor: "Micro Four Thirds",
    isInterchangeableLens: true,

    mp: 20,
    ibis: true,
    weightGrams: 414,
    price: 999,

    strengths: ["Very light", "Great IBIS", "Weather-sealed travel body"],
    tradeoffs: ["Low light vs FF", "Not the best for heavy video workflows"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 2,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("OM System OM-5"),
      amazon: amz("OM System OM-5"),
      used: mpb("OM System OM-5"),
    },
  },

  {
    id: "om-om1",
    slug: "om-system-om-1",
    brand: "OM System",
    model: "OM-1",
    year: 2022,
    discontinued: false,

    system: "Mirrorless",
    mount: "Micro Four Thirds",
    sensor: "Micro Four Thirds",

    mp: 20,
    ibis: true,
    weightGrams: 599,
    price: 1799,

    strengths: ["Best MFT flagship for outdoor travel", "Amazing IBIS", "Weather sealing"],
    tradeoffs: ["Low light vs FF", "Smaller sensor limits dynamic range"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 3,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("OM System OM-1"),
      amazon: amz("OM System OM-1"),
      used: mpb("OM System OM-1"),
    },
  },

  {
    id: "olympus-em1m3",
    slug: "olympus-om-d-e-m1-mark-iii",
    brand: "Olympus",
    model: "OM-D E-M1 Mark III",
    year: 2020,
    discontinued: true,

    system: "Mirrorless",
    mount: "Micro Four Thirds",
    sensor: "Micro Four Thirds",

    mp: 20,
    ibis: true,
    weightGrams: 580,
    price: 1299,

    strengths: ["Great used value", "Excellent IBIS", "Outdoor-friendly"],
    tradeoffs: ["Discontinued", "Low light vs FF"],

    priceTier: "mid",
    weightClass: "medium",

    lowLight: 2,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 3,
    video: 3,

    buyLinks: {
      bh: bh("Olympus E-M1 Mark III"),
      amazon: amz("Olympus E-M1 Mark III"),
      used: mpb("Olympus E-M1 Mark III"),
    },
  },

  {
    id: "olympus-em5m3",
    slug: "olympus-om-d-e-m5-mark-iii",
    brand: "Olympus",
    model: "OM-D E-M5 Mark III",
    year: 2019,
    discontinued: true,

    system: "Mirrorless",
    mount: "Micro Four Thirds",
    sensor: "Micro Four Thirds",

    mp: 20,
    ibis: true,
    weightGrams: 414,
    price: 999,

    strengths: ["Very light", "Great IBIS", "Awesome travel kit size"],
    tradeoffs: ["Discontinued", "Not great low light"],

    priceTier: "mid",
    weightClass: "light",

    lowLight: 2,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("Olympus E-M5 Mark III"),
      amazon: amz("Olympus E-M5 Mark III"),
      used: mpb("Olympus E-M5 Mark III"),
    },
  },

  // =========================
  // Leica (Interchangeable lens only)
  // =========================

  {
    id: "leica-sl2",
    slug: "leica-sl2",
    brand: "Leica",
    model: "SL2",
    year: 2019,
    discontinued: false,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",
    isInterchangeableLens: true,

    mp: 47,
    ibis: true,
    weightGrams: 835,
    price: 5995,

    strengths: ["Beautiful build/ergonomics", "High resolution", "Leica color/feel"],
    tradeoffs: ["Very expensive", "Heavy for travel"],

    priceTier: "pro",
    weightClass: "heavy",

    lowLight: 4,
    travel: 1,
    landscape: 5,
    beginnerFriendly: 1,
    video: 4,

    buyLinks: {
      bh: bh("Leica SL2"),
      amazon: amz("Leica SL2"),
      used: mpb("Leica SL2"),
    },
  },

  {
    id: "leica-sl2s",
    slug: "leica-sl2-s",
    brand: "Leica",
    model: "SL2-S",
    year: 2020,
    discontinued: false,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 835,
    price: 5295,

    strengths: ["Excellent video-focused Leica", "Great low light", "Tank build"],
    tradeoffs: ["Very expensive", "Heavy"],

    priceTier: "pro",
    weightClass: "heavy",

    lowLight: 5,
    travel: 1,
    landscape: 4,
    beginnerFriendly: 1,
    video: 5,

    buyLinks: {
      bh: bh("Leica SL2-S"),
      amazon: amz("Leica SL2-S"),
      used: mpb("Leica SL2-S"),
    },
  },

  // =========================
  // Sigma
  // =========================

  {
    id: "sigma-fp",
    slug: "sigma-fp",
    brand: "Sigma",
    model: "fp",
    year: 2019,
    discontinued: false,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",
    isInterchangeableLens: true,

    mp: 24,
    ibis: false,
    weightGrams: 422,
    price: 1899,

    strengths: [
      "Tiny full frame body",
      "Great for travel minimalists",
      "Cinema-style workflows",
    ],
    tradeoffs: ["No IBIS", "Weird ergonomics without rig"],

    priceTier: "high",
    weightClass: "light",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 2,
    video: 4,

    buyLinks: {
      bh: bh("Sigma fp"),
      amazon: amz("Sigma fp"),
      used: mpb("Sigma fp"),
    },
  },

  {
    id: "sigma-fp-l",
    slug: "sigma-fp-l",
    brand: "Sigma",
    model: "fp L",
    year: 2021,
    discontinued: false,

    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",

    mp: 61,
    ibis: false,
    weightGrams: 427,
    price: 2499,

    strengths: [
      "High resolution in tiny body",
      "Great detail for landscapes",
      "Unique minimalist setup",
    ],
    tradeoffs: ["No IBIS", "Not beginner-friendly ergonomics"],

    priceTier: "high",
    weightClass: "light",

    lowLight: 3,
    travel: 3,
    landscape: 5,
    beginnerFriendly: 1,
    video: 4,

    buyLinks: {
      bh: bh("Sigma fp L"),
      amazon: amz("Sigma fp L"),
      used: mpb("Sigma fp L"),
    },
  },

  // =========================
  // Fixed-lens Digital Cameras (Compacts)
  // =========================

  {
    id: "sony-rx100-vii",
    slug: "sony-rx100-vii",
    brand: "Sony",
    model: "RX100 VII",
    year: 2019,
    discontinued: false,

    system: "Compact",
    mount: "Fixed Lens",
    sensor: "1-inch",
    isInterchangeableLens: false,

    mp: 20,
    ibis: false,
    weightGrams: 302,
    price: 1299,

    strengths: ["Tiny", "Fast autofocus", "Great all-in-one travel zoom"],
    tradeoffs: ["Expensive for a compact", "Not amazing in very low light"],

    priceTier: "high",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 5,
    video: 4,

    buyLinks: {
      bh: bh("Sony RX100 VII"),
      amazon: amz("Sony RX100 VII"),
      used: mpb("Sony RX100 VII"),
    },
  },

  {
    id: "sony-zv1",
    slug: "sony-zv-1",
    brand: "Sony",
    model: "ZV-1",
    year: 2020,
    discontinued: false,

    system: "Compact",
    mount: "Fixed Lens",
    sensor: "1-inch",
    isInterchangeableLens: false,

    mp: 20,
    ibis: false,
    weightGrams: 294,
    price: 749,

    strengths: ["Great for video + travel", "Compact", "Easy to use"],
    tradeoffs: ["Not a long zoom", "Still limited low light vs bigger sensors"],

    priceTier: "budget",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 2,
    beginnerFriendly: 5,
    video: 5,

    buyLinks: {
      bh: bh("Sony ZV-1"),
      amazon: amz("Sony ZV-1"),
      used: mpb("Sony ZV-1"),
    },
  },

  {
    id: "canon-g7x-mark-iii",
    slug: "canon-powershot-g7-x-mark-iii",
    brand: "Canon",
    model: "PowerShot G7 X Mark III",
    year: 2019,
    discontinued: false,

    system: "Compact",
    mount: "Fixed Lens",
    sensor: "1-inch",
    isInterchangeableLens: false,

    mp: 20,
    ibis: false,
    weightGrams: 304,
    price: 749,

    strengths: ["Pocketable", "Good travel lifestyle camera", "Simple + popular"],
    tradeoffs: ["AF not as strong as latest Sony", "Not a long zoom"],

    priceTier: "budget",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 2,
    beginnerFriendly: 5,
    video: 4,

    buyLinks: {
      bh: bh("Canon G7 X Mark III"),
      amazon: amz("Canon G7 X Mark III"),
      used: mpb("Canon G7 X Mark III"),
    },
  },

  {
    id: "ricoh-gr-iii",
    slug: "ricoh-gr-iii",
    brand: "Ricoh",
    model: "GR III",
    year: 2019,
    discontinued: false,

    system: "Compact",
    mount: "Fixed Lens",
    sensor: "APS-C",
    isInterchangeableLens: false,

    mp: 24,
    ibis: true, // GR III has in-body stabilization
    weightGrams: 257,
    price: 969,

    strengths: ["Insanely pocketable", "Sharp APS-C images", "Perfect street/travel vibe"],
    tradeoffs: ["Fixed prime lens (no zoom)", "Not ideal for wildlife"],

    priceTier: "mid",
    weightClass: "very light",

    lowLight: 3,
    travel: 5,
    landscape: 3,
    beginnerFriendly: 4,
    video: 2,

    buyLinks: {
      bh: bh("Ricoh GR III"),
      amazon: amz("Ricoh GR III"),
      used: mpb("Ricoh GR III"),
    },
  },

  {
    id: "fuji-x100v",
    slug: "fujifilm-x100v",
    brand: "Fujifilm",
    model: "X100V",
    year: 2020,
    discontinued: true,

    system: "Compact",
    mount: "Fixed Lens",
    sensor: "APS-C",
    isInterchangeableLens: false,

    mp: 26,
    ibis: false,
    weightGrams: 478,
    price: 1399,

    strengths: ["Iconic travel look", "Sharp images", "Great for street + landscapes"],
    tradeoffs: ["Fixed prime lens", "Often overpriced/limited availability"],

    priceTier: "high",
    weightClass: "light",

    lowLight: 3,
    travel: 5,
    landscape: 4,
    beginnerFriendly: 4,
    video: 3,

    buyLinks: {
      bh: bh("Fujifilm X100V"),
      amazon: amz("Fujifilm X100V"),
      used: mpb("Fujifilm X100V"),
    },
  },
];

export const CAMERAS = RAW_CAMERAS.map(normalizeCamera);
export default CAMERAS;