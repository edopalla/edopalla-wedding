import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons/Heart";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const story = defineType({
  name: "story",
  title: "Couple",
  type: "document",
  icon: HeartIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "partnerOne", title: "First name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "partnerTwo", title: "Second name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      options: {
        source: (doc) => `${doc.partnerOne ?? ""} and ${doc.partnerTwo ?? ""}`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover photo",
      type: "photo",
      description: "Shown on the portfolio page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Photos and videos",
      type: "mediaGallery",
      description: "Drag to reorder. The first two also appear on the homepage.",
      validation: (rule) => rule.required().min(2),
    }),
    orderRankField({ type: "story" }),
  ],
  preview: {
    select: { one: "partnerOne", two: "partnerTwo", media: "cover" },
    prepare: ({ one, two, media }) => ({ title: [one, two].filter(Boolean).join(" & "), media }),
  },
});
