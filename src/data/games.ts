import { Tag, tags } from "./tags";

export interface Game {
  id: string;
  title: string;
  description: string;
  websiteUrl: string;
  thumbnail: string | null;
  tags: Tag[];
  minPlayers?: number;
  maxPlayers?: number;
}

export const games: Game[] = [
  {
    description:
      "Puzzle together in this free-to-win modern yet familiar online stacker in the same genre as Tetris. Play multiplayer games against friends and foes all over the world, or claim a spot on the leaderboards - the stacker future is yours!",
    minPlayers: 1,
    thumbnail: "games/tetr-io.png",
    title: "TETR.IO",
    websiteUrl: "https://tetr.io/",
    id: "0b9CxcLWRMKrwnjL6I7o",
    tags: [tags.ffa, tags.short],
  },
  {
    thumbnail: "games/haxball.png",
    minPlayers: 2,
    websiteUrl: "https://www.haxball.com/",
    title: "HaxBall",
    description: "Physics-based multiplayer soccer game where teamwork is key.",
    maxPlayers: 15,
    id: "1GGhbIl62AWUY8A0ql1g",
    tags: [tags.short, tags.teams],
  },
  {
    minPlayers: 2,
    thumbnail: "games/dominion.png",
    maxPlayers: 6,
    description: "Dominion Online Web Client",
    title: "Dominion",
    websiteUrl: "https://dominion.games/",
    id: "3NySaTAAKzPCnColBWhS",
    tags: [tags.long, tags.cards],
  },
  {
    websiteUrl: "https://curvefever.pro/",
    thumbnail: "games/curve-fever.png",
    minPlayers: 1,
    maxPlayers: 10,
    title: "Curve Fever",
    description:
      "A kind of competitive multiplayer snake.\n\nOfficial description: Curve fever is an action packed snake like online multiplayer browser game. Customize your ship, enter the arena and destroy your friends!",
    id: "6KLS9VDZGfxxmgZkHrHq",
    tags: [tags.ffa],
  },
  {
    thumbnail: "games/rocketcrab.jpg",
    description: "Collection of mobile friendly party games",
    websiteUrl: "https://rocketcrab.com/",
    title: "Rocketcrab",
    id: "6mzwmdnkkvden2gS5aGQ",
    tags: [tags.collection],
  },
  {
    minPlayers: 2,
    websiteUrl: "https://bad.cards/",
    title: "Bad Cards",
    description:
      "Bad Cards is a Cards Against Humanity like party game where players fill in the blanks of outrageous statements with even more outrageous and often politically incorrect responses. It thrives on dark humor and encourages players to push the boundaries of social acceptability for comedic effect.",
    thumbnail: "games/bad-cards.png",
    id: "76orSKaDaBQJougaDiXS",
    tags: [tags.cards, tags.ffa],
  },
  {
    title: "Bonk",
    thumbnail: "games/bonk.jpg",
    websiteUrl: "https://bonk.io/",
    minPlayers: 2,
    description:
      "Physics based minimalistic platformer, where the goal is to nudge the other players of a platform. Last one standing wins.",
    id: "8AU2si600IINXRkctMXN",
    tags: [tags.ffa, tags.short, tags.teams],
  },
  {
    description:
      "Free to play multiplayer focused geo quiz app that can be played with friends simultaneously. A free alternative to GeoGuessr.",
    maxPlayers: 4,
    title: "Geotastic",
    websiteUrl: "https://geotastic.net",
    thumbnail: "games/geotastic.png",
    minPlayers: 1,
    id: "DLuZi2vjIobS7SLfFLar",
    tags: [tags.geography, tags.guessing],
  },
  {
    thumbnail: "games/geoguessr.png",
    description:
      "Geography game which takes you on a journey around the world and challenges your ability to recognize your surroundings.",
    maxPlayers: 10,
    title: "GeoGuessr",
    websiteUrl: "https://www.geoguessr.com",
    id: "H9qZzAi7ZeM1kTZRUIuP",
    tags: [tags.geography, tags.guessing],
  },
  {
    maxPlayers: 4,
    thumbnail: "games/colonist.png",
    websiteUrl: "https://colonist.io/",
    title: "Colonist.io",
    minPlayers: 1,
    description: "Settlers of Catan alternative",
    id: "IfS4O9Kg0lsOssbBaEgr",
    tags: [tags.ffa],
  },
  {
    thumbnail: "games/lostgamer.png",
    minPlayers: 1,
    description:
      "Geoguessr, but with video game worlds. Get dropped into a video game world, use your surroundings and knowledge to locate where you are. The more precise your guess, the more points you score!",
    title: "Lostgamer",
    maxPlayers: 100000,
    websiteUrl: "https://lostgamer.io",
    id: "J8oKjPEnWZwLjidvyXjQ",
    tags: [tags.geography, tags.guessing, tags.ffa],
  },
  {
    websiteUrl: "https://boardgamearena.com/",
    thumbnail: "games/wizard.jpg",
    description:
      "Fast-paced trick-taking card game with simple rules and a certain amount of schadenfreude",
    title: "Wizard",
    minPlayers: 3,
    maxPlayers: 6,
    id: "JpwMvSvVUL7euTjDpqgL",
    tags: [tags.cards, tags.long],
  },
  {
    description:
      "FunNode hosts some of the most popular board games, card games, and dice games.\n\nGames:\n- Align 4\n- Backgammon\n- Blackjack\n- Checkers\n- Chess\n- Elimination\n- Go\n- Hearts\n- Holdem Poker\n- Kachuful\n- Liars's Dice\n- Ludo\n- Pairs\n- Reversi\n- Rummy\n- Spades\n- Warships\n- Wild Jacks",
    title: "FunNode",
    maxPlayers: 10,
    websiteUrl: "https://www.funnode.com/",
    minPlayers: 2,
    thumbnail: "games/fun-node.jpg",
    id: "O2mypwwOdRPSWvvtvqPv",
    tags: [tags.collection],
  },
  {
    minPlayers: 2,
    websiteUrl: "https://www.outofcontext.party/",
    thumbnail: "games/out-of-context.png",
    title: "Out Of Context",
    description:
      "Out Of Context Party Games - Contains multiple games.\n\nFree online social party games for 2+ players. Similar to Jackbox games, Drawphone and Telestrations, and more!",
    id: "SRIqoDLF9gEo4cXZhs8w",
    tags: [],
  },
  {
    thumbnail: "games/fishbowl.jpg",
    websiteUrl: "https://fishbowl-game.com/",
    title: "Fishbowl",
    minPlayers: 4,
    description:
      "Fishbowl is a virtual version of a guessing game. It consists of three rounds: Taboo, Charades, and Password.",
    id: "WiqxuNYEYiy5fyrZ1maC",
    tags: [tags.guessing, tags.teams],
  },
  {
    description:
      "Provide answers to prompts and decide which answer is the best or funniest. \n\nCan be played with three players, but is better with more. ",
    thumbnail: "games/qwiq-wit.png",
    websiteUrl: "https://qwiqwit.com/",
    title: "QwiqWit",
    minPlayers: 3,
    maxPlayers: 12,
    id: "YbntH3Rmkymf2jzXYqI9",
    tags: [],
  },
  {
    title: "Frantic",
    websiteUrl: "https://frantic.online/",
    description: "Uno-like card game ",
    thumbnail: "games/frantic.png",
    minPlayers: 2,
    id: "ePosU8MORiQz4AlDKmD9",
    tags: [tags.cards, tags.ffa],
  },
  {
    maxPlayers: 10,
    minPlayers: 5,
    thumbnail: "games/secret.png",
    description:
      "Secret Hitler is a dramatic game of political intrigue and betrayal set in 1930's Germany. Players are secretly divided into two teams - liberals and fascists. Known only to each other, the fascists coordinate to sow distrust and install their cold-blooded leader. The liberals must find and stop the Secret Hitler before it’s too late.\n\nEffectively this is a take on the classic social deduction/hidden role board game genre such as Werewolf and Mafia, but closer to the Resistance. Games are 5-10 players, the minority (fascists) know who everyone is and the majority (liberals) don't know anything. Over the course of the game the liberals need to try to identify the fascists to win and the fascists need to remain hidden, with an extra \"superfascist\" role with an additional win condition for both sides.\n\n(Text & image source: github.com/cozuya/secret-hitler)",
    websiteUrl: "https://secrethitler.io/",
    title: "Secret Hitler",
    id: "gbV3mamwXvEaM4UVSZBl",
    tags: [tags.socialDeduction, tags.teams],
  },
  {
    websiteUrl: "https://skribbl.io/",
    title: "Skribbl.io",
    description:
      "Free online multiplayer drawing and guessing pictionary game.",
    minPlayers: 2,
    thumbnail: "games/skribbl-io.png",
    maxPlayers: 20,
    id: "lWcfKlaSrcaMOfznKTfB",
    tags: [tags.short, tags.draw, tags.ffa, tags.guessing],
  },
  {
    thumbnail: "games/snakeout.jpg",
    description:
      'Snakeout is a game in which a team of loyalists is infiltrated by a group of snakes. The loyalists must try to figure out who the snakes are, and the snakes must try to keep the loyalists from figuring out their identity. The game is separated into five missions. The first team to "win" three missions wins the game.',
    minPlayers: 5,
    maxPlayers: 10,
    websiteUrl: "https://snakeout.tannerkrewson.com/",
    title: "Snakeout",
    id: "nIxvnebprLGS5R6tmBIC",
    tags: [tags.socialDeduction, tags.teams],
  },
  {
    title: "Draw Battle",
    minPlayers: 4,
    websiteUrl: "https://drawbattle.io/",
    thumbnail: "games/drawbattle.png",
    description:
      "Drawing game where two teams face off with a frantic final round. Guess words faster than the other team to win!",
    id: "nTh9WbBFPxWB8fMzuVqj",
    tags: [tags.teams, tags.draw, tags.guessing],
  },
  {
    title: "Netgames",
    maxPlayers: 29,
    thumbnail: null,
    description:
      "Collection of games including games like One Night Ultimate Werewolf and Codewords.",
    minPlayers: 2,
    websiteUrl: "https://netgames.io/games/",
    id: "xH96Srp3GuTjM0hfKeoZ",
    tags: [tags.collection],
  },
  {
    description: "Stille-Post-Onlinespiel",
    thumbnail: "games/gartic-phone.png",
    maxPlayers: 50,
    title: "Gartic Phone",
    websiteUrl: "https://garticphone.com/de",
    minPlayers: 2,
    id: "yZSaxG7NdFP5hLeiYRXh",
    tags: [tags.draw, tags.short],
  },
  {
    description:
      "Online game room for playing Codenames – just invite your friends.",
    thumbnail: "games/codenames.png",
    websiteUrl: "https://codenames.game/",
    minPlayers: 4,
    title: "Codenames",
    id: "ykGvtVZcIhdyQXgoFdTr",
    tags: [tags.teams, tags.guessing],
  },
];
