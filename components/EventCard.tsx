import Image from "next/image";
import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import type { LabEvent } from "@/lib/content";
import { spriteForEvent } from "@/lib/sprites";
import { cx } from "@/lib/text";

type EventCardProps = {
  event: LabEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <MotionCard
      ariaLabel={`Open event: ${event.title}`}
      className={cx("library-card event-card", event.featured && "library-card--featured")}
      disabled={!event.clickable}
      href={event.clickable ? `/events/${event.id}` : undefined}
    >
      <div className="event-card__photo">
        <Image alt={event.title} fill sizes="(max-width: 760px) 92vw, 44vw" src={event.thumbnailImage} />
      </div>
      <div className="event-card__body">
        <div className="library-card__top">
          <PixelIcon size="sm" sprite={spriteForEvent(event.id)} />
          <span className="library-card__chip">{event.styleLine}</span>
        </div>
        <h2>{event.title}</h2>
        <p>{event.locationLine}</p>
      </div>
    </MotionCard>
  );
}
