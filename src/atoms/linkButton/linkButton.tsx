import Button, { ButtonProps } from "@mui/joy/Button";
import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

interface LinkButtonProps extends Omit<ButtonProps<"a">, "component"> {
  href: string;
}

function LinkButton(
  props: LinkButtonProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return <Button component={Link} {...props} ref={ref} />;
}

export default forwardRef<HTMLAnchorElement, LinkButtonProps>(LinkButton);
