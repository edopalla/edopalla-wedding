import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons/Book";
import { ImagesIcon } from "@sanity/icons/Images";

export const gallery = defineType({
  name: "gallery",
  title: "Photos",
  type: "object",
  icon: ImagesIcon,
  fields: [defineField({ name: "items", title: "Photos and videos", type: "mediaGallery" })],
  preview: {
    select: { items: "items", media: "items.0" },
    prepare: ({ items, media }) => ({
      title: `${(items ?? []).length} photos and videos`,
      media,
    }),
  },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: BookIcon,
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 2,
      description: "Shown on the blog page and in search results.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({ name: "cover", title: "Cover photo", type: "photo", validation: (rule) => rule.required() }),
    defineField({
      name: "body",
      title: "Text",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          lists: [{ title: "Bullets", value: "bullet" }],
        }),
        defineArrayMember({ type: "gallery" }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "cover" } },
});
