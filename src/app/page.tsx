import styles from "./page.module.css";
import Image from "@/atoms/image/image";
import LinkButton from "@/atoms/linkButton/linkButton";
import HomePageAccordion from "@/organisms/homePageAccordion/homePageAccordion";
import { Container, Title, Text, Stack } from "@mantine/core";

export default function Home() {
  return (
    <Container pb="lg">
      <div className={styles.mainHero}>
        <Title order={1} className={styles.heroTitle}>
          Social Games
        </Title>
        <Text pt="xs">
          A dynamic collection of online multiplayer social games.
          <br />
          Find a game to play by searching for specific tags or filtering by
          player count.
        </Text>
        <LinkButton size="lg" mt="lg" href="/games">
          Discover Games
        </LinkButton>
      </div>

      <div className={styles.secondaryHero}>
        <Stack gap={0}>
          <Title order={2} className={styles.secondaryHeroTitle}>
            Games
          </Title>
          <Text pt="xs">
            Games are easily recognizable through thumbnails. Discovery of new
            games is made easy thanks to baked in player limits and other
            attributes and customizable tags. Scroll through the full list or
            filter it to fit your group&apos;s preferences.
          </Text>
          <Text pt="xs">
            Once a game is found, click the globe icon to leave social games and
            open the games&apos; website.
          </Text>
        </Stack>

        <Image src="/games.jpg" width={500} height={300} alt="games" />
      </div>

      <div className={styles.secondaryHero}>
        <Image
          src="/tags.jpg"
          width={500}
          height={300}
          alt="tags"
          className={styles.imgReverseOrderOnSmallViewport}
        />

        <Stack gap={0}>
          <Title order={2} className={styles.secondaryHeroTitle}>
            Tags
          </Title>
          <Text pt="xs">
            Tags represent an attribute that can be mapped to a game. They are
            used to differentiate games and provide a quick overview over the
            key features of a game.
          </Text>
          <Text pt="xs">
            Tags consist of a short title, a color to differentiate tags, and a
            description that is accessible in a tooltip when hovering over tags.
          </Text>
        </Stack>
      </div>

      <div className={styles.secondaryHero}>
        <Stack gap={0}>
          <Title order={2} className={styles.secondaryHeroTitle}>
            Contribute
          </Title>
          <Text pt="xs">
            Missing a game in the collection? That&apos;s where you come in! You
            can contribute more games and tags to the collection. For that, you
            have to log in and receive the necessary role from an administrator.
            See prerequisites bellow for more details.
          </Text>
        </Stack>

        <Image src="/game-form.jpg" width={500} height={300} alt="game form" />
      </div>

      <HomePageAccordion />
    </Container>
  );
}
