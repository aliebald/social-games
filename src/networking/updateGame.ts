import Game from "@/types/game";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export default async function updateGame(game: Game) {
  const { id, ...gameWithoutId } = game;
  console.log(`Updating "${game.title}"`);
  const docRef = await updateDoc(doc(db, "games", id), gameWithoutId);
  console.log(`Update for "${game.title}" successful`);
  return docRef;
}
