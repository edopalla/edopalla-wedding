import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "public/photos");
const outputDir = path.join(sourceDir, "variants");
const quality = 78;

const { deviceSizes, imageSizes } = JSON.parse(
  await readFile(path.join(root, "lib/image-widths.json"), "utf8"),
);
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

async function isFresh(output, sourceTime) {
  try {
    return (await stat(output)).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
}

async function writeVariants(file) {
  const source = path.join(sourceDir, file);
  const name = path.parse(file).name;
  const sourceTime = (await stat(source)).mtimeMs;
  const { width: sourceWidth } = await sharp(source).metadata();
  let written = 0;

  for (const width of widths) {
    const output = path.join(outputDir, `${name}-${width}.webp`);
    if (await isFresh(output, sourceTime)) continue;
    await sharp(source)
      .resize({ width: Math.min(width, sourceWidth), withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    written += 1;
  }

  return written;
}

await mkdir(outputDir, { recursive: true });
const photos = (await readdir(sourceDir)).filter((file) => /\.(jpe?g|png)$/i.test(file));
const counts = await Promise.all(photos.map(writeVariants));
const total = counts.reduce((sum, count) => sum + count, 0);

console.log(`Image variants: ${total} written, ${photos.length * widths.length - total} up to date.`);
