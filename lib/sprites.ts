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

export const spritePositions: Record<SpriteKey, string> = {
  compass: "0% 0%",
  joystick: "33.333% 0%",
  camera: "66.667% 0%",
  mic: "100% 0%",
  calendar: "0% 50%",
  project: "33.333% 50%",
  promptCards: "66.667% 50%",
  stage: "100% 50%",
  toolbox: "0% 100%",
  laptop: "33.333% 100%",
  flyer: "66.667% 100%",
  chart: "100% 100%"
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
  "mocking-up-product-deep-research": "toolbox",
  "finding-wasted-time-data-analysis": "chart"
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

export function spriteForUseCase(id: string): SpriteKey {
  return useCaseSpriteMap[id] ?? "joystick";
}

export function spriteForEvent(id: string): SpriteKey {
  return eventSpriteMap[id] ?? "camera";
}

export function spriteForTrack(id: string): SpriteKey {
  return trackSpriteMap[id] ?? "compass";
}
