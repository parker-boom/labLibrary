"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { playArcadeBlip } from "@/components/client-sound";
import type { RemixItem } from "@/lib/content";

type AddToTrayButtonProps = {
  item: RemixItem;
};

export function AddToTrayButton({ item }: AddToTrayButtonProps) {
  const [added, setAdded] = useState(false);

  function add() {
    window.dispatchEvent(
      new CustomEvent("lab-library:add-to-tray", {
        detail: item
      })
    );
    setAdded(true);
    playArcadeBlip("select");
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button className="button button--dark" onClick={add} type="button">
      {added ? <Check aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
      <span>{added ? "Added" : "Add to tray"}</span>
    </button>
  );
}
