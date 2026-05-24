"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getSoundEnabled, playArcadeBlip, setSoundEnabled } from "@/components/client-sound";

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

  function toggleSound() {
    const next = !enabled;
    setSoundEnabled(next);

    if (next) {
      playArcadeBlip("start", { force: true });
    }
  }

  return (
    <button
      aria-label={enabled ? "Mute arcade sound" : "Enable arcade sound"}
      aria-pressed={enabled}
      className="sound-toggle"
      onClick={toggleSound}
      type="button"
    >
      {enabled ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
    </button>
  );
}
