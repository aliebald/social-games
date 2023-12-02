"use client";

import GameForm, { GameFormValues } from "@/organisms/gameForm/gameForm";
import Game from "@/types/game";
import { Container, Title, Text, Divider } from "@mantine/core";

export default function CreateGamePage() {
  const onSubmit = (game: Game | GameFormValues) => {
    console.log(game);
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
