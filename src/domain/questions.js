(function bootstrapQuestionDomain(global) {
  const SF = (global.SF = global.SF || {});

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function createQuestion(config) {
    const expr = config.expr;
    const answer = config.answer;
    const spread = Number.isFinite(config.spread) ? config.spread : 8;
    const randInt = config.randInt;
    const random = config.random || Math.random;
    const shuffle = config.shuffle;

    const wrongs = new Set();
    const abs = Math.max(2, Math.floor(Math.abs(answer) * 0.35));
    while (wrongs.size < 3) {
      const mode = randInt(1, 4);
      let w;
      if (mode === 1) w = answer + randInt(1, Math.max(3, abs));
      else if (mode === 2) w = answer - randInt(1, Math.max(3, abs));
      else if (mode === 3) w = answer + randInt(-spread, spread);
      else w = answer + (random() < 0.5 ? -1 : 1) * randInt(2, spread + 4);
      if (w !== answer) wrongs.add(w);
    }
    const options = shuffle([{ value: answer, correct: true }].concat(Array.from(wrongs, function toOption(v) {
      return { value: v, correct: false };
    })));
    return { expr: expr, answer: answer, options: options };
  }

  function stageProfile(stageId) {
    const s = clamp(Number(stageId) || 1, 1, 10);
    return {
      maxSum: [5, 8, 10, 12, 14, 16, 18, 20, 20, 20][s - 1],
      maxSub: [0, 6, 8, 10, 12, 14, 16, 18, 20, 20][s - 1],
      allowCarry: s >= 5,
      allowBorrow: s >= 6,
      allowThreeTerms: s >= 8,
      allowMissing: s >= 9,
    };
  }

  function makeAdd(profile, randInt, create) {
    let a;
    let b;
    let ans;
    if (profile.allowCarry) {
      a = randInt(0, profile.maxSum);
      b = randInt(0, profile.maxSum);
      ans = a + b;
      if (ans > profile.maxSum) {
        b = Math.max(0, profile.maxSum - a);
        ans = a + b;
      }
    } else {
      a = randInt(0, profile.maxSum);
      b = randInt(0, Math.max(0, profile.maxSum - a));
      ans = a + b;
    }
    return create(a + " + " + b + " = ?", ans, 4);
  }

  function makeSub(profile, randInt, create) {
    const top = Math.max(5, profile.maxSub);
    let a = randInt(1, top);
    let b = randInt(0, a);
    if (!profile.allowBorrow) {
      const onesA = a % 10;
      b = randInt(0, Math.min(b, onesA));
    }
    const ans = a - b;
    return create(a + " - " + b + " = ?", ans, 4);
  }

  function makeThreeTerms(profile, randInt, create) {
    if (randInt(0, 1) === 0) {
      const a = randInt(1, profile.maxSum - 2);
      const b = randInt(1, Math.max(1, profile.maxSum - a - 1));
      const c = randInt(1, Math.max(1, profile.maxSum - a - b));
      return create(a + " + " + b + " + " + c + " = ?", a + b + c, 5);
    }
    const a = randInt(6, profile.maxSum);
    const b = randInt(1, Math.min(9, a - 1));
    const c = randInt(1, Math.min(6, a - b));
    return create(a + " - " + b + " + " + c + " = ?", a - b + c, 5);
  }

  function makeMissing(profile, randInt, create) {
    if (randInt(0, 1) === 0) {
      const answer = randInt(0, profile.maxSum - 1);
      const b = randInt(1, Math.max(1, profile.maxSum - answer));
      const c = answer + b;
      return create("? + " + b + " = " + c, answer, 4);
    }
    const a = randInt(2, profile.maxSum);
    const answer = randInt(0, a - 1);
    const c = a - answer;
    return create(a + " - ? = " + c, answer, 4);
  }

  function generateByStage(deps) {
    const randInt = deps.randInt;
    const random = deps.random || Math.random;
    const create = deps.createQuestion;
    const stageId = deps.stageId || 1;
    const difficultyKey = deps.difficultyKey || "normal";
    const profile = stageProfile(stageId);

    const addWeight = difficultyKey === "easy" ? 70 : difficultyKey === "normal" ? 55 : 45;
    const subWeight = difficultyKey === "easy" ? 25 : difficultyKey === "normal" ? 35 : 40;
    const threeWeight = difficultyKey === "easy" ? 4 : difficultyKey === "normal" ? 8 : 12;
    const missingWeight = difficultyKey === "easy" ? 1 : difficultyKey === "normal" ? 2 : 3;

    const canThree = profile.allowThreeTerms ? threeWeight : 0;
    const canMissing = profile.allowMissing ? missingWeight : 0;
    const canSub = profile.maxSub > 0 ? subWeight : 0;
    const total = addWeight + canSub + canThree + canMissing;
    const roll = random() * total;

    if (roll < addWeight) return makeAdd(profile, randInt, create);
    if (roll < addWeight + canSub) return makeSub(profile, randInt, create);
    if (roll < addWeight + canSub + canThree) return makeThreeTerms(profile, randInt, create);
    return makeMissing(profile, randInt, create);
  }

  function generateEasy(deps) {
    return generateByStage({
      randInt: deps.randInt,
      random: deps.random,
      createQuestion: deps.createQuestion,
      stageId: deps.stageId,
      difficultyKey: "easy",
    });
  }

  function generateNormal(deps) {
    return generateByStage({
      randInt: deps.randInt,
      random: deps.random,
      createQuestion: deps.createQuestion,
      stageId: deps.stageId,
      difficultyKey: "normal",
    });
  }

  function generateHard(deps) {
    return generateByStage({
      randInt: deps.randInt,
      random: deps.random,
      createQuestion: deps.createQuestion,
      stageId: deps.stageId,
      difficultyKey: "hard",
    });
  }

  SF.questions = {
    createQuestion: createQuestion,
    generateByStage: generateByStage,
    generateEasy: generateEasy,
    generateNormal: generateNormal,
    generateHard: generateHard,
  };
})(window);
