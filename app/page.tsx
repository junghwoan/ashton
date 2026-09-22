import { site } from "@/content/site";

function Rows({ rows }: { rows: readonly { label: string; value: string }[] }) {
  return (
    <dl className="rows">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Page() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: site.description,
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
            <p className="lede">{site.hero.lede}</p>
            <div className="hero-grid">
              <p className="interests">{site.hero.interests}</p>
              <ol className="index">
                {site.index.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>
                      <span className="num">{item.num}</span>
                      <span className="label">{item.label}</span>
                      <span className="note">{item.note}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="chapter" id={site.abibu.id} aria-labelledby="abibu-title">
          <div className="wrap">
            <p className="chapter-label">
              <span>{site.abibu.num}</span>
              <span>Conversation</span>
            </p>
            <h2 id="abibu-title">{site.abibu.title}</h2>
            <p className="statement">{site.abibu.statement}</p>
            <div className="copy">
              {site.abibu.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter" id={site.research.id} aria-labelledby="research-title">
          <div className="wrap">
            <p className="chapter-label">
              <span>{site.research.num}</span>
              <span>Inquiry</span>
            </p>
            <h2 id="research-title">{site.research.title}</h2>
            <p className="question">{site.research.question}</p>
            <div className="copy">
              {site.research.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Rows rows={site.research.rows} />
          </div>
        </section>

        <section className="chapter dj" id={site.dj.id} aria-labelledby="dj-title">
          <div className="wrap">
            <p className="chapter-label">
              <span>{site.dj.num}</span>
              <span>Practice</span>
            </p>
            <h2 id="dj-title">{site.dj.title}</h2>
            <p className="statement">{site.dj.statement}</p>
            <div className="copy">
              {site.dj.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Rows rows={site.dj.rows} />
            <div className="stack">
              <figure className="figure">
                <img
                  src={site.dj.portrait.src}
                  alt={site.dj.portrait.alt}
                  width={site.dj.portrait.width}
                  height={site.dj.portrait.height}
                />
                <figcaption>{site.dj.portrait.caption}</figcaption>
              </figure>
              <div className="split">
                <figure className="figure">
                  <img
                    src={site.dj.deck.src}
                    alt={site.dj.deck.alt}
                    width={site.dj.deck.width}
                    height={site.dj.deck.height}
                  />
                  <figcaption>{site.dj.deck.caption}</figcaption>
                </figure>
                <figure className="figure screen">
                  <img
                    src={site.dj.screen.src}
                    alt={site.dj.screen.alt}
                    width={site.dj.screen.width}
                    height={site.dj.screen.height}
                  />
                  <figcaption>{site.dj.screen.caption}</figcaption>
                </figure>
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
            <p className="chapter-label">
              <span>{site.work.num}</span>
              <span>Weekends</span>
            </p>
            <h2 id="work-title">{site.work.title}</h2>
            <p className="statement">{site.work.statement}</p>
            <div className="copy">
              {site.work.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter about" id={site.about.id} aria-labelledby="about-title">
          <div className="wrap">
            <p className="chapter-label">
              <span>05</span>
              <span>Person</span>
            </p>
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
          <span>Personal record</span>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
    </>
  );
}
