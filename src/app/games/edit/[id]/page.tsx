"use client";

import GameForm, { GameFormValues } from "@/organisms/gameForm/gameForm";
import { Container, LoadingOverlay, Title, Text, Divider } from "@mantine/core";
import styles from "./page.module.css";
import updateGame from "@/networking/updateGame";
import useGame from "@/networking/useGame";
import { useMemo } from "react";
import { parseGameToGameFormValues } from "@/organisms/gameForm/util";

interface EditGamePageProps {
  params: { id: string };
}

export default function EditGamePage({ params }: EditGamePageProps) {
  const game = useGame(params.id);
  const gameFormValues = useMemo(
    () => (game ? parseGameToGameFormValues(game) : null),
    [game]
  );

  const onSubmit = async (game: GameFormValues) => {
    await updateGame(params.id, game);
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
        <GameForm initialValues={gameFormValues} onSubmit={onSubmit} />
      </Container>
    </>
  );
}
