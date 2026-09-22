"use client";

import { useState } from "react";

type Note = { n: string; kind: string; title: string; body: readonly string[] };

function Card({ note, feature = false }: { note: Note; feature?: boolean }) {
  const [open, setOpen] = useState(false);
  const snippet = note.body[0] ?? "";
  const rest = note.body.slice(1);

  return (
    <article className={feature ? "wcard is-feature" : "wcard"}>
      <div className="wcard-top">
        <span>({note.n})</span>
        <small>
          <i />
          {note.kind}
        </small>
      </div>
      <h2>{note.title}</h2>
      <p>{snippet}</p>
      {open &&
        rest.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      {rest.length > 0 && (
        <button type="button" className="underlink" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? "close" : "read more"}
        </button>
      )}
    </article>
  );
}

export function Notes({ notes }: { notes: readonly Note[] }) {
  const [feature, ...side] = notes;
  if (!feature) return null;

  return (
    <div className="writing-grid">
      <Card note={feature} feature />
      <div className="writing-side">
        {side.map((note) => (
          <Card key={note.n} note={note} />
        ))}
      </div>
    </div>
  );
}
