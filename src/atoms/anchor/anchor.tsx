import Link from "next/link";
import {
  Anchor as MantineAnchor,
  AnchorProps as MantineAnchorProps,
  ElementProps,
} from "@mantine/core";

interface AnchorProps
  extends MantineAnchorProps,
    ElementProps<"a", keyof MantineAnchorProps> {
  href: string;
  openInNewTab?: boolean;
}

/**
 * Combines {@link MantineAnchor Mantine Anchor} with {@link Link NextJs Link}
 */
export default function Anchor({ openInNewTab, ...props }: AnchorProps) {
  const extProps = openInNewTab ? { target: "_blank", rel: "noopener" } : {};

  return <MantineAnchor component={Link} {...extProps} {...props} />;
}
