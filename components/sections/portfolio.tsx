import { coupleName, stories, type Story } from "@/content/stories";
import { NameStage } from "../name-stage";
import { PhotoFrame } from "../photo-frame";

function Couple({ story, index }: { story: Story; index: number }) {
  const detailSide = index % 2 === 0 ? "self-end" : "self-start";

  return (
    <article data-couple className="flex flex-col">
      <h3 className="sr-only">{coupleName(story)}</h3>
      <PhotoFrame photo={story.main} shape="landscape" sizes="(min-width: 768px) 42vw, 46vw" />
      <PhotoFrame
        photo={story.detail}
        shape="portrait"
        sizes="(min-width: 768px) 18vw, 30vw"
        className={`-mt-[12%] w-[62%] md:w-[42%] ${detailSide}`}
      />
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title">
      <h2 id="portfolio-title" className="sr-only">
        Portfolio
      </h2>
      <NameStage
        couples={stories.map((story) => story.partners)}
        ending={{
          href: "/portfolio",
          label: "View the portfolio",
          words: ["View", "the", "portfolio"],
        }}
      >
        <div className="mx-auto flex w-[46%] flex-col gap-[35svh] py-[45svh] md:w-[42%]">
          {stories.map((story, index) => (
            <Couple key={story.id} story={story} index={index} />
          ))}
        </div>
      </NameStage>
    </section>
  );
}
