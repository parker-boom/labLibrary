import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DormantDetail } from "@/components/DormantDetail";
import { EventDetail } from "@/components/EventDetail";
import { events, getEvent } from "@/lib/content";
import { spriteForEvent } from "@/lib/sprites";

type ReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return events.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: ReportDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  return {
    title: event ? `${event.title} | Lab Library` : "Report | Lab Library"
  };
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = await params;
  const event = getEvent(id);

  if (!event) {
    notFound();
  }

  if (!event.clickable) {
    return (
      <DormantDetail
        backHref="/reports"
        backLabel="Reports"
        eyebrow={event.styleLine}
        sprite={spriteForEvent(event.id)}
        title={event.title}
      />
    );
  }

  return <EventDetail event={event} />;
}
