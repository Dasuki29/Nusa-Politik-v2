// src/ui/renderPartyTab.js
import { PARTIES } from "../data/parties.js";
import { getActiveEngine, executePartyAction } from "../engines/engineRouter.js";

export function renderPartyTab(state) {
  const container = document.getElementById("party-tab-container");
  const { player, partyInternal } = state;
  const partyConfig = PARTIES[player.partyId];
  const engine = getActiveEngine();

  // Ask the active party engine for its unique actions & labels
  const actions = engine.getAvailableActions(state, partyConfig);

  const lockedBadgesHTML = partyConfig.lockedActions.length
    ? partyConfig.lockedActions.map(code => `<span class="locked-badge">LOCKED: ${code}</span>`).join("")
    : `<span style="color: var(--success); font-size: 0.8rem;">No hard constitutional action bans</span>`;

  const rankProgressHTML = partyConfig.ranks.map((rank, idx) => {
    const isCurrent = rank === player.partyRank;
    return `<span style="
      padding: 3px 8px; border-radius: 4px; font-size: 0.78rem; margin-right: 4px;
      background: ${isCurrent ? partyConfig.color : '#0f172a'};
      color: ${isCurrent ? '#fff' : '#94a3b8'};
      border: 1px solid ${isCurrent ? '#fff' : '#334155'};
    ">${idx + 1}. ${rank}</span>`;
  }).join("");

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
      <div>
        <h2 style="font-size: 1.2rem; color: ${partyConfig.color};">
          ${partyConfig.shortName} — ${partyConfig.constitutionTitle}
        </h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Internal Election System: <strong>${partyConfig.internalElectionLabel}</strong>
        </p>
      </div>
      <div class="stat-pill">
        Internal Standing: <strong>${partyInternal.internalStanding}%</strong>
      </div>
    </div>

    <!-- Dynamic Party-Specific Currencies -->
    <div class="hud-stats" style="margin-top: 12px;">
      <div class="stat-pill">
        ${partyConfig.primaryCurrencyLabel}: <strong>${partyInternal.primaryCurrency}</strong>
      </div>
      <div class="stat-pill">
        ${partyConfig.secondaryCurrencyLabel}: <strong>${partyInternal.secondaryCurrency}</strong>
      </div>
      ${partyConfig.termLimit ? `<div class="stat-pill">Constitutional Term Cap: <strong>${player.termsServed}/${partyConfig.termLimit} Terms</strong></div>` : ""}
    </div>

    <!-- Party Career Ladder -->
    <div style="margin-top: 12px; overflow-x: auto; white-space: nowrap; padding-bottom: 4px;">
      ${rankProgressHTML}
    </div>

    <!-- Constitutional Rules & Forbidden Actions -->
    <div class="constitution-box">
      <strong>Constitutional Clause:</strong> ${partyConfig.constitutionSummary}
      <div style="margin-top: 6px;">${lockedBadgesHTML}</div>
    </div>

    <!-- Dynamic Action Cards Provided by Active Party Engine -->
    <h3 style="font-size: 0.95rem; margin-top: 14px;">Party Maneuvers (${partyConfig.shortName} Engine)</h3>
    <div class="action-grid" id="dynamic-action-list">
      ${actions.map(act => `
        <div class="action-card ${act.isLocked ? 'is-locked' : ''}">
          <div>
            <div style="font-weight: 600; font-size: 0.95rem;">
              ${act.label} ${act.isLocked ? '<span style="color:#ef4444;">[FORBIDDEN BY CONSTITUTION]</span>' : ''}
            </div>
            <div class="action-meta">${act.description}</div>
            <div class="action-meta" style="color: var(--accent);">Cost: ${act.costText} • Effect: ${act.effectText}</div>
          </div>
          <button
            data-action-id="${act.id}"
            ${act.disabled || act.isLocked ? "disabled" : ""}
          >
            ${act.isLocked ? "Blocked" : "Execute"}
          </button>
        </div>
      `).join("")}
    </div>
  `;

  // Bind click events to the newly rendered engine buttons
  container.querySelectorAll("button[data-action-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      executePartyAction(btn.dataset.actionId);
    });
  });
}