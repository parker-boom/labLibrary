import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import type { Track } from "@/lib/content";
import { spriteForTrack } from "@/lib/sprites";
import { cx } from "@/lib/text";

type TrackCardProps = {
  track: Track;
};

export function TrackCard({ track }: TrackCardProps) {
  return (
    <MotionCard
      ariaLabel={`Open track: ${track.title}`}
      className={cx("track-card", !track.clickable && "track-card--locked")}
      disabled={!track.clickable}
      href={track.clickable ? `/tracks/${track.id}` : undefined}
    >
      <PixelIcon label={track.title} size="lg" sprite={spriteForTrack(track.id)} />
      <div className="track-card__body">
        <p className="micro-label">{track.clickable ? "Track cartridge" : "V1 locked"}</p>
        <h2>{track.title}</h2>
        <p>{track.description}</p>
      </div>
    </MotionCard>
  );
}
