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
} from "@mantine/core";
import Game, { GameWithoutId } from "@/types/game";
import { isEqual, omit } from "lodash";
import { useEffect, useRef } from "react";

interface GameFormProps {
  initialValues?: Game | null;
  onSubmit: (game: Game | GameWithoutId) => void | Promise<void>;
}

const defaultInitialValues: GameWithoutId = {
  title: "",
  description: "",
  websiteUrl: "",
  image: "",
};

export default function GameForm({ initialValues, onSubmit }: GameFormProps) {
  const form = useForm<GameWithoutId>({
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
    if (initialValues && !isEqual(initialValues, form.values)) {
      console.log("Update form values based on initialValues");

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