"use client";

import styles from "./gameCard.module.css";
import Game from "@/types/game";
import { Card, Group, Text } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import React from "react";
import LinkIconWithTooltip from "../linkIconWithTooltip/linkIconWithTooltip";
import PlayerCount from "@/atoms/playerCount/playerCount";
import Tags from "../tags/tags";
import GameImageWithFallback from "@/atoms/gameImageWithFallback/gameImageWithFallback";

interface GameCardProps {
  game: Game;
  openDetails: () => void;
}

export default function GameCard({ game, openDetails }: GameCardProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Card.Section onClick={openDetails} className={styles.clickable}>
        <GameImageWithFallback game={game} height={180} />
      </Card.Section>
      <Card.Section p="xs">
        <Group justify="space-between" gap={0}>
          <Text
            fz="lg"
            fw={500}
            truncate="end"
            onClick={openDetails}
            className={styles.clickable}
          >
            {game.title}
          </Text>
          <LinkIconWithTooltip
            tooltip={`Go to ${game.title}`}
            href={game.websiteUrl}
            Icon={IconWorld}
            openInNewTab
          />
        </Group>
        <PlayerCount
          size="xs"
          minPlayers={game.minPlayers}
          maxPlayers={game.maxPlayers}
        />
        <Tags tags={game.tags} size="xs" my="xs" />
        <Text fz="sm" lineClamp={3}>
          {game.description}
        </Text>
      </Card.Section>
    </Card>
  );
}
