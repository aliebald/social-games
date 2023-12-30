import Game, { BackendGame, BackendGameWithoutId } from "@/types/game";
import { GameFormValues } from "./gameForm";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import { UploadResult } from "firebase/storage";
import { pick } from "lodash";

export function parseGameToGameFormValues(game: Game): GameFormValues {
  return {
    ...pick(
      game,
      "title",
      "description",
      "websiteUrl",
      "minPlayers",
      "maxPlayers"
    ),
    tags: game.tags.map((tag) => tag.id),
    newThumbnail: null,
    existingThumbnailName: game.thumbnailRef?.name ?? null,
    existingThumbnailPath: game.thumbnailRef?.fullPath ?? null,
    existingThumbnailUrl: game.thumbnailUrl,
  };
}

export function parseGameFormValuesToBackendFormat(
  gameFormValues: GameFormValues,
  author_uid: string,
  thumbnail?: UploadResult
) {
  return {
    ...pick(
      gameFormValues,
      "title",
      "description",
      "websiteUrl",
      "minPlayers",
      "maxPlayers"
    ),
    author_uid,
    tags: gameFormValues.tags.map((tagId) => doc(db, `tags/${tagId}`)),
    thumbnailPath:
      thumbnail?.ref.fullPath ?? gameFormValues.existingThumbnailPath,
  } satisfies BackendGame | BackendGameWithoutId;
}
