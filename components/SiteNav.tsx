"use client";

import { Archive, CalendarDays, Gamepad2, Library, Route } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/text";

const links = [
  { href: "/", label: "Library", icon: Library },
  { href: "/use-cases", label: "Use Cases", icon: Gamepad2 },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/tracks", label: "Tracks", icon: Route }
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <Link className="site-nav__brand" href="/" aria-label="Lab Library home">
        <Archive aria-hidden="true" size={20} />
        <span>Lab Library</span>
      </Link>
      <nav className="site-nav__links" aria-label="Primary navigation">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              className={cx("site-nav__link", active && "site-nav__link--active")}
              href={href}
              key={href}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
