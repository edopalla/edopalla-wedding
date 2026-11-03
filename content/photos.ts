import type { StaticImageData } from "next/image";
import kieranHelleSunflowers from "@/public/photos/kieran-helle-sunflowers.jpg";
import kieranHelleVeilLaugh from "@/public/photos/kieran-helle-veil-laugh.jpg";
import kieranHelleBouquet from "@/public/photos/kieran-helle-bouquet.jpg";
import kieranHelleCeremony from "@/public/photos/kieran-helle-ceremony.jpg";
import kieranHellePortrait from "@/public/photos/kieran-helle-portrait.jpg";
import kieranHelleTable from "@/public/photos/kieran-helle-table.jpg";
import nataliiaEnricoSquare from "@/public/photos/nataliia-enrico-square.jpg";
import nataliiaEnricoKiss from "@/public/photos/nataliia-enrico-kiss.jpg";
import nataliiaEnricoWalk from "@/public/photos/nataliia-enrico-walk.jpg";
import robertElenaCurls from "@/public/photos/robert-elena-curls.jpg";
import robertElenaHandsHair from "@/public/photos/robert-elena-hands-hair.jpg";
import robertElenaForeheads from "@/public/photos/robert-elena-foreheads.jpg";

export type Photo = { image: StaticImageData; alt: string };

export const photos = {
  kieranHelleSunflowers: {
    image: kieranHelleSunflowers,
    alt: "Helle and Kieran embracing in a garden of sunflowers on a summer afternoon",
  },
  kieranHelleVeilLaugh: {
    image: kieranHelleVeilLaugh,
    alt: "Helle and Kieran laughing together in bright sun, her veil lifting in the wind",
  },
  kieranHelleBouquet: {
    image: kieranHelleBouquet,
    alt: "Kieran's hands holding Helle's wildflower bouquet",
  },
  kieranHelleCeremony: {
    image: kieranHelleCeremony,
    alt: "Kieran and Helle holding hands during their outdoor ceremony, guests looking on",
  },
  kieranHellePortrait: {
    image: kieranHellePortrait,
    alt: "Portrait of Helle and Kieran smiling at each other, her bouquet in hand",
  },
  kieranHelleTable: {
    image: kieranHelleTable,
    alt: "A wedding table set with plates, glasses and place cards in late sunlight",
  },
  nataliiaEnricoSquare: {
    image: nataliiaEnricoSquare,
    alt: "Nataliia holding Enrico's face in an old town square, white peonies over his shoulder",
  },
  nataliiaEnricoKiss: {
    image: nataliiaEnricoKiss,
    alt: "Black and white photograph of Nataliia kissing Enrico's cheek",
  },
  nataliiaEnricoWalk: {
    image: nataliiaEnricoWalk,
    alt: "Nataliia and Enrico walking hand in hand down a cobbled street",
  },
  robertElenaCurls: {
    image: robertElenaCurls,
    alt: "Black and white portrait of Robert and Elena cheek to cheek, her ringed hand on his face",
  },
  robertElenaHandsHair: {
    image: robertElenaHandsHair,
    alt: "Black and white photograph of Elena's ringed hands in Robert's curly hair",
  },
  robertElenaForeheads: {
    image: robertElenaForeheads,
    alt: "Black and white portrait of Robert and Elena resting their foreheads together",
  },
} satisfies Record<string, Photo>;
