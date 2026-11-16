import { defineArrayMember, defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons/Play";
import { BatchUploadInput } from "../components/BatchUploadInput";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description",
      type: "string",
      description: "What the photo shows, for screen readers and search engines.",
      validation: (rule) => rule.warning().required(),
    }),
  ],
});

export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "file",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Description",
      type: "string",
      description: "What the video shows, for screen readers.",
    }),
  ],
  preview: {
    select: { title: "alt", filename: "file.asset.originalFilename" },
    prepare: ({ title, filename }) => ({ title: title || filename || "Video", media: PlayIcon }),
  },
});

export const mediaGallery = defineType({
  name: "mediaGallery",
  title: "Photos and videos",
  type: "array",
  of: [defineArrayMember({ type: "photo" }), defineArrayMember({ type: "video" })],
  options: { layout: "grid" },
  components: { input: BatchUploadInput },
});
