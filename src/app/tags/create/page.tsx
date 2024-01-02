"use client";

import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import addTag from "@/networking/addTag";
import useUser from "@/networking/useUser";
import TagForm, { TagFormValues } from "@/organisms/tagForm/tagForm";
import { useDelayedRedirectIfNotLoggedIn } from "@/util";
import { Container, Title, Text, Divider } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function CreateTagPage() {
  const router = useRouter();
  const user = useUser();

  useDelayedRedirectIfNotLoggedIn();

  const onSubmit = async (tagFormValues: TagFormValues) => {
    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Saving tag",
      message: `Saving ${tagFormValues.title}`,
    });

    if (user === null) {
      errorNotification({
        title: "Error",
        message: `Failed to create ${tagFormValues.title}, please log in and try again.`,
      });
      return;
    }

    try {
      const tagId = await addTag(tagFormValues, user.uid);
      successNotification({
        title: "Success",
        message: `Successfully saved ${tagFormValues.title}`,
      });
      router.push(`/tags/edit/${tagId}`);
    } catch (error) {
      console.error("Failed to add tag. Error:", error);
      errorNotification({
        title: "Error",
        message: `Failed to create ${tagFormValues.title}`,
      });
      return;
    }
  };

  return (
    <Container>
      <Title pb="sm">New Tag</Title>
      <Text>Add a new tag to the collection.</Text>
      <Divider my="md" />
      <TagForm onSubmit={onSubmit} />
    </Container>
  );
}
