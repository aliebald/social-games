"use client";

import styles from "./gameDetailsModal.module.css";
import { Game } from "@/data/games";
import { Group, Modal, Text, Title, Divider } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";
import PlayerCount from "@/atoms/playerCount/playerCount";
import Tags from "@/molecules/tags/tags";
import GameImageWithFallback from "@/atoms/gameImageWithFallback/gameImageWithFallback";

interface GameDetailsModalProps {
  game: Game;
  open: boolean;
  onClose: () => void;
}

export default function GameDetailsModal({
  game,
  open,
  onClose,
}: GameDetailsModalProps) {
  return (
    <Modal.Root
      opened={open && game !== null}
      onClose={onClose}
      size="lg"
      className={styles.modal}
    >
      <Modal.Overlay backgroundOpacity={0.5} blur={2} />
      <Modal.Content>
        <Modal.CloseButton className={styles.closeBtn} variant="outlined" />
        <GameImageWithFallback game={game} height={200} />
        <Modal.Body pt="md">
          <Group justify="space-between" gap="xs" wrap="wrap">
            <Title size="h1" order={3} fw={500}>
              {game.title}
            </Title>
            <LinkIconWithTooltip
              href={game.websiteUrl}
              tooltip={`Go to ${game.title}`}
              Icon={IconWorld}
              openInNewTab
            />
          </Group>
          <PlayerCount
            minPlayers={game.minPlayers}
            maxPlayers={game.maxPlayers}
          />
          <Tags tags={game.tags} pt={game.tags.length > 0 ? "sm" : undefined} />
          <Divider mt="sm" mb="md" color="dark.4" />
          <Text>{game.description}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
