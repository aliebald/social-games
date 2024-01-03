import { db, storage } from "@/firebase";
import {
  DocumentReference,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getBlob,
  getMetadata,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { isArray, omit } from "lodash";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportDb() {
  console.group("Exporting DB");
  const tagsSnapshot = await getDocs(collection(db, "tags"));
  const tags = tagsSnapshot.docs.map((tagSnapshot) => ({
    id: tagSnapshot.id,
    ...tagSnapshot.data(),
  }));

  const gamesSnapshot = await getDocs(collection(db, "games"));
  const games = gamesSnapshot.docs.map((gameSnapshot) => {
    const data = gameSnapshot.data();
    return {
      ...omit(data, "tags"),
      id: gameSnapshot.id,
      thumbnailPath: data.thumbnailPath ?? null,
      tagIds: data.tags.map((tag: DocumentReference) => tag.id),
    };
  });

  const jsonData = { tags, games };
  console.log("jsonData", jsonData);

  const zip = new JSZip();
  const storageFolder = zip.folder("storage");
  zip.file("data.json", JSON.stringify(jsonData));

  await Promise.all(
    games.map(async (game) => {
      if (game.thumbnailPath === null) return;
      const thumbnailRef = storageRef(storage, game.thumbnailPath);
      console.log(`Download thumbnail: ${thumbnailRef}`);

      const imgMeta = await getMetadata(thumbnailRef);
      const blob = await getBlob(thumbnailRef);

      storageFolder?.file(game.thumbnailPath, blob, {
        comment: JSON.stringify(imgMeta),
      });
    })
  );

  console.groupEnd();

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `Backup-${new Date().getTime()}`);
  });
}

export async function importDb(file: File | null) {
  if (file === null) return;

  const zip = await JSZip.loadAsync(file);
  console.log("Got archive:", zip);

  const rawJsonData = await zip.file("data.json")?.async("string");
  if (rawJsonData === undefined) {
    throw new Error("Did not find data.json in zip");
  }

  const { tags, games } = JSON.parse(rawJsonData);
  console.log("tags", tags);
  console.log("games", games);

  if (tags === undefined) throw new Error("Did not find tags in data.json");
  if (games === undefined) throw new Error("Did not find games in data.json");
  if (!isArray(tags)) throw new Error("tags data must be an array");
  if (!isArray(games)) throw new Error("games data must be an array");

  const thumbnails = await getAllFilesInSubdirectory(zip, "storage");
  console.log("thumbnails", thumbnails);

  if (
    !confirm(
      `Do you want to import ${games.length} games, ${tags.length} tags and ${thumbnails.length} thumbnails? This may override existing data`
    )
  ) {
    return;
  }

  console.group("Adding tags");
  await Promise.all(
    tags.map(async ({ id, ...tag }) => {
      console.log(`Setting tag: "${tag.title}" (${id})`);
      setDoc(doc(db, "tags", id), tag);
    })
  );
  console.groupEnd();

  console.group("Adding games");
  await Promise.all(
    games.map(async ({ id, ...rawGame }) => {
      console.log(`Setting game: "${rawGame.title}" (${id})`);
      const gameData = {
        ...rawGame,
        tags: rawGame.tagIds.map((tagId: string) => doc(db, `tags/${tagId}`)),
      };
      await setDoc(doc(db, "games", id), gameData);
    })
  );
  console.groupEnd();

  console.group("Uploading thumbnails");
  const storagePrefixLength = "storage/".length;
  await Promise.all(
    thumbnails.map(async ({ file, fileData }) => {
      const filePath = file.name.substring(storagePrefixLength);
      console.log(`Uploading thumbnail: "${filePath}"`);

      const thumbnailRef = storageRef(storage, filePath);
      const metadata = JSON.parse(file.comment);
      await uploadBytes(thumbnailRef, fileData, metadata);
    })
  );
  console.groupEnd();

  console.log("%cCompleted import", "color:green");
}

async function getAllFilesInSubdirectory(zip: JSZip, subdirectory: string) {
  const paths = Object.keys(zip.files).filter((path) =>
    path.startsWith(subdirectory)
  );
  const files = paths
    .map((path) => zip.files[path])
    .filter((file) => !file.dir);
  return Promise.all(
    files.map(async (file) => ({
      file,
      fileData: await file.async("blob"),
    }))
  );
}
