"use client";

import GamesGrid from "@/organisms/gamesGrid/gamesGrid";
import { Container } from "@mantine/core";
import Game from "@/types/game";
import { useState } from "react";
import GameDetailsModal from "@/organisms/gameDetailsModal/gameDetailsModal";
import useGames from "@/networking/useGames";
import useUser from "@/networking/useUser";

export default function GamesPage() {
  const user = useUser();
  const games = useGames();

  // Keep last gameDetails for close animation of modal
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [gameDetailsOpen, setGameDetailsOpen] = useState(false);

  const openGameDetails = (game: Game) => {
    setGameDetails(game);
    setGameDetailsOpen(true);
  };

  return (
    <Container size={1920}>
      <GamesGrid games={games} openDetails={openGameDetails} />
      {gameDetails !== null && (
        <GameDetailsModal
          game={gameDetails}
          canEdit={
            user !== null && (user.admin || user.uid === gameDetails.authorUid)
          }
          open={gameDetailsOpen}
          onClose={() => setGameDetailsOpen(false)}
        />
      )}
    </Container>
  );
}
