import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default async function deleteTag(tagId: string): Promise<void> {
  console.log("Deleting tag:", tagId);
  await deleteDoc(doc(db, "tags", tagId));
}
