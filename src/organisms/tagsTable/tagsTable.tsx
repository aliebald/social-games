import TagBadge from "@/atoms/tagBadge/tagBadge";
import Tag from "@/types/tag";
import { Table } from "@mantine/core";

interface TagsTableProps {
  tags: Tag[];
}

export default function TagsTable({ tags }: TagsTableProps) {
  const rows = tags.map((tag) => (
    <Table.Tr key={tag.id}>
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
