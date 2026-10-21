import Link from "next/link";
import Image from "next/image";
import { navLinks } from "../content";

export function SiteFooter() {
  return (
    <footer>
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link className="wordmark" href="/" aria-label="Clarion home">
            <Image
              className="brand-mark"
              src="/images/clarion-mark.svg"
              alt=""
              width="36"
              height="36"
            />
            <span>CLARION</span>
          </Link>
          <p className="footer-statement">
            <span>A national, distributed infrastructure to advance high-quality</span>{" "}
            <span>real-world evidence generation using artificial intelligence.</span>
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Clarion</span>
          <span>Clarion Network for AI-Driven Reproducible Real-World Evidence</span>
        </div>
      </div>
    </footer>
  );
}
