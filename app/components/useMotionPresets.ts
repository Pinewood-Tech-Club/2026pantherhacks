"use client";

import { useReducedMotion } from "motion/react";

export function useMotionPresets() {
  const reducedMotion = useReducedMotion();

  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] as const },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.8, ease: "easeOut" as const },
  };

  const heroReveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] as const },
  };

  const heroTitle = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 },
  };

  const scaleReveal = {
    initial: { opacity: 0, scale: reducedMotion ? 1 : 0.92 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.1 } },
    },
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.06 },
  };

  const staggerItem = {
    variants: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const },
      },
    },
  };

  const staggerItemWithHover = {
    variants: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const },
      },
    },
    ...(reducedMotion ? {} : {
      whileHover: { y: -6, transition: { duration: 0.3, ease: "easeOut" as const } },
    }),
  };

  const slideLeft = {
    initial: { opacity: 0, x: reducedMotion ? 0 : -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] as const },
  };

  const slideRight = {
    initial: { opacity: 0, x: reducedMotion ? 0 : 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] as const },
  };

  return {
    reveal, fadeIn, heroReveal, heroTitle, scaleReveal,
    staggerContainer, staggerItem, staggerItemWithHover,
    slideLeft, slideRight,
  };
}
