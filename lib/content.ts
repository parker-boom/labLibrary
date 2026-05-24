import eventsData from "@/content/events.json";
import tracksData from "@/content/tracks.json";
import useCasesData from "@/content/use-cases.json";

export type ChatTurn = {
  role: "user" | "assistant";
  text: string;
};

export type UseCase = {
  id: string;
  featured: boolean;
  clickable: boolean;
  title: string;
  featureLabel: string;
  sharedBy?: string;
  school?: string;
  sourceType: string;
  iconObject: string;
  iconAsset?: string | null;
  chatExample?: ChatTurn[];
  process?: string[];
  result?: string;
  eventRemix?: string;
};

export type EventGalleryImage = {
  role: string;
  src: string;
  alt: string;
};

export type LabEvent = {
  id: string;
  featured: boolean;
  clickable: boolean;
  title: string;
  styleLine: string;
  locationLine: string;
  school: string;
  hostedBy?: string;
  audience?: string;
  attendees?: string;
  thumbnailImage: string;
  imageSource: "real";
  gallery?: EventGalleryImage[];
  eventPlaybook?: string[];
  reflection?: string;
  goodFor?: string;
  sourceNote?: string;
};

export type Track = {
  id: string;
  featured: boolean;
  clickable: boolean;
  title: string;
  description: string;
  iconObject: string;
  iconAsset?: string | null;
  expectedTime?: string;
  bestFor?: string;
  runOfShow?: Array<{
    duration: string;
    step: string;
  }>;
  useThisWith?: string[];
  relatedEvents?: string[];
  status?: string;
};

export const useCases = useCasesData.items as UseCase[];
export const events = eventsData.items as LabEvent[];
export const tracks = tracksData.items as Track[];

export const featuredUseCases = useCases.filter((item) => item.featured);
export const featuredEvents = events.filter((item) => item.featured);
export const activeTracks = tracks.filter((item) => item.clickable);

export function getUseCase(id: string) {
  return useCases.find((item) => item.id === id);
}

export function getEvent(id: string) {
  return events.find((item) => item.id === id);
}

export function getTrack(id: string) {
  return tracks.find((item) => item.id === id);
}

export function getUseCasesByIds(ids: string[]) {
  return ids.map(getUseCase).filter(Boolean) as UseCase[];
}

export function getEventsByIds(ids: string[]) {
  return ids.map(getEvent).filter(Boolean) as LabEvent[];
}

export type RemixItem = {
  id: string;
  type: "track" | "useCase" | "event";
  title: string;
  label: string;
  detail?: string;
};

export const remixItems: RemixItem[] = [
  ...tracks.map((item) => ({
    id: item.id,
    type: "track" as const,
    title: item.title,
    label: item.clickable ? "Track" : "Track locked",
    detail: item.description
  })),
  ...useCases.map((item) => ({
    id: item.id,
    type: "useCase" as const,
    title: item.title,
    label: item.featureLabel,
    detail: item.school
  })),
  ...events.map((item) => ({
    id: item.id,
    type: "event" as const,
    title: item.title,
    label: item.styleLine,
    detail: item.locationLine
  }))
];
