"use client";

import LinkIcon from "@/atoms/linkIcon/linkIcon";
import TagBadge from "@/atoms/tagBadge/tagBadge";
import Tag from "@/types/tag";
import { Table } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface TagsTableProps {
  tags: Tag[];
}

export default function TagsTable({ tags }: TagsTableProps) {
  const router = useRouter();

  const rows = tags.map((tag) => (
    <Table.Tr
      key={tag.id}
      onDoubleClick={() => router.push(`tags/edit/${tag.id}`)}
    >
      <Table.Td>
        <LinkIcon href={`tags/edit/${tag.id}`} Icon={IconPencil} />
      </Table.Td>
      <Table.Td>{tag.title}</Table.Td>
      <Table.Td>{tag.description}</Table.Td>
      <Table.Td>{tag.color}</Table.Td>
      <Table.Td>
        <TagBadge tag={tag} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={600}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
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
