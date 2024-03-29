"use client";

import styles from "./loadingNotification.module.css";
import { NotificationData, notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export type LoadingNotificationArgs = Omit<
  NotificationData,
  "loading" | "autoClose" | "withCloseButton" | "color" | "icon" | "id"
>;

/**
 * Utility function to show and resolve a loading notification
 */
export function showLoadingNotification(
  notificationArgs: LoadingNotificationArgs
) {
  const id = notifications.show({
    ...notificationArgs,
    loading: true,
    autoClose: false,
    withCloseButton: false,
  });

  const successNotification = (
    successNotificationArgs: LoadingNotificationArgs
  ) => {
    notifications.update({
      ...successNotificationArgs,
      id,
      color: "teal",
      icon: <IconCheck className={styles.icon} />,
      loading: false,
      autoClose: 5000,
      withCloseButton: true,
    });
  };

  const errorNotification = (
    errorNotificationArgs: LoadingNotificationArgs
  ) => {
    notifications.update({
      ...errorNotificationArgs,
      id,
      color: "red",
      icon: <IconX className={styles.icon} />,
      loading: false,
      autoClose: 10000,
      withCloseButton: true,
    });
  };

  return { successNotification, errorNotification };
}
