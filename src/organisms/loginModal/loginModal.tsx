"use client";

import styles from "./loginModal.module.css";

import GoogleButton from "@/atoms/googleButton/googleButton";
import { googleProvider } from "@/firebase";
import { Title, Text, Flex, Modal } from "@mantine/core";
import { getAuth, signInWithPopup } from "firebase/auth";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
  const auth = getAuth();

  const loginUsingGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during signInWithPopup (Google):", error);
    }
  };

  return (
    <Modal opened={visible} onClose={onClose} withCloseButton={false}>
      <Modal.CloseButton className={styles.closeBtn} variant="outlined" />

      <Flex justify="center" direction="column" align="center" py="md">
        <Title ta="center" variant="h1" order={1}>
          Welcome
        </Title>
        <Text c="dimmed" ta="center" pt="sm">
          Google is currently used for authentication.
        </Text>
        <Text c="dimmed" ta="center" pt="xs" pb="xl">
          In the future, more methods will be added.
        </Text>
        <GoogleButton radius="xl" onClick={loginUsingGoogle}>
          Sign in with Google
        </GoogleButton>
      </Flex>
    </Modal>
  );
}
