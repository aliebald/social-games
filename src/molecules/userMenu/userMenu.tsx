"use client";

import { User, deleteUser, getAuth, signOut } from "firebase/auth";
import { Menu, rem, Avatar, Button } from "@mantine/core";
import { IconLogout, IconTrash } from "@tabler/icons-react";
import useUser from "@/networking/useUser";
import LoginModal from "@/organisms/loginModal/loginModal";
import { useState } from "react";

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
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl">
          {user.displayName?.substring(0, 2)}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Welcome {user.displayName}</Menu.Label>
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
  signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.warn("Failed sign out", error);
    });
}

function deleteAccount(user: User) {
  if (
    window.confirm(
      "Do you really want to delete your account? This cannot be undone."
    )
  ) {
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.warn("Failed to delete user", error);
      });
  }
}
