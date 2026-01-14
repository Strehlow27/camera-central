// src/data/cameras.js

const bh = (q) =>
  `https://www.bhphotovideo.com/c/search?Ntt=${encodeURIComponent(
    q
  )}&N=0&InitialSearch=yes&sts=ma`;

const amz = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
const mpb = (q) => `https://www.mpb.com/en-us/search?q=${encodeURIComponent(q)}`;

export const CAMERAS = [
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

    buyLinks: { bh: bh("Canon EOS R50"), amazon: amz("Canon EOS R50"), used: mpb("Canon EOS R50") },
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

    buyLinks: { bh: bh("Canon EOS R10"), amazon: amz("Canon EOS R10"), used: mpb("Canon EOS R10") },
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

    buyLinks: { bh: bh("Canon EOS R7"), amazon: amz("Canon EOS R7"), used: mpb("Canon EOS R7") },
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

    buyLinks: { bh: bh("Canon EOS RP"), amazon: amz("Canon EOS RP"), used: mpb("Canon EOS RP") },
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

    buyLinks: { bh: bh("Canon EOS R8"), amazon: amz("Canon EOS R8"), used: mpb("Canon EOS R8") },
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

    buyLinks: { bh: bh("Canon EOS R"), amazon: amz("Canon EOS R"), used: mpb("Canon EOS R") },
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

    buyLinks: { bh: bh("Canon EOS R6"), amazon: amz("Canon EOS R6"), used: mpb("Canon EOS R6") },
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

    buyLinks: { bh: bh("Canon EOS R6 Mark II"), amazon: amz("Canon EOS R6 Mark II"), used: mpb("Canon EOS R6 Mark II") },
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

    buyLinks: { bh: bh("Canon EOS R5"), amazon: amz("Canon EOS R5"), used: mpb("Canon EOS R5") },
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

    buyLinks: { bh: bh("Canon EOS R3"), amazon: amz("Canon EOS R3"), used: mpb("Canon EOS R3") },
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

    buyLinks: { bh: bh("Canon EOS 90D"), amazon: amz("Canon EOS 90D"), used: mpb("Canon EOS 90D") },
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

    buyLinks: { bh: bh("Canon EOS M6 Mark II"), amazon: amz("Canon EOS M6 Mark II"), used: mpb("Canon EOS M6 Mark II") },
  },
];

export default CAMERAS;
