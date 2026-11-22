// src/engines/cadreEngine.js
import { store } from "../core/store.js";
import { checkRankPromotion } from "./_rankHelper.js";

const RALLY_COST = 12000;

export function getAvailableActions(state, partyConfig) {
  const { player, partyInternal } = state;
  const isLocked = (id) => partyConfig.lockedActions.includes(id);

  return [
    {
      id: "CADRE_ORGANIZING",
      label: "Run Branch & Delegate Caucus Drive",
      description: "Mobilize active party cadres, branch delegates, and reform slates.",
      costText: `RM ${RALLY_COST.toLocaleString()}`,
      effectText: `+13 ${partyConfig.primaryCurrencyLabel}, +12 Standing, +4 Reputation`,
      disabled: player.personalFunds < RALLY_COST,
      isLocked: isLocked("CADRE_ORGANIZING")
    },
    {
      id: "POLICY_PLATFORM_PUSH",
      label: "Draft Reform & Governance Manifesto",
      description: "Build credibility with central committee voters and urban/mixed-seat supporters.",
      costText: `10 ${partyConfig.secondaryCurrencyLabel}`,
      effectText: `+14 ${partyConfig.primaryCurrencyLabel}, +10 Standing`,
      disabled: partyInternal.secondaryCurrency < 10,
      isLocked: isLocked("POLICY_PLATFORM_PUSH")
    },
    {
      id: "DIRECT_CASH_PATRONAGE",
      label: "Offer Cash Handouts to Delegates",
      description: "Use direct cash incentives to sway internal party voters.",
      costText: "RM 25,000",
      effectText: "Blocked by Cadre Constitution",
      disabled: true,
      isLocked: isLocked("DIRECT_CASH_PATRONAGE")
    },
    {
      id: "NO_CONTEST_MOTION",
      label: "Freeze Top Leadership Contest",
      description: "Block internal elections for top central committee posts.",
      costText: "20 Credibility",
      effectText: "Blocked by Party Constitution",
      disabled: true,
      isLocked: isLocked("NO_CONTEST_MOTION")
    }
  ];
}

export function performAction(actionId, _payload, partyConfig) {
  let ok = true;

  store.update(state => {
    const p = state.player;
    const pi = state.partyInternal;

    if (actionId === "CADRE_ORGANIZING") {
      if (p.personalFunds < RALLY_COST) { ok = false; return; }
      p.personalFunds -= RALLY_COST;
      pi.primaryCurrency += 13;
      pi.internalStanding = Math.min(100, pi.internalStanding + 12);
      p.reputation = Math.min(100, p.reputation + 4);
      state.newsFeed.unshift({
        type: "CADRE_ENGINE",
        text: `Organized branch cadres and convention delegates across ${partyConfig.shortName}.`
      });
    } else if (actionId === "POLICY_PLATFORM_PUSH") {
      if (pi.secondaryCurrency < 10) { ok = false; return; }
      pi.secondaryCurrency -= 10;
      pi.primaryCurrency += 14;
      pi.internalStanding = Math.min(100, pi.internalStanding + 10);
      state.newsFeed.unshift({
        type: "CADRE_ENGINE",
        text: `Advocated policy & reform agenda inside ${partyConfig.shortName}, raising ${partyConfig.primaryCurrencyLabel}.`
      });
    } else {
      ok = false;
      return;
    }

    checkRankPromotion(state, partyConfig, "CADRE_ENGINE");
  });

  return { ok };
}