import { db } from "@/firebase";
import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import Game from "@/types/game";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";

export default async function deleteGame(game: Game): Promise<boolean> {
  console.log("Deleting game", game.id);
  const { successNotification, errorNotification } = showLoadingNotification({
    title: "Deleting game",
    message: `Deleting ${game.title}`,
  });

  if (game.thumbnailRef) {
    try {
      await deleteObject(game.thumbnailRef);
    } catch (error) {
      console.error(error);
      errorNotification({
        title: "Error",
        message: `Failed to delete ${game.title} thumbnail`,
      });
      return false;
    }
  }

  try {
    await deleteDoc(doc(db, "games", game.id));
  } catch (error) {
    console.error(error);
    errorNotification({
      title: "Error",
      message: `Failed to delete ${game.title}`,
    });
    return false;
  }

  successNotification({
    title: "Success",
    message: `Successfully deleted ${game.title}`,
  });

  return true;
}
