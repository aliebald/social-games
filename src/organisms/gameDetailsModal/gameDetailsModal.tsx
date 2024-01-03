"use client";

import styles from "./gameDetailsModal.module.css";
import Game from "@/types/game";
import { Group, Modal, Text, Title, Flex, Divider } from "@mantine/core";
import { IconWorld, IconPencil, IconTrash } from "@tabler/icons-react";
import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";
import PlayerCount from "@/atoms/playerCount/playerCount";
import Tags from "@/molecules/tags/tags";
import GameImageWithFallback from "@/atoms/gameImageWithFallback/gameImageWithFallback";
import ActionIconWithTooltip from "@/molecules/actionIconWithTooltip/actionIconWithTooltip";
import deleteGame from "@/networking/deleteGame";
import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";

interface GameDetailsModalProps {
  game: Game;
  canEdit: boolean;
  open: boolean;
  onClose: () => void;
}

export default function GameDetailsModal({
  game,
  canEdit,
  open,
  onClose,
}: GameDetailsModalProps) {
  const handleDeleteGame = async (game: Game) => {
    if (
      !window.confirm(
        `Do you really want to delete ${game.title}? This cannot be undone.`
      )
    ) {
      return;
    }

    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Deleting game",
      message: `Deleting ${game.title}`,
    });

    try {
      await deleteGame(game);
    } catch (error) {
      console.error(error);
      errorNotification({
        title: "Error",
        message: `Failed to delete ${game.title}`,
      });
      return;
    }

    successNotification({
      title: "Success",
      message: `Successfully deleted ${game.title}`,
    });

    onClose();
  };

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
          <Flex justify="space-between" gap="xs" wrap="wrap">
            <Title size="h1" order={3} fw={500}>
              {game.title}
            </Title>
            <Group gap="xs">
              {canEdit && (
                <ActionIconWithTooltip
                  tooltip={`Delete ${game.title}`}
                  onClick={() => handleDeleteGame(game)}
                  Icon={IconTrash}
                />
              )}
              {canEdit && (
                <LinkIconWithTooltip
                  href={`/games/edit/${game.id}`}
                  tooltip={`Edit ${game.title}`}
                  Icon={IconPencil}
                />
              )}
              <LinkIconWithTooltip
                href={game.websiteUrl}
                tooltip={`Go to ${game.title}`}
                Icon={IconWorld}
                openInNewTab
              />
            </Group>
          </Flex>
          <PlayerCount
            minPlayers={game.minPlayers}
            maxPlayers={game.maxPlayers}
          />
          <Tags tags={game.tags} pt={game.tags.length > 0 ? "sm" : undefined} />
          <Divider mt="sm" mb="md" color="dark.4" />
          <Text>{game.description}</Text>
          <Text fz="sm" pt="md" c="dimmed">
            Author: {game.authorName}
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
