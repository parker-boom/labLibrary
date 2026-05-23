import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DormantDetail } from "@/components/DormantDetail";
import { EventDetail } from "@/components/EventDetail";
import { events, getEvent } from "@/lib/content";
import { spriteForEvent } from "@/lib/sprites";

type EventDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return events.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  return {
    title: event ? `${event.title} | Lab Library` : "Event | Lab Library"
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = getEvent(id);

  if (!event) {
    notFound();
  }

  if (!event.clickable) {
    return (
      <DormantDetail
        backHref="/events"
        backLabel="Events"
        eyebrow={event.styleLine}
        sprite={spriteForEvent(event.id)}
        title={event.title}
      />
    );
  }

  return <EventDetail event={event} />;
}
