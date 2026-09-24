import Link from "next/link";
import { SoundToggle } from "@/components/sound";
import { ThemeToggle } from "@/components/theme";
import { site } from "@/content/site";

export function Frame({
  children,
  links = site.nav,
  editions = [
    { href: "/cut", label: "another cut" },
    { href: "/v3", label: "v3" },
  ],
}: {
  children: React.ReactNode;
  links?: readonly { href: string; label: string }[];
  editions?: readonly { href: string; label: string }[];
}) {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="nav">
        <Link className="brand" href="/">
          <span className="brand-name">Ashton TY Hwang</span>
        </Link>
        <nav aria-label="Pages">
          <div className="nav-links">
            {links.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <SoundToggle />
          </div>
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 DJ TY</span>
          <span className="footer-links">
            <Link href="/about">about</Link>
            {editions.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </span>
        </div>
      </footer>
    </>
  );
}
