"use client";

import GamesGrid from "@/organisms/gamesGrid/gamesGrid";
import { testData } from "../../testData";
import { Container } from "@mantine/core";
import Game from "@/types/game";
import { useState } from "react";
import GameDetailsModal from "@/organisms/gameDetailsModal/gameDetailsModal";

export default function GamesPage() {
  // Keep last gameDetails for close animation of modal
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [gameDetailsOpen, setGameDetailsOpen] = useState(false);

  const openGameDetails = (game: Game) => {
    setGameDetails(game);
    setGameDetailsOpen(true);
  };

  const data = [...testData, ...testData, ...testData].map((g, i) => ({
    ...g,
    id: `00${i}`,
  }));

  return (
    <Container size={1920}>
      <GamesGrid games={data} openDetails={openGameDetails} />
      {gameDetails !== null && (
        <GameDetailsModal
          game={gameDetails}
          open={gameDetailsOpen}
          close={() => setGameDetailsOpen(false)}
        />
      )}
    </Container>
  );
}
