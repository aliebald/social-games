"use client";

import Tag from "@/types/tag";
import { Badge, Popover, BadgeProps, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./tagBadge.module.css";

interface TagProps {
  tag: Tag;
  size?: BadgeProps["size"];
}

export default function TagBadge({ tag, size }: TagProps) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover width={"min(300px, 90vw)"} withArrow opened={opened}>
      <Popover.Target>
        <Badge
          color={tag.color}
          size={size}
          onMouseEnter={open}
          onMouseLeave={close}
          className={styles.badge}
          radius="sm"
        >
          {tag.title}
        </Badge>
      </Popover.Target>

      <Popover.Dropdown>
        <Text fw={500} pb={4}>
          {tag.title}
        </Text>
        <Text size="sm">{tag.description}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
