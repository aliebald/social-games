import styles from "./gameDetailsModal.module.css";
import Game from "@/types/game";
import { Group, Image, Modal, Text, Title } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";

interface GameDetailsModalProps {
  game: Game;
  open: boolean;
  close: () => void;
}

export default function GameDetailsModal({
  game,
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
          <Group justify="space-between" gap={0}>
            <Title size="h2" fw={500}>
              {game.title}
            </Title>
            <LinkIconWithTooltip
              href={game.url}
              tooltip={`Go to ${game.title}`}
              Icon={IconWorld}
              openInNewTab
            />
          </Group>

          <Text fz="sm" mt="xs">
            {game.description}
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
