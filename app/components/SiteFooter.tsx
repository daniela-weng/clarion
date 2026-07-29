import Link from "next/link";
import { navLinks } from "../content";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <Link className="wordmark" href="/">CLARION</Link>
        <p>Collaborative oncology research network.</p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
        <Link href="/contact">Contact</Link>
      </nav>
      <span>© {new Date().getFullYear()} Clarion</span>
    </footer>
  );
}
