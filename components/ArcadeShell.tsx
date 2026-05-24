import type { ReactNode } from "react";
import { RouteStage } from "@/components/RouteStage";

export function ArcadeShell({ children }: { children: ReactNode }) {
  return (
    <div className="arcade-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-pixels" aria-hidden="true" />
      <RouteStage>{children}</RouteStage>
    </div>
  );
}
