// src/main.js
import { store } from "./core/store.js";
import { PARTIES } from "./data/parties.js";
import { renderPartyTab } from "./ui/renderPartyTab.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function initPartySelector() {
  const select = document.getElementById("party-select");
  Object.values(PARTIES).forEach(party => {
    const opt = document.createElement("option");
    opt.value = party.id;
    opt.textContent = `${party.shortName} — ${party.fullName}`;
    select.appendChild(opt);
  });

  select.addEventListener("change", (e) => {
    switchPlayerParty(e.target.value);
  });
}

export function switchPlayerParty(newPartyId) {
  const config = PARTIES[newPartyId];
  if (!config) return;

  store.update(state => {
    state.player.partyId = newPartyId;
    state.player.partyRank = config.ranks[0];
    state.player.termsServed = 0;

    // Reset internal party currencies to match the new party's constitution
    state.partyInternal.primaryCurrency = 25;
    state.partyInternal.secondaryCurrency = 30;
    state.partyInternal.internalStanding = 15;
    state.partyInternal.lockedActions = [...config.lockedActions];

    state.newsFeed.unshift({
      type: "PARTY_SWITCH",
      text: `Joined ${config.shortName}. Active Engine switched to [${config.baseEngine}].`
    });
  });
}

function renderTopHUD(state) {
  const { meta, player } = state;
  const partyConfig = PARTIES[player.partyId];

  document.getElementById("hud-date").textContent =
    `${meta.month} ${meta.year} • Turn ${meta.turn} (${meta.phase})`;

  document.getElementById("party-select").value = player.partyId;
  document.getElementById("engine-badge").innerHTML =
    `Engine: <strong>${partyConfig.baseEngine}</strong>`;

  document.getElementById("hud-stats").innerHTML = `
    <div class="stat-pill">Rank: <strong>${player.partyRank}</strong></div>
    <div class="stat-pill">Personal Funds: <strong>RM ${player.personalFunds.toLocaleString()}</strong></div>
    <div class="stat-pill">Reputation: <strong>${player.reputation}%</strong></div>
    <div class="stat-pill">SPRM Heat: <strong style="color:${player.sprmHeat > 60 ? '#ef4444' : '#38bdf8'}">${player.sprmHeat}%</strong></div>
  `;
}

function renderNewsFeed(state) {
  const container = document.getElementById("news-feed");
  if (!state.newsFeed.length) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No political developments yet.</p>`;
    return;
  }

  container.innerHTML = state.newsFeed.slice(0, 12).map(item => `
    <div class="news-item">
      <span style="color: var(--accent); font-weight: 600;">[${item.type}]</span> ${item.text}
    </div>
  `).join("");
}

function bindGlobalControls() {
  document.getElementById("btn-next-turn").addEventListener("click", () => {
    store.update(state => {
      state.meta.turn += 1;
      const nextMonthIdx = (MONTHS.indexOf(state.meta.month) + 1) % 12;
      if (nextMonthIdx === 0) state.meta.year += 1;
      state.meta.month = MONTHS[nextMonthIdx];

      // Monthly passive income & standing drift
      state.player.personalFunds += 12000;
      state.newsFeed.unshift({
        type: "TURN",
        text: `Advanced to ${state.meta.month} ${state.meta.year}. Monthly allowance credited.`
      });
    });
  });
}

// Subscribe all UI views to the central reactive store
store.subscribe((state) => {
  renderTopHUD(state);
  renderPartyTab(state);
  renderNewsFeed(state);
});

// Boot application
initPartySelector();
bindGlobalControls();
switchPlayerParty(store.getState().player.partyId);