import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { deserializeGame } from "@/types/game";
import { useEffect, useState } from "react";
import Game from "@/types/game";

export default function useGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "games"),
      async (querySnapshot) => {
        const snapshots = querySnapshot.docs;
        const newData = await Promise.all(snapshots.map(deserializeGame));
        console.log("Fetched games:", newData);
        setGames(newData);
      }
    );
    return unsubscribe;
  }, []);

  return games;
}
