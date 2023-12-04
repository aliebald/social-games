"use client";

import addGame from "@/networking/addGame";
import GameForm from "@/organisms/gameForm/gameForm";
import Game, { GameWithoutId } from "@/types/game";
import { Container, Title, Text, Divider } from "@mantine/core";

export default function CreateGamePage() {
  const onSubmit = async (game: Game | GameWithoutId) => {
    await addGame(game);
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
