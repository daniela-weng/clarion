import Link from "next/link";
import { navLinks } from "../content";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <Link className="wordmark" href="/">CLARION</Link>
        <p>A collaborative network supporting rigorous, privacy-preserving real-world evidence generation in oncology.</p>
      </div>
      <div className="footer-links">
        <nav className="footer-nav" aria-label="Footer navigation">
          {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-center">
          <strong>Coordinating center</strong>
          <span>Yale University</span>
          <Link href="/governance">Governance &amp; privacy</Link>
        </div>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Clarion</span>
        <span>Collaborative oncology research network</span>
      </div>
    </footer>
  );
}
