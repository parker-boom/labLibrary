import { MotionCard } from "@/components/MotionCard";
import { PixelIcon } from "@/components/PixelIcon";
import type { UseCase } from "@/lib/content";
import { iconForUseCase } from "@/lib/sprites";
import { cx } from "@/lib/text";

type UseCaseCardProps = {
  layoutId?: string;
  onOpen?: () => void;
  useCase: UseCase;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\+/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function splitTitle(title: string, featureLabel: string) {
  const withMatch = title.match(/\s+with\s+/i);
  if (withMatch?.index !== undefined) {
    return {
      task: title.slice(0, withMatch.index).trim(),
      feature: featureLabel
    };
  }

  const normalizedTitle = normalize(title);
  const normalizedFeature = normalize(featureLabel);
  const featureCandidates = [
    normalizedFeature,
    normalizedFeature.split(" ").at(-1) ?? normalizedFeature
  ];
  const match = featureCandidates
    .map((candidate) => ({ candidate, index: normalizedTitle.lastIndexOf(candidate) }))
    .find(({ index }) => index >= 0);

  if (!match) {
    return { task: title, feature: featureLabel };
  }

  const featureStart = title.length - normalizedTitle.slice(match.index).length;
  return {
    task: title.slice(0, featureStart).trim(),
    feature: title.slice(featureStart).trim()
  };
}

export function UseCaseCard({ layoutId, onOpen, useCase }: UseCaseCardProps) {
  const titleParts = splitTitle(useCase.title, useCase.featureLabel);

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
