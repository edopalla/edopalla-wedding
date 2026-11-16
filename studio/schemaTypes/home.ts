import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

export const home = defineType({
  name: "home",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({ name: "heroImage", title: "Cover photo", type: "photo", validation: (rule) => rule.required() }),
    defineField({
      name: "heroImageMobile",
      title: "Cover photo on mobile",
      type: "photo",
      description: "Optional. Shown on phones and on tablets held upright. Leave empty to use the cover photo everywhere.",
    }),
    defineField({
      name: "heroTitle",
      title: "Cover heading",
      type: "text",
      rows: 2,
      description: "Start a new line to break the heading.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredStories",
      title: "Couples on the homepage",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "story" }] })],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
