// src/data/cameras.js

// A couple tiny helpers so your data stays consistent
const slugify = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replaceAll("—", "-")
    .replaceAll("–", "-")
    .replaceAll("’", "")
    .replaceAll("'", "")
    .replaceAll(".", "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const bh = (q) =>
  `https://www.bhphotovideo.com/c/search?Ntt=${encodeURIComponent(q)}&N=0&InitialSearch=yes&sts=ma`;
const amz = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
const mpb = (q) => `https://www.mpb.com/en-us/search?q=${encodeURIComponent(q)}`;

export const CAMERAS = [
  {
    id: "canon-r8",
    slug: "canon-eos-r8",
    brand: "Canon",
    model: "EOS R8",
    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",
    isInterchangeableLens: true,

    mp: 24,
    ibis: false,
    weightGrams: 461,
    price: 1699,

    strengths: ["Lightweight", "Great image quality", "Strong autofocus"],
    tradeoffs: ["No IBIS", "Smaller battery"],

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
    id: "canon-r6m2",
    slug: "canon-eos-r6-mark-ii",
    brand: "Canon",
    model: "EOS R6 Mark II",
    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 670,
    price: 1999,

    strengths: ["IBIS", "Excellent autofocus", "Great low light"],
    tradeoffs: ["More expensive", "Bigger than R8"],

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
    id: "canon-rp",
    slug: "canon-eos-rp",
    brand: "Canon",
    model: "EOS RP",
    system: "Mirrorless",
    mount: "RF",
    sensor: "Full Frame",

    mp: 26,
    ibis: false,
    weightGrams: 485,
    price: 999,

    strengths: ["Budget full frame", "Light"],
    tradeoffs: ["Older autofocus", "Weaker video"],

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
    id: "sony-a7iv",
    slug: "sony-a7-iv",
    brand: "Sony",
    model: "a7 IV",
    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 33,
    ibis: true,
    weightGrams: 658,
    price: 2499,

    strengths: ["All-rounder", "Strong autofocus", "Great video"],
    tradeoffs: ["Menus", "More expensive lenses"],

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
    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 33,
    ibis: true,
    weightGrams: 514,
    price: 2199,

    strengths: ["Compact", "Modern AF", "Great for travel"],
    tradeoffs: ["Small grip", "Less pro ergonomics"],

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

  {
    id: "sony-a7iii",
    slug: "sony-a7-iii",
    brand: "Sony",
    model: "a7 III",
    system: "Mirrorless",
    mount: "E",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 650,
    price: 1999,

    strengths: ["Great used value", "Still excellent photos"],
    tradeoffs: ["Older UI", "Older video features"],

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

  {
    id: "nikon-z6ii",
    slug: "nikon-z6-ii",
    brand: "Nikon",
    model: "Z6 II",
    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 705,
    price: 1999,

    strengths: ["Great handling", "Nice colors", "Solid all-rounder"],
    tradeoffs: ["AF not top-tier vs Sony/Canon"],

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
    id: "nikon-zf",
    slug: "nikon-zf",
    brand: "Nikon",
    model: "Zf",
    system: "Mirrorless",
    mount: "Z",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 710,
    price: 1999,

    strengths: ["IBIS", "Great image quality", "Retro design"],
    tradeoffs: ["Heavier", "Style may not be for everyone"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 5,
    travel: 3,
    landscape: 4,
    beginnerFriendly: 3,
    video: 4,

    buyLinks: {
      bh: bh("Nikon Zf"),
      amazon: amz("Nikon Zf"),
      used: mpb("Nikon Zf"),
    },
  },

  {
    id: "fuji-xt5",
    slug: "fujifilm-x-t5",
    brand: "Fujifilm",
    model: "X-T5",
    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 40,
    ibis: true,
    weightGrams: 557,
    price: 1699,

    strengths: ["Light kit", "Great colors", "High resolution for APS-C"],
    tradeoffs: ["Worse low light than full frame"],

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
    id: "fuji-xs20",
    slug: "fujifilm-x-s20",
    brand: "Fujifilm",
    model: "X-S20",
    system: "Mirrorless",
    mount: "X",
    sensor: "APS-C",

    mp: 26,
    ibis: true,
    weightGrams: 491,
    price: 1299,

    strengths: ["Great travel/video hybrid", "Lightweight"],
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
    id: "panasonic-s5ii",
    slug: "panasonic-s5-ii",
    brand: "Panasonic",
    model: "S5 II",
    system: "Mirrorless",
    mount: "L",
    sensor: "Full Frame",

    mp: 24,
    ibis: true,
    weightGrams: 740,
    price: 1999,

    strengths: ["Great video", "IBIS", "Good value"],
    tradeoffs: ["AF for fast action not best-in-class"],

    priceTier: "high",
    weightClass: "medium",

    lowLight: 4,
    travel: 4,
    landscape: 4,
    beginnerFriendly: 4,
    video: 5,

    buyLinks: {
      bh: bh("Panasonic S5 II"),
      amazon: amz("Panasonic S5 II"),
      used: mpb("Panasonic S5 II"),
    },
  },
];

// Optional default export
export default CAMERAS;