"use client";

import styles from "./gameCard.module.css";
import Game from "@/types/game";
import { Card, Image, Text } from "@mantine/core";
import React from "react";

interface GameCardProps {
  game: Game;
  openDetails: () => void;
}

export default function GameCard({ game, openDetails }: GameCardProps) {
  return (
    <Card withBorder radius="md" p="md">
      <Card.Section onClick={openDetails} className={styles.clickable}>
        <Image
          src={game.image}
          alt={game.title}
          fallbackSrc={`https://placehold.co/300x200?text=${game.title}`}
          height={180}
        />
      </Card.Section>
      <Card.Section p="xs">
        <Text
          fz="lg"
          fw={500}
          truncate="end"
          onClick={openDetails}
          className={styles.clickable}
        >
          {game.title}
        </Text>
        <Text fz="sm" mt="xs" lineClamp={3}>
          {game.description}
        </Text>
      </Card.Section>
    </Card>
  );
}
