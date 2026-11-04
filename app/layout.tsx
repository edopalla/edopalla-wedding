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

const description = `${site.photographer} photographs elopements and weddings in ${site.city}, from intimate City Hall ceremonies to the full day. See the work and packages, and check your date.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.city} elopement and wedding photographer | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    title: site.name,
    description,
    images: ["/photos/kieran-helle-sunflowers.jpg"],
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
