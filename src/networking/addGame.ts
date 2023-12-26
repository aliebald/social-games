import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { GameFormValues } from "@/organisms/gameForm/gameForm";
import { parseGameFormValuesToBackendFormat } from "@/organisms/gameForm/util";

export default async function addGame(gameFormValues: GameFormValues) {
  console.log("Adding game", gameFormValues);

  const serializedGame = parseGameFormValuesToBackendFormat(gameFormValues);
  const docRef = await addDoc(collection(db, "games"), serializedGame);

  console.log("Added game with ID:", docRef.id);
  return docRef.id;
}
