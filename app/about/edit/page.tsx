import type { Metadata } from "next";
import { AboutEdit } from "@/components/about-edit";
import { EditGate } from "@/components/edit-gate";
import { Frame } from "@/components/frame";
import "../../cut/edit/edit.css";

export const metadata: Metadata = {
  title: "Edit About",
  robots: { index: false, follow: false },
};

export default function EditAboutPage() {
  return (
    <Frame
      links={[
        { href: "/about", label: "about" },
        { href: "/", label: "first page" },
      ]}
      editions={[
        { href: "/about", label: "about" },
        { href: "/edit", label: "whole page" },
      ]}
    >
      <EditGate>
        <AboutEdit />
      </EditGate>
    </Frame>
  );
}
