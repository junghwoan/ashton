import type { Metadata } from "next";
import { Frame } from "@/components/frame";
import { V3View } from "@/components/v3-view";

export const metadata: Metadata = {
  title: "DJ TY",
  description: "DJ TY. Bedroom DJ. R&B, American pop, and house.",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return (
    <Frame
      links={[{ href: "#portal", label: "Project." }, { href: "/about", label: "about" }]}
      editions={[
        { href: "/", label: "first page" },
        { href: "/cut", label: "another cut" },
      ]}
    >
      <V3View />
    </Frame>
  );
}
