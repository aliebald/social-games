import Tag, { TagWithoutId } from "@/types/tag";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { omit } from "lodash";

export default async function addTag(tag: Tag | TagWithoutId) {
  console.log("Adding tag", tag);
  const docRef = await addDoc(collection(db, "tags"), omit(tag, "id"));

  console.log("Added tag with ID:", docRef.id);
  return docRef;
}
