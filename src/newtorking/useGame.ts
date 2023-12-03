import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import parseGame from "./game";
import { useEffect, useState } from "react";
import Game from "@/types/game";

export default function useGame(id: string) {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const docRef = doc(db, "games", id);

    const fetchGames = async () => {
      console.log("Fetching game with id", id);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Fetched game:", docSnap.data());
        setGame(parseGame(docSnap));
      } else {
        // TODO error handling
        console.error("Failed to fetch - no game with id", id);
      }
    };

    fetchGames();
  }, [id]);

  return game;
}
