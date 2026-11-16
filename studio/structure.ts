import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { BookIcon } from "@sanity/icons/Book";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HeartIcon } from "@sanity/icons/Heart";
import { HomeIcon } from "@sanity/icons/Home";
import { TagIcon } from "@sanity/icons/Tag";
import { UserIcon } from "@sanity/icons/User";

export const structure: StructureResolver = (S, context) => {
  const singleton = (type: string, title: string, icon: typeof CogIcon) =>
    S.listItem().title(title).icon(icon).id(type).child(S.document().schemaType(type).documentId(type).title(title));

  return S.list()
    .title("Website")
    .items([
      singleton("home", "Homepage", HomeIcon),
      orderableDocumentListDeskItem({ type: "story", title: "Portfolio", icon: HeartIcon, S, context }),
      S.listItem()
        .title("Packages")
        .icon(TagIcon)
        .child(
          S.list()
            .title("Packages")
            .items([
              orderableDocumentListDeskItem({ type: "package", title: "Packages", icon: TagIcon, S, context }),
              singleton("packagesPage", "Packages page", DocumentTextIcon),
            ]),
        ),
      S.documentTypeListItem("post").title("Blog").icon(BookIcon),
      singleton("about", "About", UserIcon),
      singleton("contact", "Contact", EnvelopeIcon),
      S.divider(),
      singleton("settings", "Site settings", CogIcon),
    ]);
};
