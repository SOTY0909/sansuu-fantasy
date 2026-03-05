(function bootstrapGameData(global) {
  const SF = (global.SF = global.SF || {});

  SF.data = {
    MAX_HP: 100,
    CRITICAL_DAMAGE_CAP: 20,
    QUESTION_LIMIT_MS: 10000,
    STAGE_COUNT: 10,
    STORAGE_KEY: "sansuu-fantasy-progress-v1",
    HERO_STORAGE_KEY: "sansuu-fantasy-heroes-v1",
    DIFFICULTY_STATS: {
      easy: { label: "easy", playerDmg: [22, 32], enemyDmg: [3, 7] },
      normal: { label: "normal", playerDmg: [14, 22], enemyDmg: [8, 14] },
      hard: { label: "hard", playerDmg: [9, 16], enemyDmg: [14, 22] },
    },
    HEROES: [
      {
        id: "00",
        name: "sakura",
        baseImage: "hiro/00/sakura.png",
        magicImage: "hiro/00/magic/hiromagic.png",
      },
      {
        id: "01",
        name: "regnas",
        baseImage: "hiro/01/yusya.png",
        magicImage: "hiro/01/magic/yusya_magic.png",
      },
      {
        id: "02",
        name: "fuuka",
        baseImage: "hiro/02/kaze_onna.png",
        magicImage: "hiro/02/magic/kaze_onna_magic.png",
      },
      {
        id: "03",
        name: "sylph",
        baseImage: "hiro/03/kaze.png",
        magicImage: "hiro/03/magic/kaze_magic.png",
      },
      {
        id: "04",
        name: "alkem",
        baseImage: "hiro/04/math_fantasy_boy_transparent.png",
        magicImage: "hiro/04/magic/magic.png",
      },
      {
        id: "05",
        name: "mirei",
        baseImage: "hiro/05/math_fantasy_girl_transparent.png",
        magicImage: "hiro/05/magic/magic.png",
      },
    ],
    STAGES: [
      { id: 1, name: "start field", enemyName: "cotton slime", spriteClass: "sheet sheet-slime", enemyDmgBias: -3, playerDmgBias: 2 },
      { id: 2, name: "number path", enemyName: "jump goblin", spriteClass: "sheet sheet-goblin", enemyDmgBias: -2, playerDmgBias: 1 },
      { id: 3, name: "minus forest", enemyName: "lamp bat", spriteClass: "sheet sheet-bat", enemyDmgBias: -1, playerDmgBias: 1 },
      { id: 4, name: "wall of ten", enemyName: "magic cat", spriteClass: "sheet sheet-mage", enemyDmgBias: 0, playerDmgBias: 0 },
      { id: 5, name: "carry bridge", enemyName: "skull knight", spriteClass: "sheet sheet-boss", enemyDmgBias: 1, playerDmgBias: 0 },
      { id: 6, name: "jelly valley", enemyName: "crown slime", spriteClass: "sheet sheet-slime", enemyDmgBias: 1, playerDmgBias: -1 },
      { id: 7, name: "to twenty cave", enemyName: "goblin guard", spriteClass: "sheet sheet-goblin", enemyDmgBias: 2, playerDmgBias: -1 },
      { id: 8, name: "formula road", enemyName: "lamp bat chief", spriteClass: "sheet sheet-bat", enemyDmgBias: 2, playerDmgBias: -2 },
      { id: 9, name: "mix swamp", enemyName: "magic cat general", spriteClass: "sheet sheet-mage", enemyDmgBias: 3, playerDmgBias: -2 },
      { id: 10, name: "math castle", enemyName: "skull knight king", spriteClass: "sheet sheet-boss", enemyDmgBias: 4, playerDmgBias: -3 },
    ],
    STAGE_POSITIONS: [
      { x: 16.8, y: 22.1 },
      { x: 28.8, y: 36.8 },
      { x: 43.0, y: 47.8 },
      { x: 9.8, y: 68.7 },
      { x: 29.8, y: 84.6 },
      { x: 74.1, y: 84.5 },
      { x: 63.8, y: 73.6 },
      { x: 83.3, y: 68.8 },
      { x: 64.3, y: 51.5 },
      { x: 81.4, y: 16.9 },
    ],
  };
})(window);
