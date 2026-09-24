import type { Metadata } from "next";
import { CutEdit } from "@/components/cut-edit";
import { EditGate } from "@/components/edit-gate";
import { Frame } from "@/components/frame";
import "../cut/edit/edit.css";

export const metadata: Metadata = {
  title: "Edit this cut",
  robots: { index: false, follow: false },
};

export default function EditPage() {
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
      <EditGate>
        <CutEdit />
      </EditGate>
    </Frame>
  );
}
