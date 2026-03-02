(function bootstrapGameStore(global) {
  const SF = (global.SF = global.SF || {});

  function createInitialState() {
    return {
      difficultyKey: "normal",
      currentStageId: 1,
      unlockedStages: 1,
      clearedStages: [],
      unlockedHeroIds: ["00"],
      selectedHeroId: "00",
      canRollGacha: false,
      playerHp: 100,
      enemyHp: 100,
      correctCount: 0,
      totalCount: 0,
      currentQuestion: null,
      questionActive: false,
      questionToken: 0,
      timerStartAt: 0,
      lastOutcome: null,
    };
  }

  function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    return {
      getState: function getState() {
        return state;
      },
      setState: function setState(nextState) {
        state = nextState;
        listeners.forEach(function run(listener) {
          listener(state);
        });
      },
      subscribe: function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
          const idx = listeners.indexOf(listener);
          if (idx >= 0) listeners.splice(idx, 1);
        };
      },
    };
  }

  SF.gameStore = {
    createInitialState: createInitialState,
    createStore: createStore,
  };
})(window);
