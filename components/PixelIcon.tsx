import type { CSSProperties } from "react";
import { spritePositions, type SpriteKey } from "@/lib/sprites";
import { cx } from "@/lib/text";

type PixelIconProps = {
  sprite: SpriteKey;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export function PixelIcon({ sprite, label, size = "md", className }: PixelIconProps) {
  return (
    <span
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      className={cx("pixel-icon", `pixel-icon--${size}`, className)}
      style={
        {
          "--sprite-position": spritePositions[sprite]
        } as CSSProperties
      }
    />
  );
}
