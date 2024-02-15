import styles from "./selectableTagGroup.module.css";
import { Anchor, Chip, Group, Skeleton } from "@mantine/core";
import Tag from "@/types/tag";
import TextWithInfoIconTooltip from "@/atoms/textWithInfoIconTooltip/textWithInfoIconTooltip";
import { range } from "lodash";
import { MouseEventHandler } from "react";

interface SelectableTagGroupProps {
  label: string;
  tooltip: string;
  tags: Tag[];
  selectedTagIds: string[];
  onChange: (selectedTagIds: string[]) => void;
  isTagDisabled?: (tag: Tag) => boolean;
}

export default function SelectableTagGroup({
  label,
  tooltip,
  tags,
  selectedTagIds,
  onChange,
  isTagDisabled,
}: SelectableTagGroupProps) {
  const chips = tags.map((tag) => (
    <Chip
      key={tag.id}
      value={tag.id}
      color={tag.color}
      radius="sm"
      size="xs"
      disabled={isTagDisabled?.(tag)}
    >
      {tag.title}
    </Chip>
  ));

  const hasSelectedTags = selectedTagIds.length === 0;
  const toggleAll: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (hasSelectedTags) {
      onChange(tags.map((tag) => tag.id));
    } else {
      onChange([]);
    }
  };

  const skeletons =
    chips.length === 0 &&
    range(7).map((index) => (
      <Skeleton key={index} height={25} width={70 + (index % 4) * 15} />
    ));

  return (
    <>
      <TextWithInfoIconTooltip
        text={label}
        tooltip={tooltip}
        pt="sm"
        pb="2px"
        fw={500}
        suffix={
          <Anchor
            size="sm"
            style={{ marginLeft: "auto" }}
            onClick={toggleAll}
            component="button"
          >
            {hasSelectedTags ? "Select All" : "Deselect All"}
          </Anchor>
        }
      />
      <Chip.Group multiple value={selectedTagIds} onChange={onChange}>
        <Group gap="xs" wrap="nowrap" className={styles.scrollGroup}>
          {chips}
          {skeletons}
        </Group>
      </Chip.Group>
    </>
  );
}
