"use client";

import Link from "next/link";
import { Clips } from "@/components/clips";
import { Figure } from "@/components/figure";
import { Notes } from "@/components/notes";
import { Photos } from "@/components/photos";
import { Releases } from "@/components/releases";
import { useHomeDraft } from "@/components/use-home-draft";
import { site } from "@/content/site";

export function HomeView() {
  const { draft, srcOf, shotOf } = useHomeDraft();
  const portrait = shotOf(draft.portrait);
  const releases = draft.releases.map((release) => ({ ...release, cover: srcOf(release.cover) }));

  return (
    <>
      <header className="rf-head">
        <h1 className="rf-name">{draft.name}</h1>
        <div className="rf-aside">
          <p>{draft.tagline}</p>
          <Link className="rf-btn" href="/about">
            about
          </Link>
        </div>
      </header>

      <div className="rf-portrait">
        <img src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} />
        <div className="rf-cards">
          {draft.cards.map((card) => (
            <a className="rf-card" href={card.href} key={card.id}>
              <i />
              <small>{card.kicker}</small>
              <strong>{card.title}</strong>
              <span>{card.line}</span>
            </a>
          ))}
        </div>
      </div>

      <section className="pillars" aria-label="Sections">
        {draft.pillars.map((pillar) => (
          <a href={pillar.href} key={pillar.id}>
            <b>{pillar.title}</b>
            <p>{pillar.line}</p>
            <span>{pillar.meta}</span>
          </a>
        ))}
      </section>

      {releases.length > 0 ? <Releases items={releases} credit={draft.credit} /> : null}

      <section className="rf-section portal-story" id="experience">
        <p className="portal-label">{draft.portalLabel}</p>
        <div className="portal-pair">
          <h2>{draft.line}</h2>
          <p className="portal-enter">{draft.enter}</p>
        </div>
        <p className="portal-try">{draft.attempt}</p>
        <div className="portal-copy">
          {draft.origin.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`}>{paragraph}</p>
          ))}
        </div>
        <ol className="read-path">
          {draft.states.map((state) => (
            <li key={state.letter}>
              <span>{state.letter}</span>
              <strong>{state.name}</strong>
              <p>{state.note}</p>
            </li>
          ))}
        </ol>
        <div className="portal-covers">
          {releases.map((release) => (
            <a key={release.id} href="#project">
              <img src={release.cover} alt="" width={release.width} height={release.height} />
              <span>{release.title}</span>
            </a>
          ))}
        </div>
        <Notes
          notes={draft.notes.map((note) => ({
            n: note.n,
            kind: note.kind,
            title: note.title,
            body: note.body,
          }))}
        />
      </section>

      <section className="rf-section" id="daylife">
        <div className="room-decks">
          {draft.decks.map((item) => (
            <Figure key={item.id} shot={shotOf(item)} />
          ))}
        </div>
        <p className="rail-label">{draft.practiceLabel}</p>
        <Clips items={[...site.dj.clips, ...site.dj.takes]} />
        <Photos shots={draft.practice.map(shotOf)} />
        <p className="rail-label">{draft.elsewhereLabel}</p>
        <Photos shots={draft.elsewhere.map(shotOf)} />
      </section>
    </>
  );
}
