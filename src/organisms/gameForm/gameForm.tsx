"use client";

import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { TextInput, Button, Group, Flex, Textarea } from "@mantine/core";
import Game from "@/types/game";
import { useMemo } from "react";

export type GameFormValues = Omit<Game, "id">;

interface GameFormProps {
  initialValues?: Game;
  onSubmit: (game: Game | GameFormValues) => void | Promise<void>;
}

const defaultInitialValues: GameFormValues = {
  title: "",
  description: "",
  websiteUrl: "",
  image: "",
};

const parseInitialValues = (game: Game): GameFormValues => {
  const { id, ...result } = game;
  return result;
};

export default function GameForm({ initialValues, onSubmit }: GameFormProps) {
  const initialFormValues = useMemo(
    () =>
      initialValues ? parseInitialValues(initialValues) : defaultInitialValues,
    [initialValues]
  );

  const form = useForm<GameFormValues>({
    validateInputOnBlur: true,
    initialValues: initialFormValues,
    validate: {
      title: hasLength(
        { min: 3, max: 40 },
        "Title must be 3-40 characters long"
      ),
      description: isNotEmpty("Enter a game description"),
      websiteUrl: isNotEmpty("Enter a url that leads to the games website"),
    },
  });

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
        <TextInput
          withAsterisk
          label="Website url"
          {...form.getInputProps("websiteUrl")}
        />
        <TextInput label="Preview image url" {...form.getInputProps("image")} />
      </Flex>
      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!form.isDirty()}>
          Save
        </Button>
      </Group>
    </form>
  );
}
