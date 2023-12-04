import Game, { GameWithoutId, serializeGame } from "@/types/game";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { omit } from "lodash";

export default async function addGame(game: Game | GameWithoutId) {
  console.log("Adding game", game);
  const serializedGame = serializeGame(omit(game, "id"));
  const docRef = await addDoc(collection(db, "games"), serializedGame);

  console.log("Added game with ID:", docRef.id);
  return docRef;
}
