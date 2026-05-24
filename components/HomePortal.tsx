import type { CSSProperties } from "react";
import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import { labLibrarySections, type LabLibrarySection } from "@/lib/sections";

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

export function HomePortal() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <h1>Lab Archive</h1>
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
              <h2>{portal.homeTitle}</h2>
              <span>{portal.detail}</span>
            </div>
          </MotionCard>
        ))}
      </section>
    </div>
  );
}
