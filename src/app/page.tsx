"use client";

import styles from "./page.module.css";
import Anchor from "@/atoms/anchor/anchor";
import useUser from "@/networking/useUser";
import { Container, Title, Text, List, Group } from "@mantine/core";
import { IconCheck, IconPlus } from "@tabler/icons-react";

export default function Home() {
  const user = useUser();

  const loginListItem = (
    <List.Item>
      <Group gap="xs">
        <Text td={user !== null ? "line-through" : undefined}>Login</Text>
        {user !== null && <IconCheck height={20} width={20} color="green" />}
      </Group>
    </List.Item>
  );

  return (
    <Container>
      <Title size="h1" order={1}>
        Social Games
      </Title>
      <Text pt="xs">
        This site collects and categorizes online social games.
      </Text>

      <Title size="h2" pt="xl">
        Looking for a game?
      </Title>
      <Text pt="xs">
        Take a look at the <Anchor href="/games">games</Anchor> section. Enter
        the desired player count, adjust selected tags and inspect the results.
      </Text>

      <Title size="h2" pt="xl">
        Contribute
      </Title>
      <Title size="h3" pt="xs">
        Adding a Game
      </Title>
      <Text pt="xs">
        The game you are looking for is not listed here? Contribute to the
        project by adding a game:
      </Text>

      <List type="ordered" withPadding pt="xs">
        {loginListItem}
        <List.Item>
          <Group gap={0}>
            Click the
            <IconPlus height={20} width={20} className={styles.icon} />
            icon in the header and select <i>Add Game</i>
          </Group>
        </List.Item>
        <List.Item>Enter game information and upload a thumbnail</List.Item>
        <List.Item>
          Click <i>Save</i>
        </List.Item>
      </List>

      <Title size="h3" pt="lg">
        Adding a Tag
      </Title>
      <Text pt="xs">
        Game attributes can be stored using custom tags. When searching for a
        game, these tags can be utilized as filters and provide useful
        information at a glance.
      </Text>
      <Text>
        If a game has an attribute that has not fitting tag, you can add your
        own tags as follows.
      </Text>

      <List type="ordered" withPadding pt="xs">
        {loginListItem}
        <List.Item>
          <Group gap={0}>
            Click the
            <IconPlus height={20} width={20} className={styles.icon} />
            icon in the header and select <i>Add Tag</i>
          </Group>
        </List.Item>
        <List.Item>Enter the tag information</List.Item>
        <List.Item>
          Click <i>Save</i>
        </List.Item>
        <List.Item>Use the tag in a new or existing game</List.Item>
      </List>
    </Container>
  );
}
