import Link from "next/link";
import { SoundToggle } from "@/components/sound";
import { ThemeToggle } from "@/components/theme";
import { site } from "@/content/site";

export function Frame({ children }: { children: React.ReactNode }) {
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
            {site.nav.map((item) => (
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
          <Link href="/about">about</Link>
        </div>
      </footer>
    </>
  );
}
