"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import {
  getSoundEnabled,
  playArcadeBlip,
  setSoundEnabled,
  startArcadeMusic,
  stopArcadeMusic
} from "@/components/client-sound";

export function SoundToggle() {
  const enabled = useSyncExternalStore(
    (notify) => {
      window.addEventListener("lab-library:sound-change", notify);
      window.addEventListener("storage", notify);
      return () => {
        window.removeEventListener("lab-library:sound-change", notify);
        window.removeEventListener("storage", notify);
      };
    },
    getSoundEnabled,
    () => false
  );

  useEffect(() => {
    if (!enabled) {
      stopArcadeMusic();
      return;
    }

    function startAfterGesture() {
      startArcadeMusic();
    }

    window.addEventListener("pointerdown", startAfterGesture, { once: true });
    window.addEventListener("keydown", startAfterGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startAfterGesture);
      window.removeEventListener("keydown", startAfterGesture);
    };
  }, [enabled]);

  function toggleSound() {
    const next = !enabled;
    setSoundEnabled(next);

    if (next) {
      playArcadeBlip("start", { force: true });
      startArcadeMusic({ force: true });
    }
  }

  return (
    <button
      aria-label={enabled ? "Mute arcade music and sound" : "Enable arcade music and sound"}
      aria-pressed={enabled}
      className="sound-toggle"
      onClick={toggleSound}
      type="button"
    >
      {enabled ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
    </button>
  );
}
