import LinkIcon from "@/atoms/linkIcon/linkIcon";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import styles from "./footer.module.css";
import classNames from "classnames";
import { Container, Group } from "@mantine/core";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div className={classNames(styles.footerWrapper, className)}>
      <Container>
        <Group justify="flex-end" gap="xs">
          <LinkIcon
            variant="transparent"
            href="mailto:contact@liebald.dev"
            Icon={IconMail}
          />
          <LinkIcon
            variant="transparent"
            href="https://github.com/aliebald/social-games"
            Icon={IconBrandGithub}
            openInNewTab
          />
        </Group>
      </Container>
    </div>
  );
}
