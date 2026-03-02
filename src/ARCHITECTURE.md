# Sansuu Fantasy Architecture

## Layers

- `src/data`: static game definitions (stages, heroes, difficulty stats).
- `src/domain`: pure calculations (question generation, battle math).
- `src/application`: state and transitions (screen state machine, store scaffolding).
- `src/infrastructure`: browser-dependent integrations (localStorage persistence).

## Current Migration Status

- `index.html` now reads game constants from `src/data/game-data.js`.
- Question generation moved to `src/domain/questions.js`.
- Damage and critical logic moved to `src/domain/battle.js`.
- Save/load moved to `src/infrastructure/persistence.js`.
- Screen transition guard added via `src/application/state-machine.js`.
- Initial game state moved to `src/application/game-store.js`.

## Next Refactor Steps

1. Move battle flow (`startBattle`, `nextQuestion`, `handleChoice`) into an application reducer.
2. Split DOM rendering into screen-specific presenters (`map`, `battle`, `result`, `gacha`).
3. Move audio logic into `infrastructure/audio.js`.
4. Make gameplay fully driven by store dispatch/events.
