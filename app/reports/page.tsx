import { EventsBrowser } from "@/components/EventsBrowser";
import { events } from "@/lib/content";

export default function ReportsPage() {
  return <EventsBrowser items={events} />;
}
