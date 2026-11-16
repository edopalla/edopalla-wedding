import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const weddingPackage = defineType({
  name: "package",
  title: "Package",
  type: "document",
  icon: TagIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Price (kr.)", type: "number", validation: (rule) => rule.required().min(0) }),
    defineField({ name: "photoCount", title: "Photos", type: "string", placeholder: "40 photos" }),
    defineField({ name: "duration", title: "Time", type: "string", placeholder: "1 hour" }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "photo", type: "photo", validation: (rule) => rule.required() }),
    orderRankField({ type: "package" }),
  ],
  preview: {
    select: { title: "name", price: "price", media: "photo" },
    prepare: ({ title, price, media }) => ({ title, subtitle: price ? `${price} kr.` : undefined, media }),
  },
});
