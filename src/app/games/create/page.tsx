"use client";

import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import addGame from "@/networking/addGame";
import useUser from "@/networking/useUser";
import GameForm, { GameFormValues } from "@/organisms/gameForm/gameForm";
import { Container, Title, Text, Divider } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function CreateGamePage() {
  const router = useRouter();
  const user = useUser();

  const onSubmit = async (gameFormValues: GameFormValues) => {
    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Saving game",
      message: `Saving ${gameFormValues.title}`,
    });

    if (user === null) {
      errorNotification({
        title: "Error",
        message: `Failed to create ${gameFormValues.title}, please log in and try again.`,
      });
      return;
    }

    try {
      const gameId = await addGame(gameFormValues, user.uid);
      successNotification({
        title: "Success",
        message: `Successfully saved ${gameFormValues.title}`,
      });
      router.push(`/games/edit/${gameId}`);
    } catch (error) {
      console.error("Failed to add game. Error:", error);
      errorNotification({
        title: "Error",
        message: `Failed to create ${gameFormValues.title}`,
      });
      return;
    }
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
