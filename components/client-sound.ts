"use client";

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

const SOUND_KEY = "lab-library:sound";

let sharedContext: AudioContext | null = null;
let lastHoverBlipAt = 0;
let musicGain: GainNode | null = null;
let musicInterval: number | null = null;
let musicStep = 0;
let soundEnabledMemory = false;

export function getSoundEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const stored = window.localStorage.getItem(SOUND_KEY);

    if (stored === "on") {
      soundEnabledMemory = true;
      return true;
    }

    if (stored === "off") {
      soundEnabledMemory = false;
      return false;
    }
  } catch {
    return soundEnabledMemory;
  }

  return soundEnabledMemory;
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  soundEnabledMemory = enabled;
  try {
    window.localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
  } catch {
    // In-memory state keeps the current session responsive if storage is blocked.
  }

  if (!enabled) {
    stopArcadeMusic();
  }
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

function scheduleMusicTone(context: AudioContext, frequency: number, startAt: number, duration: number) {
  if (!musicGain) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.028, startAt + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(musicGain);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
}

function scheduleMusicBar() {
  const context = getAudioContext();

  if (!context || !musicGain) {
    return;
  }

  if (context.state === "suspended") {
    void context.resume();
  }

  const patterns = [
    [110, 146.83, 164.81, 220],
    [110, 164.81, 196, 246.94],
    [98, 146.83, 185, 220],
    [123.47, 164.81, 196, 293.66]
  ];
  const pattern = patterns[musicStep % patterns.length];
  const startAt = context.currentTime + 0.02;

  pattern.forEach((frequency, index) => {
    scheduleMusicTone(context, frequency, startAt + index * 0.34, 0.28);
  });
  musicStep += 1;
}

export function startArcadeMusic(options: { force?: boolean } = {}) {
  if (typeof window === "undefined" || (!options.force && !getSoundEnabled())) {
    return;
  }

  if (musicInterval !== null) {
    return;
  }

  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    void context.resume();
  }

  musicGain = context.createGain();
  musicGain.gain.setValueAtTime(0.0001, context.currentTime);
  musicGain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.4);
  musicGain.connect(context.destination);
  musicStep = 0;
  scheduleMusicBar();
  musicInterval = window.setInterval(scheduleMusicBar, 1680);
}

export function stopArcadeMusic() {
  if (typeof window === "undefined") {
    return;
  }

  if (musicInterval !== null) {
    window.clearInterval(musicInterval);
    musicInterval = null;
  }

  if (!musicGain || !sharedContext) {
    musicGain = null;
    return;
  }

  const gain = musicGain;
  musicGain = null;
  gain.gain.cancelScheduledValues(sharedContext.currentTime);
  gain.gain.setTargetAtTime(0.0001, sharedContext.currentTime, 0.08);
  window.setTimeout(() => gain.disconnect(), 260);
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
