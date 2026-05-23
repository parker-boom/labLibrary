import { EventCard } from "@/components/EventCard";
import { PageHeader } from "@/components/PageHeader";
import { events } from "@/lib/content";

export default function EventsPage() {
  return (
    <div className="page">
      <PageHeader eyebrow="Past room evidence" title="Events">
        <p>
          Real photos and playbooks from campus events that already proved students
          will show up when the format has energy.
        </p>
      </PageHeader>
      <section className="library-grid library-grid--events" aria-label="Past Lab events">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </section>
    </div>
  );
}
