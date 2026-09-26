"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { defaultHomeDraft, type HomeDraft, type HomeShot } from "@/content/home-draft";
import { mediaSrc } from "@/content/cut-draft";
import {
  clearStoredDraft,
  deleteImage,
  fitImage,
  loadHomeDraft,
  putImage,
  resolveDraftImages,
  writeDraftToProject,
  writeStoredDraft,
} from "@/lib/home-store";

function aboutNote(draft: HomeDraft) {
  return draft.notes.find((note) => note.id === "about") ?? draft.notes[draft.notes.length - 1];
}

export function AboutEdit() {
  const [draft, setDraft] = useState<HomeDraft | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("불러오는 중");
  const [writing, setWriting] = useState(false);
  const dirty = useRef(false);
  const urlsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    let cancel = false;
    loadHomeDraft().then(async (next) => {
      const resolved = await resolveDraftImages(next);
      if (cancel) {
        Object.values(resolved).forEach((url) => URL.revokeObjectURL(url));
        return;
      }
      urlsRef.current = resolved;
      setUrls(resolved);
      setDraft(next);
      setStatus(next.updatedAt ? "이 브라우저에 저장된 내용입니다." : "지금 About에 올라간 내용입니다.");
    });
    return () => {
      cancel = true;
      Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (!draft || !dirty.current) return;
    const timer = window.setTimeout(() => {
      writeStoredDraft(draft).then(() => setStatus("이 브라우저에 저장했습니다. About에 바로 반영됩니다."));
    }, 400);
    return () => window.clearTimeout(timer);
  }, [draft]);

  function change(next: HomeDraft) {
    dirty.current = true;
    setDraft(next);
  }

  function preview(src: string) {
    return urls[src] ?? mediaSrc(src);
  }

  async function storeFile(file: File) {
    const fitted = await fitImage(file);
    const id = crypto.randomUUID();
    await putImage(id, fitted.blob);
    const src = `idb:${id}`;
    urlsRef.current = { ...urlsRef.current, [src]: URL.createObjectURL(fitted.blob) };
    setUrls(urlsRef.current);
    return { src, width: fitted.width, height: fitted.height };
  }

  if (!draft) {
    return (
      <div className="edit">
        <p className="edit-status">{status}</p>
      </div>
    );
  }

  const current = draft;
  const note = aboutNote(current);
  const paragraphs = note?.body ?? [];
  const shots = current.aboutShots ?? [];

  function setParagraphs(body: string[]) {
    if (!note) return;
    change({
      ...current,
      notes: current.notes.map((item) => (item.id === note.id ? { ...item, body } : item)),
    });
  }

  return (
    <div className="edit">
      <p className="edit-lead">About</p>
      <h1>About만</h1>
      <p className="edit-hint">제목, 문단, About에 나오는 사진 네 장만 고칩니다. 첫 페이지의 다른 글은 여기서 바뀌지 않습니다.</p>
      <div className="edit-actions">
        <Link className="edit-text" href="/about">
          About 열기
        </Link>
        <button
          type="button"
          className="edit-text"
          disabled={writing}
          onClick={async () => {
            setWriting(true);
            try {
              const saved = await writeDraftToProject(current);
              dirty.current = false;
              const resolved = await resolveDraftImages(saved);
              Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
              urlsRef.current = resolved;
              setUrls(resolved);
              setDraft(saved);
              setStatus("프로젝트 폴더에 저장했습니다. 배포하면 다른 사람에게도 보입니다.");
            } catch (error) {
              setStatus(error instanceof Error ? error.message : "폴더에 저장하지 못했습니다.");
            } finally {
              setWriting(false);
            }
          }}
        >
          {writing ? "저장하는 중" : "프로젝트 폴더에 저장"}
        </button>
        <button
          type="button"
          className="edit-text"
          onClick={async () => {
            if (!window.confirm("이 브라우저의 수정본만 지웁니다. 되돌릴까요?")) return;
            await clearStoredDraft();
            dirty.current = false;
            Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
            urlsRef.current = {};
            setUrls({});
            setDraft(defaultHomeDraft());
            setStatus("처음 내용으로 되돌렸습니다.");
          }}
        >
          처음 내용으로
        </button>
      </div>
      <p className="edit-status">{status}</p>

      <section className="edit-block">
        <Field label="제목" value={current.aboutTitle || "About"} onChange={(aboutTitle) => change({ ...current, aboutTitle })} />
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <Field
              label={`문단 ${index + 1}`}
              value={paragraph}
              multiline
              onChange={(value) => {
                const body = paragraphs.slice();
                body[index] = value;
                setParagraphs(body);
              }}
            />
            <div className="edit-row">
              <button type="button" className="edit-text" onClick={() => setParagraphs(paragraphs.filter((_, i) => i !== index))}>
                문단 빼기
              </button>
            </div>
          </div>
        ))}
        <div className="edit-row">
          <button type="button" className="edit-text" onClick={() => setParagraphs([...paragraphs, ""])}>
            문단 추가
          </button>
        </div>
      </section>

      <section className="edit-block">
        <h2>사진</h2>
        {shots.map((shot, index) => (
          <div key={shot.id}>
            <div className="edit-photo">
              <img src={preview(shot.src)} alt="" width={112} height={112} />
              <div>
                <Field
                  label="설명"
                  value={shot.caption}
                  onChange={(caption) => {
                    const aboutShots = shots.slice();
                    aboutShots[index] = { ...shot, caption };
                    change({ ...current, aboutShots });
                  }}
                />
                <label className="edit-file">
                  사진 바꾸기
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      if (!file) return;
                      storeFile(file)
                        .then(async (stored) => {
                          if (shot.src.startsWith("idb:")) await deleteImage(shot.src.slice(4));
                          const aboutShots = shots.slice();
                          aboutShots[index] = { ...shot, ...stored };
                          change({ ...current, aboutShots });
                        })
                        .catch((error: unknown) => {
                          window.alert(error instanceof Error ? error.message : "사진을 읽지 못했습니다.");
                        });
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const id = useId();
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea id={id} value={value} rows={4} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input id={id} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
