import { photos, type Photo } from "./photos";

export type Package = {
  name: string;
  priceDkk: number;
  description: string;
  photos: string;
  hours: string;
  photo: Photo;
};

export const packages: Package[] = [
  {
    name: "Essentials",
    priceDkk: 2500,
    description: "For a City Hall ceremony or an intimate elopement. Ceremony coverage and group pictures at the venue.",
    photos: "40 photos",
    hours: "1 hour",
    photo: photos.kieranHelleCeremony,
  },
  {
    name: "Signature",
    priceDkk: 4200,
    description: "For couples who want portraits too. The Essentials plus couple portraits at one nearby location.",
    photos: "75 photos",
    hours: "2 hours",
    photo: photos.kieranHellePortrait,
  },
  {
    name: "City Walk",
    priceDkk: 6800,
    description: "For couples who want to see the city. The Essentials plus a guided portrait walk through 2⁠–⁠3 iconic Copenhagen spots.",
    photos: "150 photos",
    hours: "3⁠–⁠4 hours",
    photo: photos.nataliiaEnricoWalk,
  },
  {
    name: "Full Wedding",
    priceDkk: 14000,
    description: "For the whole day: getting ready, ceremony, reception, couple portraits and group pictures.",
    photos: "400+ photos",
    hours: "8⁠–⁠10 hours",
    photo: photos.kieranHelleTable,
  },
];

export const additionalHourDkk = 2200;

export function formatDkk(amount: number) {
  return `${new Intl.NumberFormat("da-DK").format(amount)} kr.`;
}
