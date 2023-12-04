"use client";

import { Container, Title, Text, Button } from "@mantine/core";
import styles from "./page.module.css";
import Anchor from "@/atoms/anchor/anchor";
import { testGames, testTags } from "@/testData";
import addGame from "@/newtorking/addGame";
import addTag from "@/newtorking/addTag";
import fetchTags from "@/newtorking/fetchTags";
import { getRandomArrayElements } from "@/util";
import fetchGames from "@/newtorking/fetchGames";
import deleteGame from "@/newtorking/deleteGame";
import deleteTag from "@/newtorking/deleteTag";

export default function Home() {
  const addTestdata = async () => {
    console.log("Adding Testdata to database...");

    await Promise.all(testTags.map(async (tag) => (await addTag(tag)).id));
    const tags = await fetchTags();
    console.log("tags", tags);

    await Promise.all(
      testGames.map((game) =>
        addGame({ ...game, tags: getRandomArrayElements(tags) })
      )
    );
    console.log("Successfully added testdata");
  };

  // Temporary
  const deleteDb = async () => {
    console.group("Delete DB");

    const games = await fetchGames();
    await Promise.all(games.map((game) => deleteGame(game.id)));

    const tags = await fetchTags();
    await Promise.all(tags.map((tags) => deleteTag(tags.id)));

    console.log("Successfully deleted DB");
    console.groupEnd();
  };

  return (
    <Container>
      <Title size="h1" order={1}>
        Social Games Finder
      </Title>
      <Text pt="md">
        This website provides a collection of various mostly free social games.
      </Text>

      <Title size="h1" order={2} pt="xl">
        Features
      </Title>
      <Text pt="md">
        This site is still in early development. At the moment, you can view a
        games list <Anchor href="/games/list">here</Anchor>
      </Text>
      <Title size="h2" order={2} pt="xl" pb="md">
        Danger Zone
      </Title>
      <Button onClick={addTestdata}>Add Testdata</Button>
      <Button ml="md" onClick={deleteDb} color="red">
        Delete DB
      </Button>
    </Container>
  );
}
