"use client";

import LinkIcon from "@/atoms/linkIcon/linkIcon";
import TagBadge from "@/atoms/tagBadge/tagBadge";
import useUser from "@/networking/useUser";
import Tag from "@/types/tag";
import { Table } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface TagsTableProps {
  tags: Tag[];
}

export default function TagsTable({ tags }: TagsTableProps) {
  const router = useRouter();
  const user = useUser();

  const rows = tags.map((tag) => {
    const canEdit = user !== null && tag.author_uid === user.uid;
    return (
      <Table.Tr
        key={tag.id}
        onDoubleClick={
          canEdit ? () => router.push(`tags/edit/${tag.id}`) : undefined
        }
      >
        {user !== null && (
          <Table.Td>
            {canEdit && (
              <LinkIcon href={`tags/edit/${tag.id}`} Icon={IconPencil} />
            )}
          </Table.Td>
        )}
        <Table.Td>{tag.title}</Table.Td>
        <Table.Td>{tag.description}</Table.Td>
        <Table.Td>{tag.color}</Table.Td>
        <Table.Td>
          <TagBadge tag={tag} />
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={600}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {user !== null && <Table.Th />}
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Color</Table.Th>
            <Table.Th>Preview</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
