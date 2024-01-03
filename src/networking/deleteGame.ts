import { db } from "@/firebase";
import Game from "@/types/game";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";

export default async function deleteGame(game: Game): Promise<void> {
  console.log("Deleting game", game.id);
  if (game.thumbnailRef) {
    await deleteObject(game.thumbnailRef);
  }
  await deleteDoc(doc(db, "games", game.id));
}
