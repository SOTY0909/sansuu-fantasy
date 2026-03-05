(function bootstrapBattleDomain(global) {
  const SF = (global.SF = global.SF || {});

  function rollCriticalHit(answerElapsedMs, random) {
    if (!Number.isFinite(answerElapsedMs)) return false;
    if (answerElapsedMs <= 4000) return true;

    let chance = 0.04;
    if (answerElapsedMs <= 2600) chance = 0.06;
    if (answerElapsedMs <= 3200) chance = 0.05;
    const randomFn = random || Math.random;
    return randomFn() < chance;
  }

  function rollDamage(range, bias, randInt) {
    return Math.max(1, randInt(range[0], range[1]) + bias);
  }

  function applyPlayerDamage(enemyHp, baseDamage, isCritical, criticalCap, clamp) {
    const raw = isCritical ? Math.floor(baseDamage * 1.8) : baseDamage;
    const dmg = isCritical ? Math.min(raw, criticalCap) : raw;
    const nextEnemyHp = clamp(enemyHp - dmg, 0, 100);
    return {
      damage: dmg,
      nextEnemyHp: nextEnemyHp,
      finisher: nextEnemyHp <= 0,
    };
  }

  function applyEnemyDamage(playerHp, baseDamage, clamp) {
    const nextPlayerHp = clamp(playerHp - baseDamage, 0, 100);
    return {
      damage: baseDamage,
      nextPlayerHp: nextPlayerHp,
    };
  }

  SF.battle = {
    rollCriticalHit: rollCriticalHit,
    rollDamage: rollDamage,
    applyPlayerDamage: applyPlayerDamage,
    applyEnemyDamage: applyEnemyDamage,
  };
})(window);
