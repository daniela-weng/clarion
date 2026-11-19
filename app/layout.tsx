import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { EB_Garamond, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
// Heading serif. The CSS variable keeps its historical name (--font-fraunces) so existing rules pick it up.
const serif = EB_Garamond({subsets:['latin'],style:['normal','italic'],variable:'--font-fraunces'});

export const metadata: Metadata = {
  title: {
    default: "Clarion Network for AI-Driven Reproducible Real-World Evidence",
    template: "%s | Clarion",
  },
  description: "A national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "Clarion", description: "A national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Clarion", description: "A national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence.", images: ["/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, serif.variable)}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
