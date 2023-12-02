import styles from "./gameDetailsModal.module.css";
import Game from "@/types/game";
import { Image, Modal, Text, Title } from "@mantine/core";

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
      size="xl"
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
          <Title size="h2" fw={500}>
            {game.title}
          </Title>
          <Text fz="sm" mt="xs">
            {game.description}
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
