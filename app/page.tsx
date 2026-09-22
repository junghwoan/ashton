import type { Metadata } from "next";
import { Figure } from "@/components/figure";
import { Frame } from "@/components/frame";
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
          <p className="kicker">In progress</p>
          <h2 id="portal-title">{site.portal.title}</h2>
          <p className="question">Can sound change the way we read, focus, and think?</p>
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
          <div className="copy">
            {site.portal.experiment.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ol className="method">
            {site.portal.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <article className="session" aria-labelledby="session-title">
            <p className="kicker">{site.portal.session.code}</p>
            <h3 id="session-title">{site.portal.session.title}</h3>
            <p>{site.portal.session.status}</p>
            <div className="wave" aria-hidden="true">
              <span />
            </div>
            <p id="no-audio" className="wave-note">No audio yet.</p>
            <dl className="rows">
              {site.portal.session.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <button type="button" disabled aria-describedby="no-audio">
              Play
            </button>
          </article>
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
