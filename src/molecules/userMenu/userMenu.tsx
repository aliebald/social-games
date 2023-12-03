"use client";

import { getAuth, signOut } from "firebase/auth";
import { Menu, rem, Avatar, Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import useUser from "@/newtorking/useUser";
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
          {user?.displayName?.substring(0, 2)}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Welcome {user?.displayName}</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={logout}
        >
          Logout
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
