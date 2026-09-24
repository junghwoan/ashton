import type { Metadata } from "next";
import { CutView } from "@/components/cut-view";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "DJ TY",
  description: "DJ TY. Bedroom DJ. R&B, American pop, and house.",
  robots: { index: false, follow: false },
};

const links = [
  { href: "#listen", label: "Project." },
  { href: "#read", label: "Experience." },
  { href: "#room", label: "Daylife." },
  { href: "/about", label: "about" },
];

export default function CutPage() {
  return (
    <Frame
      links={links}
      editions={[
        { href: "/", label: "first page" },
        { href: "/cut/edit", label: "edit" },
        { href: "/v3", label: "v3" },
      ]}
    >
      <CutView />
    </Frame>
  );
}
