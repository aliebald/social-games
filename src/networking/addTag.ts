import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { TagFormValues } from "@/organisms/tagForm/tagForm";

export default async function addTag(tag: TagFormValues) {
  console.log("Adding tag", tag);
  const docRef = await addDoc(collection(db, "tags"), tag);

  console.log("Added tag with ID:", docRef.id);
  return docRef.id;
}
