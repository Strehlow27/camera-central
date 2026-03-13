// lensCompatibility.js

function normalizeMountList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function hasMount(camera, mount, key) {
  return normalizeMountList(camera?.[key]).includes(mount);
}

export function getLensCompatibility(camera, lens) {
  if (!camera || !lens) {
    return {
      compatible: false,
      mode: "incompatible",
      label: "Not compatible",
      warning: "Missing camera or lens data.",
    };
  }

  if (!camera.hasLensEcosystem) {
    return {
      compatible: false,
      mode: "fixed",
      label: "Fixed lens camera",
      warning: "This camera does not support interchangeable lenses.",
    };
  }

  const lensMount = lens.mount ?? "";

  if (hasMount(camera, lensMount, "directCompatibleLensMounts")) {
    const usesCropMode = hasMount(camera, lensMount, "cropModeLensMounts");

    return {
      compatible: true,
      mode: usesCropMode ? "native-crop" : "native",
      label: usesCropMode ? "Native fit • crop mode" : "Native fit",
      warning: usesCropMode
        ? "This lens fits directly, but the camera will use crop mode."
        : null,
    };
  }

  if (hasMount(camera, lensMount, "adapterCompatibleLensMounts")) {
    const usesCropMode = hasMount(camera, lensMount, "cropModeLensMounts");

    return {
      compatible: true,
      mode: usesCropMode ? "adapter-crop" : "adapter",
      label: usesCropMode ? "Adapter required • crop mode" : "Adapter required",
      warning: usesCropMode
        ? "This lens works with an adapter, and the camera may use crop mode."
        : "This lens requires an adapter to work with this camera.",
    };
  }

  return {
    compatible: false,
    mode: "incompatible",
    label: "Not compatible",
    warning: "This lens is not compatible with this camera.",
  };
}

export function getCompatibleLenses(camera, lenses = []) {
  return lenses
    .map((lens) => {
      const compatibility = getLensCompatibility(camera, lens);
      return {
        ...lens,
        compatibility,
      };
    })
    .filter((lens) => lens.compatibility.compatible);
}

export function getCompatibleLensesByCategory(camera, lenses = []) {
  const compatible = getCompatibleLenses(camera, lenses);

  return {
    standard: compatible.filter((lens) => lens.category === "standard"),
    wide: compatible.filter((lens) => lens.category === "wide"),
    telephoto: compatible.filter((lens) => lens.category === "telephoto"),
    all: compatible,
  };
}