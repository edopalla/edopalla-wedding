import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes, singletonTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "eterna",
  title: "Eterna",
  projectId: "1a8x4j3x",
  dataset: "production",
  plugins: [structureTool({ structure }), media(), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
