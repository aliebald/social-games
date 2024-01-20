"use client";

import GamesGrid from "@/organisms/gamesGrid/gamesGrid";
import { Container } from "@mantine/core";
import Game from "@/types/game";
import { useCallback, useState } from "react";
import GameDetailsModal from "@/organisms/gameDetailsModal/gameDetailsModal";
import useGames from "@/networking/useGames";
import useUser from "@/networking/useUser";
import GamesFilter from "@/molecules/gamesFilter/gamesFilter";

export default function GamesPage() {
  const user = useUser();
  const games = useGames();

  // Keep last gameDetails for close animation of modal
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [gameDetailsOpen, setGameDetailsOpen] = useState(false);

  const openGameDetails = useCallback((game: Game) => {
    setGameDetails(game);
    setGameDetailsOpen(true);
  }, []);

  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  return (
    <Container size={1920}>
      <GamesFilter games={games} setFilteredGames={setFilteredGames} />
      <GamesGrid games={filteredGames} openDetails={openGameDetails} />
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
