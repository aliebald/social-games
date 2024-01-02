"use client";

import { hasLength, useForm } from "@mantine/form";
import { TextInput, Button, Group } from "@mantine/core";
import { useEffect, useRef } from "react";

export type SettingsFormValues = {
  displayName: string;
};

interface SettingsFormProps {
  initialValues: SettingsFormValues;
  onSubmit: (settings: SettingsFormValues) => void | Promise<void>;
}

export default function SettingsForm({
  initialValues,
  onSubmit,
}: SettingsFormProps) {
  const form = useForm<SettingsFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: {
      displayName: hasLength(
        { min: 2, max: 40 },
        "Name must be 2-40 characters long"
      ),
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
      <TextInput
        withAsterisk
        label="Display Name"
        {...form.getInputProps("displayName")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!form.isDirty()}>
          Save
        </Button>
      </Group>
    </form>
  );
}
