"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { playArcadeBlip } from "@/components/client-sound";
import type { LabEvent, Track, UseCase } from "@/lib/content";
import { spriteForTrack, spriteForUseCase } from "@/lib/sprites";
import { PixelIcon } from "@/components/PixelIcon";

type AttractModeProps = {
  useCases: UseCase[];
  events: LabEvent[];
  tracks: Track[];
};

export function AttractMode({ useCases, events, tracks }: AttractModeProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const slides = useMemo(
    () => [
      ...tracks.map((item) => ({
        key: `track-${item.id}`,
        type: "track",
        title: item.title,
        line: item.description,
        sprite: spriteForTrack(item.id)
      })),
      ...useCases.map((item) => ({
        key: `use-${item.id}`,
        type: "workflow",
        title: item.title,
        line: item.eventRemix ?? item.result ?? item.featureLabel,
        sprite: spriteForUseCase(item.id)
      }))
    ],
    [tracks, useCases]
  );

  const active = slides[index % slides.length];
  const activeEvent = events[index % events.length];

  useEffect(() => {
    let idleTimer = window.setTimeout(() => setOpen(true), 45000);

    function resetIdle() {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setOpen(true), 45000);
    }

    window.addEventListener("pointerdown", resetIdle);
    window.addEventListener("keydown", resetIdle);
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointerdown", resetIdle);
      window.removeEventListener("keydown", resetIdle);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setInterval(() => setIndex((value) => value + 1), reduce ? 5200 : 3200);
    return () => window.clearInterval(timer);
  }, [open, reduce]);

  function openMode() {
    setOpen(true);
    playArcadeBlip("start");
  }

  function closeMode() {
    setOpen(false);
    playArcadeBlip("soft");
  }

  return (
    <>
      <button className="attract-launcher" onClick={openMode} type="button">
        <Sparkles aria-hidden="true" size={16} />
        <span>Attract</span>
      </button>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="attract-mode"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Lab Library attract mode"
        >
          <button aria-label="Close attract mode" className="icon-button attract-mode__close" onClick={closeMode} type="button">
            <X aria-hidden="true" size={19} />
          </button>
          <div className="attract-mode__grid">
            <section className="attract-mode__hero">
              <p className="micro-label">Lab Library cabinet</p>
              <h2>Pick a format. Steal a workflow. Prove it with a real room.</h2>
              <button className="button" onClick={closeMode} type="button">
                Press start
              </button>
            </section>
            <section className="attract-mode__slide">
              <PixelIcon sprite={active.sprite} size="xl" />
              <p className="micro-label">{active.type}</p>
              <h3>{active.title}</h3>
              <p>{active.line}</p>
            </section>
            <section className="attract-mode__photo">
              <Image alt={activeEvent.title} fill sizes="(max-width: 760px) 90vw, 36vw" src={activeEvent.thumbnailImage} />
              <div>
                <span>{activeEvent.locationLine}</span>
                <strong>{activeEvent.title}</strong>
              </div>
            </section>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
