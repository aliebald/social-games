import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export default interface Tag {
  id: string;
  title: string;
  description: string;
  color?: string;
  authorUid: string;
}

export type TagWithoutId = Omit<Tag, "id">;

// ========================================
//       De-/ Serialization Methods
// ========================================

const defaultTag: Omit<Tag, "id"> = {
  title: "",
  description: "",
  authorUid: "unknown",
};

/** Parse Tag from backend */
export function deserializeTag(
  backendSnapshot:
    | QueryDocumentSnapshot<DocumentData, DocumentData>
    | DocumentSnapshot<DocumentData, DocumentData>
): Tag {
  const data = backendSnapshot.data();
  if (data === undefined) {
    console.error(`No data for tag with ID: ${backendSnapshot.id}.`);
  }
  return {
    ...defaultTag,
    ...data,
    id: backendSnapshot.id,
  };
}
