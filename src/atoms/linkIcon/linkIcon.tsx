import { ActionIcon, ActionIconProps, MantineSize } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import Link from "next/link";
import { FC, ForwardedRef, forwardRef } from "react";

export interface LinkIconProps extends Pick<ActionIconProps, "variant"> {
  href: string;
  openInNewTab?: boolean;
  Icon: FC<TablerIconsProps>;
  size?: MantineSize;
}

function LinkIcon(
  { href, openInNewTab, size, Icon, variant = "light" }: LinkIconProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const extProps = openInNewTab ? { target: "_blank", rel: "noopener" } : {};

  return (
    <Link href={href} {...extProps} ref={ref}>
      <ActionIcon variant={variant} size={size}>
        <Icon style={{ width: "75%", height: "75%" }} />
      </ActionIcon>
    </Link>
  );
}

export default forwardRef<HTMLAnchorElement, LinkIconProps>(LinkIcon);
