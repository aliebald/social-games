import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { deserializeGame } from "@/types/game";
import { useEffect, useState } from "react";
import Game from "@/types/game";

export default function useGame(id: string) {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const docRef = doc(db, "games", id);

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      if (doc.exists()) {
        console.log("Fetched game:", doc.data());
        const newGame = await deserializeGame(doc);
        setGame(newGame);
      } else {
        // TODO error handling
        console.error("Failed to fetch - no game with id", id);
      }
    });

    return unsubscribe;
  }, [id]);

  return game;
}
