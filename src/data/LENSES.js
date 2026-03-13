// LENSES.js

const BH_SID = "29391";

const bh = (q) =>
  `https://www.bhphotovideo.com/c/search?Ntt=${encodeURIComponent(
    q
  )}&N=0&InitialSearch=yes&sts=ma&SID=${BH_SID}`;

const amz = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
const mpb = (q) =>
  `https://www.mpb.com/en-us/search?q=${encodeURIComponent(q)}`;

function defaultLensImage(lens) {
  if (typeof lens.image === "string" && lens.image.trim()) return lens.image.trim();

  const slug = typeof lens.slug === "string" ? lens.slug.trim() : "";
  if (slug) return `/images/lenses/${slug}.jpg`;

  const id = typeof lens.id === "string" ? lens.id.trim() : "";
  return id ? `/images/lenses/${id}.jpg` : null;
}

function defaultLensAlt(lens) {
  if (typeof lens.imageAlt === "string" && lens.imageAlt.trim()) {
    return lens.imageAlt.trim();
  }

  const alt = `${lens.brand ?? ""} ${lens.name ?? ""}`.trim();
  return alt || "Lens";
}

function normalizeLens(lens) {
  return {
    ...lens,
    image: defaultLensImage(lens),
    imageAlt: defaultLensAlt(lens),
  };
}

const RAW_LENSES = [
  // =========================
  // Canon RF / RF-S
  // =========================

  {
    id: "canon-rf-16-f28",
    slug: "canon-rf-16mm-f2-8-stm",
    brand: "Canon",
    name: "RF 16mm f/2.8 STM",
    mount: "RF",
    category: "wide",
    lensType: "prime",
    sensorCoverage: "Full Frame",
    futureProof: true,
    stabilization: false,
    weightGrams: 165,
    price: 299,
    strengths: ["Tiny", "Affordable", "Great for travel and landscapes"],
    tradeoffs: ["Not weather sealed", "Not ideal for subject isolation"],
    buyLinks: {
      bh: bh("Canon RF 16mm f/2.8 STM"),
      amazon: amz("Canon RF 16mm f/2.8 STM"),
      used: mpb("Canon RF 16mm f/2.8 STM"),
    },
  },

  {
    id: "canon-rf-24-105-f4-7-1",
    slug: "canon-rf-24-105mm-f4-7-1-is-stm",
    brand: "Canon",
    name: "RF 24-105mm f/4-7.1 IS STM",
    mount: "RF",
    category: "standard",
    lensType: "zoom",
    sensorCoverage: "Full Frame",
    futureProof: true,
    stabilization: true,
    weightGrams: 395,
    price: 399,
    strengths: ["Flexible range", "Lightweight", "Good starter full-frame zoom"],
    tradeoffs: ["Slow aperture", "Not premium build"],
    buyLinks: {
      bh: bh("Canon RF 24-105mm f/4-7.1 IS STM"),
      amazon: amz("Canon RF 24-105mm f/4-7.1 IS STM"),
      used: mpb("Canon RF 24-105mm f/4-7.1 IS STM"),
    },
  },

  {
    id: "canon-rf-24-105-f4l",
    slug: "canon-rf-24-105mm-f4-l-is-usm",
    brand: "Canon",
    name: "RF 24-105mm f/4L IS USM",
    mount: "RF",
    category: "standard",
    lensType: "zoom",
    sensorCoverage: "Full Frame",
    futureProof: true,
    stabilization: true,
    weightGrams: 700,
    price: 1299,
    strengths: ["Pro-level standard zoom", "Great all-around range", "Strong image quality"],
    tradeoffs: ["Expensive", "Heavier"],
    buyLinks: {
      bh: bh("Canon RF 24-105mm f/4L IS USM"),
      amazon: amz("Canon RF 24-105mm f/4L IS USM"),
      used: mpb("Canon RF 24-105mm f/4L IS USM"),
    },
  },

  {
    id: "canon-rf-100-400",
    slug: "canon-rf-100-400mm-f5-6-8-is-usm",
    brand: "Canon",
    name: "RF 100-400mm f/5.6-8 IS USM",
    mount: "RF",
    category: "telephoto",
    lensType: "zoom",
    sensorCoverage: "Full Frame",
    futureProof: true,
    stabilization: true,
    weightGrams: 635,
    price: 649,
    strengths: ["Great wildlife value", "Relatively light", "Huge reach for the price"],
    tradeoffs: ["Slow aperture", "Not pro build"],
    buyLinks: {
      bh: bh("Canon RF 100-400mm f/5.6-8 IS USM"),
      amazon: amz("Canon RF 100-400mm f/5.6-8 IS USM"),
      used: mpb("Canon RF 100-400mm f/5.6-8 IS USM"),
    },
  },

  {
    id: "canon-rfs-18-45",
    slug: "canon-rf-s-18-45mm-f4-5-6-3-is-stm",
    brand: "Canon",
    name: "RF-S 18-45mm f/4.5-6.3 IS STM",
    mount: "RF-S",
    category: "standard",
    lensType: "zoom",
    sensorCoverage: "APS-C",
    futureProof: false,
    stabilization: true,
    weightGrams: 130,
    price: 299,
    strengths: ["Very light", "Cheap", "Good beginner kit lens"],
    tradeoffs: ["Limited range", "Slow aperture"],
    buyLinks: {
      bh: bh("Canon RF-S 18-45mm f/4.5-6.3 IS STM"),
      amazon: amz("Canon RF-S 18-45mm f/4.5-6.3 IS STM"),
      used: mpb("Canon RF-S 18-45mm f/4.5-6.3 IS STM"),
    },
  },

  {
    id: "canon-rfs-18-150",
    slug: "canon-rf-s-18-150mm-f3-5-6-3-is-stm",
    brand: "Canon",
    name: "RF-S 18-150mm f/3.5-6.3 IS STM",
    mount: "RF-S",
    category: "standard",
    lensType: "zoom",
    sensorCoverage: "APS-C",
    futureProof: false,
    stabilization: true,
    weightGrams: 310,
    price: 499,
    strengths: ["Very versatile", "Great one-lens travel option", "Excellent APS-C starter lens"],
    tradeoffs: ["Not future-proof for full frame", "Slow aperture"],
    buyLinks: {
      bh: bh("Canon RF-S 18-150mm f/3.5-6.3 IS STM"),
      amazon: amz("Canon RF-S 18-150mm f/3.5-6.3 IS STM"),
      used: mpb("Canon RF-S 18-150mm f/3.5-6.3 IS STM"),
    },
  },

  {
    id: "canon-rfs-10-18",
    slug: "canon-rf-s-10-18mm-f4-5-6-3-is-stm",
    brand: "Canon",
    name: "RF-S 10-18mm f/4.5-6.3 IS STM",
    mount: "RF-S",
    category: "wide",
    lensType: "zoom",
    sensorCoverage: "APS-C",
    futureProof: false,
    stabilization: true,
    weightGrams: 150,
    price: 329,
    strengths: ["Tiny ultra-wide", "Great for travel", "Good APS-C landscape option"],
    tradeoffs: ["Slow aperture", "APS-C only"],
    buyLinks: {
      bh: bh("Canon RF-S 10-18mm f/4.5-6.3 IS STM"),
      amazon: amz("Canon RF-S 10-18mm f/4.5-6.3 IS STM"),
      used: mpb("Canon RF-S 10-18mm f/4.5-6.3 IS STM"),
    },
  },

  // =========================
  // Canon EF / EF-S
  // =========================

  {
    id: "canon-ef-50-f18",
    slug: "canon-ef-50mm-f1-8-stm",
    brand: "Canon",
    name: "EF 50mm f/1.8 STM",
    mount: "EF",
    category: "standard",
    lensType: "prime",
    sensorCoverage: "Full Frame",
    futureProof: true,
    stabilization: false,
    weightGrams: 160,
    price: 125,
    strengths: ["Cheap", "Sharp", "Classic starter prime"],
    tradeoffs: ["No stabilization", "Basic build"],
    buyLinks: {
      bh: bh("Canon EF 50mm f/1.8 STM"),
      amazon: amz("Canon EF 50mm f/1.8 STM"),
      used: mpb("Canon EF 50mm f/1.8 STM"),
    },
  },

  {
    id: "canon-efs-17-55-f28",
    slug: "canon-ef-s-17-55mm-f2-8-is-usm",
    brand: "Canon",
    name: "EF-S 17-55mm f/2.8 IS USM",
    mount: "EF-S",
    category: "standard",
    lensType: "zoom",
    sensorCoverage: "APS-C",
    futureProof: false,
    stabilization: true,
    weightGrams: 645,
    price: 879,
    strengths: ["Excellent APS-C DSLR standard zoom", "Fast aperture", "Great image quality"],
    tradeoffs: ["Heavy", "APS-C DSLR only"],
    buyLinks: {
      bh: bh("Canon EF-S 17-55mm f/2.8 IS USM"),
      amazon: amz("Canon EF-S 17-55mm f/2.8 IS USM"),
      used: mpb("Canon EF-S 17-55mm f/2.8 IS USM"),
    },
  },

  {
    id: "canon-efs-10-18",
    slug: "canon-ef-s-10-18mm-f4-5-5-6-is-stm",
    brand: "Canon",
    name: "EF-S 10-18mm f/4.5-5.6 IS STM",
    mount: "EF-S",
    category: "wide",
    lensType: "zoom",
    sensorCoverage: "APS-C",
    futureProof: false,
    stabilization: true,
    weightGrams: 240,
    price: 299,
    strengths: ["Affordable ultra-wide", "Great for APS-C landscapes", "Light"],
    tradeoffs: ["APS-C only", "Slow aperture"],
    buyLinks: {
      bh: bh("Canon EF-S 10-18mm f/4.5-5.6 IS STM"),
      amazon: amz("Canon EF-S 10-18mm f/4.5-5.6 IS STM"),
      used: mpb("Canon EF-S 10-18mm f/4.5-5.6 IS STM"),
    },
  },

  {
    id: "canon-ef-70-200-f4l",
    slug: "canon-ef-70-200mm-f4-l-is-ii-usm",
    brand: "Canon",
    name: "EF 70-200mm f/4L IS II USM",
    mount: "EF",
    category: "telephoto",
    lensType: "zoom",
    sensorCoverage: "Full Frame",
    futureProof: true,
    stabilization: true,
    weightGrams: 780,
    price: 1299,
    strengths: ["Sharp", "Lighter than f/2.8 telephotos", "Strong sports/wildlife option"],
    tradeoffs: ["Still expensive", "Not as much reach as 100-400"],
    buyLinks: {
      bh: bh("Canon EF 70-200mm f/4L IS II USM"),
      amazon: amz("Canon EF 70-200mm f/4L IS II USM"),
      used: mpb("Canon EF 70-200mm f/4L IS II USM"),
    },
  },
];

const LENSES = RAW_LENSES.filter(Boolean).map(normalizeLens);

export { LENSES };
export default LENSES;