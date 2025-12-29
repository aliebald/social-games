export interface Tag {
  id: string;
  title: string;
  description: string;
  color?: string;
  authorUid: string;
}

export const tags = {
  ffa: {
    id: "3azR1q8hvsI0sO10GRLa",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    color: "#82c91e",
    description:
      "Free For All - Games tagged FFA include a game mode where every player fights for themselves.",
    title: "FFA",
  },
  cards: {
    id: "Blv7GTuhPHxlKiWuBDNO",
    color: "#1971c2",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    title: "Cards",
    description: "Games based on various decks of cards",
  },
  collection: {
    id: "I2HG7neJ3ZrBtjYm74vL",
    color: "#48a2f0",
    title: "Collection",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    description:
      "This is a website that contains multiple games. May be split into separate games when tested / useful.",
  },
  short: {
    id: "VsoEfJaNHUtpA4Jwhzyg",
    color: "#748FFC",
    title: "Short",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    description: "Suitable for short rounds.",
  },
  geography: {
    id: "WHMFYILcqAgWD1W0AZq3",
    description: "Game based on real world geography knowledge",
    color: "#3cc956",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    title: "Geography",
  },
  socialDeduction: {
    id: "bqjsHcBMaJs3cYLZ7Qfp",
    description:
      'A social deduction game is a game in which players attempt to uncover each other\'s hidden role or team allegiance. \'Commonly, these games are played with teams, with one team being considered "good" and another being "bad".',
    title: "Social Deduction",
    color: "#AE3EC9",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
  },
  teams: {
    id: "kq7CVIi86ae7Ht7TzyJ7",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    color: "#6435f0",
    title: "Teams",
    description: "Game features team based gameplay.",
  },
  guessing: {
    id: "m3bHrdDKFIbOSMp3LLFc",
    description: "Game based on guessing various things",
    color: "#6f7b87",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    title: "Guessing",
  },
  draw: {
    id: "mrWRLH1qHDfbCHi4v4UK",
    title: "Draw",
    color: "#37B24D",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    description: "Game includes drawing",
  },
  long: {
    id: "rguZo9FBrcc6zwLtxje4",
    authorUid: "V3XQreDhp9O5dgil1fNgtyH67Hl2",
    description: "This game might take a while",
    title: "Long",
  },
} as const satisfies Record<string, Tag>;
