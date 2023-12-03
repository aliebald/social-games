import Game, { GameWithoutId } from "@/types/game";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { omit } from "lodash";

export default async function addGame(game: Game | GameWithoutId) {
  console.log("Adding game", game);
  const docRef = await addDoc(collection(db, "games"), omit(game, "id"));

  console.log("Added game with ID:", docRef.id);
  return docRef;
}
