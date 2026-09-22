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

const letters = ["D", "J", "T", "Y"];

const practiceShots = [site.dj.green, site.dj.portrait, site.dj.portrait2, site.dj.screen, site.dj.screen2];

export default function Page() {
  return (
    <Frame>
      <header className="rf-head">
        <h1 className="rf-name" aria-label="DJ TY">
          {letters.map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </h1>
        <div className="rf-aside">
          <p>{site.dj.paragraphs[0]}</p>
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
          <a className="rf-card" href="#audio">
            <i />
            <small>latest release</small>
            <strong>Vol.5 Time of Flow</strong>
            <span>Reading Portal. 2026.</span>
          </a>
          <a className="rf-card" href="#writing">
            <i />
            <small>note</small>
            <strong>Listening is Reading.</strong>
            <span>My uncle inspired it.</span>
          </a>
          <a className="rf-card" href="#visual">
            <i />
            <small>practice</small>
            <strong>At home.</strong>
            <span>Self-taught. Home, and a cafe.</span>
          </a>
        </div>
      </div>

      <section className="pillars" aria-label="Sections">
        <a href="#audio">
          <b>Audio</b>
          <p>The volumes.</p>
          <span>five, 2026</span>
        </a>
        <a href="#writing">
          <b>Written</b>
          <p>Notes.</p>
          <span>three</span>
        </a>
        <a href="#visual">
          <b>Visual</b>
          <p>Photos.</p>
          <span>eleven, and a video</span>
        </a>
      </section>

      <Releases items={site.portal.releases} />

      <section className="rf-section" id="writing">
        <Notes
          notes={[
            {
              n: "01",
              kind: "music",
              title: "Reading Portal",
              body: [
                ...site.portal.origin,
                ...site.portal.states.map((state) => `${state.name}. ${state.note}`),
              ],
            },
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

      <section className="rf-section" id="visual">
        <div className="room">
          <figure className="practice">
            <video
              controls
              playsInline
              preload="metadata"
              poster={site.dj.video.poster}
              width={720}
              height={1280}
            >
              <source src={site.dj.video.src} type="video/mp4" />
            </video>
            <figcaption>{site.dj.video.caption}</figcaption>
          </figure>
          <div className="room-decks">
            <Figure shot={site.dj.deck} />
            <Figure shot={site.dj.deck2} />
          </div>
        </div>
        <p className="rail-label">Practice</p>
        <Photos shots={practiceShots} />
        <p className="rail-label">Elsewhere</p>
        <Photos shots={site.pictures.shots} />
      </section>
    </Frame>
  );
}
