import type { Metadata } from "next";
import { CutEdit } from "@/components/cut-edit";
import { Frame } from "@/components/frame";
import "./edit.css";

export const metadata: Metadata = {
  title: "Edit this cut",
  robots: { index: false, follow: false },
};

export default function EditCutPage() {
  return (
    <Frame
      links={[
        { href: "/cut", label: "the cut" },
        { href: "/about", label: "about" },
      ]}
      editions={[
        { href: "/cut", label: "the cut" },
        { href: "/", label: "first page" },
      ]}
    >
      <CutEdit />
    </Frame>
  );
}
