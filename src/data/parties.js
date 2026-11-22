// src/data/parties.js
// Central Constitutional & Engine Registry for all 9 major Malaysian parties in Nusa Politik 2.0

export const PARTIES = {
  UMNO: {
    id: "UMNO",
    shortName: "UMNO",
    fullName: "United Malays National Organisation",
    coalition: "BN",
    color: "#dc2626",
    baseEngine: "WARLORD_MACHINE",
    constitutionTitle: "Perlembagaan UMNO (Sistem 191 Bahagian)",
    internalElectionLabel: "Electoral College (191 Bahagian Delegates)",
    primaryCurrencyLabel: "Bahagian Influence",
    secondaryCurrencyLabel: "Patronage Funds",
    termLimit: null,
    ranks: [
      "Ketua Cawangan",
      "AJK Bahagian",
      "Ketua Bahagian",
      "Ahli Majlis Kerja Tertinggi (MKT)",
      "Timbalan Presiden",
      "Presiden UMNO"
    ],
    constitutionSummary:
      "Leadership is decided via the Perhimpunan Agung Electoral College across 191 divisions. High MKT support unlocks the 'Usul Tiada Pertandingan' (No-Contest Motion) to freeze top posts.",
    lockedActions: ["IDEOLOGICAL_PURGE", "GRASSROOTS_CROWD_DONATION"],
    modifiers: {
      ruralMobilizationBonus: 1.3,
      patronageBurnRate: 1.4,
      coalitionFrictionMultiplier: 0.8
    }
  },

  PKR: {
    id: "PKR",
    shortName: "PKR",
    fullName: "Parti Keadilan Rakyat",
    coalition: "PH",
    color: "#0284c7",
    baseEngine: "CADRE_MERITOCRACY",
    constitutionTitle: "Perlembagaan Keadilan (Satu Anggota Satu Undi)",
    internalElectionLabel: "Direct E-Voting (One-Member-One-Vote Slate)",
    primaryCurrencyLabel: "Reformasi Momentum",
    secondaryCurrencyLabel: "Factional Slate (Cai) Power",
    termLimit: 3,
    ranks: [
      "Ketua Ranting",
      "Ketua Cabang",
      "Ahli Majlis Pimpinan Pusat (MPP)",
      "Naib Presiden",
      "Timbalan Presiden",
      "Presiden Keadilan"
    ],
    constitutionSummary:
      "Every registered member votes directly in party elections, triggering intense nationwide slate battles (Kem A vs. Kem B). Presidency is capped at 3 consecutive terms.",
    lockedActions: ["NO_CONTEST_MOTION", "DIRECT_CASH_PATRONAGE"],
    modifiers: {
      mixedSeatBonus: 1.25,
      internalSplitPenalty: 1.5,
      coalitionFrictionMultiplier: 1.1
    }
  },

  DAP: {
    id: "DAP",
    shortName: "DAP",
    fullName: "Democratic Action Party",
    coalition: "PH",
    color: "#e11d48",
    baseEngine: "CADRE_MERITOCRACY",
    constitutionTitle: "DAP Party Constitution (Two-Tier CEC System)",
    internalElectionLabel: "Top-30 CEC Election -> Internal Sec-Gen Vote",
    primaryCurrencyLabel: "Ideological Credibility",
    secondaryCurrencyLabel: "Cadre Discipline",
    termLimit: 3,
    ranks: [
      "Branch Secretary",
      "State Committee Member",
      "State Chairman",
      "CEC Member (Top 30)",
      "National Chairman",
      "Setiausaha Agung (Secretary-General)"
    ],
    constitutionSummary:
      "Executive authority rests with the Setiausaha Agung—chosen behind closed doors by the elected Top 30 Central Executive Committee (CEC). Strictly capped at 3 terms with zero cash patronage allowed.",
    lockedActions: ["DIRECT_CASH_PATRONAGE", "NO_CONTEST_MOTION", "GLC_WARLORD_BUYOUT"],
    modifiers: {
      urbanSeatBonus: 1.45,
      sprmResistanceBonus: 1.35,
      coalitionFrictionMultiplier: 1.6
    }
  },

  PAS: {
    id: "PAS",
    shortName: "PAS",
    fullName: "Parti Islam Se-Malaysia",
    coalition: "PN",
    color: "#15803d",
    baseEngine: "ULAMAK_MOVEMENT",
    constitutionTitle: "Perlembagaan PAS (Kepimpinan Ulamak & Syura)",
    internalElectionLabel: "Muktamar Delegates + Majlis Syura Vetting",
    primaryCurrencyLabel: "Tarbiyah Standing",
    secondaryCurrencyLabel: "Ulamak Endorsement",
    termLimit: null,
    ranks: [
      "AJK Cawangan",
      "Yang Dipertua (YDP) Kawasan",
      "Pesuruhjaya Negeri",
      "AJK PAS Pusat",
      "Timbalan Presiden",
      "Presiden PAS"
    ],
    constitutionSummary:
      "While Muktamar delegates elect the Central Committee, the Majlis Syura Ulamak (led by the Mursyidul Am) holds constitutional veto power over candidate eligibility and coalition pacts.",
    lockedActions: ["SECULAR_LIBERAL_SHIFT", "DIRECT_CASH_PATRONAGE"],
    modifiers: {
      campaignCostDiscount: 0.5, // Unit Amal unpaid volunteer machinery
      heartlandBonus: 1.4,
      coalitionFrictionMultiplier: 1.25
    }
  },

  BERSATU: {
    id: "BERSATU",
    shortName: "BERSATU",
    fullName: "Parti Pribumi Bersatu Malaysia",
    coalition: "PN",
    color: "#1d4ed8",
    baseEngine: "WARLORD_MACHINE",
    constitutionTitle: "Perlembagaan Bersatu (Kuasa MPT & Bahagian)",
    internalElectionLabel: "Division Delegate Vote & MPT Appointments",
    primaryCurrencyLabel: "Elite Network",
    secondaryCurrencyLabel: "GLC & Coalition Patronage",
    termLimit: 3,
    ranks: [
      "Ketua Cawangan",
      "Ketua Bahagian",
      "Ketua Badan Pimpinan Negeri",
      "Ahli Majlis Pimpinan Tertinggi (MPT)",
      "Timbalan Presiden",
      "Presiden Bersatu"
    ],
    constitutionSummary:
      "Centralized around the Majlis Pimpinan Tertinggi (MPT) and State Liaison Chiefs. Excels at poaching rival MPs during hung parliaments, but vulnerable to defections when out of federal power.",
    lockedActions: ["GRASSROOTS_CROWD_DONATION"],
    modifiers: {
      mpPoachingBonus: 1.35,
      oppositionDefectionRisk: 1.3,
      coalitionFrictionMultiplier: 0.9
    }
  },

  AMANAH: {
    id: "AMANAH",
    shortName: "AMANAH",
    fullName: "Parti Amanah Negara",
    coalition: "PH",
    color: "#ea580c",
    baseEngine: "CADRE_MERITOCRACY",
    constitutionTitle: "Perlembagaan Amanah (Sistem 27 JKP)",
    internalElectionLabel: "27-Member JKP Election -> Presidential Vote",
    primaryCurrencyLabel: "Policy Credibility",
    secondaryCurrencyLabel: "Coalition Trust",
    termLimit: 3,
    ranks: [
      "Ketua Cawangan",
      "Ketua Kawasan",
      "Pengerusi Negeri",
      "Ahli Jawatankuasa Pimpinan Nasional (JKP)",
      "Timbalan Presiden",
      "Presiden Amanah"
    ],
    constitutionSummary:
      "Delegates elect 27 National Leadership Committee (JKP) members who then choose the President, capped at 3 consecutive terms. Acts as a progressive Islamist bridge inside multi-racial coalitions.",
    lockedActions: ["NO_CONTEST_MOTION", "DIRECT_CASH_PATRONAGE"],
    modifiers: {
      coalitionHarmonyBonus: 1.35,
      ruralMachineryPenalty: 0.85,
      coalitionFrictionMultiplier: 0.75
    }
  },

  GPS: {
    id: "GPS",
    shortName: "GPS",
    fullName: "Gabungan Parti Sarawak (PBB-Led Bloc)",
    coalition: "GPS",
    color: "#b91c1c",
    baseEngine: "REGIONAL_KINGMAKER",
    constitutionTitle: "Piagam GPS & Perlembagaan PBB (Pesaka-Bumiputera)",
    internalElectionLabel: "PBB Wing Consensus & Sarawak Caucus",
    primaryCurrencyLabel: "MA63 Leverage",
    secondaryCurrencyLabel: "State Autonomy Score",
    termLimit: null,
    ranks: [
      "PBB Branch Chief",
      "ADUN Sarawak",
      "Sarawak State Minister",
      "PBB Senior Vice-President",
      "Timbalan Premier Sarawak",
      "Premier & Pengerusi GPS"
    ],
    constitutionSummary:
      "Anchored by PBB's strict balance between its Bumiputera and Pesaka (Dayak) wings. Shields Sarawak from Peninsular party swings and wields decisive kingmaker ultimatums in Putrajaya.",
    lockedActions: ["MERGER_WITH_PENINSULAR_PARTY"],
    modifiers: {
      sarawakFortressBonus: 1.5,
      federalKingmakerMultiplier: 1.4,
      coalitionFrictionMultiplier: 0.7
    }
  },

  GRS: {
    id: "GRS",
    shortName: "GRS",
    fullName: "Gabungan Rakyat Sabah",
    coalition: "GRS",
    color: "#0ea5e9",
    baseEngine: "REGIONAL_KINGMAKER",
    constitutionTitle: "Perlembagaan GRS (Konsensus Gabungan Tempatan)",
    internalElectionLabel: "Supreme Council Component Party Caucus",
    primaryCurrencyLabel: "Sabah Bloc Unity",
    secondaryCurrencyLabel: "State Development Funds",
    termLimit: null,
    ranks: [
      "Division Coordinator",
      "ADUN Sabah",
      "State Assistant Minister",
      "State Cabinet Minister",
      "Timbalan Ketua Menteri",
      "Ketua Menteri & Pengerusi GRS"
    ],
    constitutionSummary:
      "A local Sabah coalition requiring continuous State Cabinet and GLC power-sharing across component parties. Can pivot federal backing after any General Election to keep Sabah in Putrajaya.",
    lockedActions: ["MERGER_WITH_PENINSULAR_PARTY"],
    modifiers: {
      sabahAutonomyBonus: 1.35,
      federalPivotFlexibility: 1.5,
      coalitionFrictionMultiplier: 0.85
    }
  },

  WARISAN: {
    id: "WARISAN",
    shortName: "WARISAN",
    fullName: "Parti Warisan",
    coalition: "WARISAN",
    color: "#0284c7",
    baseEngine: "REGIONAL_KINGMAKER",
    constitutionTitle: "Perlembagaan Warisan (Perpaduan Sabah)",
    internalElectionLabel: "Centralized Presidential & Supreme Council Slate",
    primaryCurrencyLabel: "Sabah Nationalism",
    secondaryCurrencyLabel: "East Coast Stronghold Base",
    termLimit: null,
    ranks: [
      "Ketua Bahagian",
      "ADUN / Ahli Parlimen",
      "Ahli Majlis Tertinggi",
      "Naib Presiden",
      "Timbalan Presiden",
      "Presiden Warisan"
    ],
    constitutionSummary:
      "Multi-racial Sabah-based movement built around strong centralized leadership and anti-federal interventionism. Gains rapid momentum when attacking Putrajaya neglect, but faces ADUN poaching when in State Opposition.",
    lockedActions: ["MERGER_WITH_PENINSULAR_PARTY"],
    modifiers: {
      antiFederalSurgeBonus: 1.4,
      oppositionPoachingVulnerability: 1.25,
      coalitionFrictionMultiplier: 1.0
    }
  }
};