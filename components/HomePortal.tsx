"use client";

import type { CSSProperties } from "react";
import { playArcadeBlip } from "@/components/client-sound";
import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import { labLibrarySections, type LabLibrarySection } from "@/lib/sections";

const INTRO_STORAGE_KEY = "lab-library:intro-seen";
const INTRO_COOKIE_KEY = "lab-library-intro-seen";

const homeLoopSprites: Record<LabLibrarySection["id"], string> = {
  tracks: "/assets/generated/home-hover-loops/portal-loop-sheet.png",
  "use-cases": "/assets/generated/home-hover-loops/joystick-loop-sheet.png",
  events: "/assets/generated/home-hover-loops/camera-loop-sheet.png"
};

function HomeCardScene({ portal }: { portal: LabLibrarySection }) {
  return (
    <div
      className="portal-card__scene"
      style={
        {
          "--portal-loop-image": `url("${homeLoopSprites[portal.id]}")`
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <PixelIcon className="portal-card__sprite" imageSrc={portal.homeIconSrc} size="xl" />
      <span className="portal-card__loop" />
    </div>
  );
}

function HomeTitle({ portal }: { portal: LabLibrarySection }) {
  if (portal.id === "use-cases") {
    return (
      <>
        <span>Level Up Your</span>
        {" "}
        <span>AI Skills</span>
      </>
    );
  }

  return portal.homeTitle;
}

function markIntroSeen() {
  document.cookie = `${INTRO_COOKIE_KEY}=true; Path=/; Max-Age=31536000; SameSite=Lax`;

  try {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // The data attribute still advances the current session if storage is blocked.
  }

  document.documentElement.dataset.labIntro = "seen";
  playArcadeBlip("select");
}

export function HomePortal() {
  return (
    <>
      <section className="home-intro" aria-labelledby="home-intro-title">
        <div className="home-intro__panel">
          <div className="home-intro__copy">
            <h1 id="home-intro-title">Lab Arcade</h1>
            <p className="home-intro__welcome">Welcome, host.</p>
            <p>
              Explore the arcade and find inspiration for your next event.
            </p>
          </div>

          <div className="home-intro__records" aria-label="Choose your adventure">
            <p className="micro-label">Choose your adventure:</p>
            {labLibrarySections.map((portal) => (
              <div className="home-intro__record" key={portal.id}>
                <PixelIcon imageSrc={portal.homeIconSrc} size="sm" />
                <div>
                  <h2>{portal.homeTitle}</h2>
                </div>
              </div>
            ))}
          </div>

          <button className="button home-intro__start" onClick={markIntroSeen} type="button">
            Enter the Arcade <span aria-hidden="true">&gt;</span>
          </button>
        </div>
      </section>

      <div className="home-page">
        <section className="home-hero">
          <div className="home-hero__copy">
            <h1>Lab Arcade</h1>
          </div>
        </section>

        <section className="portal-grid" aria-label="Lab Library sections">
          {labLibrarySections.map((portal) => (
            <MotionCard
              ariaLabel={`Open ${portal.homeTitle}`}
              className={`portal-card portal-card--${portal.id}`}
              href={portal.href}
              key={portal.id}
            >
              <div className="portal-card__icon">
                <HomeCardScene portal={portal} />
              </div>
              <div className="portal-card__body">
                <h2>
                  <HomeTitle portal={portal} />
                </h2>
                <span>{portal.detail}</span>
              </div>
            </MotionCard>
          ))}
        </section>
      </div>
    </>
  );
}
