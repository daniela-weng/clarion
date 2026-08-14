import Link from "next/link";
import { navLinks } from "../content";

export function SiteFooter() {
  return (
    <footer>
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link className="wordmark" href="/">CLARION</Link>
          <p className="footer-statement">
            <span>A collaborative network supporting rigorous, privacy-preserving</span>{" "}
            <span>real-world evidence generation in oncology.</span>
          </p>
          <p className="footer-coord"><span>Coordinating center</span> Yale University</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Clarion</span>
          <span>Collaborative oncology research network</span>
        </div>
      </div>
    </footer>
  );
}
