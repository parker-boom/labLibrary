import { PageHeader } from "@/components/PageHeader";
import { TrackCard } from "@/components/TrackCard";
import { tracks } from "@/lib/content";

export default function TracksPage() {
  return (
    <div className="page">
      <PageHeader eyebrow="Event format cartridges" title="Tracks">
        <p>
          Choose the shape of the room first. Then layer in a student workflow and
          proof from a past event.
        </p>
      </PageHeader>
      <section className="track-list" aria-label="Event tracks">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </section>
    </div>
  );
}
