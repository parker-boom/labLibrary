"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type RouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
  replace?: boolean;
  scroll?: boolean;
};

export function RouteLink({
  children,
  href,
  target,
  ...props
}: RouteLinkProps) {
  return (
    <Link href={href} target={target} {...props}>
      {children}
    </Link>
  );
}
