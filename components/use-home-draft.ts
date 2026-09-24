"use client";

import { useEffect, useState } from "react";
import { defaultHomeDraft, type HomeDraft, type HomeShot } from "@/content/home-draft";
import { loadHomeDraft, mediaSrc, onDraftChange, resolveDraftImages } from "@/lib/home-store";

export function useHomeDraft() {
  const [draft, setDraft] = useState<HomeDraft>(defaultHomeDraft);
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancel = false;
    let current: string[] = [];

    async function load() {
      const next = await loadHomeDraft();
      const resolved = await resolveDraftImages(next);
      if (cancel) {
        Object.values(resolved).forEach((url) => URL.revokeObjectURL(url));
        return;
      }
      current.forEach((url) => URL.revokeObjectURL(url));
      current = Object.values(resolved);
      setDraft(next);
      setUrls(resolved);
    }

    load();
    const stop = onDraftChange(() => load());
    return () => {
      cancel = true;
      stop();
      current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function srcOf(src: string) {
    return urls[src] ?? mediaSrc(src);
  }

  function shotOf(item: HomeShot): HomeShot {
    return { ...item, src: srcOf(item.src) };
  }

  return { draft, srcOf, shotOf };
}
