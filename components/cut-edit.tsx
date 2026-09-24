"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  defaultCutDraft,
  mediaSrc,
  type CutDraft,
  type CutRelease,
  type CutShot,
  type CutTrack,
} from "@/content/cut-draft";
import {
  clearStoredDraft,
  deleteImage,
  fitImage,
  loadCutDraft,
  putImage,
  resolveDraftImages,
  writeDraftToProject,
  writeStoredDraft,
} from "@/lib/cut-store";

function move<T>(list: T[], index: number, direction: -1 | 1) {
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const copy = list.slice();
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

export function CutEdit() {
  const [draft, setDraft] = useState<CutDraft | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("불러오는 중");
  const [writing, setWriting] = useState(false);
  const dirty = useRef(false);
  const urlsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    let cancel = false;
    loadCutDraft().then(async (next) => {
      const resolved = await resolveDraftImages(next);
      if (cancel) {
        Object.values(resolved).forEach((url) => URL.revokeObjectURL(url));
        return;
      }
      urlsRef.current = resolved;
      setUrls(resolved);
      setDraft(next);
      setStatus(next.updatedAt ? "이 브라우저에 저장된 내용입니다." : "지금 컷에 올라간 내용입니다.");
    });
    return () => {
      cancel = true;
      Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (!draft || !dirty.current) return;
    const timer = window.setTimeout(() => {
      writeStoredDraft(draft).then(() => setStatus("이 브라우저에 저장했습니다. 컷에 바로 반영됩니다."));
    }, 400);
    return () => window.clearTimeout(timer);
  }, [draft]);

  function change(next: CutDraft) {
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
    const url = URL.createObjectURL(fitted.blob);
    urlsRef.current = { ...urlsRef.current, [src]: url };
    setUrls(urlsRef.current);
    return { src, width: fitted.width, height: fitted.height };
  }

  async function replaceShot(shot: CutShot, file: File) {
    if (shot.src.startsWith("idb:")) await deleteImage(shot.src.slice(4));
    const stored = await storeFile(file);
    return { ...shot, ...stored };
  }

  async function addShot(file: File): Promise<CutShot> {
    const stored = await storeFile(file);
    const caption = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
    return { id: stored.src.slice(4), alt: caption, caption, ...stored };
  }

  async function removeShot(shot: CutShot) {
    if (shot.src.startsWith("idb:")) await deleteImage(shot.src.slice(4));
  }

  async function reset() {
    if (!window.confirm("이 브라우저의 수정본만 지웁니다. 프로젝트 폴더에 저장해 둔 파일은 그대로입니다. 되돌릴까요?")) return;
    await clearStoredDraft();
    dirty.current = false;
    Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    urlsRef.current = {};
    setUrls({});
    setDraft(defaultCutDraft());
    setStatus("처음 내용으로 되돌렸습니다. 이 브라우저에만 적용됩니다.");
  }

  async function writeProject() {
    if (!draft) return;
    setWriting(true);
    try {
      const saved = await writeDraftToProject(draft);
      dirty.current = false;
      const resolved = await resolveDraftImages(saved);
      Object.values(urlsRef.current).forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current = resolved;
      setUrls(resolved);
      setDraft(saved);
      setStatus("프로젝트 폴더에 저장했습니다. 배포하면 다른 사람에게도 이 내용이 보입니다.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "폴더에 저장하지 못했습니다.");
    } finally {
      setWriting(false);
    }
  }

  if (!draft) {
    return (
      <div className="edit">
        <p className="edit-status">{status}</p>
      </div>
    );
  }

  return (
    <div className="edit">
      <p className="edit-lead">v2 · /cut</p>
      <h1>글과 사진</h1>
      <p className="edit-hint">
        고치면 이 브라우저의 컷에 저장됩니다. 공개 페이지에 남기려면 프로젝트 폴더에도 저장한 뒤 배포하세요.
      </p>
      <div className="edit-actions">
        <Link className="edit-text" href="/cut">
          컷 열기
        </Link>
        <button type="button" className="edit-text" onClick={writeProject} disabled={writing}>
          {writing ? "저장하는 중" : "프로젝트 폴더에 저장"}
        </button>
        <button type="button" className="edit-text" onClick={reset}>
          처음 내용으로
        </button>
      </div>
      <p className="edit-status">{status}</p>

      <section className="edit-block">
        <h2>첫 화면</h2>
        <Field label="작은 제목" value={draft.kicker} onChange={(kicker) => change({ ...draft, kicker })} />
        <Field label="이름" value={draft.name} onChange={(name) => change({ ...draft, name })} />
        <Field label="한 줄" value={draft.line} onChange={(line) => change({ ...draft, line })} />
        <Field label="크레딧" value={draft.credit} onChange={(credit) => change({ ...draft, credit })} />
      </section>

      <section className="edit-block">
        <h2>앨범</h2>
        {draft.releases.map((release, index) => (
          <article className="edit-card" key={release.id}>
            <h3>{release.title || "제목 없음"}</h3>
            <Field
              label="앨범 제목"
              value={release.title}
              onChange={(title) => change(updateRelease(draft, index, { ...release, title }))}
            />
            <Field
              label="Audiomack 주소 이름"
              value={release.slug}
              onChange={(slug) => change(updateRelease(draft, index, { ...release, slug }))}
            />
            <PhotoFields
              shot={{
                id: release.id,
                src: release.cover,
                alt: "",
                caption: "",
                width: release.width,
                height: release.height,
              }}
              src={preview(release.cover)}
              caption={false}
              onReplace={async (file) => {
                const stored = await storeFile(file);
                if (release.cover.startsWith("idb:")) await deleteImage(release.cover.slice(4));
                change(updateRelease(draft, index, { ...release, cover: stored.src, width: stored.width, height: stored.height }));
              }}
            />
            {release.tracks.map((track, trackIndex) => (
              <div key={`${release.id}-${trackIndex}`}>
                <Field
                  label={`곡 ${trackIndex + 1} 제목`}
                  value={track.title}
                  onChange={(title) => change(updateTrack(draft, index, trackIndex, { ...track, title }))}
                />
                <Field
                  label={`곡 ${trackIndex + 1} Audiomack 이름`}
                  value={track.slug}
                  onChange={(slug) => change(updateTrack(draft, index, trackIndex, { ...track, slug }))}
                />
                <div className="edit-row">
                  <button
                    type="button"
                    className="edit-text"
                    onClick={() => change(updateRelease(draft, index, { ...release, tracks: release.tracks.filter((_, i) => i !== trackIndex) }))}
                  >
                    이 곡 빼기
                  </button>
                </div>
              </div>
            ))}
            <div className="edit-row">
              <button
                type="button"
                className="edit-text"
                onClick={() =>
                  change(updateRelease(draft, index, { ...release, tracks: [...release.tracks, { slug: "", title: "New track" }] }))
                }
              >
                곡 추가
              </button>
              <button
                type="button"
                className="edit-text"
                disabled={draft.releases.length === 1}
                onClick={() => {
                  if (release.cover.startsWith("idb:")) deleteImage(release.cover.slice(4));
                  change({ ...draft, releases: draft.releases.filter((_, i) => i !== index) });
                }}
              >
                앨범 빼기
              </button>
            </div>
          </article>
        ))}
        <FileButton
          label="앨범 추가"
          onFile={async (file) => {
            const stored = await storeFile(file);
            const id = stored.src.slice(4);
            change({
              ...draft,
              releases: [
                ...draft.releases,
                { id, title: "New volume", slug: "", cover: stored.src, alt: "", width: stored.width, height: stored.height, tracks: [] },
              ],
            });
          }}
        />
      </section>

      <section className="edit-block">
        <h2>Reading</h2>
        <Field label="작은 제목" value={draft.readKicker} onChange={(readKicker) => change({ ...draft, readKicker })} />
        <Field label="제목" value={draft.enter} onChange={(enter) => change({ ...draft, enter })} />
        <Field label="한 줄" value={draft.attempt} onChange={(attempt) => change({ ...draft, attempt })} />
        {draft.origin.map((paragraph, index) => (
          <div key={index}>
            <Field
              label={`문단 ${index + 1}`}
              value={paragraph}
              multiline
              onChange={(value) => {
                const origin = draft.origin.slice();
                origin[index] = value;
                change({ ...draft, origin });
              }}
            />
            <div className="edit-row">
              <button
                type="button"
                className="edit-text"
                onClick={() => change({ ...draft, origin: draft.origin.filter((_, i) => i !== index) })}
              >
                문단 빼기
              </button>
            </div>
          </div>
        ))}
        <div className="edit-row">
          <button type="button" className="edit-text" onClick={() => change({ ...draft, origin: [...draft.origin, ""] })}>
            문단 추가
          </button>
        </div>
        {draft.states.map((state, index) => (
          <div key={state.letter + index}>
            <Field
              label={`${state.letter} 이름`}
              value={state.name}
              onChange={(name) => {
                const states = draft.states.slice();
                states[index] = { ...state, name };
                change({ ...draft, states });
              }}
            />
            <Field
              label={`${state.letter} 설명`}
              value={state.note}
              multiline
              onChange={(note) => {
                const states = draft.states.slice();
                states[index] = { ...state, note };
                change({ ...draft, states });
              }}
            />
          </div>
        ))}
      </section>

      <section className="edit-block">
        <h2>연습과 사진</h2>
        <Field label="작은 제목" value={draft.practiceKicker} onChange={(practiceKicker) => change({ ...draft, practiceKicker })} />
        <Field label="연습 한 줄" value={draft.practice} multiline onChange={(practice) => change({ ...draft, practice })} />
        <h3>녹색 사진</h3>
        <PhotoFields
          shot={draft.green}
          src={preview(draft.green.src)}
          onChange={(green) => change({ ...draft, green })}
          onReplace={async (file) => change({ ...draft, green: await replaceShot(draft.green, file) })}
        />
        <Field label="방 제목" value={draft.roomKicker} onChange={(roomKicker) => change({ ...draft, roomKicker })} />
        <ShotList
          shots={draft.room}
          preview={preview}
          onChange={(room) => change({ ...draft, room })}
          onReplace={async (index, file) => {
            const room = draft.room.slice();
            room[index] = await replaceShot(room[index], file);
            change({ ...draft, room });
          }}
          onRemove={async (index) => {
            await removeShot(draft.room[index]);
            change({ ...draft, room: draft.room.filter((_, i) => i !== index) });
          }}
          onAdd={async (file) => change({ ...draft, room: [...draft.room, await addShot(file)] })}
        />
        <Field label="밖의 제목" value={draft.elsewhereKicker} onChange={(elsewhereKicker) => change({ ...draft, elsewhereKicker })} />
        <ShotList
          shots={draft.elsewhere}
          preview={preview}
          onChange={(elsewhere) => change({ ...draft, elsewhere })}
          onReplace={async (index, file) => {
            const elsewhere = draft.elsewhere.slice();
            elsewhere[index] = await replaceShot(elsewhere[index], file);
            change({ ...draft, elsewhere });
          }}
          onRemove={async (index) => {
            await removeShot(draft.elsewhere[index]);
            change({ ...draft, elsewhere: draft.elsewhere.filter((_, i) => i !== index) });
          }}
          onAdd={async (file) => change({ ...draft, elsewhere: [...draft.elsewhere, await addShot(file)] })}
        />
      </section>

    </div>
  );
}

function updateRelease(draft: CutDraft, index: number, release: CutRelease): CutDraft {
  const releases = draft.releases.slice();
  releases[index] = release;
  return { ...draft, releases };
}

function updateTrack(draft: CutDraft, releaseIndex: number, trackIndex: number, track: CutTrack): CutDraft {
  const release = draft.releases[releaseIndex];
  const tracks = release.tracks.slice();
  tracks[trackIndex] = track;
  return updateRelease(draft, releaseIndex, { ...release, tracks });
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
        <textarea id={id} value={value} rows={3} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input id={id} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function FileButton({ label, onFile }: { label: string; onFile: (file: File) => Promise<void> }) {
  return (
    <label className="edit-file">
      {label}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          onFile(file).catch((error: unknown) => {
            window.alert(error instanceof Error ? error.message : "사진을 읽지 못했습니다.");
          });
        }}
      />
    </label>
  );
}

function PhotoFields({
  shot,
  src,
  caption = true,
  onChange,
  onReplace,
}: {
  shot: CutShot;
  src: string;
  caption?: boolean;
  onChange?: (shot: CutShot) => void;
  onReplace: (file: File) => Promise<void>;
}) {
  return (
    <div className="edit-photo">
      <img src={src} alt="" width={shot.width} height={shot.height} />
      <div>
        {caption && onChange ? (
          <>
            <label>
              <span>설명</span>
              <input value={shot.caption} onChange={(event) => onChange({ ...shot, caption: event.target.value })} />
            </label>
            <label>
              <span>사진 설명. 화면에는 안 나오고, 읽기 도구에 들립니다.</span>
              <input value={shot.alt} onChange={(event) => onChange({ ...shot, alt: event.target.value })} />
            </label>
          </>
        ) : null}
        <FileButton label="사진 바꾸기" onFile={onReplace} />
      </div>
    </div>
  );
}

function ShotList({
  shots,
  preview,
  onChange,
  onReplace,
  onRemove,
  onAdd,
}: {
  shots: CutShot[];
  preview: (src: string) => string;
  onChange: (shots: CutShot[]) => void;
  onReplace: (index: number, file: File) => Promise<void>;
  onRemove: (index: number) => Promise<void>;
  onAdd: (file: File) => Promise<void>;
}) {
  return (
    <div>
      {shots.map((shot, index) => (
        <div key={shot.id}>
          <PhotoFields
            shot={shot}
            src={preview(shot.src)}
            onChange={(next) => {
              const copy = shots.slice();
              copy[index] = next;
              onChange(copy);
            }}
            onReplace={(file) => onReplace(index, file)}
          />
          <div className="edit-row">
            <button type="button" className="edit-text" disabled={index === 0} onClick={() => onChange(move(shots, index, -1))}>
              앞으로
            </button>
            <button
              type="button"
              className="edit-text"
              disabled={index === shots.length - 1}
              onClick={() => onChange(move(shots, index, 1))}
            >
              뒤로
            </button>
            <button type="button" className="edit-text" onClick={() => onRemove(index)}>
              빼기
            </button>
          </div>
        </div>
      ))}
      <FileButton label="사진 추가" onFile={onAdd} />
    </div>
  );
}
