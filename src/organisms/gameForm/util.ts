import Game from "@/types/game";
import { GameFormValues } from "./gameForm";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

export function parseGameToGameFormValues(game: Game): GameFormValues {
  return {
    ...game,
    tags: game.tags.map((tag) => tag.id),
  };
}

export function parseGameFormValuesToBackendFormat(
  gameFormValues: GameFormValues
) {
  return {
    ...gameFormValues,
    tags: gameFormValues.tags.map((tagId) => doc(db, `tags/${tagId}`)),
  };
}
