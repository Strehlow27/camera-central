// recommendLenses.js

import { getCompatibleLensesByCategory } from "./lensCompatibility";

function sortLenses(lenses = [], priorities = {}) {
  const {
    preferFutureProof = false,
    preferLightweight = false,
    maxBudget = null,
  } = priorities;

  return [...lenses].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    if (preferFutureProof) {
      if (a.futureProof) scoreA += 3;
      if (b.futureProof) scoreB += 3;
    }

    if (preferLightweight) {
      scoreA += Math.max(0, 1000 - (a.weightGrams ?? 1000)) / 200;
      scoreB += Math.max(0, 1000 - (b.weightGrams ?? 1000)) / 200;
    }

    if (maxBudget !== null) {
      if ((a.price ?? Infinity) <= maxBudget) scoreA += 2;
      if ((b.price ?? Infinity) <= maxBudget) scoreB += 2;
    }

    scoreA += Math.max(0, 2000 - (a.price ?? 2000)) / 500;
    scoreB += Math.max(0, 2000 - (b.price ?? 2000)) / 500;

    return scoreB - scoreA;
  });
}

export function recommendLensesForCamera(camera, lenses = [], options = {}) {
  const categorized = getCompatibleLensesByCategory(camera, lenses);

  const standard = sortLenses(categorized.standard, options)[0] ?? null;
  const wide = sortLenses(categorized.wide, options)[0] ?? null;
  const telephoto = sortLenses(categorized.telephoto, options)[0] ?? null;

  return {
    standard,
    wide,
    telephoto,
    allCompatible: categorized.all,
  };
}