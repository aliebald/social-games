import { Container, Group } from "@mantine/core";
import styles from "./header.module.css";
import HeaderLink from "@/atoms/headerLink/headerLink";
import UserMenu from "@/molecules/userMenu/userMenu";
import AddEntityLinksMenu from "@/molecules/addEntityLinksMenu/addEntityLinksMenu";
import classNames from "classnames";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={classNames(styles.outerWrapper, className)}>
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
