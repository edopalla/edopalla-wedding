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

export const includedInEveryPackage = [
  "A call before the day to plan the timing and the places",
  "Travel within central Copenhagen",
  "Every photo edited by hand",
  "A private online gallery to download and share",
];

export type Step = { title: string; text: string };

export const bookingSteps: Step[] = [
  {
    title: "Check your date",
    text: "Tell me your date, where you are getting married and a little about the two of you. I reply with my availability.",
  },
  {
    title: "Plan the day",
    text: "We talk through the ceremony, the places you would like photos and the timing, so nothing on the day is rushed.",
  },
  {
    title: "Book",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Receive your photos",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
];

export type Question = { question: string; answer: string };

export const questions: Question[] = [
  {
    question: "Can you photograph a last-minute City Hall wedding?",
    answer: "Often, yes. Write to me with your date and time and I will tell you straight away if I am free.",
  },
  {
    question: "What happens on the day?",
    answer:
      "I arrive before the ceremony, photograph it as it happens, and then we take a short walk for portraits nearby. You never need to pose for long.",
  },
  {
    question: "Is there a booking fee?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    question: "When will we get our photos?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
  },
  {
    question: "Will you post our photos online?",
    answer: "Only with your permission. If you would rather keep them private, just tell me.",
  },
  {
    question: "Can we add more time on the day?",
    answer: `Yes. Additional hours are ${formatDkk(additionalHourDkk)}, and we can decide on the day.`,
  },
];
