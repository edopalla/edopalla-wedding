import type { NextConfig } from "next";
import imageWidths from "./lib/image-widths.json";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: imageWidths.deviceSizes,
    imageSizes: imageWidths.imageSizes,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
