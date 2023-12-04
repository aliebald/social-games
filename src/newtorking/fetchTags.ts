import { db } from "@/firebase";
import Tag, { deserializeTag } from "@/types/tag";
import { collection, getDocs } from "firebase/firestore";

export default async function fetchTags(): Promise<Tag[]> {
  const querySnapshot = await getDocs(collection(db, "tags"));
  return querySnapshot.docs.map(deserializeTag);
}
