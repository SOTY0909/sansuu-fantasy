(function bootstrapPersistence(global) {
  const SF = (global.SF = global.SF || {});

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function loadProgress(params) {
    const storageKey = params.storageKey;
    const heroStorageKey = params.heroStorageKey;
    const stageCount = params.stageCount;
    const heroes = params.heroes;

    let unlockedStages = 1;
    let clearedStages = [];
    let unlockedHeroIds = ["00"];
    let selectedHeroId = "00";

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        unlockedStages = clamp(Number(data.unlockedStages) || 1, 1, stageCount);
        clearedStages = Array.isArray(data.clearedStages)
          ? data.clearedStages.filter(function isValidStage(n) {
              return Number.isInteger(n) && n >= 1 && n <= stageCount;
            })
          : [];
      }
    } catch (_) {}

    try {
      const rawHeroes = localStorage.getItem(heroStorageKey);
      if (rawHeroes) {
        const data = JSON.parse(rawHeroes);
        const ids = Array.isArray(data.unlockedHeroIds)
          ? data.unlockedHeroIds.filter(function isKnownHero(id) {
              return heroes.some(function hasHero(hero) {
                return hero.id === id;
              });
            })
          : ["00"];
        const unique = Array.from(new Set(ids));
        unlockedHeroIds = unique.includes("00") ? unique : ["00"].concat(unique);
        const selected = typeof data.selectedHeroId === "string" ? data.selectedHeroId : "00";
        selectedHeroId = unlockedHeroIds.includes(selected) ? selected : "00";
      }
    } catch (_) {}

    return {
      unlockedStages: unlockedStages,
      clearedStages: clearedStages,
      unlockedHeroIds: unlockedHeroIds,
      selectedHeroId: selectedHeroId,
    };
  }

  function saveProgress(params) {
    const storageKey = params.storageKey;
    const heroStorageKey = params.heroStorageKey;
    const unlockedStages = params.unlockedStages;
    const clearedStages = params.clearedStages;
    const unlockedHeroIds = params.unlockedHeroIds;
    const selectedHeroId = params.selectedHeroId;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          unlockedStages: unlockedStages,
          clearedStages: Array.from(new Set(clearedStages)).sort(function byNum(a, b) {
            return a - b;
          }),
        })
      );
    } catch (_) {}

    try {
      localStorage.setItem(
        heroStorageKey,
        JSON.stringify({
          unlockedHeroIds: Array.from(new Set(unlockedHeroIds)),
          selectedHeroId: selectedHeroId,
        })
      );
    } catch (_) {}
  }

  SF.persistence = {
    loadProgress: loadProgress,
    saveProgress: saveProgress,
  };
})(window);
