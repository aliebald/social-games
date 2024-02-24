import { UserRecord } from "@/networking/admin/types";
import useUpdateClaims from "@/networking/admin/useUpdateClaims";
import { Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

interface UserManagementMenuProps {
  userRecord: UserRecord;
}

export function UserManagementMenu({ userRecord }: UserManagementMenuProps) {
  const updateClaims = useUpdateClaims();
  const uid = userRecord.uid;
  const admin = userRecord.customClaims?.admin ?? false;
  const member = userRecord.customClaims?.member ?? false;

  const toggleMemberRole = () => updateClaims(uid, { member: !member });
  const toggleAdminRole = () => {
    const question = admin
      ? `Do you really want to remove the admin role from ${userRecord.displayName} (${userRecord.email})?`
      : `Do you really want to add the admin role to ${userRecord.displayName} (${userRecord.email})?`;
    if (window.confirm(question)) {
      updateClaims(uid, { admin: !admin });
    }
  };

  return (
    <Menu shadow="md" offset={0} withArrow>
      <Menu.Target>
        <ActionIcon variant="subtle">
          <IconDotsVertical style={{ width: "1.25rem", height: "1.25rem" }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{userRecord.displayName}</Menu.Label>
        <Menu.Item onClick={toggleAdminRole}>
          {admin ? "Remove" : "Add"} Admin Role
        </Menu.Item>
        <Menu.Item onClick={toggleMemberRole}>
          {member ? "Remove" : "Add"} Member Role
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
