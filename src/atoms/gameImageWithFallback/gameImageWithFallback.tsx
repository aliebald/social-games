import styles from "./gameImageWithFallback.module.css";
import Game from "@/types/game";
import { Center, Image, Title } from "@mantine/core";

interface GameImageWithFallbackProps {
  game: Game;
  height: number;
}

export default function GameImageWithFallback({
  game,
  height,
}: GameImageWithFallbackProps) {
  if (game.thumbnailUrl !== null) {
    return (
      <Image
        src={game.thumbnailUrl}
        alt={game.title}
        fallbackSrc={`https://placehold.co/300x200/25262b/c1c2c5?text=${game.title}`}
        height={height}
      />
    );
  }

  return (
    <Center w="100%" h={height} className={styles.noImageContainer}>
      <Title order={2} size="h1">
        {game.title}
      </Title>
    </Center>
  );
}
