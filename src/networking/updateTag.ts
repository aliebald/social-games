import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { TagFormValues } from "@/organisms/tagForm/tagForm";
import Tag from "@/types/tag";

export default async function updateTag(
  id: string,
  tagFormValues: TagFormValues
) {
  const tag: Omit<Tag, "id"> = tagFormValues;
  console.log(`Updating "${tag.title}"`);
  const docRef = await updateDoc(doc(db, "games", id), tag);
  console.log(`Update for "${tag.title}" successful`);
  return docRef;
}
