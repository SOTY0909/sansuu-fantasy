(function bootstrapStateMachine(global) {
  const SF = (global.SF = global.SF || {});

  function createScreenStateMachine(initial, allowedTransitions) {
    let current = initial;

    return {
      getCurrent: function getCurrent() {
        return current;
      },
      transition: function transition(next) {
        if (next === current) return true;
        const allowed = allowedTransitions[current] || [];
        if (!allowed.includes(next)) return false;
        current = next;
        return true;
      },
      force: function force(next) {
        current = next;
      },
    };
  }

  SF.stateMachine = {
    createScreenStateMachine: createScreenStateMachine,
  };
})(window);
