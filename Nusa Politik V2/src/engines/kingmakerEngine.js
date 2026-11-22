// src/engines/kingmakerEngine.js
import { store } from "../core/store.js";
import { checkRankPromotion } from "./_rankHelper.js";

const CAUCUS_COST = 15000;

export function getAvailableActions(state, partyConfig) {
  const { player, partyInternal } = state;
  const isLocked = (id) => partyConfig.lockedActions.includes(id);

  return [
    {
      id: "STATE_AUTONOMY_PUSH",
      label: "Press State Autonomy & MA63 Demands",
      description: "Champion regional rights and state development priorities to build home-state leverage.",
      costText: `RM ${CAUCUS_COST.toLocaleString()}`,
      effectText: `+14 ${partyConfig.primaryCurrencyLabel}, +12 Standing, +3 Reputation`,
      disabled: player.personalFunds < CAUCUS_COST,
      isLocked: isLocked("STATE_AUTONOMY_PUSH")
    },
    {
      id: "REGIONAL_BLOC_CAUCUS",
      label: "Consolidate State Bloc & Component Ties",
      description: "Align state assemblymen and local coalition partners to protect regional bargaining power.",
      costText: `10 ${partyConfig.primaryCurrencyLabel}`,
      effectText: `+14 ${partyConfig.secondaryCurrencyLabel}, +12 Standing`,
      disabled: partyInternal.primaryCurrency < 10,
      isLocked: isLocked("REGIONAL_BLOC_CAUCUS")
    },
    {
      id: "MERGER_WITH_PENINSULAR_PARTY",
      label: "Merge Into Peninsular Party",
      description: "Dissolve regional independence and merge directly into a Peninsular party.",
      costText: "100% Autonomy",
      effectText: "Blocked by Regional Charter",
      disabled: true,
      isLocked: isLocked("MERGER_WITH_PENINSULAR_PARTY")
    }
  ];
}

export function performAction(actionId, _payload, partyConfig) {
  let ok = true;

  store.update(state => {
    const p = state.player;
    const pi = state.partyInternal;

    if (actionId === "STATE_AUTONOMY_PUSH") {
      if (p.personalFunds < CAUCUS_COST) { ok = false; return; }
      p.personalFunds -= CAUCUS_COST;
      pi.primaryCurrency += 14;
      pi.internalStanding = Math.min(100, pi.internalStanding + 12);
      p.reputation = Math.min(100, p.reputation + 3);
      state.newsFeed.unshift({
        type: "KINGMAKER_ENGINE",
        text: `Pressed state autonomy & regional rights for ${partyConfig.shortName}, boosting ${partyConfig.primaryCurrencyLabel}.`
      });
    } else if (actionId === "REGIONAL_BLOC_CAUCUS") {
      if (pi.primaryCurrency < 10) { ok = false; return; }
      pi.primaryCurrency -= 10;
      pi.secondaryCurrency += 14;
      pi.internalStanding = Math.min(100, pi.internalStanding + 12);
      state.newsFeed.unshift({
        type: "KINGMAKER_ENGINE",
        text: `Tightened regional bloc unity for ${partyConfig.shortName}, increasing ${partyConfig.secondaryCurrencyLabel}.`
      });
    } else {
      ok = false;
      return;
    }

    checkRankPromotion(state, partyConfig, "KINGMAKER_ENGINE");
  });

  return { ok };
}