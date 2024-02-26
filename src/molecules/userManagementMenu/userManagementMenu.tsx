import { CustomClaims, UserRecord } from "@/networking/admin/types";
import useUpdateClaims from "@/networking/admin/useUpdateClaims";
import { Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  LoadingNotificationArgs,
  showLoadingNotification,
} from "../loadingNotification/loadingNotification";

interface UserManagementMenuProps {
  userRecord: UserRecord;
}

export function UserManagementMenu({ userRecord }: UserManagementMenuProps) {
  const updateClaims = useUpdateClaims();
  const uid = userRecord.uid;
  const displayName = userRecord.displayName ?? "-";
  const admin = userRecord.customClaims?.admin ?? false;
  const member = userRecord.customClaims?.member ?? false;

  const toggleMemberRole = async () => {
    const { successNotification, errorNotification } = showLoadingNotification(
      getLoadingNotification("member", member, displayName)
    );
    const success = await updateClaims(uid, { member: !member });
    if (success) {
      successNotification(
        getSuccessNotification("member", member, displayName)
      );
    } else {
      errorNotification(getErrorNotification("member", member, displayName));
    }
  };

  const toggleAdminRole = async () => {
    const { successNotification, errorNotification } = showLoadingNotification(
      getLoadingNotification("admin", admin, displayName)
    );

    const question = admin
      ? `Do you really want to remove the admin role from ${displayName} (${userRecord.email})?`
      : `Do you really want to add the admin role to ${displayName} (${userRecord.email})?`;
    if (!window.confirm(question)) {
      errorNotification({ title: "Aborted role update", message: null });
      return;
    }
    const success = await updateClaims(uid, { admin: !admin });
    if (success) {
      successNotification(getSuccessNotification("admin", admin, displayName));
    } else {
      errorNotification(getErrorNotification("admin", admin, displayName));
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
        <Menu.Label>{displayName}</Menu.Label>
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

function getLoadingNotification(
  role: keyof CustomClaims,
  removingRole: boolean,
  userName: string
): LoadingNotificationArgs {
  if (removingRole) {
    return {
      title: `Removing ${role} role from ${userName}`,
      message: null,
    };
  }
  return {
    title: `Adding ${role} role to ${userName}`,
    message: null,
  };
}

function getSuccessNotification(
  role: keyof CustomClaims,
  removingRole: boolean,
  userName: string
): LoadingNotificationArgs {
  if (removingRole) {
    return {
      title: `Removed ${role} role from ${userName}`,
      message: null,
    };
  }
  return {
    title: `Added ${role} role to ${userName}`,
    message: null,
  };
}

function getErrorNotification(
  role: keyof CustomClaims,
  removingRole: boolean,
  userName: string
): LoadingNotificationArgs {
  if (removingRole) {
    return {
      title: `Failed to remove ${role} role from ${userName}`,
      message: null,
    };
  }
  return {
    title: `Failed to add ${role} role to ${userName}`,
    message: null,
  };
}
