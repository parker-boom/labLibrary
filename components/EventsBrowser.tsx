"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Home, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { playArcadeBlip } from "@/components/client-sound";
import { EventCard } from "@/components/EventCard";
import { PageHeader } from "@/components/PageHeader";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { RouteLink } from "@/components/RouteLink";
import type { LabEvent } from "@/lib/content";
import { splitEventTitle } from "@/lib/text";
import { useBodyScrollLock, useEscapeClose } from "@/lib/useModalLifecycle";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type EventsBrowserProps = {
  items: LabEvent[];
};

function modalId(id: string) {
  return `event-modal-${id}`;
}

export function EventsBrowser({ items }: EventsBrowserProps) {
  const pathname = usePathname();
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
  const selectedTitle = selected ? splitEventTitle(selected.title) : null;

  useEffect(() => {
    function syncFromHash() {
      const hashId = window.location.hash.replace("#", "");
      setSelectedId(items.some((item) => item.id === hashId && item.clickable) ? hashId : null);
    }

    syncFromHash();
    const frame = requestAnimationFrame(syncFromHash);
    const delayedSync = window.setTimeout(syncFromHash, 120);

    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayedSync);
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [items, pathname]);

  useBodyScrollLock(Boolean(selectedId));
  useEscapeClose(Boolean(selectedId), closeEvent);

  function openEvent(event: LabEvent) {
    if (!event.clickable) {
      return;
    }

    setSelectedId(event.id);
    window.history.pushState({ labLibraryEventModal: event.id }, "", `/reports#${event.id}`);
  }

  function closeEvent() {
    playArcadeBlip("soft");

    if (window.history.state?.labLibraryEventModal) {
      window.history.back();
      return;
    }

    setSelectedId(null);
    window.history.replaceState(null, "", "/reports");
  }

  const modal = (
    <AnimatePresence>
      {selected ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="event-modal"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.18, ease: "easeOut" }}
        >
          <button aria-label="Close event" className="event-modal__scrim" onClick={closeEvent} type="button" />
          <motion.article
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-labelledby={`${selected.id}-event-modal-title`}
            className="event-modal__panel"
            exit={{ opacity: 0, scale: reduce ? 0.995 : 0.985, y: reduce ? 5 : 10 }}
            initial={{ opacity: 0.9, scale: reduce ? 0.995 : 0.985, y: reduce ? 6 : 12 }}
            layoutId={modalId(selected.id)}
            aria-modal="true"
            role="dialog"
            transition={{ duration: reduce ? 0.2 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="event-modal__hero">
              <div className="event-modal__title-block">
                <h1 id={`${selected.id}-event-modal-title`}>{selectedTitle?.name}</h1>
                {selectedTitle?.school ? <p>{selectedTitle.school}</p> : null}
              </div>
              <button aria-label="Close event" className="event-modal__close" onClick={closeEvent} type="button">
                <X aria-hidden="true" size={30} strokeWidth={2.2} />
              </button>
            </div>

            <div className="event-modal__body detail-grid detail-grid--event-modal">
              <div className="event-modal__media-stack">
                <PhotoCarousel images={selected.gallery ?? [{ role: "primary", src: selected.thumbnailImage, alt: selected.title }]} />
                <section className="event-modal__good-for">
                  <span>Good for</span>
                  <strong>{selected.goodFor}</strong>
                </section>
              </div>
              <aside className="detail-stack">
                <section className="event-modal__reflection-bubble">
                  <p>{selected.reflection}</p>
                </section>
                <section className="info-panel">
                  <p className="micro-label">Playbook</p>
                  <ol className="number-list">
                    {selected.eventPlaybook?.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section className="quick-facts event-modal__facts">
                  <div>
                    <span>Audience</span>
                    <strong>{selected.audience}</strong>
                  </div>
                  <div>
                    <span>Room</span>
                    <strong>{selected.attendees}</strong>
                  </div>
                  <div>
                    <span>Host</span>
                    <strong>{selected.hostedBy}</strong>
                  </div>
                </section>
              </aside>
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
          title="Field Reports"
        >
          <p>
            Open a report to see who came, what happened, why it worked, and how to run it.
          </p>
        </PageHeader>
        <section className="library-grid library-grid--events" aria-label="Reports">
          {items.map((event) => (
            <EventCard
              event={event}
              key={event.id}
              layoutId={modalId(event.id)}
              onOpen={() => openEvent(event)}
            />
          ))}
        </section>
      </div>
      {typeof document === "undefined" ? null : createPortal(modal, document.body)}
    </>
  );
}
