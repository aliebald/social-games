"use client";

import styles from "./headerLink.module.css";
import classNames from "classnames";
import Link from "next/link";
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
    <Link
      href={href}
      className={classNames(className, styles.headerLink, {
        [styles.active]: active,
      })}
    >
      {label}
    </Link>
  );
}
