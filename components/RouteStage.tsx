"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function RouteStage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = usePrefersReducedMotion();

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className="route-stage"
      initial={{ opacity: 0, y: reduce ? 4 : 8 }}
      key={pathname}
      transition={{ duration: reduce ? 0.14 : 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
