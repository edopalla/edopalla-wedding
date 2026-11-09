import Link from "next/link";
import { PackageList } from "../package-list";
import { SectionHeading } from "../section-heading";

export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="page-grid py-(--section)">
      <SectionHeading id="packages-title">Packages</SectionHeading>
      <PackageList />
      <Link
        href="/packages"
        className="link-underline col-span-12 mt-6 justify-self-start font-display text-display-sm"
      >
        How booking works
      </Link>
    </section>
  );
}
