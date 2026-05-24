"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Home, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { EventCard } from "@/components/EventCard";
import { PageHeader } from "@/components/PageHeader";
import { PixelIcon } from "@/components/PixelIcon";
import { TrackCard } from "@/components/TrackCard";
import { UseCaseCard } from "@/components/UseCaseCard";
import { getEventsByIds, getUseCasesByIds, type Track } from "@/lib/content";
import { iconForTrack } from "@/lib/sprites";

type TracksBrowserProps = {
  items: Track[];
};

function modalId(id: string) {
  return `track-modal-${id}`;
}

export function TracksBrowser({ items }: TracksBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const initialId = window.location.hash.replace("#", "");
    return items.some((item) => item.id === initialId && item.clickable) ? initialId : null;
  });
  const reduce = useReducedMotion();
  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );
  const selectedUseCases = selected ? getUseCasesByIds(selected.useThisWith ?? []) : [];
  const selectedEvents = selected ? getEventsByIds(selected.relatedEvents ?? []) : [];

  useEffect(() => {
    function syncFromHash() {
      const hashId = window.location.hash.replace("#", "");
      setSelectedId(items.some((item) => item.id === hashId && item.clickable) ? hashId : null);
    }

    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [items]);

  useEffect(() => {
    if (!selectedId) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeTrack();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  function openTrack(track: Track) {
    if (!track.clickable) {
      return;
    }

    setSelectedId(track.id);
    window.history.pushState({ labLibraryModal: track.id }, "", `/tracks#${track.id}`);
  }

  function closeTrack() {
    if (window.history.state?.labLibraryModal) {
      window.history.back();
      return;
    }

    setSelectedId(null);
    window.history.replaceState(null, "", "/tracks");
  }

  const modal = (
    <AnimatePresence>
      {selected ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="track-modal use-case-modal"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.16, ease: "easeOut" }}
        >
          <button aria-label="Close track" className="use-case-modal__scrim" onClick={closeTrack} type="button" />
          <motion.article
            aria-labelledby={`${selected.id}-track-modal-title`}
            className="track-modal__panel use-case-modal__panel"
            layoutId={modalId(selected.id)}
            role="dialog"
            transition={{ duration: reduce ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="track-modal__hero">
              <div className="track-modal__icon" aria-hidden="true">
                <PixelIcon imageSrc={iconForTrack(selected.id)} label={selected.title} size="xl" />
              </div>
              <div className="track-modal__title">
                <h1 id={`${selected.id}-track-modal-title`}>{selected.title}</h1>
                <p>{selected.description}</p>
              </div>
              <button aria-label="Close track" className="use-case-modal__close" onClick={closeTrack} type="button">
                <X aria-hidden="true" size={30} strokeWidth={2.2} />
              </button>
            </div>

            <div className="track-modal__body">
              <section className="info-panel info-panel--wide">
                <p className="micro-label">Best for</p>
                <h2>{selected.bestFor}</h2>
              </section>
              <section className="run-of-show">
                <p className="micro-label">Run of show</p>
                <ol>
                  {selected.runOfShow?.map((step) => (
                    <li key={`${step.duration}-${step.step}`}>
                      <span>{step.duration}</span>
                      <p>{step.step}</p>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="related-grid">
                <div>
                  <p className="micro-label">Use this with</p>
                  <div className="mini-grid">
                    {selectedUseCases.map((item) => (
                      <UseCaseCard key={item.id} useCase={item} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="micro-label">Related events</p>
                  <div className="mini-grid mini-grid--events">
                    {selectedEvents.map((item) => (
                      <EventCard event={item} key={item.id} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <div className="page">
        <PageHeader
          action={
            <Link aria-label="Go home" className="page-home-link" href="/">
              <Home aria-hidden="true" size={28} strokeWidth={2.4} />
            </Link>
          }
          title="Tracks"
        >
          <p>
            Choose the shape of the room first. Then layer in a student workflow and
            proof from a past event.
          </p>
        </PageHeader>
        <section className="track-list" aria-label="Event tracks">
          {items.map((track) => (
            <TrackCard
              key={track.id}
              layoutId={track.clickable ? modalId(track.id) : undefined}
              onOpen={track.clickable ? () => openTrack(track) : undefined}
              track={track}
            />
          ))}
        </section>
      </div>
      {typeof document === "undefined" ? null : createPortal(modal, document.body)}
    </>
  );
}
