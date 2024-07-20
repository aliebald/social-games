"use client";

import styles from "./homePageAccordion.module.css";
import {
  IconTag,
  IconPlus,
  IconAlertCircle,
  IconCheck,
  IconDeviceGamepad2,
} from "@tabler/icons-react";
import { Accordion, Group, List, Text } from "@mantine/core";
import useUser, { User } from "@/networking/useUser";

export default function HomePageAccordion() {
  const user = useUser();

  return (
    <Accordion variant="contained" order={3}>
      <Accordion.Item value="prerequisites">
        <Accordion.Control
          icon={
            user?.member || user?.admin ? (
              <IconCheck
                color="green"
                width={20}
                height={20}
                className={styles.icon}
              />
            ) : (
              <IconAlertCircle
                color="red"
                width={20}
                height={20}
                className={styles.icon}
              />
            )
          }
        >
          Prerequisites for contributing
        </Accordion.Control>
        <Accordion.Panel>
          <Text pt="xs">
            Only logged in users with the <i>member</i> role can contribute.
          </Text>
          <Text pt="xs">{" " + getMemberRoleText(user)}</Text>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="add-game">
        <Accordion.Control
          icon={
            <IconDeviceGamepad2
              width={20}
              height={20}
              className={styles.icon}
            />
          }
        >
          Adding a new game
        </Accordion.Control>
        <Accordion.Panel>
          <Text pt="xs">
            The game you are looking for is not listed here? Contribute to the
            project by adding a game:
          </Text>

          <List type="ordered" withPadding pt="xs">
            <List.Item>
              <Group gap={0}>
                Click the
                <IconPlus width={20} height={20} className={styles.icon} />
                icon in the header and select&nbsp;<i>Add Game</i>
              </Group>
            </List.Item>
            <List.Item>Enter game information and upload a thumbnail</List.Item>
            <List.Item>
              Click <i>Save</i>
            </List.Item>
          </List>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="add-tag">
        <Accordion.Control
          icon={<IconTag width={20} height={20} className={styles.icon} />}
        >
          Adding a new tag
        </Accordion.Control>
        <Accordion.Panel>
          <Text pt="xs">
            Game attributes can be stored using custom tags. When searching for
            a game, these tags can be utilized as filters and provide useful
            information at a glance.
          </Text>
          <Text>
            If a game has an attribute that has no fitting tag, you can add your
            own tags as follows:
          </Text>

          <List type="ordered" withPadding pt="xs">
            <List.Item>
              <Group gap={0}>
                Click the
                <IconPlus width={20} height={20} className={styles.icon} />
                icon in the header and select&nbsp;<i>Add Tag</i>
              </Group>
            </List.Item>
            <List.Item>Enter the tag information</List.Item>
            <List.Item>
              Click <i>Save</i>
            </List.Item>
            <List.Item>Use the tag in a new or existing game</List.Item>
          </List>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function getMemberRoleText(user: User | null) {
  if (user === null) {
    return "Login to check if you have the member role.";
  }
  if (user.member) {
    return "You already have the member role.";
  }
  if (user.admin) {
    return "You have the admin role, which includes member permissions.";
  }
  return "Contact an administrator to receive the role.";
}
