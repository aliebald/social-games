import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default async function deleteGame(gameId: string): Promise<void> {
  console.log("Deleting game", gameId);
  await deleteDoc(doc(db, "games", gameId));
}
