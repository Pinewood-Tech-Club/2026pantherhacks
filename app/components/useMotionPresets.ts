"use client";

import { useReducedMotion } from "motion/react";

export function useMotionPresets() {
  const reducedMotion = useReducedMotion();

  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] as const },
  };

  const cardHover = reducedMotion
    ? {}
    : {
        whileHover: { y: -3, boxShadow: "0 8px 24px rgba(16, 26, 34, 0.10)" },
        transition: { duration: 0.2, ease: "easeOut" as const },
      };

  const heroReveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.34, ease: "easeOut" as const },
  };

  const heroImageReveal = {
    initial: { opacity: 0, scale: reducedMotion ? 1 : 1.03 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };

  const staggerContainer = {
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: reducedMotion ? 0 : 0.07 },
      },
    },
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.1 },
  };

  const staggerItem = {
    variants: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
  };

  const staggerItemWithHover = {
    variants: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
    ...(reducedMotion ? {} : {
      whileHover: {
        y: -3,
        boxShadow: "0 8px 24px rgba(16, 26, 34, 0.10)",
        transition: { duration: 0.2, ease: "easeOut" as const },
      },
    }),
  };

  return { reveal, cardHover, heroReveal, heroImageReveal, staggerContainer, staggerItem, staggerItemWithHover };
}
