import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import Tag, { deserializeTag } from "./tag";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase";
export default interface Game {
  id: string;
  title: string;
  description: string;
  websiteUrl: string;
  thumbnailUrl: string | null;
  thumbnailRef: StorageReference | null;
  tags: Tag[];
  minPlayers?: number;
  maxPlayers?: number;
  authorUid: string;
  authorName: string | null;
}

export type GameWithoutId = Omit<Game, "id">;

export interface BackendGame
  extends Omit<Game, "tags" | "thumbnail" | "thumbnailUrl" | "thumbnailRef"> {
  tags: DocumentReference<DocumentData, DocumentData>[];
  thumbnailPath: string | null;
}

export interface BackendGameWithoutId extends Omit<BackendGame, "id"> {}

// ========================================
//       De-/ Serialization Methods
// ========================================

const defaultGame: GameWithoutId = {
  title: "",
  description: "",
  websiteUrl: "",
  tags: [],
  authorUid: "unknown",
  authorName: null,
  thumbnailRef: null,
  thumbnailUrl: null,
};

/** Parse game from backend */
export async function deserializeGame(
  backendSnapshot: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<Game> {
  const { tags: tagRefs, thumbnailPath, ...data } = backendSnapshot.data();

  const tags = await Promise.all(
    (tagRefs as DocumentReference<DocumentData, DocumentData>[]).map(
      async (tagRef) => {
        const tagSnapshot = await getDoc(tagRef);
        return deserializeTag(tagSnapshot);
      }
    )
  );
  const thumbnail = await parseThumbnail(thumbnailPath);
  return {
    ...defaultGame,
    ...data,
    ...thumbnail,
    id: backendSnapshot.id,
    tags,
  };
}

async function parseThumbnail(thumbnailPath: unknown) {
  const fallback = { thumbnailUrl: null, thumbnailRef: null };

  if (thumbnailPath === null) return fallback;

  if (typeof thumbnailPath !== "string") {
    console.error(
      `Expected thumbnailPath to be of type string, but is: "${typeof thumbnailPath}"`
    );
    return fallback;
  }

  try {
    const thumbnailRef = ref(storage, thumbnailPath);
    const thumbnailUrl = await getDownloadURL(thumbnailRef);
    return { thumbnailUrl, thumbnailRef };
  } catch (error) {
    console.error("Failed to get thumbnail:", error);
    return fallback;
  }
}
