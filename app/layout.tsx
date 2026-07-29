import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Clarion | Real-world evidence generation in oncology",
    template: "%s | Clarion",
  },
  description: "A collaborative network supporting rigorous, privacy-preserving real-world evidence generation in oncology.",
  openGraph: { title: "Clarion", description: "Real-world evidence generation in oncology.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Clarion", description: "Real-world evidence generation in oncology.", images: ["/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
