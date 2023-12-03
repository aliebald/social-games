import Game from "@/types/game";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const defaultGame: Omit<Game, "id"> = {
  title: "",
  description: "",
  websiteUrl: "",
  image: "",
};

export default function parseGame(
  backendData: QueryDocumentSnapshot<DocumentData, DocumentData>
): Game {
  return {
    ...defaultGame,
    ...backendData.data(),
    id: backendData.id,
  };
}
