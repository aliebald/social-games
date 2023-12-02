"use client";

import GameForm, { GameFormValues } from "@/organisms/gameForm/gameForm";
import { testData } from "@/testData";
import { Container, LoadingOverlay, Title, Text, Divider } from "@mantine/core";
import styles from "./page.module.css";
import Game from "@/types/game";

interface EditGamePageProps {
  params: { id: string };
}

export default function EditGamePage({ params }: EditGamePageProps) {
  const game = testData.find((game) => game.id === params.id);

  const onSubmit = (game: Game | GameFormValues) => {
    console.log(game);
  };

  return (
    <>
      <Container>
        <LoadingOverlay
          visible={game === undefined}
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
