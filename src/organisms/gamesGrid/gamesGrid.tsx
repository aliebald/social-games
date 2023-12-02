import GameCard from "@/molecules/gameCard/gameCard";
import Game from "@/types/game";
import { SimpleGrid } from "@mantine/core";
import { useMemo } from "react";

interface GamesGridProps {
  games: Game[];
  openDetails: (game: Game) => void;
}

export default function GamesGrid({ games, openDetails }: GamesGridProps) {
  const items = useMemo(
    () =>
      games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          openDetails={() => openDetails(game)}
        />
      )),
    [games, openDetails]
  );

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 4, lg: 5, xl: 6 }}
      spacing={{ base: "xs", sm: "md" }}
    >
      {items}
    </SimpleGrid>
  );
}
