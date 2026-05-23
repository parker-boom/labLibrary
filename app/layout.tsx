import type { Metadata } from "next";
import { ArcadeShell } from "@/components/ArcadeShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab Library",
  description: "A retro arcade archive for campus AI event ideas."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ArcadeShell>{children}</ArcadeShell>
      </body>
    </html>
  );
}
