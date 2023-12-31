import { GameWithoutId } from "./types/game";
import Tag from "./types/tag";

interface TestDataGame
  extends Omit<GameWithoutId, "authorUid" | "thumbnailUrl" | "thumbnailRef"> {
  image: string;
}

export const testGames: TestDataGame[] = [
  {
    title: "Gartic Phone",
    description: "Stille-Post-Onlinespiel",
    websiteUrl: "https://garticphone.com/de",
    image: "https://garticphone.com/images/thumb.png",
    minPlayers: 2,
    maxPlayers: 50,
    tags: [],
  },
  {
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
    title: "Codenames",
    description:
      "Online game room for playing Codenames – just invite your friends.",
    websiteUrl: "https://codenames.game/",
    image: "https://codenames.game/img/ogimage.png",
    minPlayers: 2,
    tags: [],
  },
  {
    title: "HaxBall",
    description: "Physics-based multiplayer soccer game where teamwork is key.",
    websiteUrl: "https://www.haxball.com/",
    image: "",
    maxPlayers: 15,
    minPlayers: 2,
    tags: [],
  },
  {
    title: "Frantic",
    description: "Physics-based multiplayer soccer game where teamwork is key.",
    websiteUrl: "https://frantic.online/",
    image:
      "https://images.thalia.media/00/-/bfe22f96d25b4b6d8bccc37e98733001/game-factory-frantic.jpeg",
    tags: [],
  },
  {
    title: "Colonist.io",
    description: "Settlers of Catan alternative",
    websiteUrl: "https://colonist.io/",
    image: "https://colonist.io/dist/images/square_logo.png",
    minPlayers: 2,
    maxPlayers: 4,
    tags: [],
  },
  {
    title: "Dominion",
    description: "Dominion Online Web Client",
    websiteUrl: "https://dominion.games/",
    image:
      "https://www.spielkarten.com/wp-content/uploads/2019/07/dominion_basisspiel_2._edition.png.webp",
    minPlayers: 2,
    maxPlayers: 4,
    tags: [],
  },
  {
    title: "GeoGuessr",
    description:
      "GeoGuessr is a geography game which takes you on a journey around the " +
      "world and challenges your ability to recognize your surroundings.",
    websiteUrl: "https://www.geoguessr.com",
    image: "https://www.geoguessr.com/_next/static/media/default.2f95f25d.png",
    maxPlayers: 10,
    tags: [],
  },
  {
    title: "Geotastic",
    description:
      "Geotastic is a free to play multiplayer focused geo quiz app that can " +
      "be played with friends simultaneously. A free alternative to geoguessr.",
    websiteUrl: "https://geotastic.net",
    image:
      "https://static.rocketbeans.tv/img/3e55ab9f-b6d4-4baa-bad1-b64ce562a746_orig.png",
    tags: [],
    maxPlayers: 6,
  },
  {
    title: "Wizard",
    description:
      "Fast-paced trick-taking card game with simple rules and a certain " +
      "amount of schadenfreude",
    websiteUrl: "https://boardgamearena.com/",
    image:
      "https://m.media-amazon.com/images/I/71VBPC7BcRL._AC_UF894,1000_QL80_.jpg",
    tags: [],
    minPlayers: 3,
    maxPlayers: 6,
  },
  {
    title: "Skull",
    description: "Skull card game",
    websiteUrl: "https://skull.games/",
    image:
      "https://cdn.zatu.com/wp-content/uploads/2019/04/18112035/How-to-Play-Skull.jpg",
    tags: [],
  },
];

export const testTags: Omit<Tag, "id" | "authorUid">[] = [
  {
    title: "Draw",
    description: "Game includes drawing",
    color: "#37B24D",
  },
  {
    title: "Social Deduction",
    description:
      "A social deduction game is a game in which players attempt to uncover each other's " +
      "hidden role or team allegiance. 'Commonly, these games are played with teams, with " +
      'one team being considered "good" and another being "bad".',
    color: "#AE3EC9",
  },
  {
    title: "Card Game",
    description: "Games based on various decks of cards",
  },
  {
    title: "Board Game Arena",
    description: "This game can be found on the Board Game Arena",
    color: "#E67700",
  },
  {
    title: "Classic",
    description: "Everybody needs to know this",
    color: "#0CA678",
  },
  {
    title: "Long",
    description: "This game might take a while",
  },
  {
    title: "Short",
    description: "Suitable for short rounds.",
    color: "#748FFC",
  },
  {
    title: "Beginner Friendly",
    description: "Suitable for new players.",
    color: "#9775FA",
  },
];
