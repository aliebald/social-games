"use client";

import useUser from "@/networking/useUser";
import styles from "./addEntityLinksMenu.module.css";
import { Menu, ActionIcon } from "@mantine/core";
import { IconPlus, IconDeviceGamepad2, IconTag } from "@tabler/icons-react";
import Link from "next/link";

interface AddHeaderMenuProps {}

export default function AddEntityLinksMenu({}: AddHeaderMenuProps) {
  const user = useUser();

  if (user === null || (!user.admin && !user.member)) return <></>;

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon
          variant="light"
          size="md"
          radius="md"
          aria-label="Add game or tag menu"
          color="cyan"
          className={styles.iconButton}
        >
          <IconPlus style={{ width: "85%", height: "85%" }} stroke={1.7} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Contribute</Menu.Label>
        <Menu.Item
          component={Link}
          href="/games/create"
          leftSection={<IconDeviceGamepad2 className={styles.icon} />}
        >
          Add Game
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/tags/create"
          leftSection={<IconTag className={styles.icon} />}
        >
          Add Tag
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
