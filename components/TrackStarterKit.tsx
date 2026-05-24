import Image from "next/image";
import Link from "next/link";
import { PixelIcon } from "@/components/PixelIcon";
import type { LabEvent, Track, UseCase } from "@/lib/content";
import { iconForUseCase } from "@/lib/sprites";

type TrackStarterKitProps = {
  event?: LabEvent;
  track: Track;
  useCases: UseCase[];
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

function taskOnlyTitle(title: string) {
  return title.replace(/\s+with\s+.+$/i, "").trim();
}

export function TrackStarterKit({ event, track, useCases }: TrackStarterKitProps) {
  const eventTitle = event ? splitEventTitle(event.title) : null;

  return (
    <div className="track-kit">
      <section className="track-overview-grid">
        <section className="info-panel info-panel--wide track-best-for">
          <p className="micro-label">Best for</p>
          <h2>{track.bestFor}</h2>
        </section>
        {track.expectedTime ? (
          <section className="track-time-card" aria-label={`Expected time: ${track.expectedTime}`}>
            <span>Expected time</span>
            <strong>{track.expectedTime}</strong>
          </section>
        ) : null}
      </section>

      <section className="track-action-grid">
        <section className="run-of-show track-run-panel">
          <p className="micro-label">Run of show</p>
          <ol>
            {track.runOfShow?.map((step) => (
              <li key={`${step.duration}-${step.step}`}>
                <span>{step.duration}</span>
                <p>{step.step}</p>
              </li>
            ))}
          </ol>
        </section>

        {event && eventTitle ? (
          <Link aria-label={`Open event: ${event.title}`} className="track-event-feature" href={`/reports#${event.id}`}>
            <p className="micro-label">Related event</p>
            <div className="track-event-feature__photo">
              <Image alt={event.title} fill sizes="(max-width: 980px) 92vw, 360px" src={event.thumbnailImage} />
            </div>
            <div className="track-event-feature__body">
              <h3>{eventTitle.name}</h3>
              {event.locationLine ? <span>{event.locationLine}</span> : null}
            </div>
          </Link>
        ) : null}
      </section>

      <section className="track-use-with">
        <div className="track-section-heading">
          <p className="micro-label">Use this with</p>
        </div>
        <div className="track-use-case-row">
          {useCases.map((item) => (
            <article className="track-use-case-tile" key={item.id}>
              <PixelIcon imageSrc={iconForUseCase(item.id)} label={item.featureLabel} size="md" />
              <div>
                <h3>{taskOnlyTitle(item.title)}</h3>
                <span>{item.featureLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
