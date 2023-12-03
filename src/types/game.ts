export default interface Game {
  id: string;
  title: string;
  description: string;
  websiteUrl: string;
  image: string;
  minPlayers?: number;
  maxPlayers?: number;
}

export type GameWithoutId = Omit<Game, "id">;
