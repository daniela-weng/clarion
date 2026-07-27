import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clarion | Real-world evidence generation in oncology",
  description: "A collaborative network supporting rigorous, privacy-preserving real-world evidence generation in oncology.",
  openGraph: { title: "Clarion", description: "Real-world evidence generation in oncology.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Clarion", description: "Real-world evidence generation in oncology.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
