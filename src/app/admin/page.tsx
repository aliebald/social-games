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
import { useDelayedRedirectIfNotLoggedIn } from "@/util";
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
            Export & Import
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users">
          <UserManagement />
        </Tabs.Panel>

        <Tabs.Panel value="data">
          <Text pt="md">
            Intended as a quick way to add testdata after wiping the db during
            testing.
          </Text>
          <Text pt="xs" pb="md">
            Users and roles / custom claims are not imported or exported!
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
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
