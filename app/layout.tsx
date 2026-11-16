import type { Metadata, Viewport } from "next";
import { Gilda_Display, Schibsted_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const display = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin"],
  weight: "400",
});

const text = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.city} elopement and wedding photographer | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: site.shareImage ? [site.shareImage.src] : undefined,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} antialiased`}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
