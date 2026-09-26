import { completeHomeDraft, defaultHomeDraft, idbSources, isHomeDraft, type HomeDraft } from "@/content/home-draft";
import { mediaSrc } from "@/content/cut-draft";

const DB_NAME = "djty-home";
const CHANNEL = "djty-home-draft";

type DirHandle = FileSystemDirectoryHandle & {
  queryPermission(descriptor: { mode: "readwrite" }): Promise<PermissionState>;
  requestPermission(descriptor: { mode: "readwrite" }): Promise<PermissionState>;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("draft")) db.createObjectStore("draft");
      if (!db.objectStoreNames.contains("blobs")) db.createObjectStore("blobs");
      if (!db.objectStoreNames.contains("handles")) db.createObjectStore("handles");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function readStoredDraft(): Promise<HomeDraft | null> {
  const db = await openDb();
  const stored = await requestToPromise(db.transaction("draft").objectStore("draft").get("current"));
  db.close();
  return isHomeDraft(stored) ? stored : null;
}

export async function writeStoredDraft(draft: HomeDraft) {
  const next = { ...draft, updatedAt: Date.now() };
  const db = await openDb();
  await requestToPromise(db.transaction("draft", "readwrite").objectStore("draft").put(next, "current"));
  db.close();
  const channel = new BroadcastChannel(CHANNEL);
  channel.postMessage({ type: "saved", updatedAt: next.updatedAt });
  channel.close();
  return next;
}

export async function clearStoredDraft() {
  const db = await openDb();
  const tx = db.transaction(["draft", "blobs"], "readwrite");
  tx.objectStore("draft").delete("current");
  tx.objectStore("blobs").clear();
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  const channel = new BroadcastChannel(CHANNEL);
  channel.postMessage({ type: "reset" });
  channel.close();
}

export function onDraftChange(load: () => void) {
  const channel = new BroadcastChannel(CHANNEL);
  channel.onmessage = () => load();
  return () => channel.close();
}

export async function putImage(id: string, blob: Blob) {
  const db = await openDb();
  await requestToPromise(db.transaction("blobs", "readwrite").objectStore("blobs").put(blob, id));
  db.close();
}

export async function deleteImage(id: string) {
  const db = await openDb();
  await requestToPromise(db.transaction("blobs", "readwrite").objectStore("blobs").delete(id));
  db.close();
}

export async function imageUrl(id: string) {
  const db = await openDb();
  const blob = await requestToPromise<Blob | undefined>(db.transaction("blobs").objectStore("blobs").get(id));
  db.close();
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

export async function publishedDraft(): Promise<HomeDraft | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/home-copy.json`, { cache: "no-store" });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return isHomeDraft(data) ? data : null;
  } catch {
    return null;
  }
}

export async function loadHomeDraft(): Promise<HomeDraft> {
  const stored = await readStoredDraft();
  if (stored) return completeHomeDraft(stored);
  const published = await publishedDraft();
  return completeHomeDraft(published ?? defaultHomeDraft());
}

export async function resolveDraftImages(draft: HomeDraft) {
  const urls: Record<string, string> = {};
  for (const src of idbSources(draft)) {
    const url = await imageUrl(src.slice(4));
    if (url) urls[src] = url;
  }
  return urls;
}

export async function fitImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const max = 2000;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not read that image.");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Could not store that image."))), "image/jpeg", 0.86);
  });
  return { blob, width, height };
}

async function fileIn(dir: FileSystemDirectoryHandle, path: string, data: Blob | string) {
  const parts = path.split("/");
  let current: FileSystemDirectoryHandle = dir;
  for (const part of parts.slice(0, -1)) {
    current = await current.getDirectoryHandle(part, { create: true });
  }
  const handle = await current.getFileHandle(parts[parts.length - 1], { create: true });
  const writable = await handle.createWritable();
  await writable.write(data);
  await writable.close();
}

async function projectDir() {
  const picker = window.showDirectoryPicker;
  if (!picker) throw new Error("이 브라우저는 폴더 저장을 지원하지 않습니다.");
  const db = await openDb();
  const saved = await requestToPromise<DirHandle | undefined>(db.transaction("handles").objectStore("handles").get("project"));
  db.close();
  let dir = saved ?? null;
  if (dir) {
    const state = await dir.queryPermission({ mode: "readwrite" });
    if (state !== "granted") {
      const next = await dir.requestPermission({ mode: "readwrite" });
      if (next !== "granted") dir = null;
    }
  }
  if (!dir) dir = (await picker({ mode: "readwrite" })) as DirHandle;
  await dir.getFileHandle("package.json");
  const dbWrite = await openDb();
  await requestToPromise(dbWrite.transaction("handles", "readwrite").objectStore("handles").put(dir, "project"));
  dbWrite.close();
  return dir;
}

function retarget(draft: HomeDraft, from: string, to: string): HomeDraft {
  const shot = <T extends { src: string }>(item: T) => (item.src === from ? { ...item, src: to } : item);
  return {
    ...draft,
    portrait: shot(draft.portrait),
    releases: draft.releases.map((release) => (release.cover === from ? { ...release, cover: to } : release)),
    decks: draft.decks.map(shot),
    practice: draft.practice.map(shot),
    elsewhere: draft.elsewhere.map(shot),
    aboutShots: (draft.aboutShots ?? []).map(shot),
  };
}

export async function writeDraftToProject(draft: HomeDraft) {
  let dir: DirHandle;
  try {
    dir = await projectDir();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw new Error("폴더 선택을 취소했습니다.");
    if (error instanceof DOMException && error.name === "NotFoundError") {
      throw new Error("ashton 프로젝트 폴더를 고르세요. package.json이 있는 곳입니다.");
    }
    throw error;
  }
  let next: HomeDraft = structuredClone(draft);
  const db = await openDb();
  for (const src of idbSources(next)) {
    const id = src.slice(4);
    const blob = await requestToPromise<Blob | undefined>(db.transaction("blobs").objectStore("blobs").get(id));
    if (!blob) continue;
    await fileIn(dir, `public/media/edits/${id}.jpg`, blob);
    next = retarget(next, src, `/media/edits/${id}.jpg`);
  }
  db.close();
  next.updatedAt = Date.now();
  await fileIn(dir, "public/home-copy.json", JSON.stringify(next, null, 2));
  await writeStoredDraft(next);
  return next;
}

export { mediaSrc };
