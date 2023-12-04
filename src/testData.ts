import type Game from "./types/game";
import Tag from "./types/tag";

export const testGames: Game[] = [
  {
    id: "G00",
    title: "Gartic Phone",
    description: "Stille-Post-Onlinespiel",
    websiteUrl: "https://garticphone.com/de",
    image: "https://garticphone.com/images/thumb.png",
    minPlayers: 2,
    maxPlayers: 50,
    tags: [],
  },
  {
    id: "G01",
    title: "Skribbl.io",
    description:
      "Free online multiplayer drawing and guessing pictionary game.",
    websiteUrl: "https://skribbl.io/",
    image: "https://skribbl.io/img/thumbnail.png",
    minPlayers: 2,
    maxPlayers: 20,
    tags: [],
  },
  {
    id: "G02",
    title: "Codenames",
    description:
      "Online game room for playing Codenames – just invite your friends.",
    websiteUrl: "https://codenames.game/",
    image: "https://codenames.game/img/ogimage.png",
    tags: [],
  },
  {
    id: "G03",
    title: "HaxBall",
    description: "Physics-based multiplayer soccer game where teamwork is key.",
    websiteUrl: "https://www.haxball.com/",
    image: "",
    maxPlayers: 15,
    tags: [],
  },
  {
    id: "G04",
    title: "Frantic",
    description: "Physics-based multiplayer soccer game where teamwork is key.",
    websiteUrl: "https://frantic.online/",
    image: "",
    tags: [],
  },
  {
    id: "G05",
    title: "Colonist.io",
    description: "Settlers of Catan alternative",
    websiteUrl: "https://colonist.io/",
    image: "https://colonist.io/dist/images/square_logo.png",
    tags: [],
  },
  {
    id: "G06",
    title: "Dominion",
    description: "Dominion Online Web Client",
    websiteUrl: "https://dominion.games/",
    image: "",
    minPlayers: 2,
    tags: [],
  },
  {
    id: "G07",
    title: "Skull",
    description:
      "Skull card game Skull card game Skull card game Skull card game Skull card game Skull card game Skull card game Skull card game",
    websiteUrl: "https://skull.games/",
    image: "",
    tags: [],
  },
  {
    id: "G08",
    title: "Wizard",
    description:
      "Fast-paced trick-taking card game with simple rules and a certain amount of schadenfreude",
    websiteUrl: "https://boardgamearena.com/",
    image:
      "https://m.media-amazon.com/images/I/71VBPC7BcRL._AC_UF894,1000_QL80_.jpg",
    tags: [],
    minPlayers: 2,
  },
];

export const testTags: Tag[] = [
  {
    id: "T01",
    title: "Draw",
    description: "Game includes drawing",
    color: "#37B24D",
  },
  {
    id: "T02",
    title: "Social Deduction",
    description:
      "A social deduction game is a game in which players attempt to uncover each other's " +
      "hidden role or team allegiance. 'Commonly, these games are played with teams, with " +
      'one team being considered "good" and another being "bad".',
    color: "#AE3EC9",
  },
  {
    id: "T03",
    title: "Card Game",
    description: "Games based on various decks of cards",
  },
  {
    id: "T04",
    title: "Board Game Arena",
    description: "This game can be found on the Board Game Arena",
  },
  {
    id: "T05",
    title: "Classic",
    description: "Everybody needs to know this",
  },
  {
    id: "T06",
    title: "Long",
    description: "This game might take a while",
  },
  {
    id: "T07",
    title: "Short",
    description: "Suitable for short rounds.",
  },
];
