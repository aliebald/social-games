import styles from "./gameDetailsModal.module.css";
import Game from "@/types/game";
import { Group, Image, Modal, Text, Title, Flex, Divider } from "@mantine/core";
import { IconWorld, IconPencil } from "@tabler/icons-react";
import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";
import PlayerCount from "@/atoms/playerCount/playerCount";
import Tags from "@/molecules/tags/tags";

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
        <Image
          src={game.image}
          alt={game.title}
          fallbackSrc={`https://placehold.co/300x200?text=${game.title}`}
          height={200}
          className={styles.img}
        />
        <Modal.Body pt="md">
          <Flex justify="space-between" gap="xs" wrap="wrap">
            <Title size="h1" fw={500}>
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
          <Tags tags={game.tags} pt="sm" />
          <Divider my="sm" />
          <Text fz="sm">{game.description}</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
