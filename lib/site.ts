export const site = {
  name: "Eterna Photography",
  url: "https://eternaphotography.com",
  wordmark: "Eterna",
  photographer: "Edoardo Pallaoro",
  city: "Copenhagen",
  email: "pallaoro.edoardo@gmail.com",
  instagram: {
    handle: "eterna_photography_cph",
    url: "https://www.instagram.com/eterna_photography_cph",
  },
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
