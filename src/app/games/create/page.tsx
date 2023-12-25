"use client";

import addGame from "@/networking/addGame";
import GameForm from "@/organisms/gameForm/gameForm";
import { Container, Title, Text, Divider } from "@mantine/core";

export default function CreateGamePage() {
  return (
    <Container>
      <Title pb="sm">New Game</Title>
      <Text>Add a new game to the collection.</Text>
      <Divider my="md" />
      <GameForm onSubmit={addGame} />
    </Container>
  );
}
