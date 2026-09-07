import { CAMERAS } from "../data/cameras.js";

function scoreCamera(camera, answers) {
  let score = 0;

  // Homepage intent
  const intent = answers.intent || "";

  if (intent === "Travel") score += camera.travel * 3;
  else if (intent === "Wildlife") score += camera.wildlife * 3;
  else if (intent === "Portraits") score += camera.portrait * 3;
  else if (intent === "Video") score += camera.video * 3;

  // Primary use weighting
  if (answers.primary === "Photography") {
    score += camera.landscape * 1.2;
  }

  if (answers.primary === "Videography") {
    score += camera.video * 1.2;
  }

  if (answers.primary === "Both") {
    score += (camera.landscape + camera.video) * 0.6;
  }

  // Genre priority
  if (answers.genre === "Landscapes") {
    score += camera.landscape * 3;
  } else if (answers.genre === "City/Street") {
    score += camera.travel * 3;
  } else if (answers.genre === "People") {
    score += camera.portrait * 3;
  } else if (answers.genre === "Wildlife") {
    score += camera.wildlife * 3;
  } else if (answers.genre === "A mix of everything") {
    score +=
      (camera.travel +
        camera.landscape +
        camera.portrait +
        camera.wildlife +
        camera.video) *
      0.9;
  }

  // Budget scoring
  const budget = answers.budget || "";

  if (budget === "Under $1,000")
    score += camera.priceTier === "budget" ? 6 : camera.priceTier === "mid" ? 2 : -6;
  else if (budget === "$1,000–$1,800")
    score += camera.priceTier === "mid" ? 6 : camera.priceTier === "high" ? 2 : -3;
  else if (budget === "$1,800–$2,800")
    score += camera.priceTier === "high" ? 6 : camera.priceTier === "pro" ? 2 : -2;
  else if (budget === "$2,800+")
    score += camera.priceTier === "pro" ? 6 : 1;

  // Weight preference
  const weight = answers.weight || "";
  const isLight =
    camera.weightClass === "light" || camera.weightClass === "very light";

  if (weight === "Must be light")
    score += isLight ? 6 : camera.weightClass === "medium" ? 1 : -4;
  else if (weight === "Nice to be light")
    score += isLight ? 4 : camera.weightClass === "medium" ? 2 : -1;

  // Low light preference
  const lowlight = answers.lowlight || "";

  if (lowlight === "Often") score += camera.lowLight * 2;
  else if (lowlight === "Sometimes") score += camera.lowLight;

  // Experience
  const exp = answers.experience || "";

  if (exp === "Beginner") score += camera.beginnerFriendly * 2;
  else if (exp === "Hobbyist") score += camera.beginnerFriendly;
  else if (exp === "Advanced") score += 1;

  return score;
}

export function getScoredList(answers) {
  return CAMERAS
    .map((camera) => ({ camera, score: scoreCamera(camera, answers) }))
    .sort((a, b) => b.score - a.score);
}

export function getRecommendations(answers) {
  return getScoredList(answers)
    .slice(0, 3)
    .map((x) => x.camera);
}