"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Home, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { playArcadeBlip } from "@/components/client-sound";
import { PageHeader } from "@/components/PageHeader";
import { PixelIcon } from "@/components/PixelIcon";
import { RouteLink } from "@/components/RouteLink";
import { TrackCard } from "@/components/TrackCard";
import { TrackStarterKit } from "@/components/TrackStarterKit";
import { getEventsByIds, getUseCasesByIds, type Track } from "@/lib/content";
import { iconForTrack } from "@/lib/sprites";
import { cx } from "@/lib/text";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type TracksBrowserProps = {
  iconVariant?: TrackIconVariant;
  items: Track[];
};

function modalId(id: string) {
  return `track-modal-${id}`;
}

type TrackIconVariant = "plain" | "square" | "compact";

export function TracksBrowser({ iconVariant = "plain", items }: TracksBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const initialId = window.location.hash.replace("#", "");
    return items.some((item) => item.id === initialId && item.clickable) ? initialId : null;
  });
  const reduce = usePrefersReducedMotion();
  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );
  const selectedUseCases = selected ? getUseCasesByIds(selected.useThisWith ?? []) : [];
  const selectedEvents = selected ? getEventsByIds(selected.relatedEvents ?? []) : [];
  const selectedEvent = selectedEvents[0];

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

    const resetModalScroll = () => {
      document.querySelector<HTMLElement>(".track-modal__body")?.scrollTo({ top: 0 });
    };
    const animationFrame = requestAnimationFrame(resetModalScroll);
    const delayedReset = window.setTimeout(resetModalScroll, 120);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(delayedReset);
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
    window.history.pushState({ labLibraryModal: track.id }, "", `/missions#${track.id}`);
  }

  function closeTrack() {
    playArcadeBlip("soft");

    if (window.history.state?.labLibraryModal) {
      window.history.back();
      return;
    }

    setSelectedId(null);
    window.history.replaceState(null, "", "/missions");
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
            animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            aria-labelledby={`${selected.id}-track-modal-title`}
            className="track-modal__panel use-case-modal__panel"
            exit={reduce ? undefined : { opacity: 0, scale: 0.985, y: 10 }}
            initial={reduce ? false : { opacity: 0.92, scale: 0.985, y: 12 }}
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
              <TrackStarterKit event={selectedEvent} track={selected} useCases={selectedUseCases} />
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
            <RouteLink aria-label="Go home" className="page-home-link" href="/">
              <Home aria-hidden="true" size={28} strokeWidth={2.4} />
            </RouteLink>
          }
          title="Event Missions"
        >
          <p>
            Pick a mission to see what the event is and how to bring it to campus.
          </p>
        </PageHeader>
        <section className={cx("track-list", `track-list--icons-${iconVariant}`)} aria-label="Missions">
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
