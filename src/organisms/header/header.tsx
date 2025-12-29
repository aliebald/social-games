import { Container, Text, Title } from "@mantine/core";
import styles from "./header.module.css";
import classNames from "classnames";
import Anchor from "@/atoms/anchor/anchor";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={classNames(styles.outerWrapper, className)}>
      <Container size="md" className={styles.headerContainer}>
        <Title order={1} pb="md" fz="3rem">
          Social Games
        </Title>
        <Text>
          Collection of online multiplayer social games. All playable in browser
          and for free.
        </Text>
        <Text>
          Find a game to play by searching for specific tags or filtering by
          player count.
        </Text>
        <Text pt="xs">
          You can suggest additions{" "}
          <Anchor href="https://github.com/aliebald/social-games/issues">
            here
          </Anchor>
          .
        </Text>
      </Container>
    </header>
  );
}
