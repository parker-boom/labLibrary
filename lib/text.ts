export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function splitEventTitle(title: string) {
  const marker = " @ ";
  const index = title.lastIndexOf(marker);

  if (index < 0) {
    return { name: title, school: "" };
  }

  return {
    name: title.slice(0, index).trim(),
    school: title.slice(index + marker.length).trim()
  };
}

function normalizeTitleTerm(value: string) {
  return value.toLowerCase().replace(/\+/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

export function splitUseCaseTitle(title: string, featureLabel: string) {
  const withMatch = title.match(/\s+with\s+/i);

  if (withMatch?.index !== undefined) {
    return {
      task: title.slice(0, withMatch.index).trim(),
      feature: featureLabel
    };
  }

  const normalizedTitle = normalizeTitleTerm(title);
  const normalizedFeature = normalizeTitleTerm(featureLabel);
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
