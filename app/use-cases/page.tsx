import { PageHeader } from "@/components/PageHeader";
import { UseCaseCard } from "@/components/UseCaseCard";
import { useCases } from "@/lib/content";

export default function UseCasesPage() {
  return (
    <div className="page">
      <PageHeader eyebrow="Student workflow shelf" title="Use Cases">
        <p>
          Start with what students already do: practice, plan, make, study, research,
          and turn messy weeks into something survivable.
        </p>
      </PageHeader>
      <section className="library-grid library-grid--use-cases" aria-label="Use cases">
        {useCases.map((useCase) => (
          <UseCaseCard key={useCase.id} useCase={useCase} />
        ))}
      </section>
    </div>
  );
}
