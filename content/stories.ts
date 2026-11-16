import { cms, type Story } from "./cms";

export type { Story };

export const stories = cms.stories;

export const featuredStories = cms.home.featured;

export function coupleName(story: Story) {
  return story.partners.join(" & ");
}

export function storyHref(story: Story) {
  return `/portfolio/${story.id}`;
}

export function findStory(id: string) {
  return stories.find((story) => story.id === id);
}

export function nextStory(story: Story) {
  return stories[(stories.indexOf(story) + 1) % stories.length];
}
