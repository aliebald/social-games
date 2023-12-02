import { Container, Group } from "@mantine/core";
import styles from "./header.module.css";
import HeaderLink from "@/atoms/headerLink/headerLink";

export default function Header() {
  return (
    <header className={styles.outerWrapper}>
      <Container size="md" className={styles.headerContainer}>
        <Group gap={5} align="center" className={styles.group}>
          <HeaderLink href="/" label="Home" />
          <HeaderLink href="/games" label="Games" />
          <HeaderLink href="/login" label="Login" className={styles.mlAuto} />
        </Group>
      </Container>
    </header>
  );
}
