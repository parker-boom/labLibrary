import { DetailShell } from "@/components/DetailShell";
import type { SpriteKey } from "@/lib/sprites";

type DormantDetailProps = {
  title: string;
  eyebrow: string;
  backHref: string;
  backLabel: string;
  sprite: SpriteKey;
};

export function DormantDetail({ backHref, backLabel, eyebrow, sprite, title }: DormantDetailProps) {
  return (
    <DetailShell backHref={backHref} backLabel={backLabel} eyebrow={eyebrow} sprite={sprite} title={title}>
      <section className="detail-empty">
        <p className="micro-label">V1 archive card</p>
        <h2>Visible in the cabinet. Detail cartridge not cut yet.</h2>
        <p>
          This entry stays discoverable in the list so hosts can see the surface area, while
          the first prototype keeps detail pages focused on the strongest featured examples.
        </p>
      </section>
    </DetailShell>
  );
}
