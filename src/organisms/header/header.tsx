import { Container, Group } from "@mantine/core";
import styles from "./header.module.css";
import HeaderLink from "@/atoms/headerLink/headerLink";
import UserMenu from "@/molecules/userMenu/userMenu";

export default function Header() {
  return (
    <header className={styles.outerWrapper}>
      <Container size="md" className={styles.headerContainer}>
        <Group gap={5} align="center" className={styles.group}>
          <HeaderLink href="/" label="Home" />
          <HeaderLink href="/games/list" label="Games" />
          <HeaderLink href="/tags" label="Tags" />
          <HeaderLink
            href="/games/create"
            label="Add Game"
            className={styles.mlAuto}
          />
          <UserMenu />
        </Group>
      </Container>
    </header>
  );
}
