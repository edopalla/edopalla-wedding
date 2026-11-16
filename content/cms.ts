import type { PortableTextBlock } from "@portabletext/react";
import data from "./cms.json";

export type Photo = {
  kind: "photo";
  src: string;
  width: number;
  height: number;
  alt: string;
  position: string;
};

export type CoverPhoto = Photo & { top: "bright" | "dark" };

export type Video = { kind: "video"; src: string; alt: string };

export type Media = Photo | Video;

export type Story = {
  id: string;
  partners: [string, string];
  cover: Photo;
  media: Media[];
};

export type Package = {
  name: string;
  price: number;
  photoCount: string | null;
  duration: string | null;
  description: string;
  photo: Photo;
};

export type Gallery = { _type: "gallery"; _key: string; items: Media[] };

export type PostBody = (PortableTextBlock | Gallery)[];

export type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  cover: Photo;
  body: PostBody;
};

type Cms = {
  settings: {
    title: string;
    wordmark: string;
    photographer: string;
    city: string;
    email: string;
    instagram: string | null;
    description: string;
    shareImage: Photo | null;
  };
  home: { heroImage: CoverPhoto; heroImageMobile: CoverPhoto | null; heroTitle: string; featured: Story[] };
  stories: Story[];
  packages: Package[];
  packagesPage: {
    additionalHourPrice: number | null;
    included: string[];
    steps: { title: string; text: string }[];
    questions: { question: string; answer: string }[];
  };
  posts: Post[];
  about: {
    photo: Photo;
    statement: string;
    intro: PortableTextBlock[];
    approach: PortableTextBlock[];
    widePhoto: Photo | null;
    facts: { label: string; value: string }[];
  };
  contact: { title: string; intro: string | null; photo: Photo | null };
};

export const cms = data as unknown as Cms;
