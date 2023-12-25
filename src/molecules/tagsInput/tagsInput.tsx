"use client";

import useTags from "@/networking/useTags";
import { MultiSelect, MultiSelectProps } from "@mantine/core";

type TagsInputProps = Pick<
  MultiSelectProps,
  "value" | "onChange" | "error" | "onFocus" | "onBlur"
>;

export default function TagsInput(props: TagsInputProps) {
  const tags = useTags();
  const data = tags.map((tag) => ({ value: tag.id, label: tag.title }));

  return (
    <MultiSelect label="Tags" data={data} {...props} searchable clearable />
  );
}
