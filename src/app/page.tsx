import { Container, Title, Text } from "@mantine/core";

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
      <Text pt="md">This site is still in development.</Text>
    </Container>
  );
}
