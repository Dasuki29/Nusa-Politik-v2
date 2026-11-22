// src/engines/warlordEngine.js
import { store } from "../core/store.js";
import { checkRankPromotion } from "./_rankHelper.js";

const CASH_COST = 20000;
const PATRONAGE_COST = 15;

export function getAvailableActions(state, partyConfig) {
  const { player, partyInternal } = state;
  const isLocked = (id) => partyConfig.lockedActions.includes(id);
  const topIdx = partyConfig.ranks.length - 1;
  const nearTop = partyConfig.ranks.indexOf(player.partyRank) >= topIdx - 1;

  return [
    {
      id: "BAHAGIAN_LOBBY",
      label: "Fund Bahagian & Division Chiefs",
      description: "Host divisional delegates and lock in grassroots nominations ahead of the party assembly.",
      costText: `RM ${CASH_COST.toLocaleString()}`,
      effectText: `+14 ${partyConfig.primaryCurrencyLabel}, +12 Standing, +4 SPRM Heat`,
      disabled: player.personalFunds < CASH_COST,
      isLocked: isLocked("BAHAGIAN_LOBBY")
    },
    {
      id: "DIRECT_CASH_PATRONAGE",
      label: "Disburse Patronage & Project Allocations",
      description: "Channel patronage resources to loyalist warlords to cement factional backing.",
      costText: `${PATRONAGE_COST} ${partyConfig.secondaryCurrencyLabel}`,
      effectText: `+16 Standing, +8 SPRM Heat`,
      disabled: partyInternal.secondaryCurrency < PATRONAGE_COST,
      isLocked: isLocked("DIRECT_CASH_PATRONAGE")
    },
    {
      id: "NO_CONTEST_MOTION",
      label: "Table Usul Tiada Pertandingan (No-Contest)",
      description: "Use MKT influence to block challenges to top leadership posts during the assembly.",
      costText: `25 ${partyConfig.primaryCurrencyLabel}`,
      effectText: `+22 Standing, -5 Reputation`,
      disabled: !nearTop || partyInternal.primaryCurrency < 25,
      isLocked: isLocked("NO_CONTEST_MOTION")
    },
    {
      id: "GRASSROOTS_CROWD_DONATION",
      label: "Crowdfunded Rally Donations",
      description: "Raise small-dollar public donations at open rallies.",
      costText: "0 Funds",
      effectText: "+RM 10,000 Funds",
      disabled: false,
      isLocked: isLocked("GRASSROOTS_CROWD_DONATION")
    }
  ];
}

export function performAction(actionId, _payload, partyConfig) {
  let ok = true;

  store.update(state => {
    const p = state.player;
    const pi = state.partyInternal;

    if (actionId === "BAHAGIAN_LOBBY") {
      if (p.personalFunds < CASH_COST) { ok = false; return; }
      p.personalFunds -= CASH_COST;
      pi.primaryCurrency += 14;
      pi.internalStanding = Math.min(100, pi.internalStanding + 12);
      p.sprmHeat = Math.min(100, p.sprmHeat + 4);
      state.newsFeed.unshift({
        type: "WARLORD_ENGINE",
        text: `Backed division chiefs across ${partyConfig.shortName} branches (${pi.primaryCurrency} ${partyConfig.primaryCurrencyLabel}).`
      });
    } else if (actionId === "DIRECT_CASH_PATRONAGE") {
      if (pi.secondaryCurrency < PATRONAGE_COST) { ok = false; return; }
      pi.secondaryCurrency -= PATRONAGE_COST;
      pi.internalStanding = Math.min(100, pi.internalStanding + 16);
      p.sprmHeat = Math.min(100, p.sprmHeat + 8);
      state.newsFeed.unshift({
        type: "WARLORD_ENGINE",
        text: `Distributed ${partyConfig.secondaryCurrencyLabel} to consolidate warlord support.`
      });
    } else if (actionId === "NO_CONTEST_MOTION") {
      if (pi.primaryCurrency < 25) { ok = false; return; }
      pi.primaryCurrency -= 25;
      pi.internalStanding = Math.min(100, pi.internalStanding + 22);
      p.reputation = Math.max(0, p.reputation - 5);
      state.newsFeed.unshift({
        type: "WARLORD_ENGINE",
        text: `Pushed a no-contest motion in ${partyConfig.shortName} to shield top posts from challengers.`
      });
    } else {
      ok = false;
      return;
    }

    checkRankPromotion(state, partyConfig, "WARLORD_ENGINE");
  });

  return { ok };
}