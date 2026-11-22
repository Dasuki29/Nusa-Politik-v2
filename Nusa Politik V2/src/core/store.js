// src/core/store.js
const initialState = {
  meta: {
    version: "2.0.0",
    turn: 1,
    month: "January",
    year: 2026,
    phase: "GRASSROOTS"
  },

  player: {
    name: "Ahmad Razak",
    partyId: "UMNO",
    partyRank: "Ketua Cawangan",
    termsServed: 0,
    personalFunds: 60000,
    reputation: 45,
    sprmHeat: 5,
    ministryPortfolio: null
  },

  partyInternal: {
    primaryCurrency: 25,
    secondaryCurrency: 30,
    internalStanding: 15,
    factionAlignment: "Mainstream",
    lockedActions: []
  },

  parliament: {
    rulingCoalition: ["PH", "BN", "GPS", "GRS"],
    oppositionCoalition: ["PN"],
    pmApproval: 62,
    majoritySeats: 147,
    nextElectionTurns: 48
  },

  activeModal: null,
  newsFeed: []
};

class GameStore {
  constructor(startingState) {
    this.state = structuredClone(startingState);
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  update(updaterFn) {
    updaterFn(this.state);
    this.notify();
  }

  subscribe(listenerFn) {
    this.listeners.add(listenerFn);
    return () => this.listeners.delete(listenerFn);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  loadState(savedObject) {
    this.state = { ...structuredClone(initialState), ...savedObject };
    this.notify();
  }
}

export const store = new GameStore(initialState);