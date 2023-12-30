"use client";

import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  NumberInput,
  SimpleGrid,
  FileInput,
} from "@mantine/core";
import Game from "@/types/game";
import { omit } from "lodash";
import { useEffect, useRef } from "react";
import TagsInput from "@/molecules/tagsInput/tagsInput";
import Anchor from "@/atoms/anchor/anchor";

export interface GameFormValues
  extends Omit<
    Game,
    "tags" | "id" | "author_uid" | "thumbnailUrl" | "thumbnailRef"
  > {
  tags: string[];
  existingThumbnailName: string | null;
  existingThumbnailUrl: string | null;
  existingThumbnailPath: string | null;
  newThumbnail: File | null;
}

interface GameFormProps {
  initialValues?: GameFormValues | null;
  onSubmit: (game: GameFormValues) => void | Promise<void>;
}

const defaultInitialValues: GameFormValues = {
  title: "",
  description: "",
  websiteUrl: "",
  tags: [],
  existingThumbnailName: null,
  existingThumbnailUrl: null,
  existingThumbnailPath: null,
  newThumbnail: null,
};

export default function GameForm({ initialValues, onSubmit }: GameFormProps) {
  const form = useForm<GameFormValues>({
    validateInputOnBlur: true,
    initialValues: omit(initialValues ?? defaultInitialValues, "id"),
    validate: {
      title: hasLength(
        { min: 3, max: 40 },
        "Title must be 3-40 characters long"
      ),
      description: isNotEmpty("Enter a game description"),
      websiteUrl: isNotEmpty("Enter a url that leads to the games website"),
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

  const existingThumbnailName = form.values.existingThumbnailName;
  const existingThumbnailUrl = form.values.existingThumbnailUrl;

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
        <TagsInput {...form.getInputProps("tags")} />
        <TextInput
          withAsterisk
          label="Website url"
          {...form.getInputProps("websiteUrl")}
        />
        <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="lg" verticalSpacing="md">
          <NumberInput
            label="Min number of Players"
            {...form.getInputProps("minPlayers")}
          />
          <NumberInput
            label="Max number of Players"
            {...form.getInputProps("maxPlayers")}
          />
        </SimpleGrid>
        <FileInput
          accept="image/png,image/jpeg"
          label="Thumbnail image"
          placeholder={existingThumbnailName ?? undefined}
          description={
            existingThumbnailName && existingThumbnailUrl ? (
              <>
                Replaces{" "}
                <Anchor size="xs" href={existingThumbnailUrl} openInNewTab>
                  {existingThumbnailName}
                </Anchor>
              </>
            ) : undefined
          }
          clearable
          {...form.getInputProps("newThumbnail")}
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
