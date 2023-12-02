import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

interface LinkButtonProps extends Omit<ButtonProps, "component"> {
  href: string;
}

function LinkButton(
  props: LinkButtonProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return <Button component={Link} {...props} ref={ref} />;
}

export default forwardRef<HTMLAnchorElement, LinkButtonProps>(LinkButton);
