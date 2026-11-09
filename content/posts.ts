import { photos, type Photo } from "./photos";

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "photos"; photos: Photo[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: Photo;
  blocks: Block[];
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const posts: Post[] = [
  {
    slug: "getting-married-at-copenhagen-city-hall",
    title: "Getting married at Copenhagen City Hall",
    excerpt:
      "Couples come from all over the world to marry at Copenhagen City Hall. Here is what the day looks like, and how to make the most of it.",
    cover: photos.kieranHelleCeremony,
    blocks: [
      {
        type: "paragraph",
        text: "Couples come from all over the world to marry at Copenhagen City Hall. The ceremony is short and simple, and the city around it gives you everything you need for photos afterwards.",
      },
      { type: "heading", text: "Booking your ceremony" },
      { type: "paragraph", text: lorem },
      { type: "paragraph", text: lorem },
      { type: "heading", text: "On the day" },
      {
        type: "paragraph",
        text: "Arrive early. I meet you before the ceremony, photograph it as it happens, and stay close without getting in the way. Afterwards we walk to a few places nearby for portraits, at your pace.",
      },
      { type: "photos", photos: [photos.kieranHelleVeilLaugh, photos.kieranHelleBouquet] },
      { type: "heading", text: "Documents" },
      { type: "paragraph", text: lorem },
    ],
  },
  {
    slug: "where-to-take-wedding-photos-in-copenhagen",
    title: "Where to take wedding photos in Copenhagen",
    excerpt:
      "Old harbours, royal gardens and quiet lakes. A few of my favourite places for portraits after the ceremony.",
    cover: photos.nataliiaEnricoWalk,
    blocks: [
      {
        type: "paragraph",
        text: "Copenhagen is small enough to walk, which makes it ideal for portraits after a ceremony. These are a few places I return to, depending on the light and the time you have.",
      },
      { type: "heading", text: "Nyhavn" },
      {
        type: "paragraph",
        text: "The colourful harbour everyone pictures when they think of Copenhagen. It is busy in the middle of the day, so early mornings are the calmest.",
      },
      { type: "heading", text: "The King's Garden" },
      {
        type: "paragraph",
        text: "Tree-lined paths and the walls of Rosenborg Castle, a few minutes from the centre. Good shade on bright days.",
      },
      { type: "photos", photos: [photos.nataliiaEnricoSquare, photos.nataliiaEnricoKiss] },
      { type: "heading", text: "Frederiksberg Gardens" },
      { type: "paragraph", text: lorem },
      { type: "heading", text: "The Lakes" },
      {
        type: "paragraph",
        text: "A long walk along the water between Nørrebro and the city centre, at its best in the evening light.",
      },
    ],
  },
  {
    slug: "what-to-wear-for-your-elopement-photos",
    title: "What to wear for your elopement photos",
    excerpt: "Comfortable shoes, colours that suit you and the city, and a few things to keep in your pocket.",
    cover: photos.kieranHellePortrait,
    blocks: [
      {
        type: "paragraph",
        text: "Wear what feels like you. The photos you love most will be the ones where you forget about the camera, and that is easier when you are comfortable.",
      },
      { type: "heading", text: "Shoes you can walk in" },
      {
        type: "paragraph",
        text: "We will walk on cobblestones between places. Bring a pair of flat shoes for the walk, even if you change for the ceremony.",
      },
      { type: "heading", text: "Colours" },
      { type: "paragraph", text: lorem },
      { type: "photos", photos: [photos.robertElenaCurls, photos.robertElenaHandsHair] },
      { type: "heading", text: "For the weather" },
      { type: "paragraph", text: lorem },
    ],
  },
];

export function postHref(post: Post) {
  return `/blog/${post.slug}`;
}

export function findPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function nextPost(post: Post) {
  return posts[(posts.indexOf(post) + 1) % posts.length];
}
