import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { assetPath } from "@/lib/paths";

const heading = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "Handyman HAFIZ | Ilford Home Improvements — Design Concept",
  description: "Independent website concept for Handyman HAFIZ in Goodmayes, Ilford. Explore furniture assembly, carpentry, fitting and home improvement services.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Handyman HAFIZ — A little help. A better home.",
    description: "An independent design concept for handyman and home improvement services in Goodmayes and Ilford.",
    type: "website", locale: "en_GB", images: [{ url: assetPath("/images/kitchen.jpg"), alt: "Illustrative kitchen photograph; not a business project" }],
  },
};
export const viewport: Viewport = { themeColor: "#1F2933" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB" className={`${heading.variable} ${body.variable}`}><body>{children}</body></html>;
}
