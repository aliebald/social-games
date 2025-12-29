"use client";

import styles from "./gameCard.module.css";
import { Game } from "@/data/games";
import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { ForwardedRef, forwardRef, memo } from "react";
import PlayerCount from "@/atoms/playerCount/playerCount";
import Tags from "../tags/tags";
import GameImageWithFallback from "@/atoms/gameImageWithFallback/gameImageWithFallback";

interface GameCardProps {
  game: Game;
  openDetails: () => void;
}

function GameCard(
  { game, openDetails, ...domProps }: GameCardProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  // Note that `domProps` are required for react-flip-toolkit.
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      ref={ref}
      onClick={openDetails}
      className={styles.clickable}
      {...domProps}
    >
      <Card.Section>
        <GameImageWithFallback game={game} height={180} />
      </Card.Section>
      <Card.Section p="xs">
        <Group justify="space-between" gap={0}>
          <Text fz="lg" fw={500} truncate="end">
            {game.title}
          </Text>
          <ActionIcon
            variant="light"
            component="a"
            href={game.websiteUrl}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
          >
            <IconWorld style={{ width: "75%", height: "75%" }} />
          </ActionIcon>
        </Group>
        <PlayerCount
          size="xs"
          minPlayers={game.minPlayers}
          maxPlayers={game.maxPlayers}
        />
        <Tags
          tags={game.tags}
          size="xs"
          pt={game.tags.length > 0 ? "xs" : undefined}
          pb={"xs"}
        />
        <Text fz="sm" lineClamp={3}>
          {game.description}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default memo(forwardRef(GameCard));
