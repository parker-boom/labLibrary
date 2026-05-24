import { TracksBrowser } from "@/components/TracksBrowser";
import { tracks } from "@/lib/content";

type TrackIconVariant = "plain" | "square" | "compact";

type MissionsPageProps = {
  searchParams?: Promise<{
    trackIconVariant?: string | string[];
  }>;
};

function parseTrackIconVariant(value: string | string[] | undefined): TrackIconVariant {
  const variant = Array.isArray(value) ? value[0] : value;
  return variant === "square" || variant === "compact" ? variant : "plain";
}

export default async function MissionsPage({ searchParams }: MissionsPageProps) {
  const params = await searchParams;
  return <TracksBrowser iconVariant={parseTrackIconVariant(params?.trackIconVariant)} items={tracks} />;
}
