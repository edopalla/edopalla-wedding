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

export const inquiryHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Checking our wedding date",
)}&body=${encodeURIComponent(inquiryBody)}`;

export type NavItem = { label: string; section?: string; href?: string };

export const navigation: NavItem[] = [
  { label: "Portfolio", section: "portfolio" },
  { label: "Packages", section: "packages" },
  { label: "Blog", href: "#" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

export function navHref(item: NavItem, onHome: boolean) {
  if (item.href) return item.href;
  return onHome ? `#${item.section}` : `/#${item.section}`;
}
