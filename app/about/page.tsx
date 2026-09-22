import type { Metadata } from "next";
import { Figure } from "@/components/figure";
import { Frame } from "@/components/frame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About — DJ TY",
  description: "Ashton. Where I live, Abibu, research, and a weekend job.",
};

export default function AboutPage() {
  return (
    <Frame>
      <section className="chapter about-page">
        <div className="wrap">
          <h1>{site.about.title}</h1>
          <div className="copy">
            {site.about.paragraphs.map((paragraph) => (
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
    </Frame>
  );
}
