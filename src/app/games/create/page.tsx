"use client";

import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import addGame from "@/networking/addGame";
import GameForm, { GameFormValues } from "@/organisms/gameForm/gameForm";
import { Container, Title, Text, Divider } from "@mantine/core";

export default function CreateGamePage() {
  const onSubmit = async (gameFormValues: GameFormValues) => {
    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Saving Game",
      message: `Saving ${gameFormValues.title}`,
    });

    try {
      await addGame(gameFormValues);
    } catch (error) {
      console.error("Failed to add game. Error:", error);
      errorNotification({
        title: "Error",
        message: `Failed to create ${gameFormValues.title}`,
      });
      return;
    }

    successNotification({
      title: "Success",
      message: `Successfully saved ${gameFormValues.title}`,
    });
  };

  return (
    <Container>
      <Title pb="sm">New Game</Title>
      <Text>Add a new game to the collection.</Text>
      <Divider my="md" />
      <GameForm onSubmit={onSubmit} />
    </Container>
  );
}
