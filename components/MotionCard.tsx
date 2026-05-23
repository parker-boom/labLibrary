"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/text";

type MotionCardProps = {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
  className?: string;
  linkClassName?: string;
  ariaLabel?: string;
};

export function MotionCard({
  children,
  href,
  disabled = false,
  className,
  linkClassName,
  ariaLabel
}: MotionCardProps) {
  const reduce = useReducedMotion();

  const card = (
    <motion.article
      aria-disabled={disabled || undefined}
      className={cx("motion-card", disabled && "motion-card--disabled", className)}
      whileHover={
        disabled || reduce
          ? undefined
          : {
              y: -8,
              rotateX: 1.2,
              rotateY: -1.2,
              scale: 1.015
            }
      }
      whileTap={disabled || reduce ? undefined : { scale: 0.985, y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {children}
    </motion.article>
  );

  if (!href || disabled) {
    return card;
  }

  return (
    <Link aria-label={ariaLabel} className={cx("motion-card-link", linkClassName)} href={href}>
      {card}
    </Link>
  );
}
