import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import type { UseCase } from "@/lib/content";
import { iconForUseCase } from "@/lib/sprites";
import { cx, splitUseCaseTitle } from "@/lib/text";

type UseCaseCardProps = {
  layoutId?: string;
  onOpen?: () => void;
  useCase: UseCase;
};

export function UseCaseCard({ layoutId, onOpen, useCase }: UseCaseCardProps) {
  const titleParts = splitUseCaseTitle(useCase.title, useCase.featureLabel);

  return (
    <MotionCard
      ariaLabel={`Open use case: ${useCase.title}`}
      className={cx("library-card use-case-card", useCase.featured && "library-card--featured")}
      disabled={!useCase.clickable}
      href={onOpen ? undefined : useCase.clickable ? `/workflows/${useCase.id}` : undefined}
      layoutId={layoutId}
      onClick={useCase.clickable ? onOpen : undefined}
    >
      <div className="library-card__top">
        <PixelIcon imageSrc={iconForUseCase(useCase.id)} label={useCase.featureLabel} size="lg" />
      </div>
      <div className="use-case-card__body">
        <h2>
          <span>{titleParts.task}</span>
        </h2>
        <span className="use-case-card__feature">{titleParts.feature}</span>
      </div>
    </MotionCard>
  );
}
