import Image from "next/image";
import { MotionCard } from "@/components/MotionCard";
import type { LabEvent } from "@/lib/content";
import { cx } from "@/lib/text";

type EventCardProps = {
  event: LabEvent;
  layoutId?: string;
  onOpen?: () => void;
};

function splitEventTitle(title: string) {
  const marker = " @ ";
  const index = title.lastIndexOf(marker);

  if (index < 0) {
    return { name: title, school: "" };
  }

  return {
    name: title.slice(0, index).trim(),
    school: title.slice(index + marker.length).trim()
  };
}

export function EventCard({ event, layoutId, onOpen }: EventCardProps) {
  const title = splitEventTitle(event.title);

  return (
    <MotionCard
      ariaLabel={`Open event: ${event.title}`}
      className={cx("library-card event-card", event.featured && "library-card--featured")}
      disabled={!event.clickable}
      layoutId={layoutId}
      onClick={onOpen}
    >
      <div className="event-card__photo">
        <Image
          alt={event.title}
          fill
          loading={event.featured ? "eager" : "lazy"}
          priority={event.featured}
          sizes="(max-width: 760px) 92vw, 44vw"
          src={event.thumbnailImage}
        />
      </div>
      <div className="event-card__body">
        <h2>{title.name}</h2>
        {title.school ? <div className="event-card__school">{title.school}</div> : null}
      </div>
    </MotionCard>
  );
}
