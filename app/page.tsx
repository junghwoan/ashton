import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "@/components/figure";
import { Frame } from "@/components/frame";
import { Notes } from "@/components/notes";
import { Photos } from "@/components/photos";
import { Releases } from "@/components/releases";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

const practiceShots = [
  site.dj.green,
  site.dj.portrait,
  site.dj.portrait2,
  site.dj.screen,
  site.dj.screen2,
  ...site.dj.gear,
  ...site.dj.booth,
];

export default function Page() {
  return (
    <Frame>
      <header className="rf-head">
        <h1 className="rf-name">DJ TY</h1>
        <div className="rf-aside">
          <p>Bedroom DJ. R&amp;B, American pop, house.</p>
          <Link className="rf-btn" href="/about">
            about
          </Link>
        </div>
      </header>

      <div className="rf-portrait">
        <img
          src={site.dj.portrait2.src}
          alt={site.dj.portrait2.alt}
          width={site.dj.portrait2.width}
          height={site.dj.portrait2.height}
        />
        <div className="rf-cards">
          <a className="rf-card" href="#project">
            <i />
            <small>latest release</small>
            <strong>Vol.5 Time of Flow</strong>
            <span>Reading Portal. 2026.</span>
          </a>
          <a className="rf-card" href="#experience">
            <i />
            <small>note</small>
            <strong>Listening is Reading.</strong>
            <span>My uncle inspired it.</span>
          </a>
          <a className="rf-card" href="#daylife">
            <i />
            <small>practice</small>
            <strong>At home.</strong>
            <span>Self-taught. Home, and a cafe.</span>
          </a>
        </div>
      </div>

      <section className="pillars" aria-label="Sections">
        <a href="#project">
          <b>Project.</b>
          <p>The volumes.</p>
          <span>five, 2026</span>
        </a>
        <a href="#experience">
          <b>Experience.</b>
          <p>The notes.</p>
          <span>three</span>
        </a>
        <a href="#daylife">
          <b>Daylife.</b>
          <p>The photos.</p>
          <span>twenty-seven</span>
        </a>
      </section>

      <Releases items={site.portal.releases} />

      <section className="rf-section portal-story" id="experience">
        <p className="portal-label">Reading Portal</p>
        <div className="portal-pair">
          <h2>{site.portal.line}</h2>
          <p className="portal-enter">{site.portal.enter}</p>
        </div>
        <p className="portal-try">{site.portal.attempt}</p>
        <div className="portal-copy">
          {site.portal.origin.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ol className="read-path">
          {site.portal.states.map((state) => (
            <li key={state.letter}>
              <span>{state.letter}</span>
              <strong>{state.name}</strong>
              <p>{state.note}</p>
            </li>
          ))}
        </ol>
        <div className="portal-covers">
          {site.portal.releases.map((release) => (
            <a key={release.id} href="#project">
              <img src={release.cover} alt="" width={release.width} height={release.height} />
              <span>{release.title}</span>
            </a>
          ))}
        </div>
        <Notes
          notes={[
            {
              n: "02",
              kind: "research",
              title: site.research.title,
              body: site.research.paragraphs,
            },
            {
              n: "03",
              kind: "note",
              title: "Ashton",
              body: site.about.paragraphs,
            },
          ]}
        />
      </section>

      <section className="rf-section" id="daylife">
        <div className="room-decks">
          <Figure shot={site.dj.deck} />
          <Figure shot={site.dj.deck2} />
        </div>
        <p className="rail-label">Practice</p>
        <Photos shots={practiceShots} />
        <p className="rail-label">Elsewhere</p>
        <Photos shots={site.pictures.shots} />
      </section>
    </Frame>
  );
}
