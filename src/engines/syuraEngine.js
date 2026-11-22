// src/engines/syuraEngine.js
import { store } from "../core/store.js";
import { checkRankPromotion } from "./_rankHelper.js";

export function getAvailableActions(state, partyConfig) {
  const { player, partyInternal } = state;
  const isLocked = (id) => partyConfig.lockedActions.includes(id);
  const discountedCost = Math.round(10000 * partyConfig.modifiers.campaignCostDiscount);

  return [
    {
      id: "TARBIYAH_USRAH_DRIVE",
      label: "Lead Tarbiyah & Markaz Outreach",
      description: "Strengthen grassroots religious study circles and volunteer unit discipline at low cash cost.",
      costText: `RM ${discountedCost.toLocaleString()}`,
      effectText: `+14 ${partyConfig.primaryCurrencyLabel}, +12 Standing`,
      disabled: player.personalFunds < discountedCost,
      isLocked: isLocked("TARBIYAH_USRAH_DRIVE")
    },
    {
      id: "SYURA_CONSULTATION",
      label: "Seek Majlis Syura Alignment",
      description: "Present doctrinal and strategic alignment to senior ulamak council members.",
      costText: `12 ${partyConfig.primaryCurrencyLabel}`,
      effectText: `+15 ${partyConfig.secondaryCurrencyLabel}, +14 Standing`,
      disabled: partyInternal.primaryCurrency < 12,
      isLocked: isLocked("SYURA_CONSULTATION")
    },
    {
      id: "SECULAR_LIBERAL_SHIFT",
      label: "Pivot to Secular Liberal Platform",
      description: "Drop religious/syura framing to court secular urban voters.",
      costText: "15 Standing",
      effectText: "Blocked by PAS Constitution",
      disabled: true,
      isLocked: isLocked("SECULAR_LIBERAL_SHIFT")
    }
  ];
}

export function performAction(actionId, _payload, partyConfig) {
  let ok = true;

  store.update(state => {
    const p = state.player;
    const pi = state.partyInternal;
    const discountedCost = Math.round(10000 * partyConfig.modifiers.campaignCostDiscount);

    if (actionId === "TARBIYAH_USRAH_DRIVE") {
      if (p.personalFunds < discountedCost) { ok = false; return; }
      p.personalFunds -= discountedCost;
      pi.primaryCurrency += 14;
      pi.internalStanding = Math.min(100, pi.internalStanding + 12);
      state.newsFeed.unshift({
        type: "SYURA_ENGINE",
        text: `Expanded markaz and volunteer networks across ${partyConfig.shortName} heartlands.`
      });
    } else if (actionId === "SYURA_CONSULTATION") {
      if (pi.primaryCurrency < 12) { ok = false; return; }
      pi.primaryCurrency -= 12;
      pi.secondaryCurrency += 15;
      pi.internalStanding = Math.min(100, pi.internalStanding + 14);
      state.newsFeed.unshift({
        type: "SYURA_ENGINE",
        text: `Secured stronger ${partyConfig.secondaryCurrencyLabel} through Majlis Syura consultation.`
      });
    } else {
      ok = false;
      return;
    }

    checkRankPromotion(state, partyConfig, "SYURA_ENGINE");
  });

  return { ok };
}