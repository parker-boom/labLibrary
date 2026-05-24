import { AddToTrayButton } from "@/components/AddToTrayButton";
import { DetailShell } from "@/components/DetailShell";
import { TrackStarterKit } from "@/components/TrackStarterKit";
import { getEventsByIds, getUseCasesByIds, type Track } from "@/lib/content";
import { spriteForTrack } from "@/lib/sprites";

type TrackDetailProps = {
  track: Track;
};

export function TrackDetail({ track }: TrackDetailProps) {
  const useCases = getUseCasesByIds(track.useThisWith ?? []);
  const relatedEvents = getEventsByIds(track.relatedEvents ?? []);
  const relatedEvent = relatedEvents[0];

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
      backHref="/missions"
      backLabel="Missions"
      eyebrow="Mission cartridge"
      sprite={spriteForTrack(track.id)}
      title={track.title}
    >
      <TrackStarterKit event={relatedEvent} track={track} useCases={useCases} />
    </DetailShell>
  );
}
