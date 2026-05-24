"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { playArcadeBlip } from "@/components/client-sound";
import { RouteLink } from "@/components/RouteLink";
import { cx } from "@/lib/text";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type MotionCardProps = {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
  className?: string;
  linkClassName?: string;
  ariaLabel?: string;
  layoutId?: string;
  onClick?: () => void;
};

export function MotionCard({
  children,
  href,
  disabled = false,
  className,
  linkClassName,
  ariaLabel,
  layoutId,
  onClick
}: MotionCardProps) {
  const reduce = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const enableGestures = mounted && !disabled && !reduce;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  function playHoverSound() {
    if (!disabled) {
      playArcadeBlip("hover");
    }
  }

  function playSelectSound() {
    if (!disabled) {
      playArcadeBlip("select");
    }
  }

  function handleButtonClick() {
    playSelectSound();
    onClick?.();
  }

  const card = (
    <motion.article
      aria-disabled={disabled || undefined}
      className={cx("motion-card", disabled && "motion-card--disabled", className)}
      layoutId={layoutId}
      whileHover={
        enableGestures
          ? {
              y: -8,
              rotateX: 1.2,
              rotateY: -1.2,
              scale: 1.015
            }
          : undefined
      }
      whileTap={enableGestures ? { scale: 0.985, y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {children}
    </motion.article>
  );

  if (!href || disabled) {
    if (!onClick || disabled) {
      return card;
    }

    return (
      <button
        aria-label={ariaLabel}
        className={cx("motion-card-button", linkClassName)}
        onClick={handleButtonClick}
        onMouseEnter={playHoverSound}
        type="button"
      >
        {card}
      </button>
    );
  }

  return (
    <RouteLink
      aria-label={ariaLabel}
      className={cx("motion-card-link", linkClassName)}
      href={href}
      onClick={playSelectSound}
      onMouseEnter={playHoverSound}
    >
      {card}
    </RouteLink>
  );
}
