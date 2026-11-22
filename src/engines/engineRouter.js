// src/engines/engineRouter.js
import { PARTIES } from "../data/parties.js";
import { store } from "../core/store.js";
import * as warlordEngine from "./warlordEngine.js";
import * as cadreEngine from "./cadreEngine.js";
import * as syuraEngine from "./syuraEngine.js";
import * as kingmakerEngine from "./kingmakerEngine.js";

const ENGINE_MAP = {
  WARLORD_MACHINE: warlordEngine,
  CADRE_MERITOCRACY: cadreEngine,
  ULAMAK_MOVEMENT: syuraEngine,
  REGIONAL_KINGMAKER: kingmakerEngine
};

export function getActiveEngine() {
  const { partyId } = store.getState().player;
  const partyConfig = PARTIES[partyId];
  return ENGINE_MAP[partyConfig.baseEngine];
}

export function executePartyAction(actionId, payload = {}) {
  const state = store.getState();
  const partyConfig = PARTIES[state.player.partyId];

  if (partyConfig.lockedActions.includes(actionId)) {
    store.update(s => {
      s.newsFeed.unshift({
        type: "CONSTITUTIONAL_BLOCK",
        text: `Action "${actionId}" is forbidden under ${partyConfig.shortName}'s constitution.`
      });
    });
    return { ok: false, reason: "CONSTITUTIONAL_LOCK" };
  }

  const engine = getActiveEngine();
  return engine.performAction(actionId, payload, partyConfig);
}