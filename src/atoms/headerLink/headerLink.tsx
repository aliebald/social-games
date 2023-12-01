"use client";

import LinkButton from "../linkButton/linkButton";
import { usePathname } from "next/navigation";

interface HeaderButtonProps {
  label: string;
  href: string;
  className?: string;
}

export default function HeaderLink({
  label,
  href,
  className,
}: HeaderButtonProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <LinkButton
      size="sm"
      variant="plain"
      color="neutral"
      href={href}
      sx={{ ml: "auto" }}
      aria-pressed={active}
      className={className}
    >
      {label}
    </LinkButton>
  );
}
