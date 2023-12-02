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
}

/**
 * Combines {@link MantineAnchor Mantine Anchor} with {@link Link NextJs Link}
 */
export default function Anchor(props: AnchorProps) {
  return <MantineAnchor component={Link} {...props} />;
}
