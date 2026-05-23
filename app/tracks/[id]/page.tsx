import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DormantDetail } from "@/components/DormantDetail";
import { TrackDetail } from "@/components/TrackDetail";
import { getTrack, tracks } from "@/lib/content";
import { spriteForTrack } from "@/lib/sprites";

type TrackDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return tracks.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: TrackDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const track = getTrack(id);
  return {
    title: track ? `${track.title} | Lab Library` : "Track | Lab Library"
  };
}

export default async function TrackDetailPage({ params }: TrackDetailPageProps) {
  const { id } = await params;
  const track = getTrack(id);

  if (!track) {
    notFound();
  }

  if (!track.clickable) {
    return (
      <DormantDetail
        backHref="/tracks"
        backLabel="Tracks"
        eyebrow="V1 locked"
        sprite={spriteForTrack(track.id)}
        title={track.title}
      />
    );
  }

  return <TrackDetail track={track} />;
}
