"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Home, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { playArcadeBlip } from "@/components/client-sound";
import { PageHeader } from "@/components/PageHeader";
import { PixelIcon } from "@/components/PixelIcon";
import { RouteLink } from "@/components/RouteLink";
import { UseCaseCard } from "@/components/UseCaseCard";
import type { UseCase } from "@/lib/content";
import { iconForUseCase } from "@/lib/sprites";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type UseCasesBrowserProps = {
  items: UseCase[];
};

function modalId(id: string) {
  return `use-case-modal-${id}`;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\+/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function splitTitle(title: string, featureLabel: string) {
  const withMatch = title.match(/\s+with\s+/i);
  if (withMatch?.index !== undefined) {
    return {
      task: title.slice(0, withMatch.index).trim(),
      feature: featureLabel
    };
  }

  const normalizedTitle = normalize(title);
  const normalizedFeature = normalize(featureLabel);
  const featureCandidates = [
    normalizedFeature,
    normalizedFeature.split(" ").at(-1) ?? normalizedFeature
  ];
  const match = featureCandidates
    .map((candidate) => ({ candidate, index: normalizedTitle.lastIndexOf(candidate) }))
    .find(({ index }) => index >= 0);

  if (!match) {
    return { task: title, feature: featureLabel };
  }

  const featureStart = title.length - normalizedTitle.slice(match.index).length;
  return {
    task: title.slice(0, featureStart).trim(),
    feature: title.slice(featureStart).trim()
  };
}

export function UseCasesBrowser({ items }: UseCasesBrowserProps) {
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
  const selectedTitle = selected ? splitTitle(selected.title, selected.featureLabel) : null;

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
        closeUseCase();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  function openUseCase(useCase: UseCase) {
    if (!useCase.clickable) {
      return;
    }

    setSelectedId(useCase.id);
    window.history.pushState({ labLibraryModal: useCase.id }, "", `/workflows#${useCase.id}`);
  }

  function closeUseCase() {
    playArcadeBlip("soft");

    if (window.history.state?.labLibraryModal) {
      window.history.back();
      return;
    }

    setSelectedId(null);
    window.history.replaceState(null, "", "/workflows");
  }

  const modal = (
    <AnimatePresence>
      {selected ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="use-case-modal"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.18, ease: "easeOut" }}
        >
          <button aria-label="Close use case" className="use-case-modal__scrim" onClick={closeUseCase} type="button" />
          <motion.article
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-labelledby={`${selected.id}-modal-title ${selected.id}-modal-feature`}
            className="use-case-modal__panel"
            exit={{ opacity: 0, scale: reduce ? 0.995 : 0.985, y: reduce ? 5 : 10 }}
            initial={{ opacity: 0.9, scale: reduce ? 0.995 : 0.985, y: reduce ? 6 : 12 }}
            layoutId={modalId(selected.id)}
            role="dialog"
            transition={{ duration: reduce ? 0.2 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="use-case-modal__hero">
              <div className="use-case-modal__icon" aria-hidden="true">
                <PixelIcon imageSrc={iconForUseCase(selected.id)} label={selected.featureLabel} size="lg" />
              </div>
              <div className="use-case-modal__title-block">
                <h1 id={`${selected.id}-modal-title`}>{selectedTitle?.task}</h1>
                <span className="use-case-modal__feature" id={`${selected.id}-modal-feature`}>
                  {selectedTitle?.feature}
                </span>
              </div>
              <button aria-label="Close use case" className="use-case-modal__close" onClick={closeUseCase} type="button">
                <X aria-hidden="true" size={30} strokeWidth={2.2} />
              </button>
            </div>

            <div className="use-case-modal__body detail-grid detail-grid--use-case">
              <section className="chat-panel">
                <div className="chat-panel__screen">
                  {selected.chatExample?.map((turn, index) => (
                    <div className={`chat-turn chat-turn--${turn.role}`} key={`${turn.role}-${index}`}>
                      <span>{turn.role === "user" ? "Student" : "ChatGPT"}</span>
                      <p>{turn.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="detail-stack">
                <section className="info-panel">
                  <p className="micro-label">Process</p>
                  <ol className="number-list">
                    {selected.process?.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section className="info-panel">
                  <p className="micro-label">Event remix</p>
                  <p>{selected.eventRemix}</p>
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
          title="Student Workflows"
        >
        <p>
          Pick a workflow to share at your event or turn into an activity.
        </p>
      </PageHeader>
      <section className="library-grid library-grid--use-cases" aria-label="Workflows">
        {items.map((useCase) => (
          <UseCaseCard
            key={useCase.id}
            layoutId={modalId(useCase.id)}
            onOpen={() => openUseCase(useCase)}
            useCase={useCase}
          />
        ))}
      </section>
      </div>
      {typeof document === "undefined" ? null : createPortal(modal, document.body)}
    </>
  );
}
