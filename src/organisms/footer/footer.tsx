import styles from "./footer.module.css";
import classNames from "classnames";
import { Container, Group, MantineStyleProps } from "@mantine/core";
import Anchor from "@/atoms/anchor/anchor";

interface FooterProps {
  className?: string;
}

const commonProps: MantineStyleProps = {
  fz: "xs",
  c: "gray.6",
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={classNames(styles.footer, className)}>
      <Container className={styles.container}>
        <Anchor href="https://liebald.dev" openInNewTab {...commonProps}>
          &#169; {process.env.LAST_MODIFIED_YEAR} Alexander Liebald
        </Anchor>
        <Group className={styles.links}>
          <Anchor href="mailto:contact@liebald.dev" {...commonProps}>
            Contact
          </Anchor>
          <Anchor
            href="https://impressum.liebald.dev"
            openInNewTab
            {...commonProps}
          >
            Impressum
          </Anchor>
          <Anchor
            href="https://github.com/aliebald/social-games"
            openInNewTab
            {...commonProps}
          >
            Repository
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
}
