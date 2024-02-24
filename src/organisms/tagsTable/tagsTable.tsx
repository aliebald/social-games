"use client";

import TagBadge from "@/atoms/tagBadge/tagBadge";
import ActionIconWithTooltip from "@/molecules/actionIconWithTooltip/actionIconWithTooltip";
import LinkIconWithTooltip from "@/molecules/linkIconWithTooltip/linkIconWithTooltip";
import deleteTag from "@/networking/deleteTag";
import useUser, { User } from "@/networking/useUser";
import Tag from "@/types/tag";
import { Group, Table } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface TagsTableProps {
  tags: Tag[];
}

export default function TagsTable({ tags }: TagsTableProps) {
  const router = useRouter();
  const user = useUser();

  const rows = tags.map((tag) => {
    const canEdit =
      user !== null &&
      (user.admin || (user.member && user.uid === tag.authorUid));
    return (
      <Table.Tr
        key={tag.id}
        onDoubleClick={
          canEdit ? () => router.push(`tags/edit/${tag.id}`) : undefined
        }
      >
        <Table.Td>{tag.title}</Table.Td>
        <Table.Td>{tag.description}</Table.Td>
        <Table.Td>{tag.color}</Table.Td>
        <Table.Td>
          <TagBadge tag={tag} />
        </Table.Td>
        {user !== null && (
          <Table.Td>
            {canEdit && (
              <Group gap="xs" wrap="nowrap">
                <LinkIconWithTooltip
                  href={`tags/edit/${tag.id}`}
                  tooltip={`Edit ${tag.title}`}
                  Icon={IconPencil}
                />
                <ActionIconWithTooltip
                  tooltip={`Delete ${tag.title}`}
                  onClick={() => handleDeleteTag(tag, user)}
                  Icon={IconTrash}
                />
              </Group>
            )}
          </Table.Td>
        )}
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={600}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Color</Table.Th>
            <Table.Th>Preview</Table.Th>
            {user !== null && <Table.Th />}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

async function handleDeleteTag(tag: Tag, user: User) {
  if (
    window.confirm(
      `Do you really want to remove ${tag.title} from all games and delete it? This cannot be undone.`
    )
  ) {
    await deleteTag(tag, user);
  }
}
