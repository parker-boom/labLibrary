import { UseCasesBrowser } from "@/components/UseCasesBrowser";
import { useCases } from "@/lib/content";

export default function UseCasesPage() {
  return <UseCasesBrowser items={useCases} />;
}
