import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { UserIcon } from "@sanity/icons/User";

export const packagesPage = defineType({
  name: "packagesPage",
  title: "Packages page",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "additionalHourPrice",
      title: "Additional hours (kr.)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "included",
      title: "Included in every package",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "steps",
      title: "How booking works",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "question",
          fields: [
            defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Packages page" }) },
});

const paragraphs = [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] })];

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "photo", type: "photo", validation: (rule) => rule.required() }),
    defineField({ name: "statement", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "array",
      of: paragraphs,
      description: "Also shown on the homepage.",
    }),
    defineField({ name: "approach", title: "How I work", type: "array", of: paragraphs }),
    defineField({ name: "widePhoto", title: "Wide photo", type: "photo" }),
    defineField({
      name: "facts",
      title: "A few things",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fact",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About" }) },
});

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
    defineField({ name: "photo", type: "photo" }),
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});
