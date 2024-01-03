import { db } from "@/firebase";
import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import Tag from "@/types/tag";
import {
  DocumentReference,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { User } from "./useUser";

export default async function deleteTag(tag: Tag, user: User): Promise<void> {
  const { successNotification, errorNotification } = showLoadingNotification({
    title: "Deleting tag",
    message: `Deleting ${tag.title}`,
  });

  try {
    await removeTagFromAllGames(tag, user);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : null;

    errorNotification({
      title: "Error",
      message: `Failed to remove ${tag.title} from assigned games${
        errorMessage !== null ? `: ${errorMessage}` : ""
      }`,
    });
    return;
  }

  console.log(`Deleting tag: "${tag.title}" (${tag.id})`);
  try {
    await deleteDoc(doc(db, "tags", tag.id));
  } catch (error) {
    console.error(error);
    errorNotification({
      title: "Error",
      message: `Failed to delete ${tag.title}`,
    });
    return;
  }

  successNotification({
    title: "Success",
    message: `Successfully deleted ${tag.title}`,
  });
}

async function removeTagFromAllGames(tag: Tag, user: User) {
  const tagRef = doc(db, `tags/${tag.id}`);
  const gamesNotByRequestAuthorQuery = query(
    collection(db, "games"),
    where("authorUid", "!=", user.uid),
    where("tags", "array-contains", tagRef)
  );
  const gamesByRequestAuthorQuery = query(
    collection(db, "games"),
    where("authorUid", "==", user.uid),
    where("tags", "array-contains", tagRef)
  );

  await runTransaction(db, async (transaction) => {
    // Query games with tag
    const gamesNotByRequestAuthor = await getDocs(gamesNotByRequestAuthorQuery);

    if (!user.admin && gamesNotByRequestAuthor.docs.length > 0) {
      throw new Error(
        "Cannot delete tag. Tag is still used in games from different authors."
      );
    }
    const gamesByRequestAuthor = await getDocs(gamesByRequestAuthorQuery);

    // Remove tag from queried games
    const games = [
      ...gamesNotByRequestAuthor.docs,
      ...gamesByRequestAuthor.docs,
    ];
    const updatePromises = games.map(async (gameSnapshot) => {
      const gameDoc = await transaction.get(gameSnapshot.ref);
      if (!gameDoc.exists()) {
        throw new Error("Document does not exist");
      }
      const gameData = gameDoc.data();
      console.log(
        `Removing "${tag.title}" from "${gameData.title}" (${gameDoc.id})`
      );

      const newTags = gameData.tags.filter(
        (tagRef: DocumentReference) => tagRef.id !== tag.id
      );
      transaction.update(gameSnapshot.ref, { tags: newTags });
    });
    await Promise.allSettled(updatePromises);
  });
}
