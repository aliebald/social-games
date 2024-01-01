import styles from "./gameDetailsModal.module.css";
import Game from "@/types/game";
import { Group, Modal, Text, Title, Flex, Divider } from "@mantine/core";
import { IconWorld, IconPencil } from "@tabler/icons-react";
import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";
import PlayerCount from "@/atoms/playerCount/playerCount";
import Tags from "@/molecules/tags/tags";
import GameImageWithFallback from "@/atoms/gameImageWithFallback/gameImageWithFallback";

interface GameDetailsModalProps {
  game: Game;
  canEdit: boolean;
  open: boolean;
  close: () => void;
}

export default function GameDetailsModal({
  game,
  canEdit,
  open,
  close,
}: GameDetailsModalProps) {
  return (
    <Modal.Root
      opened={open && game !== null}
      onClose={close}
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
          <Divider my="sm" color="dark.4" />
          <Text fz="sm">{game.description}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
