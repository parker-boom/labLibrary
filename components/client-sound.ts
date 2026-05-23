"use client";

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export function getSoundEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("lab-library:sound") === "on";
}

export function playArcadeBlip(tone: "soft" | "select" | "start" = "soft") {
  if (typeof window === "undefined" || !getSoundEnabled()) {
    return;
  }

  const AudioContextCtor =
    window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;

  if (!AudioContextCtor) {
    return;
  }

  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const frequencies = {
    soft: 220,
    select: 330,
    start: 440
  };

  oscillator.type = "square";
  oscillator.frequency.value = frequencies[tone];
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.13);
}
