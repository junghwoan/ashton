import type { Metadata } from "next";
import { EditGate } from "@/components/edit-gate";
import { HomeEdit } from "@/components/home-edit";
import { Frame } from "@/components/frame";
import "../cut/edit/edit.css";

export const metadata: Metadata = {
  title: "Edit",
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
        <HomeEdit />
      </EditGate>
    </Frame>
  );
}
