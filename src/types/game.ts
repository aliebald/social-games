import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import Tag, { deserializeTag } from "./tag";
export default interface Game {
  id: string;
  title: string;
  description: string;
  websiteUrl: string;
  image: string;
  tags: Tag[];
  minPlayers?: number;
  maxPlayers?: number;
  author_uid: string;
}

export type GameWithoutId = Omit<Game, "id">;

export interface BackendGame extends Omit<Game, "tags"> {
  tags: DocumentReference<DocumentData, DocumentData>[];
}

export interface BackendGameWithoutId extends Omit<GameWithoutId, "tags"> {
  tags: DocumentReference<DocumentData, DocumentData>[];
}

// ========================================
//       De-/ Serialization Methods
// ========================================

const defaultGame: Omit<Game, "id"> = {
  title: "",
  description: "",
  websiteUrl: "",
  image: "",
  tags: [],
  author_uid: "unknown",
};

/** Parse game from backend */
export async function deserializeGame(
  backendSnapshot: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<Game> {
  const { tags: tagRefs, ...data } = backendSnapshot.data();

  const tags = await Promise.all(
    (tagRefs as DocumentReference<DocumentData, DocumentData>[]).map(
      async (tagRef) => {
        const tagSnapshot = await getDoc(tagRef);
        return deserializeTag(tagSnapshot);
      }
    )
  );

  return {
    ...defaultGame,
    ...data,
    id: backendSnapshot.id,
    tags,
  };
}
