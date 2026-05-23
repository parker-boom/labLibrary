"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { playArcadeBlip } from "@/components/client-sound";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      setEnabled(window.localStorage.getItem("lab-library:sound") === "on");
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem("lab-library:sound", next ? "on" : "off");
    if (next) {
      window.setTimeout(() => playArcadeBlip("start"), 10);
    }
  }

  return (
    <button
      aria-label={enabled ? "Mute arcade sound" : "Enable arcade sound"}
      className="icon-button sound-toggle"
      onClick={toggle}
      title={enabled ? "Mute sound" : "Enable sound"}
      type="button"
    >
      {enabled ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
    </button>
  );
}
