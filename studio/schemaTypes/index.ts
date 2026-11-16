import { home } from "./home";
import { mediaGallery, photo, video } from "./media";
import { weddingPackage } from "./package";
import { about, contact, packagesPage } from "./pages";
import { gallery, post } from "./post";
import { settings } from "./settings";
import { story } from "./story";

export const schemaTypes = [
  photo,
  video,
  mediaGallery,
  gallery,
  settings,
  home,
  story,
  weddingPackage,
  packagesPage,
  post,
  about,
  contact,
];

export const singletonTypes = new Set(["settings", "home", "packagesPage", "about", "contact"]);
