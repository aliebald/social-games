import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { TagFormValues } from "@/organisms/tagForm/tagForm";
import { TagWithoutId } from "@/types/tag";

export default async function addTag(
  tagFormValues: TagFormValues,
  author_uid: string
) {
  const tag: TagWithoutId = { ...tagFormValues, author_uid };
  console.log("Adding tag", tag);
  const docRef = await addDoc(collection(db, "tags"), tag);

  console.log("Added tag with ID:", docRef.id);
  return docRef.id;
}
