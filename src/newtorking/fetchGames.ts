import { db } from "@/firebase";
import Game, { deserializeGame } from "@/types/game";
import { collection, getDocs } from "firebase/firestore";

export default async function fetchGames(): Promise<Game[]> {
  const querySnapshot = await getDocs(collection(db, "games"));
  const games = await Promise.all(querySnapshot.docs.map(deserializeGame));
  return games;
}
