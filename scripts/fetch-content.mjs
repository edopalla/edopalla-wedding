import { createHash } from "node:crypto";
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import sharp from "sharp";

const projectId = process.env.SANITY_PROJECT_ID ?? "1a8x4j3x";
const dataset = process.env.SANITY_DATASET ?? "production";
const maxPhotoWidth = 2800;
const maxBundledVideoBytes = 24 * 1024 * 1024;

const root = path.resolve(import.meta.dirname, "..");
const photoDir = path.join(root, "public/photos");
const videoDir = path.join(root, "public/videos");
const outputFile = path.join(root, "content/cms.json");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
  perspective: "published",
});
const imageUrl = createImageUrlBuilder({ projectId, dataset });

const photoFields = `_type, alt, crop, hotspot, asset->{_id, url, metadata{dimensions{width, height}}}`;
const mediaFields = `_type, alt, _type == "photo" => {${photoFields}}, _type == "video" => {"asset": file.asset->{_id, url, extension, size}}`;
const storyFields = `"id": slug.current, "partners": [partnerOne, partnerTwo], cover{${photoFields}}, media[]{${mediaFields}}`;

const query = `{
  "settings": *[_id == "settings"][0]{title, wordmark, photographer, city, email, instagram, description, shareImage{${photoFields}}},
  "home": *[_id == "home"][0]{heroImage{${photoFields}}, heroImageMobile{${photoFields}}, heroTitle, "featured": featuredStories[]->{${storyFields}}},
  "stories": *[_type == "story" && defined(slug.current)] | order(orderRank){${storyFields}},
  "packages": *[_type == "package"] | order(orderRank){name, price, photoCount, duration, description, photo{${photoFields}}},
  "packagesPage": *[_id == "packagesPage"][0]{additionalHourPrice, included, steps[]{title, text}, questions[]{question, answer}},
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title, "slug": slug.current, publishedAt, excerpt, cover{${photoFields}},
    body[]{..., _type == "gallery" => {"items": items[]{${mediaFields}}}}
  },
  "about": *[_id == "about"][0]{photo{${photoFields}}, statement, intro, approach, widePhoto{${photoFields}}, facts[]{label, value}},
  "contact": *[_id == "contact"][0]{title, intro, photo{${photoFields}}}
}`;

const keptFiles = new Set();
const downloads = new Map();

function shortHash(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 10);
}

function hasCrop(crop) {
  return Boolean(crop && (crop.top || crop.bottom || crop.left || crop.right));
}

function objectPosition({ hotspot, crop }) {
  if (!hotspot) return "50% 50%";
  const box = crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const x = (hotspot.x - box.left) / (1 - box.left - box.right);
  const y = (hotspot.y - box.top) / (1 - box.top - box.bottom);
  const percent = (value) => `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%`;
  return `${percent(x)} ${percent(y)}`;
}

async function exists(file) {
  return stat(file).then(
    () => true,
    () => false,
  );
}

async function fetchToFile(url, file) {
  if (await exists(file)) return;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}

function download(url, file) {
  keptFiles.add(file);
  if (!downloads.has(file)) downloads.set(file, fetchToFile(url, file));
  return downloads.get(file);
}

async function localPhoto(photo) {
  if (!photo?.asset) return null;
  const variant = hasCrop(photo.crop) ? `-${shortHash(JSON.stringify(photo.crop))}` : "";
  const name = `${photo.asset._id.replace(/^image-/, "").split("-")[0]}${variant}.jpg`;
  const file = path.join(photoDir, name);
  const url = imageUrl.image(photo).width(maxPhotoWidth).fit("max").format("jpg").quality(90).url();
  await download(url, file);
  const { width, height } = await sharp(file).metadata();
  return { kind: "photo", src: `/photos/${name}`, width, height, alt: photo.alt ?? "", position: objectPosition(photo) };
}

async function localVideo(video) {
  if (!video?.asset) return null;
  if (video.asset.size > maxBundledVideoBytes) return { kind: "video", src: video.asset.url, alt: video.alt ?? "" };
  const name = `${video.asset._id.replace(/^file-/, "").split("-")[0]}.${video.asset.extension}`;
  const file = path.join(videoDir, name);
  await download(video.asset.url, file);
  return { kind: "video", src: `/videos/${name}`, alt: video.alt ?? "" };
}

function localMedia(item) {
  return item?._type === "video" ? localVideo(item) : localPhoto(item);
}

async function localMediaList(items) {
  const media = await Promise.all((items ?? []).map(localMedia));
  return media.filter(Boolean);
}

async function localStory(story) {
  return { id: story.id, partners: story.partners, cover: await localPhoto(story.cover), media: await localMediaList(story.media) };
}

async function localBody(body) {
  return Promise.all(
    (body ?? []).map(async (block) =>
      block._type === "gallery" ? { _type: "gallery", _key: block._key, items: await localMediaList(block.items) } : block,
    ),
  );
}

async function removeUnused(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && !keptFiles.has(path.join(dir, entry.name)))
      .map((entry) => rm(path.join(dir, entry.name))),
  );
}

function required(value, name) {
  if (!value) throw new Error(`Sanity is missing the "${name}" document. Publish it in the Studio and rebuild.`);
  return value;
}

async function main() {
  await mkdir(photoDir, { recursive: true });
  await mkdir(videoDir, { recursive: true });

  const data = await client.fetch(query);
  const settings = required(data.settings, "Site settings");
  const home = required(data.home, "Homepage");
  const about = required(data.about, "About");
  const contact = required(data.contact, "Contact");
  const packagesPage = required(data.packagesPage, "Packages page");

  const content = {
    settings: { ...settings, shareImage: await localPhoto(settings.shareImage) },
    home: {
      heroImage: await localPhoto(home.heroImage),
      heroImageMobile: await localPhoto(home.heroImageMobile),
      heroTitle: home.heroTitle,
      featured: await Promise.all((home.featured ?? []).filter(Boolean).map(localStory)),
    },
    stories: await Promise.all(data.stories.map(localStory)),
    packages: await Promise.all(data.packages.map(async (item) => ({ ...item, photo: await localPhoto(item.photo) }))),
    packagesPage: {
      additionalHourPrice: packagesPage.additionalHourPrice ?? null,
      included: packagesPage.included ?? [],
      steps: packagesPage.steps ?? [],
      questions: packagesPage.questions ?? [],
    },
    posts: await Promise.all(
      data.posts.map(async (post) => ({ ...post, cover: await localPhoto(post.cover), body: await localBody(post.body) })),
    ),
    about: {
      ...about,
      photo: await localPhoto(about.photo),
      widePhoto: await localPhoto(about.widePhoto),
      intro: about.intro ?? [],
      approach: about.approach ?? [],
      facts: about.facts ?? [],
    },
    contact: { ...contact, photo: await localPhoto(contact.photo) },
  };

  await removeUnused(photoDir);
  await removeUnused(videoDir);
  await writeFile(outputFile, `${JSON.stringify(content, null, 2)}\n`);
  console.log(`Content: ${content.stories.length} couples, ${content.posts.length} posts, ${keptFiles.size} media files.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
