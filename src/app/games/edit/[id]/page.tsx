"use client";

import GameForm from "@/organisms/gameForm/gameForm";
import { Container, LoadingOverlay, Title, Text, Divider } from "@mantine/core";
import styles from "./page.module.css";
import Game, { GameWithoutId } from "@/types/game";
import updateGame from "@/newtorking/updateGame";
import useGame from "@/newtorking/useGame";

interface EditGamePageProps {
  params: { id: string };
}

export default function EditGamePage({ params }: EditGamePageProps) {
  const game = useGame(params.id);

  const onSubmit = async (game: Game | GameWithoutId) => {
    console.log(game);
    if (!("id" in game)) {
      // Should not happen, remove when GameForm typing is better
      throw new Error("Missing id in game - TODO: improve type");
    }

    await updateGame(game);
  };

  return (
    <>
      <Container>
        <LoadingOverlay
          visible={game === null}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          className={styles.overlay}
        />
        <Title pb="sm">Edit {game?.title}</Title>
        <Text>Edit an existing title.</Text>
        <Divider my="md" />
        <GameForm initialValues={game} onSubmit={onSubmit} />
      </Container>
    </>
  );
}
