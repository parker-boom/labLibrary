import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PixelIcon } from "@/components/PixelIcon";
import type { SpriteKey } from "@/lib/sprites";

type DetailShellProps = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  sprite: SpriteKey;
  children: ReactNode;
  action?: ReactNode;
};

export function DetailShell({
  action,
  backHref,
  backLabel,
  children,
  eyebrow,
  sprite,
  title
}: DetailShellProps) {
  return (
    <article className="detail-shell">
      <div className="detail-shell__chrome">
        <Link className="back-link" href={backHref}>
          <ArrowLeft aria-hidden="true" size={17} />
          <span>{backLabel}</span>
        </Link>
        {action}
      </div>
      <header className="detail-shell__header">
        <PixelIcon size="lg" sprite={sprite} />
        <div>
          <p className="micro-label">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
      </header>
      {children}
    </article>
  );
}
