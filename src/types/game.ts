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
  author_uid: string;
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
  author_uid: "unknown",
  thumbnailRef: null,
  thumbnailUrl: null,
};

/** Parse game from backend */
export async function deserializeGame(
  backendSnapshot: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<Game> {
  console.log("deserialize", backendSnapshot.data());

  const { tags: tagRefs, thumbnailPath, ...data } = backendSnapshot.data();

  const tags = await Promise.all(
    (tagRefs as DocumentReference<DocumentData, DocumentData>[]).map(
      async (tagRef) => {
        const tagSnapshot = await getDoc(tagRef);
        return deserializeTag(tagSnapshot);
      }
    )
  );

  const thumbnailRef =
    thumbnailPath != null ? ref(storage, thumbnailPath) : null;
  const thumbnailUrl =
    thumbnailRef !== null ? await getDownloadURL(thumbnailRef) : null;

  return {
    ...defaultGame,
    ...data,
    id: backendSnapshot.id,
    tags,
    thumbnailUrl,
    thumbnailRef,
  };
}
