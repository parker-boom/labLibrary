import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import type { Track } from "@/lib/content";
import { iconForTrack } from "@/lib/sprites";
import { cx } from "@/lib/text";

type TrackCardProps = {
  track: Track;
  layoutId?: string;
  onOpen?: () => void;
};

export function TrackCard({ layoutId, onOpen, track }: TrackCardProps) {
  const isLocked = !track.clickable;

  return (
    <MotionCard
      ariaLabel={isLocked ? `Coming soon: ${track.title}` : `Open track: ${track.title}`}
      className={cx("track-card", isLocked && "track-card--locked")}
      disabled={isLocked}
      href={track.clickable && !onOpen ? `/missions/${track.id}` : undefined}
      layoutId={layoutId}
      onClick={onOpen}
    >
      <div className="track-card__media" aria-hidden="true">
        <PixelIcon imageSrc={iconForTrack(track.id)} label={track.title} size="xl" />
        {isLocked ? <span className="track-card__status">Coming soon</span> : null}
      </div>
      <div className="track-card__body">
        <h2>{track.title}</h2>
        <p>{track.description}</p>
      </div>
    </MotionCard>
  );
}
