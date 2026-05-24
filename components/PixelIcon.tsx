import type { CSSProperties } from "react";
import { spriteImageSources, type SpriteKey } from "@/lib/sprites";
import { cx } from "@/lib/text";

type PixelIconProps = {
  sprite?: SpriteKey;
  imageSrc?: string;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export function PixelIcon({ sprite, imageSrc, label, size = "md", className }: PixelIconProps) {
  const source = imageSrc ?? (sprite ? spriteImageSources[sprite] : undefined);

  return (
    <span
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      className={cx("pixel-icon", `pixel-icon--${size}`, className)}
      style={
        {
          "--sprite-image": source ? `url("${source}")` : undefined
        } as CSSProperties
      }
    />
  );
}
