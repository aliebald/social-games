import { Container, Group } from "@mantine/core";
import styles from "./header.module.css";
import HeaderLink from "@/atoms/headerLink/headerLink";
import UserMenu from "@/molecules/userMenu/userMenu";
import AddEntityLinksMenu from "@/molecules/addEntityLinksMenu/addEntityLinksMenu";

export default function Header() {
  return (
    <header className={styles.outerWrapper}>
      <Container size="md" className={styles.headerContainer}>
        <Group gap={5} align="center" className={styles.group}>
          <HeaderLink href="/" label="Home" />
          <HeaderLink href="/games" label="Games" />
          <HeaderLink href="/tags" label="Tags" className={styles.mrAuto} />
          <AddEntityLinksMenu />
          <UserMenu />
        </Group>
      </Container>
    </header>
  );
}
