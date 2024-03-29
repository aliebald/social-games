"use client";

import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";
import useTags from "@/networking/useTags";
import useUser from "@/networking/useUser";
import TagsTable from "@/organisms/tagsTable/tagsTable";
import { Container, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function TagsPage() {
  const tags = useTags();
  const user = useUser();
  const canCreateTag = user !== null && (user.member || user.admin);

  return (
    <Container>
      <Group justify="space-between" pb="lg">
        <Title size="h1" order={1}>
          Tags
        </Title>
        {canCreateTag && (
          <LinkIconWithTooltip
            tooltip="Create new Tag"
            href="tags/create"
            Icon={IconPlus}
            size="lg"
          />
        )}
      </Group>
      <TagsTable tags={tags} />
    </Container>
  );
}
