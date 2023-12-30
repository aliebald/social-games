import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { GameFormValues } from "@/organisms/gameForm/gameForm";
import { parseGameFormValuesToBackendFormat } from "@/organisms/gameForm/util";
import { UploadResult } from "firebase/storage";
import { uploadThumbnail } from "./uploadThumbnail";

export default async function updateGame(
  id: string,
  gameFormValues: GameFormValues,
  author_uid: string
) {
  console.log(`Updating "${gameFormValues.title}"`);

  const gameDoc = doc(db, "games", id);
  const gameId = gameDoc.id;

  let thumbnailUploadResult: UploadResult | undefined = undefined;
  if (gameFormValues.newThumbnail !== null) {
    thumbnailUploadResult = await uploadThumbnail(
      gameFormValues.newThumbnail,
      gameId,
      author_uid
    );
  }

  const serializedGame = parseGameFormValuesToBackendFormat(
    gameFormValues,
    author_uid,
    thumbnailUploadResult
  );
  const docRef = await updateDoc(gameDoc, serializedGame);

  console.log(`Update for "${serializedGame.title}" successful`);

  return docRef;
}
