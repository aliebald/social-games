"use client";

import GameForm, { GameFormValues } from "@/organisms/gameForm/gameForm";
import { Container, LoadingOverlay, Title, Text, Divider } from "@mantine/core";
import styles from "./page.module.css";
import updateGame from "@/networking/updateGame";
import useGame from "@/networking/useGame";
import { useEffect, useState } from "react";
import { parseGameToGameFormValues } from "@/organisms/gameForm/util";
import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import { useDelayedRedirectIfNotLoggedIn } from "@/util";

interface EditGamePageProps {
  params: { id: string };
}

export default function EditGamePage({ params }: EditGamePageProps) {
  const game = useGame(params.id);
  const [initialGameFormValues, setInitialGameFormValues] =
    useState<GameFormValues | null>(null);

  useEffect(() => {
    if (game === null) return;
    setInitialGameFormValues(parseGameToGameFormValues(game));
  }, [game]);

  useDelayedRedirectIfNotLoggedIn();

  const onSubmit = async (gameFormValues: GameFormValues) => {
    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Updating game",
      message: `Updating ${gameFormValues.title}`,
    });

    if (game === null) {
      errorNotification({
        title: "Error",
        message: `Failed to update ${gameFormValues.title}. The game was not found.`,
      });
      return;
    }

    try {
      await updateGame(params.id, gameFormValues, game);
    } catch (error) {
      console.error("Failed to update game. Error:", error);
      errorNotification({
        title: "Error",
        message: `Failed to update ${gameFormValues.title}`,
      });
      return;
    }

    successNotification({
      title: "Success",
      message: `Successfully updated ${gameFormValues.title}`,
    });
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
        <GameForm initialValues={initialGameFormValues} onSubmit={onSubmit} />
      </Container>
    </>
  );
}
