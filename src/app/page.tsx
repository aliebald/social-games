"use client";

import styles from "./page.module.css";
import Anchor from "@/atoms/anchor/anchor";
import useUser, { User } from "@/networking/useUser";
import { Container, Title, Text, List, Group, Tooltip } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconPlus } from "@tabler/icons-react";

export default function Home() {
  const user = useUser();

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
      <Text pt="xs">
        You can contribute more games and tags to the collection.
      </Text>

      <Group gap="xs" pt="lg">
        <Title size="h3">Prerequisites</Title>
        <Tooltip
          label={`The prerequisites are ${
            user?.member || user?.admin ? "" : "not "
          }fulfilled`}
        >
          {user?.member || user?.admin ? (
            <IconCheck height={22} width={22} color="green" />
          ) : (
            <IconAlertCircle height={22} width={22} color="red" />
          )}
        </Tooltip>
      </Group>
      <Text pt="xs">
        Only logged in users with the <i>member</i> role can contribute.
        {" " + getMemberRoleText(user)}
      </Text>

      <Title size="h3" pt="lg">
        Adding a Game
      </Title>
      <Text pt="xs">
        The game you are looking for is not listed here? Contribute to the
        project by adding a game:
      </Text>

      <List type="ordered" withPadding pt="xs">
        <List.Item>
          <Group gap={0}>
            Click the
            <IconPlus height={20} width={20} className={styles.icon} />
            icon in the header and select&nbsp;<i>Add Game</i>
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
        <List.Item>
          <Group gap={0}>
            Click the
            <IconPlus height={20} width={20} className={styles.icon} />
            icon in the header and select&nbsp;<i>Add Tag</i>
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

function getMemberRoleText(user: User | null) {
  if (user === null) {
    return "Login to check if you have the member role.";
  }
  if (user.member) {
    return "You already have the member role.";
  }
  if (user.admin) {
    return "You have the admin role, which includes member permissions.";
  }
  return "Contact an administrator to receive the role.";
}
