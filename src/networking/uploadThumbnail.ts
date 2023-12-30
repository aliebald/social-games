import { storage } from "@/firebase";
import {
  UploadResult,
  deleteObject,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

export async function uploadThumbnail(
  thumbnail: File,
  gameId: string,
  authorUid: string
): Promise<UploadResult> {
  // Delete existing thumbnail - deletes all images for this game
  const listRef = ref(storage, `games/${gameId}/thumbnail`);
  const existingImages = await listAll(listRef);
  await Promise.allSettled(existingImages.items.map(deleteObject));

  // Upload new thumbnail
  const thumbnailRef = ref(
    storage,
    `games/${gameId}/thumbnail/${thumbnail.name}`
  );
  console.log("Uploading thumbnail", thumbnailRef);

  const metadata = {
    customMetadata: {
      gameId,
      authorUid,
    },
  };

  const uploadResult = await uploadBytes(thumbnailRef, thumbnail, metadata);

  console.log("Uploaded thumbnail", uploadResult);

  return uploadResult;
}
