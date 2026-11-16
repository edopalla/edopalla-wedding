import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const settings = defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "title", title: "Site name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "wordmark", title: "Logo text", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "photographer", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "city", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", type: "email", validation: (rule) => rule.required() }),
    defineField({ name: "instagram", title: "Instagram link", type: "url" }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      description: "Shown under the site name in search results.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "shareImage",
      title: "Share image",
      type: "photo",
      description: "Shown when the site is shared in messages and on social media.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
