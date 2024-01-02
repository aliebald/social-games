"use client";

import { Container, LoadingOverlay, Title, Text, Divider } from "@mantine/core";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import TagForm, { TagFormValues } from "@/organisms/tagForm/tagForm";
import useTag from "@/networking/useTag";
import updateTag from "@/networking/updateTag";
import useUser from "@/networking/useUser";
import { useDelayedRedirectIfNotLoggedIn } from "@/util";

interface EditTagPageProps {
  params: { id: string };
}

export default function EditTagPage({ params }: EditTagPageProps) {
  const tag = useTag(params.id);
  const user = useUser();
  const [initialTagFormValues, setInitialTagFormValues] =
    useState<TagFormValues | null>(null);

  useDelayedRedirectIfNotLoggedIn();

  useEffect(() => {
    if (tag === null) return;
    setInitialTagFormValues(tag);
  }, [tag]);

  const onSubmit = async (tagFormValues: TagFormValues) => {
    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Updating tag",
      message: `Updating ${tagFormValues.title}`,
    });

    if (user === null) {
      errorNotification({
        title: "Error",
        message: `Failed to update ${tagFormValues.title}. Please log in and try again.`,
      });
      return;
    }

    try {
      await updateTag(params.id, tagFormValues, user.uid);
    } catch (error) {
      console.error("Failed to update game. Error:", error);
      errorNotification({
        title: "Error",
        message: `Failed to update ${tagFormValues.title}`,
      });
      return;
    }

    successNotification({
      title: "Success",
      message: `Successfully updated ${tagFormValues.title}`,
    });
  };

  return (
    <Container>
      <LoadingOverlay
        visible={tag === null}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        className={styles.overlay}
      />
      <Title pb="sm">Edit {tag?.title}</Title>
      <Text>Edit an existing tag.</Text>
      <Divider my="md" />
      <TagForm initialValues={initialTagFormValues} onSubmit={onSubmit} />
    </Container>
  );
}
