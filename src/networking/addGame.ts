import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { GameFormValues } from "@/organisms/gameForm/gameForm";
import { parseGameFormValuesToBackendFormat } from "@/organisms/gameForm/util";
import { UploadResult } from "firebase/storage";
import { uploadThumbnail } from "./uploadThumbnail";

export default async function addGame(
  gameFormValues: GameFormValues,
  authorUid: string
) {
  console.log("Adding game", gameFormValues);

  const gameDoc = doc(collection(db, "games"));
  const gameId = gameDoc.id;

  let thumbnailUploadResult: UploadResult | undefined = undefined;
  if (gameFormValues.newThumbnail !== null) {
    thumbnailUploadResult = await uploadThumbnail(
      gameFormValues.newThumbnail,
      gameId,
      authorUid
    );
  }

  const serializedGame = parseGameFormValuesToBackendFormat(
    gameFormValues,
    authorUid,
    thumbnailUploadResult
  );

  await setDoc(gameDoc, serializedGame);

  console.log("Added game with ID:", gameId);

  return gameId;
}
