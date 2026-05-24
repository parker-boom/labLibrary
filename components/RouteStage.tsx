import type { ReactNode } from "react";

export function RouteStage({ children }: { children: ReactNode }) {
  return <main className="route-stage">{children}</main>;
}
