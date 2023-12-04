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
}

export type TagWithoutId = Omit<Tag, "id">;

// ========================================
//       De-/ Serialization Methods
// ========================================

const defaultTag: Omit<Tag, "id"> = {
  title: "",
  description: "",
};

/** Parse Tag from backend */
export function deserializeTag(
  backendSnapshot:
    | QueryDocumentSnapshot<DocumentData, DocumentData>
    | DocumentSnapshot<DocumentData, DocumentData>
): Tag {
  return {
    ...defaultTag,
    ...backendSnapshot.data(),
    id: backendSnapshot.id,
  };
}
