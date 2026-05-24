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
      backHref="/reports"
      backLabel="Reports"
      eyebrow={event.locationLine}
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
            <div className="info-panel__result">
              <strong>What happened</strong>
              <p>{event.reflection}</p>
            </div>
            <div className="info-panel__result">
              <strong>Good for</strong>
              <p>{event.goodFor}</p>
            </div>
          </section>
        </aside>
      </div>
    </DetailShell>
  );
}
