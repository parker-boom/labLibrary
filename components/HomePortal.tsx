import Link from "next/link";
import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import { featuredEvents, featuredUseCases, tracks } from "@/lib/content";

const portals = [
  {
    href: "/tracks",
    title: "Event Tracks",
    label: "Choose the room",
    detail: "Prompt-A-Thon, Show & Tell, and the inactive Builder Lab shelf.",
    sprite: "compass" as const,
    className: "portal-card--wide"
  },
  {
    href: "/use-cases",
    title: "Student Use Cases",
    label: "Steal the workflow",
    detail: "Real reconstructed student patterns ready to become activities.",
    sprite: "joystick" as const,
    className: ""
  },
  {
    href: "/events",
    title: "Past Lab Events",
    label: "Borrow proof",
    detail: "Photos and playbooks from actual campus rooms.",
    sprite: "camera" as const,
    className: ""
  }
];

export function HomePortal() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="micro-label">Campus AI event archive</p>
          <h1>Lab Library</h1>
          <p>
            A host-facing arcade cabinet for finding a format, pulling a student workflow,
            and backing it with proof from real Lab events.
          </p>
        </div>
        <div className="home-hero__marquee" aria-hidden="true">
          <span>{featuredUseCases.length} workflows loaded</span>
          <span>{featuredEvents.length} event proofs online</span>
          <span>{tracks.length} track cartridges mounted</span>
        </div>
      </section>

      <section className="portal-grid" aria-label="Lab Library sections">
        {portals.map((portal) => (
          <MotionCard
            ariaLabel={`Open ${portal.title}`}
            className={`portal-card ${portal.className}`}
            href={portal.href}
            key={portal.href}
            linkClassName={portal.className}
          >
            <div className="portal-card__icon">
              <PixelIcon sprite={portal.sprite} size="lg" />
            </div>
            <div className="portal-card__body">
              <p>{portal.label}</p>
              <h2>{portal.title}</h2>
              <span>{portal.detail}</span>
            </div>
            <div className="portal-card__coin">START</div>
          </MotionCard>
        ))}
      </section>

      <section className="home-feature-strip">
        <div>
          <p className="micro-label">Featured workflow</p>
          <h2>{featuredUseCases[0]?.title}</h2>
        </div>
        <Link className="inline-link" href={`/use-cases/${featuredUseCases[0]?.id}`}>
          Open cartridge
        </Link>
      </section>
    </div>
  );
}
