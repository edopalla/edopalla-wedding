import { photos, type Photo } from "./photos";

export type Story = {
  id: string;
  partners: [string, string];
  cover: Photo;
  photos: Photo[];
};

export function coupleName(story: Story) {
  return story.partners.join(" & ");
}

export function storyHref(story: Story) {
  return `/portfolio/${story.id}`;
}

export const stories: Story[] = [
  {
    id: "kieran-and-helle",
    partners: ["Kieran", "Helle"],
    cover: photos.kieranHelleSunflowers,
    photos: [
      photos.kieranHelleVeilLaugh,
      photos.kieranHelleBouquet,
      photos.kieranHelleSunflowers,
      photos.kieranHellePortrait,
      photos.kieranHelleCeremony,
      photos.kieranHelleTable,
    ],
  },
  {
    id: "nataliia-and-enrico",
    partners: ["Nataliia", "Enrico"],
    cover: photos.nataliiaEnricoSquare,
    photos: [photos.nataliiaEnricoSquare, photos.nataliiaEnricoKiss, photos.nataliiaEnricoWalk],
  },
  {
    id: "robert-and-elena",
    partners: ["Robert", "Elena"],
    cover: photos.robertElenaHandsHair,
    photos: [photos.robertElenaCurls, photos.robertElenaHandsHair, photos.robertElenaForeheads],
  },
];

export function findStory(id: string) {
  return stories.find((story) => story.id === id);
}

export function nextStory(story: Story) {
  return stories[(stories.indexOf(story) + 1) % stories.length];
}
