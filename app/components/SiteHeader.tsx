"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../content";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    // Hysteresis: turn on past 24px, off only under 4px, so the state cannot flicker at one edge.
    const updateHeader = () => setIsScrolled((was) => (was ? window.scrollY > 4 : window.scrollY > 24));
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled} data-theme="dark">
      <div className="site-header-inner">
        <Link className="wordmark" href="/" aria-label="Clarion home">
          <Image
            className="brand-mark"
            src="/images/clarion-mark.svg"
            alt=""
            width="40"
            height="40"
          />
          <span>CLARION</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav className="primary-nav" id="primary-navigation" aria-label="Primary navigation" data-open={isOpen}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
