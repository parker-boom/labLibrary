import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import { labLibrarySections } from "@/lib/sections";

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
            className="portal-card"
            href={portal.href}
            key={portal.id}
          >
            <div className="portal-card__icon">
              <PixelIcon imageSrc={portal.homeIconSrc} label={portal.homeTitle} size="xl" />
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
