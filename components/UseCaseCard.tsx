import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import type { UseCase } from "@/lib/content";
import { spriteForUseCase } from "@/lib/sprites";
import { cx } from "@/lib/text";

type UseCaseCardProps = {
  useCase: UseCase;
};

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <MotionCard
      ariaLabel={`Open use case: ${useCase.title}`}
      className={cx("library-card use-case-card", useCase.featured && "library-card--featured")}
      disabled={!useCase.clickable}
      href={useCase.clickable ? `/use-cases/${useCase.id}` : undefined}
    >
      <div className="library-card__top">
        <PixelIcon label={useCase.featureLabel} size={useCase.featured ? "lg" : "md"} sprite={spriteForUseCase(useCase.id)} />
        <span className="library-card__chip">{useCase.featureLabel}</span>
      </div>
      <h2>{useCase.title}</h2>
      {useCase.featured ? (
        <p>
          Shared by {useCase.sharedBy} <span>{useCase.school}</span>
        </p>
      ) : (
        <p className="library-card__inactive">Archive card loaded for v1 list view</p>
      )}
    </MotionCard>
  );
}
