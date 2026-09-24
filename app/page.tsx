import type { Metadata } from "next";
import { Frame } from "@/components/frame";
import { HomeView } from "@/components/home-view";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function Page() {
  return (
    <Frame
      editions={[
        { href: "/edit", label: "edit" },
        { href: "/cut", label: "another cut" },
        { href: "/v3", label: "v3" },
      ]}
    >
      <HomeView />
    </Frame>
  );
}
