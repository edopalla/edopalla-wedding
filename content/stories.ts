import { photos, type Photo } from "./photos";

export type Story = {
  id: string;
  partners: [string, string];
  main: Photo;
  detail: Photo;
};

export function coupleName(story: Story) {
  return story.partners.join(" & ");
}

export const stories: Story[] = [
  {
    id: "kieran-and-helle",
    partners: ["Kieran", "Helle"],
    main: photos.kieranHelleVeilLaugh,
    detail: photos.kieranHelleBouquet,
  },
  {
    id: "nataliia-and-enrico",
    partners: ["Nataliia", "Enrico"],
    main: photos.nataliiaEnricoSquare,
    detail: photos.nataliiaEnricoKiss,
  },
  {
    id: "robert-and-elena",
    partners: ["Robert", "Elena"],
    main: photos.robertElenaCurls,
    detail: photos.robertElenaHandsHair,
  },
];
