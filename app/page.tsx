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

      <section className="chapter" aria-label="Practice">
        <div className="wrap">
          <p className="kicker">Practice</p>
          <div className="copy hero-copy">
            {site.dj.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="stack">
            <figure className="figure video-block">
              <video controls playsInline preload="metadata" poster={site.dj.video.poster}>
                <source src={site.dj.video.src} type="video/mp4" />
              </video>
              <figcaption>{site.dj.video.caption}</figcaption>
            </figure>
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
