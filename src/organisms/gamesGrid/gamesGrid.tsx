import GameCard from "@/molecules/gameCard/gameCard";
import { Game } from "@/data/games";
import { SimpleGrid } from "@mantine/core";
import { useCallback } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { spring } from "react-flip-toolkit";

const onAppear = (element: HTMLElement, index: number) =>
  spring({
    onUpdate: (value) => {
      element.style.opacity = String(value);
    },
    delay: index * 40,
  });

const onExit = (
  element: HTMLElement,
  index: number,
  removeElement: () => void
) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (value) => {
      element.style.zIndex = "-1";
      element.style.transform = `scale(${1 - (value as unknown as number)})`;
      element.style.opacity = String(value);
    },
    onComplete: removeElement,
  });
  return () => {
    element.style.zIndex = "";
    element.style.transform = "";
    element.style.opacity = "";
    removeElement();
  };
};

interface GamesGridProps {
  games: Game[];
  openDetails: (game: Game) => void;
}

export default function GamesGrid({ games, openDetails }: GamesGridProps) {
  return (
    <Flipper flipKey={games.map((game) => game.id).join()} spring="noWobble">
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 4, lg: 5, xl: 6 }}
        spacing={{ base: "xs", sm: "md" }}
      >
        {games.map((game) => (
          <FlippedGameCard
            key={game.id}
            game={game}
            openDetails={openDetails}
          />
        ))}
      </SimpleGrid>
    </Flipper>
  );
}

interface FlippedGameCardProps {
  game: Game;
  openDetails: (game: Game) => void;
}

function FlippedGameCard({ game, openDetails }: FlippedGameCardProps) {
  const openDetailsForGame = useCallback(
    () => openDetails(game),
    [game, openDetails]
  );
  return (
    <Flipped flipId={game.id} onAppear={onAppear} onExit={onExit}>
      {(flippedProps) => (
        <GameCard
          game={game}
          openDetails={openDetailsForGame}
          {...flippedProps}
        />
      )}
    </Flipped>
  );
}
