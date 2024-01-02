"use client";

import { showLoadingNotification } from "@/molecules/loadingNotification/loadingNotification";
import styles from "./page.module.css";
import useUser from "@/networking/useUser";
import SettingsForm, {
  SettingsFormValues,
} from "@/organisms/settingsForm/settingsForm";
import { Container, Divider, Title, LoadingOverlay } from "@mantine/core";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDelayedRedirectIfNotLoggedIn } from "@/util";

export default function SettingsPage() {
  const user = useUser();
  const [initialSettingsFormValues, setInitialSettingsFormValues] =
    useState<SettingsFormValues>({ displayName: "" });

  useDelayedRedirectIfNotLoggedIn();

  useEffect(() => {
    if (user === null) return;
    setInitialSettingsFormValues({ displayName: user.displayName ?? "" });
  }, [user]);

  const onSubmit = async (settings: SettingsFormValues) => {
    const trimmedDisplayName = settings.displayName.trim();
    const { successNotification, errorNotification } = showLoadingNotification({
      title: "Updating tag",
      message: `Updating ${trimmedDisplayName}`,
    });

    const auth = getAuth();
    if (auth.currentUser === null) {
      errorNotification({
        title: "Error",
        message: `User is not logged in. Please log in and try again.`,
      });
      return;
    }

    // Update display name in user profile
    try {
      await updateProfile(auth.currentUser, {
        displayName: trimmedDisplayName,
      });
    } catch (error) {
      console.error(error);
      errorNotification({
        title: "Error",
        message: `Failed to update ${trimmedDisplayName}`,
      });
      return;
    }

    // Update display name in games
    try {
      const gamesQuery = query(
        collection(db, "games"),
        where("authorUid", "==", auth.currentUser.uid)
      );
      const games = await getDocs(gamesQuery);
      await Promise.allSettled(
        games.docs.map((game) => {
          console.log("Updating author name in", game.id);
          return updateDoc(doc(db, "games", game.id), {
            authorName: trimmedDisplayName,
          });
        })
      );
    } catch (error) {
      console.error(error);
      errorNotification({
        title: "Error",
        message: "Failed to update author information in games",
      });
      await auth.currentUser.reload();
      return;
    }

    successNotification({
      title: "Success",
      message: `Successfully updated ${trimmedDisplayName}.`,
    });
    await auth.currentUser.reload();
  };

  return (
    <Container>
      <LoadingOverlay
        visible={user === null}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        className={styles.overlay}
      />
      <Title>Settings</Title>
      <Divider my="md" />
      <SettingsForm
        initialValues={initialSettingsFormValues}
        onSubmit={onSubmit}
      />
    </Container>
  );
}
