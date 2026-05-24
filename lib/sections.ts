import type { SpriteKey } from "@/lib/sprites";

export type LabLibrarySection = {
  id: "tracks" | "use-cases" | "events";
  href: string;
  homeTitle: string;
  pageTitle: string;
  detail: string;
  homeIconSrc: string;
  sprite: SpriteKey;
};

export const labLibrarySections: LabLibrarySection[] = [
  {
    id: "tracks",
    href: "/missions",
    homeTitle: "Start A New Mission",
    pageTitle: "Event Missions",
    detail: "Choose your event path.",
    homeIconSrc: "/assets/generated/home-icons/event-tracks.png",
    sprite: "stage"
  },
  {
    id: "use-cases",
    href: "/workflows",
    homeTitle: "Level Up Your AI Skills",
    pageTitle: "Student Workflows",
    detail: "Level up with student examples.",
    homeIconSrc: "/assets/generated/home-icons/student-use-cases.png",
    sprite: "joystick"
  },
  {
    id: "events",
    href: "/reports",
    homeTitle: "Explore the Archive",
    pageTitle: "Field Reports",
    detail: "Uncover notes from past hosts.",
    homeIconSrc: "/assets/generated/home-icons/past-lab-events.png",
    sprite: "camera"
  }
];

export function getLabLibrarySection(id: LabLibrarySection["id"]) {
  return labLibrarySections.find((section) => section.id === id);
}
