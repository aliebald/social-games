import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import parseGame from "./game";
import { useEffect, useState } from "react";
import Game from "@/types/game";

export default function useGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      console.log("Fetching games");

      await getDocs(collection(db, "games")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map(parseGame);
        console.log("Fetched games:", newData);
        setGames(newData);
      });
    };

    fetchGames();
  }, []);

  return games;
}
