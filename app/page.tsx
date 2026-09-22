import { site } from "@/content/site";

function Figure({
  shot,
}: {
  shot: { src: string; alt: string; width: number; height: number; caption: string };
}) {
  return (
    <figure className="figure">
      <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

export default function Page() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: "Ashton",
    homeLocation: "Seoul",
    knowsLanguage: ["English", "Korean"],
  };

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="nav">
        <a className="brand" href="#top">
          Ashton
        </a>
        <nav aria-label="Sections">
          <div className="nav-links">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="wrap">
            <h1 className="wordmark">Ashton</h1>
          </div>
        </section>

        <section className="chapter" id={site.abibu.id} aria-labelledby="abibu-title">
          <div className="wrap">
            <h2 id="abibu-title">{site.abibu.title}</h2>
            <div className="copy">
              {site.abibu.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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

        <section className="chapter dj" id={site.dj.id} aria-labelledby="dj-title">
          <div className="wrap">
            <h2 id="dj-title">{site.dj.title}</h2>
            <div className="copy">
              {site.dj.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="stack">
              <div className="pair">
                <Figure shot={site.dj.portrait} />
                <Figure shot={site.dj.portrait2} />
              </div>
              <div className="pair">
                <Figure shot={site.dj.deck} />
                <Figure shot={site.dj.deck2} />
              </div>
              <div className="pair">
                <Figure shot={site.dj.screen} />
                <Figure shot={site.dj.screen2} />
              </div>
              <figure className="figure video-block">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={site.dj.video.poster}
                >
                  <source src={site.dj.video.src} type="video/mp4" />
                </video>
                <figcaption>{site.dj.video.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="chapter" id={site.work.id} aria-labelledby="work-title">
          <div className="wrap">
            <h2 id="work-title">{site.work.title}</h2>
            <div className="copy">
              {site.work.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter" id={site.pictures.id} aria-labelledby="pictures-title">
          <div className="wrap">
            <h2 id="pictures-title">{site.pictures.title}</h2>
            <div className="copy">
              {site.pictures.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="stack">
              <div className="pair">
                <Figure shot={site.pictures.shots[0]} />
                <Figure shot={site.pictures.shots[1]} />
              </div>
              <div className="pair">
                <Figure shot={site.pictures.shots[2]} />
                <Figure shot={site.pictures.shots[3]} />
              </div>
            </div>
          </div>
        </section>

        <section className="chapter about" id={site.about.id} aria-labelledby="about-title">
          <div className="wrap">
            <h2 id="about-title">{site.about.title}</h2>
            <div className="copy">
              {site.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>Ashton</span>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
    </>
  );
}
