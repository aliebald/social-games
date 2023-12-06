import TagBadge from "@/atoms/tagBadge/tagBadge";
import Tag from "@/types/tag";
import { Flex, BoxProps, BadgeProps } from "@mantine/core";

interface TagsProps extends BoxProps {
  tags: Tag[];
  size?: BadgeProps["size"];
}

export default function Tags({ tags, size, ...boxProps }: TagsProps) {
  return (
    <Flex {...boxProps} wrap="wrap" style={{ overflowX: "auto" }} gap={4}>
      {tags.map((tag) => (
        <TagBadge key={tag.id} tag={tag} size={size} />
      ))}
    </Flex>
  );
}
