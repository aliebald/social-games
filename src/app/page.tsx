"use client";

import { Container, Title, Text, Button } from "@mantine/core";
import styles from "./page.module.css";
import Anchor from "@/atoms/anchor/anchor";
import { testData } from "@/testData";
import addGame from "@/newtorking/addGame";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import parseGame from "@/newtorking/game";

export default function Home() {
  const addTestdata = async () => {
    console.log("Adding Testdata to database...");
    await Promise.all(testData.map((game) => addGame(game)));
    console.log("Successfully added testdata");
  };

  // Temporary
  const deleteDb = async () => {
    console.log("Fetch games");
    await getDocs(collection(db, "games")).then(async (querySnapshot) => {
      const newData = querySnapshot.docs.map(parseGame);
      console.log(
        "Fetched games - now deleting:",
        newData.map((g) => g.id)
      );
      await Promise.all(
        newData.map((game) => deleteDoc(doc(db, "games", game.id)))
      );
      console.log("deleted all documents");
    });
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
