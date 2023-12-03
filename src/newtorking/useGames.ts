import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import parseGame from "./game";
import { useEffect, useState } from "react";
import Game from "@/types/game";

export default function useGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "games"), (querySnapshot) => {
      const newData = querySnapshot.docs.map(parseGame);
      console.log("Fetched games:", newData);
      setGames(newData);
    });
    return unsubscribe;
  }, []);

  return games;
}
