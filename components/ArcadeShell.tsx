import type { ReactNode } from "react";
import { AttractMode } from "@/components/AttractMode";
import { HostRemixTray } from "@/components/HostRemixTray";
import { RouteStage } from "@/components/RouteStage";
import { SiteNav } from "@/components/SiteNav";
import { SoundToggle } from "@/components/SoundToggle";
import { activeTracks, featuredEvents, featuredUseCases, remixItems } from "@/lib/content";

export function ArcadeShell({ children }: { children: ReactNode }) {
  return (
    <div className="arcade-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-pixels" aria-hidden="true" />
      <SiteNav />
      <SoundToggle />
      <RouteStage>{children}</RouteStage>
      <AttractMode events={featuredEvents} tracks={activeTracks} useCases={featuredUseCases} />
      <HostRemixTray items={remixItems} />
    </div>
  );
}
