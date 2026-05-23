import { AddToTrayButton } from "@/components/AddToTrayButton";
import { DetailShell } from "@/components/DetailShell";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import type { LabEvent } from "@/lib/content";
import { spriteForEvent } from "@/lib/sprites";

type EventDetailProps = {
  event: LabEvent;
};

export function EventDetail({ event }: EventDetailProps) {
  return (
    <DetailShell
      action={
        <AddToTrayButton
          item={{
            id: event.id,
            type: "event",
            title: event.title,
            label: event.styleLine,
            detail: event.locationLine
          }}
        />
      }
      backHref="/events"
      backLabel="Events"
      eyebrow={`${event.styleLine} / ${event.locationLine}`}
      sprite={spriteForEvent(event.id)}
      title={event.title}
    >
      <div className="detail-grid detail-grid--event">
        <PhotoCarousel images={event.gallery ?? [{ role: "primary", src: event.thumbnailImage, alt: event.title }]} />
        <aside className="detail-stack">
          <section className="quick-facts">
            <div>
              <span>Host</span>
              <strong>{event.hostedBy}</strong>
            </div>
            <div>
              <span>Audience</span>
              <strong>{event.audience}</strong>
            </div>
            <div>
              <span>Room</span>
              <strong>{event.attendees}</strong>
            </div>
          </section>
          <section className="info-panel">
            <p className="micro-label">Playbook</p>
            <ol className="number-list">
              {event.eventPlaybook?.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section className="info-panel info-panel--dark">
            <p className="micro-label">Why it works</p>
            <p>{event.reflection}</p>
          </section>
          <section className="info-panel">
            <p className="micro-label">Good for</p>
            <p>{event.goodFor}</p>
          </section>
        </aside>
      </div>
    </DetailShell>
  );
}
