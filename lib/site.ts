import { cms } from "@/content/cms";

const { settings } = cms;

export const site = {
  name: settings.title,
  url: "https://eternaphotography.com",
  wordmark: settings.wordmark,
  photographer: settings.photographer,
  city: settings.city,
  email: settings.email,
  instagram: settings.instagram,
  description: settings.description,
  shareImage: settings.shareImage,
};

const inquiryBody = ["Date:", "Place:", "About us:"].join("\n\n");

export const emailHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Checking our wedding date",
)}&body=${encodeURIComponent(inquiryBody)}`;

export const inquiryPath = "/contact";

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: inquiryPath },
];

export function isCurrent(item: NavItem, pathname: string) {
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
