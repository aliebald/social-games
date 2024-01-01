"use client";

import useUser from "@/networking/useUser";
import styles from "./addEntityLinksMenu.module.css";
import { Menu, rem, ActionIcon } from "@mantine/core";
import { IconPlus, IconDeviceGamepad2, IconTag } from "@tabler/icons-react";
import Link from "next/link";

interface AddHeaderMenuProps {}

export default function AddEntityLinksMenu({}: AddHeaderMenuProps) {
  const user = useUser();

  if (user === null) return <></>;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="light"
          size="lg"
          radius="lg"
          aria-label="Add game or tag menu"
          color="cyan"
          className={styles.iconButton}
        >
          <IconPlus style={{ width: "85%", height: "85%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Contribute</Menu.Label>
        <Menu.Item
          component={Link}
          href="/games/create"
          leftSection={
            <IconDeviceGamepad2 style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Add new game
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/tags/create"
          leftSection={<IconTag style={{ width: rem(14), height: rem(14) }} />}
        >
          Add new tag
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
