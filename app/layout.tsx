import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ArcadeShell } from "@/components/ArcadeShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab Library",
  description: "A retro arcade archive for campus AI event ideas."
};

const INTRO_COOKIE = "lab-library-intro-seen";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const introSeen = (await cookies()).get(INTRO_COOKIE)?.value === "true";

  return (
    <html data-lab-intro={introSeen ? "seen" : undefined} lang="en">
      <body>
        <ArcadeShell>{children}</ArcadeShell>
      </body>
    </html>
  );
}
