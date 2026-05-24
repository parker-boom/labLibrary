import { UseCasesBrowser } from "@/components/UseCasesBrowser";
import { useCases } from "@/lib/content";

export default function WorkflowsPage() {
  return <UseCasesBrowser items={useCases} />;
}
