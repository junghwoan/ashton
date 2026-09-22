import type { Metadata } from "next";
import { Figure } from "@/components/figure";
import { Frame } from "@/components/frame";
import { Releases } from "@/components/releases";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function Page() {
  return (
    <Frame>
      <section className="hero" id="top">
        <div className="wrap">
          <p className="kicker">Amateur</p>
          <h1 className="wordmark">DJ TY</h1>
          <p className="genres">R&amp;B · American pop · House</p>
        </div>
      </section>

      <section className="chapter play" aria-label="Practice footage">
        <div className="wrap">
          <figure className="figure video-block">
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
        </div>
      </section>

      <section className="chapter" id={site.research.id} aria-labelledby="research-title">
        <div className="wrap">
          <h2 id="research-title">{site.research.title}</h2>
          <div className="copy">
            {site.research.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter" id={site.portal.id} aria-labelledby="portal-title">
        <div className="wrap">
          <h2 id="portal-title">{site.portal.title}</h2>
          <Releases items={site.portal.releases} />
          <div className="copy">
            {site.portal.origin.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ol className="read">
            {site.portal.states.map((state) => (
              <li key={state.letter}>
                <span>{state.letter}</span>
                <div>
                  <strong>{state.name}</strong>
                  <p>{state.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chapter" id="practice" aria-labelledby="dj-title">
        <div className="wrap">
          <h2 id="dj-title">DJ TY</h2>
          <p className="kicker">Practice</p>
          <div className="copy hero-copy">
            {site.dj.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="stack">
            <Figure shot={site.dj.portrait} />
            <div className="pair">
              <Figure shot={site.dj.portrait2} />
              <Figure shot={site.dj.deck} />
            </div>
            <div className="pair">
              <Figure shot={site.dj.deck2} />
              <Figure shot={site.dj.screen} />
            </div>
            <Figure shot={site.dj.screen2} />
          </div>
        </div>
      </section>
    </Frame>
  );
}
