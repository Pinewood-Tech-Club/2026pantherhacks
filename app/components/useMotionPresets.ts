"use client";

import { useReducedMotion } from "motion/react";

export function useMotionPresets() {
  const reducedMotion = useReducedMotion();

  // Cinematic reveal — slower, more dramatic
  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Fade in without vertical movement
  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.6, ease: "easeOut" as const },
  };

  // Hero — dramatic entrance
  const heroReveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Hero title — sliding up from below
  const heroTitle = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 },
  };

  // Scale reveal for images
  const scaleReveal = {
    initial: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Stagger container
  const staggerContainer = {
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
      },
    },
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.08 },
  };

  // Stagger item — slides up
  const staggerItem = {
    variants: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
      },
    },
  };

  // Stagger item with hover lift
  const staggerItemWithHover = {
    variants: {
      hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
      },
    },
    ...(reducedMotion
      ? {}
      : {
          whileHover: {
            y: -4,
            transition: { duration: 0.25, ease: "easeOut" as const },
          },
        }),
  };

  // Slide from left
  const slideLeft = {
    initial: { opacity: 0, x: reducedMotion ? 0 : -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Slide from right
  const slideRight = {
    initial: { opacity: 0, x: reducedMotion ? 0 : 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  return {
    reveal,
    fadeIn,
    heroReveal,
    heroTitle,
    scaleReveal,
    staggerContainer,
    staggerItem,
    staggerItemWithHover,
    slideLeft,
    slideRight,
  };
}
