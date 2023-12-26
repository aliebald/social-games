"use client";

import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  ColorInput,
} from "@mantine/core";
import { omit } from "lodash";
import { useEffect, useRef } from "react";
import Tag from "@/types/tag";

const tagSampleColors = [
  "#2e2e2e",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];

export type TagFormValues = Omit<Tag, "id" | "author_uid">;

interface TagFormProps {
  initialValues?: TagFormValues | null;
  onSubmit: (game: TagFormValues) => void | Promise<void>;
}

const defaultInitialValues: TagFormValues = {
  title: "",
  description: "",
  color: "#1971c2",
};

export default function TagForm({ initialValues, onSubmit }: TagFormProps) {
  const form = useForm<TagFormValues>({
    validateInputOnBlur: true,
    initialValues: omit(initialValues ?? defaultInitialValues, "id"),
    validate: {
      title: hasLength(
        { min: 2, max: 20 },
        "Title must be 2-20 characters long"
      ),
      description: isNotEmpty("Enter a game description"),
    },
  });

  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    const form = formRef.current;
    if (initialValues) {
      form.setInitialValues(initialValues);
      form.setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex gap="sm" direction="column">
        <TextInput
          withAsterisk
          label="Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          autosize
          minRows={3}
          maxRows={12}
          withAsterisk
          label="Description"
          {...form.getInputProps("description")}
        />
        <ColorInput
          label="Color"
          format="hex"
          swatches={tagSampleColors}
          {...form.getInputProps("color")}
        />
      </Flex>
      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!form.isDirty()}>
          Save
        </Button>
      </Group>
    </form>
  );
}
