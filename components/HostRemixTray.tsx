"use client";

import { ClipboardList, Copy, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { playArcadeBlip } from "@/components/client-sound";
import type { RemixItem } from "@/lib/content";
import { cx } from "@/lib/text";

type TrayState = {
  track?: string;
  useCase?: string;
  event?: string;
};

type HostRemixTrayProps = {
  items: RemixItem[];
};

const storageKey = "lab-library:host-remix-tray";

export function HostRemixTray({ items }: HostRemixTrayProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tray, setTray] = useState<TrayState>({});

  const byKey = useMemo(() => {
    const map = new Map<string, RemixItem>();
    items.forEach((item) => map.set(`${item.type}:${item.id}`, item));
    return map;
  }, [items]);

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        setTray(JSON.parse(saved) as TrayState);
      }
    }, 0);

    function onAdd(event: Event) {
      const detail = (event as CustomEvent<RemixItem>).detail;
      setTray((current) => {
        const next = { ...current, [detail.type]: detail.id };
        window.localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
      setOpen(true);
    }

    window.addEventListener("lab-library:add-to-tray", onAdd);
    return () => {
      window.clearTimeout(restoreTimer);
      window.removeEventListener("lab-library:add-to-tray", onAdd);
    };
  }, []);

  const slots = [
    {
      key: "track" as const,
      label: "Format",
      empty: "Pick a track",
      item: tray.track ? byKey.get(`track:${tray.track}`) : undefined
    },
    {
      key: "useCase" as const,
      label: "Workflow",
      empty: "Pick a use case",
      item: tray.useCase ? byKey.get(`useCase:${tray.useCase}`) : undefined
    },
    {
      key: "event" as const,
      label: "Proof",
      empty: "Pick an event",
      item: tray.event ? byKey.get(`event:${tray.event}`) : undefined
    }
  ];

  const summary = slots
    .map((slot) => `${slot.label}: ${slot.item ? slot.item.title : slot.empty}`)
    .join("\n");

  function clearTray() {
    setTray({});
    window.localStorage.removeItem(storageKey);
    playArcadeBlip("soft");
  }

  async function copySummary() {
    await navigator.clipboard.writeText(`Lab Library host remix\n${summary}`);
    setCopied(true);
    playArcadeBlip("select");
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <aside className={cx("host-tray", open && "host-tray--open")} aria-label="Host remix tray">
      <button className="host-tray__tab" onClick={() => setOpen((value) => !value)} type="button">
        <ClipboardList aria-hidden="true" size={18} />
        <span>Host Remix</span>
      </button>
      <div className="host-tray__panel">
        <div className="host-tray__top">
          <div>
            <p className="micro-label">Build a room</p>
            <h2>Host Remix Tray</h2>
          </div>
          <button aria-label="Close tray" className="icon-button" onClick={() => setOpen(false)} type="button">
            <X aria-hidden="true" size={17} />
          </button>
        </div>
        <div className="host-tray__slots">
          {slots.map((slot) => (
            <div className="host-tray__slot" key={slot.key}>
              <span>{slot.label}</span>
              <strong>{slot.item ? slot.item.title : slot.empty}</strong>
              {slot.item?.detail ? <small>{slot.item.detail}</small> : null}
            </div>
          ))}
        </div>
        <div className="host-tray__plan" aria-live="polite">
          <span>Plan card</span>
          <p>
            {slots.every((slot) => slot.item)
              ? "Run the selected format, anchor it in the student workflow, and borrow credibility from the event proof."
              : "Add one format, one workflow, and one proof point to assemble a host-ready event idea."}
          </p>
        </div>
        <div className="host-tray__actions">
          <button className="button button--dark" onClick={copySummary} type="button">
            <Copy aria-hidden="true" size={16} />
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button className="button button--ghost" onClick={clearTray} type="button">
            <RotateCcw aria-hidden="true" size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
