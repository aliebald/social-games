"use client";

import {
  Container,
  Title,
  Button,
  FileButton,
  Group,
  Text,
  Tabs,
} from "@mantine/core";
import { testGames, testTags } from "@/testData";
import addGame from "@/networking/addGame";
import addTag from "@/networking/addTag";
import fetchTags from "@/networking/fetchTags";
import {
  getRandomArrayElements,
  useDelayedRedirectIfNotLoggedIn,
} from "@/util";
import fetchGames from "@/networking/fetchGames";
import deleteGame from "@/networking/deleteGame";
import deleteTag from "@/networking/deleteTag";
import useUser from "@/networking/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconDatabase, IconUsers } from "@tabler/icons-react";
import UserManagement from "@/molecules/userManagement/userManagement";

export default function AdminPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user !== null && !user.admin) {
      router.push("/");
    }
  }, [router, user]);

  useDelayedRedirectIfNotLoggedIn();

  const addTestdata = async () => {
    if (user === null || !confirm("Do you really want to add testdata?")) {
      return;
    }

    await Promise.all(testTags.map((tag) => addTag(tag, user.uid)));
    const tags = await fetchTags();
    console.log("tags", tags);

    await Promise.all(
      testGames.map((game) =>
        addGame(
          {
            ...game,
            existingThumbnailName: null,
            existingThumbnailUrl: null,
            existingThumbnailPath: null,
            newThumbnail: null,
            tags: getRandomArrayElements(tags, 4).map((tag) => tag.id),
          },
          user
        )
      )
    );
    console.log("Successfully added testdata");
  };

  const deleteDb = async () => {
    if (
      user === null ||
      !confirm("Do you really want to delete all games & tags?")
    ) {
      return;
    }

    const games = await fetchGames();
    await Promise.all(games.map((game) => deleteGame(game)));

    const tags = await fetchTags();
    await Promise.all(tags.map((tag) => deleteTag(tag, user)));

    console.log("Successfully deleted DB");
    console.groupEnd();
  };

  const [{ exportDb, importDb }, setInExportFunctions] = useState<{
    exportDb?: () => Promise<void>;
    importDb?: (file: File | null) => Promise<void>;
  }>({});

  useEffect(() => {
    if (exportDb !== undefined) return;
    const asyncImportExportFunctions = async () => {
      const { exportDb, importDb } = await import("@/networking/inExportDb");
      setInExportFunctions({ exportDb, importDb });
    };

    asyncImportExportFunctions();
  }, [exportDb]);

  return (
    <Container>
      <Title size="h2" order={2} pb="sm">
        Administration
      </Title>
      <Tabs defaultValue="users">
        <Tabs.List>
          <Tabs.Tab
            value="users"
            leftSection={
              <IconUsers style={{ width: "1rem", height: "1rem" }} />
            }
          >
            User Management
          </Tabs.Tab>
          <Tabs.Tab
            value="data"
            leftSection={
              <IconDatabase style={{ width: "1rem", height: "1rem" }} />
            }
          >
            Data
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users">
          <UserManagement />
        </Tabs.Panel>

        <Tabs.Panel value="data">
          <Title size="h2" order={2} pt="md">
            Export & Import
          </Title>
          <Text pt="xs">
            Intended as a quick way to add testdata after wiping the db during
            testing. The &quot;old way&quot; (bellow) does not support images.
          </Text>
          <Text pt="xs" pb="md">
            Roles / custom claims are not imported or exported!
          </Text>
          <Group>
            <Button onClick={exportDb} loading={exportDb === undefined}>
              Export Data
            </Button>
            <FileButton onChange={importDb !== undefined ? importDb : () => {}}>
              {(props) => (
                <Button {...props} loading={exportDb === undefined}>
                  Import Data
                </Button>
              )}
            </FileButton>
          </Group>

          <Title size="h2" order={2} pt="xl" pb="md">
            Other
          </Title>
          <Button onClick={addTestdata}>Add Testdata</Button>
          <Button ml="md" onClick={deleteDb} color="red">
            Delete DB
          </Button>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
