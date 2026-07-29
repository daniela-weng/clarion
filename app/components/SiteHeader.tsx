"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../content";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Clarion home">CLARION</Link>
      <nav aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link
          className="nav-contact"
          href="/contact"
          aria-current={isActive("/contact") ? "page" : undefined}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
