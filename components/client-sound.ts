"use client";

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let sharedContext: AudioContext | null = null;
let lastHoverBlipAt = 0;

export function getSoundEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("lab-library:sound") === "on";
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("lab-library:sound", enabled ? "on" : "off");
  window.dispatchEvent(
    new CustomEvent("lab-library:sound-change", {
      detail: { enabled }
    })
  );
}

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  if (sharedContext) {
    return sharedContext;
  }

  const AudioContextCtor =
    window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;

  if (!AudioContextCtor) {
    return null;
  }

  sharedContext = new AudioContextCtor();
  return sharedContext;
}

export function playArcadeBlip(
  tone: "hover" | "soft" | "select" | "start" = "soft",
  options: { force?: boolean } = {}
) {
  if (typeof window === "undefined" || (!options.force && !getSoundEnabled())) {
    return;
  }

  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    void context.resume();
  }

  if (tone === "hover") {
    const now = window.performance.now();
    if (now - lastHoverBlipAt < 160) {
      return;
    }
    lastHoverBlipAt = now;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const frequencies = {
    hover: 176,
    soft: 220,
    select: 330,
    start: 440
  };
  const durations = {
    hover: 0.055,
    soft: 0.11,
    select: 0.13,
    start: 0.17
  };
  const peakGain = tone === "hover" ? 0.012 : tone === "start" ? 0.04 : 0.028;
  const duration = durations[tone];

  oscillator.type = tone === "start" ? "triangle" : "square";
  oscillator.frequency.value = frequencies[tone];
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(peakGain, context.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.01);
}
