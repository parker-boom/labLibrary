export type SpriteKey =
  | "compass"
  | "joystick"
  | "camera"
  | "mic"
  | "calendar"
  | "project"
  | "promptCards"
  | "stage"
  | "toolbox"
  | "laptop"
  | "flyer"
  | "chart";

export const spriteImageSources: Record<SpriteKey, string> = {
  compass: "/assets/generated/icons/compass.png",
  joystick: "/assets/generated/icons/joystick.png",
  camera: "/assets/generated/icons/camera.png",
  mic: "/assets/generated/icons/mic.png",
  calendar: "/assets/generated/icons/calendar.png",
  project: "/assets/generated/icons/project.png",
  promptCards: "/assets/generated/icons/promptCards.png",
  stage: "/assets/generated/icons/stage.png",
  toolbox: "/assets/generated/icons/toolbox.png",
  laptop: "/assets/generated/icons/laptop.png",
  flyer: "/assets/generated/icons/flyer.png",
  chart: "/assets/generated/icons/chart.png"
};

const useCaseIconMap: Record<string, string> = {
  "practicing-interviews-voice-mode": "/assets/generated/use-case-icons/practicing-interviews-voice-mode.png",
  "managing-chaotic-week-google-calendar": "/assets/generated/use-case-icons/managing-chaotic-week-google-calendar.png",
  "planning-campus-gala-projects": "/assets/generated/use-case-icons/planning-campus-gala-projects.png",
  "talking-through-job-offer-deep-research": "/assets/generated/use-case-icons/talking-through-job-offer-deep-research.png",
  "figuring-out-money-data-analysis": "/assets/generated/use-case-icons/figuring-out-money-data-analysis.png",
  "making-club-posters-image-generation": "/assets/generated/use-case-icons/making-club-posters-image-generation.png",
  "messy-notes-study-sheet-thinking": "/assets/generated/use-case-icons/messy-notes-study-sheet-thinking.png",
  "mapping-codebase-github-mermaid": "/assets/generated/use-case-icons/mapping-codebase-github-mermaid.png",
  "meeting-notes-to-do-list-apps": "/assets/generated/use-case-icons/meeting-notes-to-do-list-apps.png",
  "travel-japanese-study-mode": "/assets/generated/use-case-icons/travel-japanese-study-mode.png",
  "old-posts-canva-carousel-apps": "/assets/generated/use-case-icons/old-posts-canva-carousel-apps.png",
  "mocking-up-product-deep-research": "/assets/generated/use-case-icons/mocking-up-product-deep-research.png"
};

const useCaseSpriteMap: Record<string, SpriteKey> = {
  "practicing-interviews-voice-mode": "mic",
  "managing-chaotic-week-google-calendar": "calendar",
  "planning-campus-gala-projects": "project",
  "talking-through-job-offer-deep-research": "flyer",
  "figuring-out-money-data-analysis": "chart",
  "making-club-posters-image-generation": "camera",
  "messy-notes-study-sheet-thinking": "promptCards",
  "mapping-codebase-github-mermaid": "laptop",
  "meeting-notes-to-do-list-apps": "calendar",
  "travel-japanese-study-mode": "compass",
  "old-posts-canva-carousel-apps": "camera",
  "mocking-up-product-deep-research": "toolbox"
};

const eventSpriteMap: Record<string, SpriteKey> = {
  "promptathon-uc-davis": "promptCards",
  "chatgpt-game-night-georgia-tech": "joystick",
  "ai-passport-wall-minerva": "flyer",
  "ai-club-summit-cornell": "stage",
  "campus-pain-point-contest-kansas": "chart",
  "ai-questions-tabling-cerritos": "mic",
  "greek-life-ai-conversation-denver": "stage",
  "founder-open-mic-uc-irvine": "mic"
};

const trackSpriteMap: Record<string, SpriteKey> = {
  "show-and-tell": "stage",
  "prompt-a-thon": "promptCards",
  "builder-lab": "toolbox"
};

const trackIconMap: Record<string, string> = {
  "show-and-tell": "/assets/generated/track-icons/show-and-tell.png",
  "prompt-a-thon": "/assets/generated/track-icons/prompt-a-thon.png",
  "builder-lab": "/assets/generated/track-icons/builder-lab.png"
};

export function spriteForUseCase(id: string): SpriteKey {
  return useCaseSpriteMap[id] ?? "joystick";
}

export function iconForUseCase(id: string): string {
  return useCaseIconMap[id] ?? spriteImageSources[spriteForUseCase(id)];
}

export function spriteForEvent(id: string): SpriteKey {
  return eventSpriteMap[id] ?? "camera";
}

export function spriteForTrack(id: string): SpriteKey {
  return trackSpriteMap[id] ?? "compass";
}

export function iconForTrack(id: string): string {
  return trackIconMap[id] ?? spriteImageSources[spriteForTrack(id)];
}
