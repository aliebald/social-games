import { Container, Title, Text } from "@mantine/core";
import styles from "./page.module.css";
import Anchor from "@/atoms/anchor/anchor";

export default function Home() {
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
    </Container>
  );
}
