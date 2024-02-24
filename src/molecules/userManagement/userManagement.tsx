"use client";

import { useUserRecords } from "@/networking/admin/useUserRecords";
import { Table } from "@mantine/core";
import { UserManagementMenu } from "../userManagementMenu/userManagementMenu";
import { getDisplayRoles } from "@/util";

/**
 * User management. For administrators only.
 */
export default function UserManagement() {
  const { data } = useUserRecords();

  const rows = (data ?? []).map((userRecord) => (
    <Table.Tr key={userRecord.uid}>
      <Table.Td>{userRecord.displayName}</Table.Td>
      <Table.Td>{userRecord.email}</Table.Td>
      <Table.Td>
        {new Date(userRecord.metadata.creationTime).toLocaleString()}
      </Table.Td>
      <Table.Td>
        {new Date(userRecord.metadata.lastSignInTime).toLocaleString()}
      </Table.Td>
      <Table.Td>{getDisplayRoles(userRecord.customClaims, "-")}</Table.Td>
      <Table.Td>
        <UserManagementMenu userRecord={userRecord} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer py="md" minWidth={700}>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Displayname</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th>Last SignIn</Table.Th>
            <Table.Th>Roles</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
