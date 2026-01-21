// public/scripts/results.js
console.log("RESULTS.JS LOADED ✅ v1006");

function $(id) {
  return document.getElementById(id);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cameraImageUrl(c) {
  if (c && typeof c.image === "string" && c.image.trim()) return c.image.trim();

  var slug = c && typeof c.slug === "string" ? c.slug.trim() : "";
  if (slug) return "/images/cameras/" + slug + ".jpg";

  var id = c && typeof c.id === "string" ? c.id.trim() : "";
  return id ? "/images/cameras/" + id + ".jpg" : "";
}

function cameraImageAlt(c) {
  if (c && typeof c.imageAlt === "string" && c.imageAlt.trim()) {
    return c.imageAlt.trim();
  }
  var brand = (c && c.brand) ? c.brand : "";
  var model = (c && c.model) ? c.model : "";
  var alt = (brand + " " + model).trim();
  return alt || "Camera";
}

/**
 * Build a B&H affiliate URL with optional SID
 */
function withBHAffiliate(url, sid = "") {
  try {
    const u = new URL(url);

    u.searchParams.set("BI", BH.BI);
    u.searchParams.set("KBID", BH.KBID);

    if (sid) {
      u.searchParams.set("SID", sid);
    } else {
      u.searchParams.delete("SID");
    }

    return u.toString();
  } catch {
    // Fallback: if URL parsing fails, return original
    return url;
  }
}

/**
 * ✅ Safe tracker wrapper
 * - Uses BaseLayout's window.ccTrack if present
 * - Never throws if tracking isn't loaded
 */
function track(name, props = {}) {
  try {
    if (typeof window.ccTrack === "function") {
      window.ccTrack(name, props);
    } else {
      // Still helpful in dev if BaseLayout script didn't load for some reason
      console.log("[track:fallback]", name, props);
    }
  } catch {}
}

function bhSearchUrl(camera) {
  const q = encodeURIComponent(
    `${camera.brand || ""} ${camera.model || ""}`.trim()
  );
  return `https://www.bhphotovideo.com/c/search?Ntt=${q}&N=0&InitialSearch=yes&sts=ma`;
}

// ---------- buy links helpers ----------
function getBuyLinks(camera) {
  const links = camera?.buyLinks || {};
  const bh =
    typeof links.bh === "string" && links.bh.trim()
      ? links.bh.trim()
      : bhSearchUrl(camera);

  const amazon =
    typeof links.amazon === "string" && links.amazon.trim()
      ? links.amazon.trim()
      : "";

  const used =
    typeof links.used === "string" && links.used.trim() ? links.used.trim() : "";

  return { bh, amazon, used };
}

function buyMenuHtml(camera) {
  const { bh: rawBh, amazon, used } = getBuyLinks(camera);

  // Build a useful SID
  const sid = `results_${camera.id}_menu`;

  // Apply B&H affiliate tracking
  const bh = withBHAffiliate(rawBh, sid);

  const items = [
    { label: "B&H Photo", key: "bh", url: bh },
    ...(amazon ? [{ label: "Amazon", key: "amazon", url: amazon }] : []),
    ...(used ? [{ label: "Used (MPB)", key: "used", url: used }] : []),
  ];

  // ✅ Add data-camera-id so we know which camera's menu was used
  return `
    <div class="relative inline-flex" data-buy-wrap="1" data-camera-id="${escapeHtml(
      camera.id
    )}">
      <button
        type="button"
        data-buy-btn="1"
        class="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition inline-flex items-center gap-2 cursor-pointer"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        View buying options
        <span aria-hidden="true">▾</span>
      </button>

      <div
        data-buy-menu="1"
        class="hidden absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-20"
        role="menu"
      >
        ${items
          .map(
            (it) => `
          <a
            role="menuitem"
            data-buy-url="${escapeHtml(it.url)}"
            data-buy-retailer="${escapeHtml(it.key)}"
            href="${escapeHtml(it.url)}"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50"
          >
            ${escapeHtml(it.label)}
          </a>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// Close any open buy menus
function closeAllBuyMenus() {
  document
    .querySelectorAll("[data-buy-menu]")
    .forEach((m) => m.classList.add("hidden"));
  document
    .querySelectorAll("[data-buy-btn]")
    .forEach((b) => b.setAttribute("aria-expanded", "false"));
}

// ---------- ready helper ----------
function ready(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else {
    fn();
  }
}

// Dataset comes from window.CAMERAS (set in results.astro)
const CAMERAS = (Array.isArray(window.CAMERAS) ? window.CAMERAS : [])
  .filter(Boolean)
  .map((c) => {
    const id =
      typeof c.id === "string" && c.id.trim()
        ? c.id.trim()
        : `${c.brand || "camera"}-${c.model || "unknown"}`
            .toLowerCase()
            .replaceAll("&", "and")
            .replaceAll("’", "")
            .replaceAll("'", "")
            .replaceAll('"', "")
            .replaceAll(".", "")
            .replaceAll("/", "-")
            .replaceAll("  ", " ")
            .trim()
            .replaceAll(" ", "-")
            .replaceAll("--", "-");

    return { ...c, id };
  });

// --------------------
// Answers + weights
// --------------------
const ANSWERS_KEY = "cc_answers";
const COMPARE_KEY = "cc_compare";
const MORE_OPEN_KEY = "cc_more_open";

const DEFAULT_WEIGHTS = {
  photo: 3,
  port: 3,
  video: 3,
  budgetMin: 900,
  budgetMax: 3000,
};

const BUDGET_MIN = 500;
const BUDGET_MAX = 4500;

function clampInt(v, min, max, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function loadAnswers() {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  const urlAnswers = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );
  if (Object.keys(urlAnswers).length) {
    try {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(urlAnswers));
      window.history.replaceState({}, "", "/results");
    } catch {}
    return urlAnswers;
  }

  return null;
}

function loadWeights() {
  try {
    const saved = JSON.parse(localStorage.getItem("cc_weights") || "null");
    if (!saved) return { ...DEFAULT_WEIGHTS };

    const w = {
      photo: clampInt(saved.photo, 0, 5, DEFAULT_WEIGHTS.photo),
      port: clampInt(saved.port, 0, 5, DEFAULT_WEIGHTS.port),
      video: clampInt(saved.video, 0, 5, DEFAULT_WEIGHTS.video),
      budgetMin: clampInt(
        saved.budgetMin,
        BUDGET_MIN,
        BUDGET_MAX,
        DEFAULT_WEIGHTS.budgetMin
      ),
      budgetMax: clampInt(
        saved.budgetMax,
        BUDGET_MIN,
        BUDGET_MAX,
        DEFAULT_WEIGHTS.budgetMax
      ),
    };

    if (w.budgetMin > w.budgetMax) {
      const mid = Math.round((w.budgetMin + w.budgetMax) / 2);
      w.budgetMin = mid;
      w.budgetMax = mid;
    }

    return w;
  } catch {
    return { ...DEFAULT_WEIGHTS };
  }
}

function saveWeights(w) {
  localStorage.setItem("cc_weights", JSON.stringify(w));
}

// --------------------
// Compare selection
// --------------------
function emitCompareUpdated(ids) {
  try {
    window.dispatchEvent(
      new CustomEvent("cc-compare-updated", { detail: { ids } })
    );
  } catch {}
}

function loadCompare() {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function saveCompare(ids) {
  try {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  } catch {}
}

function toggleCompareId(id) {
  let ids = loadCompare();

  const wasSelected = ids.includes(id);

  if (wasSelected) {
    ids = ids.filter((x) => x !== id);
    ids = Array.from(new Set(ids));
    saveCompare(ids);
    emitCompareUpdated(ids);

    // ✅ tracking
    track("compare_toggle", { id, action: "remove", count: ids.length });

    return ids;
  }

  ids.push(id);
  ids = Array.from(new Set(ids));
  saveCompare(ids);
  emitCompareUpdated(ids);

  // ✅ tracking
  track("compare_toggle", { id, action: "add", count: ids.length });

  return ids;
}

function clearCompare() {
  saveCompare([]);
  emitCompareUpdated([]);

  // ✅ tracking
  track("compare_clear", { count: 0 });

  return [];
}

function cameraById(id) {
  return CAMERAS.find((c) => c.id === id);
}

function sanitizeCompare() {
  const ids = loadCompare();
  const valid = ids.filter((id) => !!cameraById(id));
  if (valid.length !== ids.length) saveCompare(valid);
  if (valid.length !== ids.length) emitCompareUpdated(valid);
  return valid;
}

// --------------------
// Scoring (unchanged)
// --------------------
function scoreCamera(camera, answers, weights) {
  let score = 0;

  const wPhoto = (weights?.photo ?? 3) / 3;
  const wPort = (weights?.port ?? 3) / 3;
  const wVideo = (weights?.video ?? 3) / 3;

  if (answers.genre === "Landscapes") score += (camera.landscape || 0) * 3;
  else if (answers.genre === "City/Street") score += (camera.travel || 0) * 3;
  else if (answers.genre === "People") score += (camera.lowLight || 0) * 2;
  else if (answers.genre === "A mix of everything")
    score +=
      ((camera.travel || 0) +
        (camera.landscape || 0) +
        (camera.video || 0)) *
      1.5;

  const budget = answers.budget || "";
  if (budget === "Under $1,000")
    score +=
      camera.priceTier === "budget"
        ? 6
        : camera.priceTier === "mid"
        ? 2
        : -6;
  else if (budget === "$1,000–$1,800")
    score +=
      camera.priceTier === "mid"
        ? 6
        : camera.priceTier === "high"
        ? 2
        : -3;
  else if (budget === "$1,800–$2,800")
    score +=
      camera.priceTier === "high"
        ? 6
        : camera.priceTier === "pro"
        ? 2
        : -2;
  else if (budget === "$2,800+") score += camera.priceTier === "pro" ? 6 : 1;

  const weight = answers.weight || "";
  if (weight === "Must be light")
    score +=
      camera.weightClass === "light"
        ? 6
        : camera.weightClass === "medium"
        ? 1
        : -4;
  else if (weight === "Nice to be light")
    score +=
      camera.weightClass === "light"
        ? 4
        : camera.weightClass === "medium"
        ? 2
        : -1;

  const lowlight = answers.lowlight || "";
  if (lowlight === "Often") score += (camera.lowLight || 0) * 2;
  else if (lowlight === "Sometimes") score += camera.lowLight || 0;

  const exp = answers.experience || "";
  if (exp === "Beginner") score += (camera.beginnerFriendly || 0) * 2;
  else if (exp === "Hobbyist") score += camera.beginnerFriendly || 0;
  else if (exp === "Advanced") score += 1;

  score += (camera.landscape || 0) * 1.2 * wPhoto;
  score += (camera.lowLight || 0) * 0.8 * wPhoto;
  score += (camera.video || 0) * 1.6 * wVideo;

  const wc = camera.weightClass || "medium";
  const portabilityBase =
    wc === "very light" ? 10 : wc === "light" ? 7 : wc === "medium" ? 4 : 1;
  score += portabilityBase * 0.8 * wPort;

  return score;
}

function normalizeCameraTypeAnswer(raw) {
  // Backward compatible: old quizzes won’t have cameraType saved
  const v = (raw || "").trim();

  if (v === "Detachable-lens camera") return "detachable";
  if (v === "Fixed-lens digital camera") return "fixed";

  // "Not sure / show me both" OR missing OR unknown => no filtering
  return "both";
}

function getScoredList(answers, weights) {
  const minB = weights?.budgetMin ?? DEFAULT_WEIGHTS.budgetMin;
  const maxB = weights?.budgetMax ?? DEFAULT_WEIGHTS.budgetMax;

  const typePref = normalizeCameraTypeAnswer(answers?.cameraType);

  return CAMERAS
    .filter((c) => {
      // 1) Budget filter (existing)
      if (typeof c.price === "number") {
        if (c.price < minB || c.price > maxB) return false;
      }

      // 2) Camera type filter (NEW)
      // Expecting camera.js to provide c.cameraType ("detachable" | "fixed")
      // Backward compatible: if a camera is missing cameraType, infer from isInterchangeableLens/system
      if (typePref !== "both") {
        const inferred =
          c.cameraType ||
          (c.isInterchangeableLens === false
            ? "fixed"
            : c.system === "Compact"
            ? "fixed"
            : "detachable");

        if (inferred !== typePref) return false;
      }

      return true;
    })
    .map((camera) => ({ camera, score: scoreCamera(camera, answers, weights) }))
    .sort((a, b) => b.score - a.score);
}

function budgetFromAnswer(answer) {
  switch (answer) {
    case "Under $1,000":
      return { min: 500, max: 1000 };
    case "$1,000–$1,800":
      return { min: 1000, max: 1800 };
    case "$1,800–$2,800":
      return { min: 1800, max: 2800 };
    case "$2,800+":
      return { min: 2800, max: 4500 };
    default:
      return { min: 900, max: 3000 };
  }
}

function seedBudgetFromQuiz(weights, answers) {
  const fromQ = budgetFromAnswer(answers.budget);
  const lastSeed = localStorage.getItem("cc_budget_seed");

  if (answers.budget && answers.budget !== lastSeed) {
    weights.budgetMin = fromQ.min;
    weights.budgetMax = fromQ.max;
    localStorage.setItem("cc_budget_seed", answers.budget);
  }
  return weights;
}

// --------------------
// Sticky compare bar
// --------------------
function ensureCompareBar() {
  if (document.getElementById("ccCompareBar")) return;

  const bar = document.createElement("div");
  bar.id = "ccCompareBar";
  bar.className =
    "fixed left-0 right-0 bottom-0 z-50 hidden border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3";

  bar.innerHTML = `
    <div class="mx-auto w-full max-w-2xl flex items-center justify-between gap-3">
      <div class="min-w-0">
        <p class="text-xs text-gray-500">Compare</p>
        <div id="ccCompareList" class="text-sm text-gray-900 font-semibold truncate"></div>
        <p id="ccCompareHint" class="text-xs text-gray-500 mt-0.5"></p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          id="ccCompareClear"
          type="button"
          class="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm"
        >
          Clear
        </button>

        <button
          id="ccCompareCopy"
          type="button"
          class="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm"
          disabled
          style="opacity:0.4; cursor:not-allowed;"
        >
          Copy link
        </button>

        <button
          id="ccCompareGo"
          type="button"
          class="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition text-sm"
          disabled
          style="opacity:0.4; cursor:not-allowed;"
        >
          Compare now
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(bar);
}

function updateCompareUI() {
  ensureCompareBar();

  const bar = document.getElementById("ccCompareBar");
  const list = document.getElementById("ccCompareList");
  const hint = document.getElementById("ccCompareHint");
  const go = document.getElementById("ccCompareGo");
  const copy = document.getElementById("ccCompareCopy");

  if (!bar || !list || !hint || !go) return;

  const ids = sanitizeCompare();
  const cams = ids.map(cameraById).filter(Boolean);

  if (!cams.length) {
    bar.classList.add("hidden");
    return;
  }

  bar.classList.remove("hidden");
  list.textContent = cams.map((c) => `${c.brand} ${c.model}`).join("  •  ");

  if (ids.length < 2) {
    hint.textContent = "Select at least 2 cameras to compare.";
    go.disabled = true;
    go.style.cursor = "not-allowed";
    go.style.opacity = "0.4";

    if (copy) {
      copy.disabled = true;
      copy.style.cursor = "not-allowed";
      copy.style.opacity = "0.4";
    }
  } else {
    hint.textContent = `Ready (${ids.length}).`;
    go.disabled = false;
    go.style.cursor = "pointer";
    go.style.opacity = "1";

    if (copy) {
      copy.disabled = false;
      copy.style.cursor = "pointer";
      copy.style.opacity = "1";
    }
  }

  emitCompareUpdated(ids);
}

// ✅ One capture-phase click handler for everything
document.addEventListener(
  "click",
  async (e) => {
    // Close buy dropdowns if click is outside
    if (
      !e.target.closest("[data-buy-btn]") &&
      !e.target.closest("[data-buy-menu]")
    ) {
      closeAllBuyMenus();
    }

    // ✅ Retailer click tracking (must happen before opening new tab)
    const buyLink = e.target.closest("[data-buy-url]");
    if (buyLink) {
      // Let the link still open normally (don't preventDefault)
      const wrap = buyLink.closest("[data-buy-wrap]");
      const cameraId = wrap?.getAttribute?.("data-camera-id") || "";
      const retailer = buyLink.getAttribute("data-buy-retailer") || "unknown";
      const url = buyLink.getAttribute("data-buy-url") || buyLink.href || "";

      track("buy_option_click", { id: cameraId, retailer, url });
      closeAllBuyMenus();
      return;
    }

    const go = e.target.closest("#ccCompareGo");
    if (go) {
      e.preventDefault();
      e.stopPropagation();

      const ids = sanitizeCompare();
      if (!Array.isArray(ids) || ids.length < 2) return;

      track("compare_now", { ids, count: ids.length });

      const url = `/compare?ids=${ids.map(encodeURIComponent).join(",")}`;
      window.location.assign(url);
      return;
    }

    const copy = e.target.closest("#ccCompareCopy");
    if (copy) {
      e.preventDefault();
      e.stopPropagation();

      const ids = sanitizeCompare();
      if (!Array.isArray(ids) || ids.length < 2) return;

      const shareUrl =
        window.location.origin +
        `/compare?ids=${ids.map(encodeURIComponent).join(",")}`;

      try {
        await navigator.clipboard.writeText(shareUrl);
        copy.textContent = "Copied!";
        setTimeout(() => (copy.textContent = "Copy link"), 1200);
        track("copy_compare_link", { ids, count: ids.length });
      } catch {
        window.prompt("Copy this link:", shareUrl);
        track("copy_compare_link_fallback", { ids, count: ids.length });
      }
      return;
    }

    const clearBtn = e.target.closest("#ccCompareClear");
    if (clearBtn) {
      e.preventDefault();
      e.stopPropagation();
      clearCompare();
      updateCompareUI();
      render();
      return;
    }

    // Toggle dropdown menu
    const buyBtn = e.target.closest("[data-buy-btn]");
    if (buyBtn) {
      e.preventDefault();
      e.stopPropagation();

      const wrapper =
        buyBtn.closest("[data-buy-wrap]") || buyBtn.closest(".relative");
      const menu = wrapper?.querySelector?.("[data-buy-menu]");
      if (!menu) return;

      const isOpen = !menu.classList.contains("hidden");
      const cameraId = wrapper?.getAttribute?.("data-camera-id") || "";

      // only one open at a time
      closeAllBuyMenus();

      if (!isOpen) {
        menu.classList.remove("hidden");
        buyBtn.setAttribute("aria-expanded", "true");
        track("buy_options_open", { id: cameraId });
      } else {
        track("buy_options_close", { id: cameraId });
      }
      return;
    }
  },
  true
);

// --------------------
// Render blocks
// --------------------
function bigCardHtml(c, i, isSelected) {
  const mpTxt = typeof c.mp === "number" ? `${c.mp} MP` : "—";
  const ibisTxt = typeof c.ibis === "boolean" ? (c.ibis ? "Yes" : "No") : "—";
  const weightTxt =
    typeof c.weightGrams === "number" ? `${c.weightGrams}g` : "—";
  const priceTxt =
    typeof c.price === "number" ? `$${Number(c.price).toLocaleString()}` : "—";

  const systemTxt = c.system ? escapeHtml(c.system) : "—";
  const sensorTxt = c.sensor ? escapeHtml(c.sensor) : "—";
  const mountTxt = c.mount ? escapeHtml(c.mount) : "—";

  const imgSrc = cameraImageUrl(c);
  const imgAlt = cameraImageAlt(c);

  return `
  <div class="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
    <div class="flex items-start justify-between gap-6">
      <!-- LEFT: text -->
      <div class="min-w-0 flex-1">
        <p class="text-sm text-gray-500">${i === 0 ? "Top pick" : "Alternative"}</p>
        <h2 class="text-xl font-semibold">${escapeHtml(c.brand)} ${escapeHtml(c.model)}</h2>

        <p class="text-sm text-gray-600">
          ${systemTxt} • ${sensorTxt} • ${mountTxt} mount
        </p>

        <p class="mt-1 text-sm text-gray-500">
          ${escapeHtml(mpTxt)} • IBIS: ${escapeHtml(ibisTxt)} • ${escapeHtml(weightTxt)} • ${escapeHtml(priceTxt)}
        </p>
      </div>

      <!-- RIGHT: actions + image (small, consistent) -->
      <div class="shrink-0 flex flex-col items-end gap-2">
        ${buyMenuHtml(c)}

        <button
          type="button"
          data-compare="${escapeHtml(c.id)}"
          class="px-4 py-2 rounded-xl border text-sm select-none ${
            isSelected
              ? "border-gray-900 bg-gray-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }"
          style="cursor:pointer;"
        >
          ${isSelected ? "Selected ✓" : "Compare"}
        </button>

        ${
          imgSrc
            ? `
          <img
            src="${escapeHtml(imgSrc)}"
            alt="${escapeHtml(imgAlt)}"
            loading="lazy"
            class="mt-1 w-32 h-24 rounded-xl border border-gray-200 bg-gray-50 object-cover"
            onerror="this.style.display='none';"
          />
        `
            : ""
        }
      </div>
    </div>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p class="text-sm font-semibold mb-2">Why it fits</p>
        <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
          ${(c.strengths || [])
            .slice(0, 3)
            .map((s) => `<li>${escapeHtml(s)}</li>`)
            .join("")}
        </ul>
      </div>
      <div>
        <p class="text-sm font-semibold mb-2">Tradeoffs</p>
        <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
          ${(c.tradeoffs || [])
            .slice(0, 3)
            .map((t) => `<li>${escapeHtml(t)}</li>`)
            .join("")}
        </ul>
      </div>
    </div>
  </div>`;
}

function compactRowHtml(camera, score, isSelected) {
  const priceTxt =
    typeof camera.price === "number"
      ? `$${Number(camera.price).toLocaleString()}`
      : "—";
  const sensorTxt = camera.sensor ? escapeHtml(camera.sensor) : "—";
  const mpTxt = typeof camera.mp === "number" ? `${camera.mp} MP` : "—";
  const ibisTxt =
    typeof camera.ibis === "boolean" ? (camera.ibis ? "Yes" : "No") : "—";
  const weightTxt =
    typeof camera.weightGrams === "number" ? `${camera.weightGrams} g` : "—";

  const imgSrc = cameraImageUrl(camera);
  const imgAlt = cameraImageAlt(camera);

  return `
    <div class="flex items-center justify-between gap-3 py-3">
      <div class="min-w-0 flex items-center gap-3">
        ${
          imgSrc
            ? `
          <img
            src="${escapeHtml(imgSrc)}"
            alt="${escapeHtml(imgAlt)}"
            loading="lazy"
            class="h-12 w-12 rounded-lg border border-gray-200 bg-gray-50 object-cover shrink-0"
            onerror="this.style.display='none';"
          />
        `
            : ""
        }

        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-semibold truncate">${escapeHtml(camera.brand)} ${escapeHtml(
    camera.model
  )}</p>
            <span class="text-xs text-gray-500">Score: ${Number(score).toFixed(1)}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1 truncate">
            ${sensorTxt} • ${mpTxt} • IBIS: ${ibisTxt} • ${weightTxt} • ${priceTxt}
          </p>
        </div>
      </div>

      <div class="shrink-0 flex items-center gap-2">
        ${buyMenuHtml(camera)}

        <button
          type="button"
          data-compare="${escapeHtml(camera.id)}"
          class="px-3 py-2 rounded-xl border text-sm ${
            isSelected
              ? "border-gray-900 bg-gray-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }"
          style="cursor:pointer;"
        >
          ${isSelected ? "Selected ✓" : "Compare"}
        </button>
      </div>
    </div>
  `;
}

// --------------------
// Main render
// --------------------
function render() {
  ensureCompareBar();
  updateCompareUI();

  closeAllBuyMenus();

  const answers = loadAnswers();
  const weights = loadWeights();

  const cardsWrap = $("resultsCards");
  if (!cardsWrap) return;

  if (!answers) {
    cardsWrap.innerHTML = `
      <div class="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        <h2 class="text-xl font-semibold">No quiz answers found</h2>
        <p class="text-gray-600 mt-1">Take the finder quiz to get recommendations.</p>
        <a href="/find" class="inline-flex mt-4 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition">
          Go to finder
        </a>
      </div>
    `;
    return;
  }

  let seeded = seedBudgetFromQuiz({ ...weights }, answers);
  saveWeights(seeded);

  const scored = getScoredList(answers, seeded);
  const typePref = normalizeCameraTypeAnswer(answers?.cameraType);
  const typeNote =
    typePref === "detachable"
      ? "You selected a detachable-lens camera, so we filtered out fixed-lens compacts."
      : typePref === "fixed"
      ? "You selected a fixed-lens digital camera, so we filtered out detachable-lens bodies."
      : "";

  const compareSelected = sanitizeCompare();

  const top3 = scored.slice(0, 3).map((x) => x.camera);
  const more = scored.slice(3);

  const moreWasOpen = sessionStorage.getItem(MORE_OPEN_KEY) === "true";

  cardsWrap.innerHTML = `
    <div class="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <p class="text-sm text-gray-600">
        <span class="font-semibold text-gray-900">Why these were recommended:</span>
        We scored cameras based on your answers (genre, portability, low-light, video) and your refine sliders.
        Your budget range filters out bodies outside $${seeded.budgetMin}–$${seeded.budgetMax}.
        ${typeNote ? `<span class="block mt-2">${escapeHtml(typeNote)}</span>` : ""}
      </p>
    </div>

    ${top3.map((c, i) => bigCardHtml(c, i, compareSelected.includes(c.id))).join("")}

    ${
      more.length
        ? `
      <details id="moreMatches" class="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
        <summary class="cursor-pointer select-none font-semibold text-gray-900">
          More matches (${more.length})
          <span class="ml-2 text-sm text-gray-500 font-normal">compact list</span>
        </summary>

        <div class="mt-4 divide-y divide-gray-100">
          ${more
            .map(({ camera, score }) =>
              compactRowHtml(camera, score, compareSelected.includes(camera.id))
            )
            .join("")}
        </div>
      </details>
    `
        : ""
    }

    <div class="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <p class="text-xs text-gray-500">
        Disclosure: “Some links are affiliate links. If you buy through them, we may earn a small commission at no extra cost to you.”
      </p>
    </div>
  `;

  const moreEl = document.getElementById("moreMatches");
  if (moreEl) {
    if (moreWasOpen) moreEl.open = true;
    moreEl.addEventListener("toggle", () => {
      sessionStorage.setItem(MORE_OPEN_KEY, String(!!moreEl.open));
      track("more_matches_toggle", { open: !!moreEl.open });
    });
  }

  // Compare buttons tracking
  cardsWrap.querySelectorAll("button[data-compare]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-compare");
      if (!id) return;

      const details = document.getElementById("moreMatches");
      if (details)
        sessionStorage.setItem(MORE_OPEN_KEY, String(!!details.open));

      // toggleCompareId already tracks add/remove
      toggleCompareId(id);
      updateCompareUI();
      render();
    });
  });

  updateCompareUI();
}

// --------------------
// Tuning UI (unchanged)
// --------------------
function initTuningUI() {
  const toggle = $("tuneToggle");
  const panel = $("tunePanel");
  const chev = $("tuneChevron");
  const reset = $("tuneReset");

  const wPhoto = $("wPhoto");
  const wPort = $("wPort");
  const wVideo = $("wVideo");
  const wPhotoVal = $("wPhotoVal");
  const wPortVal = $("wPortVal");
  const wVideoVal = $("wVideoVal");

  const wBudgetMin = $("wBudgetMin");
  const wBudgetMax = $("wBudgetMax");
  const wBudgetLabel = $("wBudgetLabel");
  const budgetFill = $("budgetFill");

  const wPhotoFill = $("wPhotoFill");
  const wPortFill = $("wPortFill");
  const wVideoFill = $("wVideoFill");

  if (
    !toggle ||
    !panel ||
    !wPhoto ||
    !wPort ||
    !wVideo ||
    !wBudgetMin ||
    !wBudgetMax
  )
    return;

  function updateBudgetFill(minV, maxV) {
    if (!budgetFill) return;
    const minPct = ((minV - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
    const maxPct = ((maxV - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
    budgetFill.style.left = `${minPct}%`;
    budgetFill.style.right = `${100 - maxPct}%`;
  }

  function updateSingleFill(rangeEl, fillEl, min, max) {
    if (!rangeEl || !fillEl) return;
    const v = Number(rangeEl.value);
    const pct = ((v - min) / (max - min)) * 100;
    fillEl.style.width = `${pct}%`;
  }

  function updateBudgetZ() {
    const minV = Number(wBudgetMin.value);
    const maxV = Number(wBudgetMax.value);
    if (Math.abs(maxV - minV) <= 100) {
      wBudgetMin.style.zIndex = "50";
      wBudgetMax.style.zIndex = "40";
    } else {
      wBudgetMin.style.zIndex = "30";
      wBudgetMax.style.zIndex = "40";
    }
  }

  const answers = loadAnswers() || {};
  let weights = loadWeights();
  weights = seedBudgetFromQuiz(weights, answers);
  saveWeights(weights);

  const budgetResetToQuiz = $("budgetResetToQuiz");
  budgetResetToQuiz?.addEventListener("click", () => {
    const fromQ = budgetFromAnswer(answers.budget);
    const w = loadWeights();
    w.budgetMin = fromQ.min;
    w.budgetMax = fromQ.max;
    saveWeights(w);

    wBudgetMin.value = String(w.budgetMin);
    wBudgetMax.value = String(w.budgetMax);
    if (wBudgetLabel)
      wBudgetLabel.textContent = `$${w.budgetMin} — $${w.budgetMax}`;

    updateBudgetFill(w.budgetMin, w.budgetMax);
    updateBudgetZ();

    track("budget_reset_to_quiz", { min: w.budgetMin, max: w.budgetMax });
    render();
  });

  wPhoto.value = String(weights.photo);
  wPort.value = String(weights.port);
  wVideo.value = String(weights.video);

  if (wPhotoVal) wPhotoVal.textContent = String(weights.photo);
  if (wPortVal) wPortVal.textContent = String(weights.port);
  if (wVideoVal) wVideoVal.textContent = String(weights.video);

  wBudgetMin.value = String(weights.budgetMin);
  wBudgetMax.value = String(weights.budgetMax);
  if (wBudgetLabel)
    wBudgetLabel.textContent = `$${weights.budgetMin} — $${weights.budgetMax}`;

  updateSingleFill(wPhoto, wPhotoFill, 0, 5);
  updateSingleFill(wPort, wPortFill, 0, 5);
  updateSingleFill(wVideo, wVideoFill, 0, 5);
  updateBudgetFill(weights.budgetMin, weights.budgetMax);
  updateBudgetZ();

  toggle.addEventListener("click", () => {
    const isHidden = panel.classList.contains("hidden");
    panel.classList.toggle("hidden");
    if (chev) chev.textContent = isHidden ? "▴" : "▾";
    track("tuning_panel_toggle", { open: isHidden });
  });

  function onChange() {
    let minV = clampInt(
      wBudgetMin.value,
      BUDGET_MIN,
      BUDGET_MAX,
      DEFAULT_WEIGHTS.budgetMin
    );
    let maxV = clampInt(
      wBudgetMax.value,
      BUDGET_MIN,
      BUDGET_MAX,
      DEFAULT_WEIGHTS.budgetMax
    );

    if (minV > maxV) {
      maxV = minV;
      wBudgetMax.value = String(maxV);
    }

    const newWeights = {
      photo: clampInt(wPhoto.value, 0, 5, DEFAULT_WEIGHTS.photo),
      port: clampInt(wPort.value, 0, 5, DEFAULT_WEIGHTS.port),
      video: clampInt(wVideo.value, 0, 5, DEFAULT_WEIGHTS.video),
      budgetMin: minV,
      budgetMax: maxV,
    };

    if (wPhotoVal) wPhotoVal.textContent = String(newWeights.photo);
    if (wPortVal) wPortVal.textContent = String(newWeights.port);
    if (wVideoVal) wVideoVal.textContent = String(newWeights.video);
    if (wBudgetLabel)
      wBudgetLabel.textContent = `$${newWeights.budgetMin} — $${newWeights.budgetMax}`;

    updateSingleFill(wPhoto, wPhotoFill, 0, 5);
    updateSingleFill(wPort, wPortFill, 0, 5);
    updateSingleFill(wVideo, wVideoFill, 0, 5);
    updateBudgetFill(minV, maxV);
    updateBudgetZ();

    saveWeights(newWeights);

    // light tracking (so you can see what people do later)
    track("tuning_change", { ...newWeights });

    render();
  }

  wPhoto.addEventListener("input", onChange);
  wPort.addEventListener("input", onChange);
  wVideo.addEventListener("input", onChange);
  wBudgetMin.addEventListener("input", onChange);
  wBudgetMax.addEventListener("input", onChange);

  reset?.addEventListener("click", () => {
    localStorage.removeItem("cc_weights");
    saveWeights({ ...DEFAULT_WEIGHTS });

    wPhoto.value = String(DEFAULT_WEIGHTS.photo);
    wPort.value = String(DEFAULT_WEIGHTS.port);
    wVideo.value = String(DEFAULT_WEIGHTS.video);
    wBudgetMin.value = String(DEFAULT_WEIGHTS.budgetMin);
    wBudgetMax.value = String(DEFAULT_WEIGHTS.budgetMax);

    if (wPhotoVal) wPhotoVal.textContent = String(DEFAULT_WEIGHTS.photo);
    if (wPortVal) wPortVal.textContent = String(DEFAULT_WEIGHTS.port);
    if (wVideoVal) wVideoVal.textContent = String(DEFAULT_WEIGHTS.video);
    if (wBudgetLabel)
      wBudgetLabel.textContent = `$${DEFAULT_WEIGHTS.budgetMin} — $${DEFAULT_WEIGHTS.budgetMax}`;

    updateSingleFill(wPhoto, wPhotoFill, 0, 5);
    updateSingleFill(wPort, wPortFill, 0, 5);
    updateSingleFill(wVideo, wVideoFill, 0, 5);
    updateBudgetFill(DEFAULT_WEIGHTS.budgetMin, DEFAULT_WEIGHTS.budgetMax);
    updateBudgetZ();

    track("tuning_reset", { ...DEFAULT_WEIGHTS });
    render();
  });
}

// boot
ready(() => {
  sanitizeCompare();
  render();
  initTuningUI();

  emitCompareUpdated(sanitizeCompare());

  // nice: one event per page load
  track("results_page_view", { cameras: CAMERAS.length });
});