import Link from "next/link";
import { site } from "@/content/site";

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="nav">
        <Link className="brand" href="/">
          DJ TY
        </Link>
        <nav aria-label="Pages">
          <div className="nav-links">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer>
        <div className="wrap footer-inner">
          <span>DJ TY</span>
          <Link href="/about">About</Link>
        </div>
      </footer>
    </>
  );
}
