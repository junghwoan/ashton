import type { Metadata } from "next";
import { AboutView } from "@/components/about-view";
import { Frame } from "@/components/frame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About — DJ TY",
  description: "Ashton. Where I live, Abibu, research, and a weekend job.",
};

export default function AboutPage() {
  return (
    <Frame editions={[{ href: "/about/edit", label: "edit" }, { href: "/", label: "first page" }]}>
      <AboutView />
    </Frame>
  );
}
