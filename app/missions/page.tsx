import { TracksBrowser } from "@/components/TracksBrowser";
import { tracks } from "@/lib/content";

export default function MissionsPage() {
  return <TracksBrowser items={tracks} />;
}
