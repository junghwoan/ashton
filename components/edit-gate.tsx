"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

const PIN = "1130";
const KEY = "djty-edit";

export function EditGate({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setOpen(sessionStorage.getItem(KEY) === "1");
    setReady(true);
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (value.trim() !== PIN) {
      setWrong(true);
      return;
    }
    sessionStorage.setItem(KEY, "1");
    setWrong(false);
    setOpen(true);
  }

  if (!ready) {
    return (
      <div className="edit">
        <p className="edit-status">불러오는 중</p>
      </div>
    );
  }

  if (!open) {
    return (
      <form className="edit" onSubmit={submit}>
        <p className="edit-lead">v2 · /cut</p>
        <h1>글과 사진</h1>
        <p className="edit-hint">이 페이지는 비밀번호가 있어야 열립니다.</p>
        <label htmlFor="edit-pin">
          <span>비밀번호</span>
          <input
            id="edit-pin"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setWrong(false);
            }}
          />
        </label>
        <div className="edit-actions">
          <button type="submit" className="edit-text">
            들어가기
          </button>
        </div>
        {wrong ? <p className="edit-status">비밀번호가 다릅니다.</p> : null}
      </form>
    );
  }

  return children;
}
