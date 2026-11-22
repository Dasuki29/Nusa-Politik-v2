// src/engines/_rankHelper.js
import { store } from "../core/store.js";

export function checkRankPromotion(state, partyConfig, logCategory) {
  const currentIdx = partyConfig.ranks.indexOf(state.player.partyRank);
  const isTopRank = currentIdx === partyConfig.ranks.length - 1;

  if (state.partyInternal.internalStanding < 100) {
    return;
  }

  if (!isTopRank && currentIdx !== -1) {
    const nextRank = partyConfig.ranks[currentIdx + 1];
    state.player.partyRank = nextRank;
    state.partyInternal.internalStanding = 35;

    state.newsFeed.unshift({
      type: logCategory,
      text: `Promoted to ${nextRank} within ${partyConfig.shortName}!`
    });
    return;
  }

  if (isTopRank) {
    if (partyConfig.termLimit && state.player.termsServed >= partyConfig.termLimit) {
      state.partyInternal.internalStanding = 75;
      state.newsFeed.unshift({
        type: "TERM_LIMIT",
        text: `Reached ${partyConfig.termLimit}-term constitutional cap as ${partyConfig.shortName} leader. Must groom a successor.`
      });
    } else {
      state.player.termsServed += 1;
      state.partyInternal.internalStanding = 60;
      state.newsFeed.unshift({
        type: logCategory,
        text: `Retained top leadership in ${partyConfig.shortName} (Term ${state.player.termsServed}${partyConfig.termLimit ? `/${partyConfig.termLimit}` : ""}).`
      });
    }
  }
}

export function pushLog(type, text) {
  store.update(s => {
    s.newsFeed.unshift({ type, text });
  });
}