import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

function metadataBaseUrl() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (base && (url.pathname === base || url.pathname === `${base}/`)) {
    url.pathname = "/";
  }
  return url;
}

const metadataBase = metadataBaseUrl();

export const metadata: Metadata = {
  metadataBase,
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${display.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('djty-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}",
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
