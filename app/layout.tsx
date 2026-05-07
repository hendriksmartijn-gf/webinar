import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono, DM_Mono, Syne } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI & jouw organisatie — Goldfizh Webinar 29 mei",
  description:
    "Wat verandert er, en wat doe je ermee? Donderdag 29 mei · 12:00–13:00 · Google Meet",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${epilogue.variable} ${jetbrainsMono.variable} ${dmMono.variable} ${syne.variable}`}
      style={{ "--font-mono": "var(--font-jetbrains), ui-monospace, 'SF Mono', Menlo, monospace" } as React.CSSProperties}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
