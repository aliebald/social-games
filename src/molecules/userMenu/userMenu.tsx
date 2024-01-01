"use client";

import { deleteUser, getAuth, signOut } from "firebase/auth";
import { Menu, rem, Avatar, Button } from "@mantine/core";
import { IconLogout, IconTrash } from "@tabler/icons-react";
import useUser, { User } from "@/networking/useUser";
import LoginModal from "@/organisms/loginModal/loginModal";
import { useState } from "react";
import { showLoadingNotification } from "../loadingNotification/loadingNotification";

export default function UserMenu() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useUser();

  if (user === null) {
    return (
      <>
        <Button
          onClick={() => setShowLoginModal(!showLoginModal)}
          variant="light"
          size="xs"
          radius="xl"
        >
          Login
        </Button>
        <LoginModal
          visible={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Avatar color="cyan" radius="xl">
          {user.displayName?.substring(0, 2)}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          Welcome {user.displayName}
          {user.admin ? " [admin]" : ""}
        </Menu.Label>
        <Menu.Item
          // color="green"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={logout}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => deleteAccount(user)}
        >
          Delete Account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function logout() {
  const auth = getAuth();

  const { successNotification, errorNotification } = showLoadingNotification({
    title: "Logging out",
    message: null,
  });

  signOut(auth)
    .then(() => {
      console.log("Logged out");
      successNotification({ title: "Logged out", message: null });
    })
    .catch((error) => {
      console.warn("Failed sign out", error);
      errorNotification({ title: "Error", message: "Failed to sign out" });
    });
}

function deleteAccount(user: User) {
  if (
    !window.confirm(
      "Do you really want to delete your account? This cannot be undone."
    )
  ) {
    return;
  }

  const { successNotification, errorNotification } = showLoadingNotification({
    title: "Deleting account",
    message: null,
  });

  deleteUser(user)
    .then(() => {
      console.log("User deleted");
      successNotification({ title: "Account deleted", message: null });
    })
    .catch((error) => {
      console.warn("Failed to delete user", error);
      errorNotification({
        title: "Error",
        message: "Failed to delete account",
      });
    });
}
