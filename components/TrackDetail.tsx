import { AddToTrayButton } from "@/components/AddToTrayButton";
import { DetailShell } from "@/components/DetailShell";
import { EventCard } from "@/components/EventCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import { getEventsByIds, getUseCasesByIds, type Track } from "@/lib/content";
import { spriteForTrack } from "@/lib/sprites";

type TrackDetailProps = {
  track: Track;
};

export function TrackDetail({ track }: TrackDetailProps) {
  const useCases = getUseCasesByIds(track.useThisWith ?? []);
  const relatedEvents = getEventsByIds(track.relatedEvents ?? []);

  return (
    <DetailShell
      action={
        <AddToTrayButton
          item={{
            id: track.id,
            type: "track",
            title: track.title,
            label: "Track",
            detail: track.description
          }}
        />
      }
      backHref="/tracks"
      backLabel="Tracks"
      eyebrow="Track cartridge"
      sprite={spriteForTrack(track.id)}
      title={track.title}
    >
      <div className="track-detail-layout">
        <section className="info-panel info-panel--wide">
          <p className="micro-label">Best for</p>
          <h2>{track.bestFor}</h2>
        </section>
        <section className="run-of-show">
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
        <section className="related-grid">
          <div>
            <p className="micro-label">Use this with</p>
            <div className="mini-grid">
              {useCases.map((item) => (
                <UseCaseCard key={item.id} useCase={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="micro-label">Related event</p>
            <div className="mini-grid mini-grid--events">
              {relatedEvents.map((item) => (
                <EventCard event={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </DetailShell>
  );
}
