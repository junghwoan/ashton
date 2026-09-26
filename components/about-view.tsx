"use client";

import { Figure } from "@/components/figure";
import { useHomeDraft } from "@/components/use-home-draft";
import { site } from "@/content/site";

export function AboutView() {
  const { draft, shotOf } = useHomeDraft();
  const about = draft.notes.find((note) => note.id === "about");
  const paragraphs = about?.body.length ? about.body : [...site.about.paragraphs];
  const shots = (draft.aboutShots?.length ? draft.aboutShots : draft.elsewhere).slice(0, 4);

  return (
    <section className="chapter about-page">
      <div className="wrap">
        <h1>{draft.aboutTitle || site.about.title}</h1>
        <div className="copy">
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`}>{paragraph}</p>
          ))}
        </div>
        <div className="stack">
          <div className="pair">
            {shots.slice(0, 2).map((item) => (
              <Figure key={item.id} shot={shotOf(item)} />
            ))}
          </div>
          <div className="pair">
            {shots.slice(2, 4).map((item) => (
              <Figure key={item.id} shot={shotOf(item)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
