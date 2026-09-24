"use client";

import { useEffect, useState } from "react";
import { defaultCutDraft, mediaSrc, type CutDraft, type CutShot } from "@/content/cut-draft";
import { loadCutDraft, onDraftChange, resolveDraftImages } from "@/lib/cut-store";

export function useCutDraft() {
  const [draft, setDraft] = useState<CutDraft>(defaultCutDraft);
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancel = false;
    let current: string[] = [];

    async function load() {
      const next = await loadCutDraft();
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

  function shotOf(shot: CutShot): CutShot {
    return { ...shot, src: srcOf(shot.src) };
  }

  return { draft, srcOf, shotOf };
}
