import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import Tag from "@/types/tag";
import { deserializeTag } from "@/types/tag";

export default function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tags"), (querySnapshot) => {
      const newData = querySnapshot.docs.map(deserializeTag);
      console.log("Fetched tags:", newData);
      setTags(newData);
    });
    return unsubscribe;
  }, []);

  return tags;
}
