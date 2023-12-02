import { ActionIcon } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import Link from "next/link";
import { FC, ForwardedRef, forwardRef } from "react";

export interface LinkIconProps {
  href: string;
  openInNewTab?: boolean;
  Icon: FC<TablerIconsProps>;
}

function LinkIcon(
  { href, openInNewTab, Icon }: LinkIconProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const extProps = openInNewTab ? { target: "_blank", rel: "noopener" } : {};

  return (
    <Link href={href} {...extProps} ref={ref}>
      <ActionIcon variant="light">
        <Icon style={{ width: "75%", height: "75%" }} />
      </ActionIcon>
    </Link>
  );
}

export default forwardRef<HTMLAnchorElement, LinkIconProps>(LinkIcon);
