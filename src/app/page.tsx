"use client";

import GamesGrid from "@/organisms/gamesGrid/gamesGrid";
import { Container } from "@mantine/core";
import { Game, games } from "@/data/games";
import { useCallback, useState } from "react";
import GameDetailsModal from "@/organisms/gameDetailsModal/gameDetailsModal";
import GamesFilter from "@/molecules/gamesFilter/gamesFilter";

export default function GamesPage() {
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
          open={gameDetailsOpen}
          onClose={() => setGameDetailsOpen(false)}
        />
      )}
    </Container>
  );
}
