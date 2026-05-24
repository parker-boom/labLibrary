import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DormantDetail } from "@/components/DormantDetail";
import { UseCaseDetail } from "@/components/UseCaseDetail";
import { getUseCase, useCases } from "@/lib/content";
import { spriteForUseCase } from "@/lib/sprites";

type WorkflowDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return useCases.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: WorkflowDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const useCase = getUseCase(id);
  return {
    title: useCase ? `${useCase.title} | Lab Library` : "Workflow | Lab Library"
  };
}

export default async function WorkflowDetailPage({ params }: WorkflowDetailPageProps) {
  const { id } = await params;
  const useCase = getUseCase(id);

  if (!useCase) {
    notFound();
  }

  if (!useCase.clickable) {
    return (
      <DormantDetail
        backHref="/workflows"
        backLabel="Workflows"
        eyebrow={useCase.featureLabel}
        sprite={spriteForUseCase(useCase.id)}
        title={useCase.title}
      />
    );
  }

  return <UseCaseDetail useCase={useCase} />;
}
