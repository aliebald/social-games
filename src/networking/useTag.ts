import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import Tag, { deserializeTag } from "@/types/tag";

export default function useTag(id: string) {
  const [tag, setTag] = useState<Tag | null>(null);

  useEffect(() => {
    const docRef = doc(db, "tags", id);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      if (doc.exists()) {
        console.log("Fetched tag:", doc.data());
        const newTag = await deserializeTag(doc);
        setTag(newTag);
      } else {
        // TODO error handling
        console.error("Failed to fetch - no tag with id", id);
      }
    });

    return unsubscribe;
  }, [id]);

  return tag;
}
