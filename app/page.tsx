import type { Metadata } from "next";
import Link from "next/link";
import { Photos } from "@/components/photos";
import { Releases } from "@/components/releases";
import { Frame } from "@/components/frame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

const letters = ["D", "J", ".", "T", "Y"];

const photos = [
  site.dj.green,
  site.dj.portrait,
  site.dj.portrait2,
  site.dj.deck,
  site.dj.deck2,
  site.dj.screen,
  site.dj.screen2,
  ...site.pictures.shots,
];

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
          <p>Bedroom DJ. R&amp;B, American pop, house.</p>
          <Link className="rf-btn" href="/about">
            about
          </Link>
        </div>
      </header>

      <div className="rf-portrait">
        <img
          src={site.dj.portrait.src}
          alt={site.dj.portrait.alt}
          width={site.dj.portrait.width}
          height={site.dj.portrait.height}
        />
        <div className="rf-cards">
          <a className="rf-card" href="#audio">
            <i />
            <small>latest release</small>
            <strong>Vol.5 Time of Flow</strong>
            <span>Reading Portal. Composed and mixed by DJ TY.</span>
          </a>
          <a className="rf-card" href="#writing">
            <i />
            <small>note</small>
            <strong>Listening is Reading.</strong>
            <span>My uncle inspired it. I released the volumes.</span>
          </a>
          <a className="rf-card" href="#visual">
            <i />
            <small>practice</small>
            <strong>At home.</strong>
            <span>Self-taught. The set is in the room.</span>
          </a>
        </div>
      </div>

      <section className="pillars" aria-label="Sections">
        <a href="#audio">
          <b>A U D I O</b>
          <p>The volumes.</p>
          <span>view all</span>
        </a>
        <a href="#writing">
          <b>W R I T T E N</b>
          <p>Notes.</p>
          <span>view all</span>
        </a>
        <a href="#visual">
          <b>V I S U A L</b>
          <p>Photos.</p>
          <span>view all</span>
        </a>
      </section>

      <Releases items={site.portal.releases} />

      <section className="rf-section writing" id="writing">
        <article>
          <span>(01)</span>
          <small>music</small>
          <h2>Reading Portal</h2>
          {site.portal.origin.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="read-line">
            {site.portal.states.map((state) => state.name).join(". ")}.
          </p>
        </article>
        <article>
          <span>(02)</span>
          <small>research</small>
          <h2>{site.research.title}</h2>
          {site.research.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article>
          <span>(03)</span>
          <small>practice</small>
          <h2>DJ TY</h2>
          {site.dj.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article>
          <span>(04)</span>
          <small>work</small>
          <h2>{site.work.title}</h2>
          {site.work.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{site.abibu.paragraphs[0]}</p>
        </article>
      </section>

      <section className="rf-section" id="visual">
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
        <Photos shots={photos} />
      </section>
    </Frame>
  );
}
