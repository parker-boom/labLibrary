import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";

const portals = [
  {
    href: "/tracks",
    title: "Event Tracks",
    detail: "Prompt-A-Thon, Show & Tell, and the inactive Builder Lab shelf.",
    sprite: "compass" as const
  },
  {
    href: "/use-cases",
    title: "Student Use Cases",
    detail: "Real reconstructed student patterns ready to become activities.",
    sprite: "joystick" as const
  },
  {
    href: "/events",
    title: "Past Lab Events",
    detail: "Photos and playbooks from actual campus rooms.",
    sprite: "camera" as const
  }
];

export function HomePortal() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <h1>Lab Library</h1>
        </div>
      </section>

      <section className="portal-grid" aria-label="Lab Library sections">
        {portals.map((portal) => (
          <MotionCard
            ariaLabel={`Open ${portal.title}`}
            className="portal-card"
            href={portal.href}
            key={portal.href}
          >
            <div className="portal-card__icon">
              <PixelIcon sprite={portal.sprite} size="xl" />
            </div>
            <div className="portal-card__body">
              <h2>{portal.title}</h2>
              <span>{portal.detail}</span>
            </div>
          </MotionCard>
        ))}
      </section>
    </div>
  );
}
