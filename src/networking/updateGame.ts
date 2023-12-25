import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { GameFormValues } from "@/organisms/gameForm/gameForm";
import { parseGameFormValuesToBackendFormat } from "@/organisms/gameForm/util";

export default async function updateGame(
  id: string,
  gameFormValues: GameFormValues
) {
  const serializedGame = parseGameFormValuesToBackendFormat(gameFormValues);
  console.log(`Updating "${serializedGame.title}"`);
  const docRef = await updateDoc(doc(db, "games", id), serializedGame);
  console.log(`Update for "${serializedGame.title}" successful`);
  return docRef;
}
