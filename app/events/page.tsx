import { EventsBrowser } from "@/components/EventsBrowser";
import { events } from "@/lib/content";

export default function EventsPage() {
  return <EventsBrowser items={events} />;
}
