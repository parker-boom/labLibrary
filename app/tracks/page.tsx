import { TracksBrowser } from "@/components/TracksBrowser";
import { tracks } from "@/lib/content";

export default function TracksPage() {
  return <TracksBrowser items={tracks} />;
}
