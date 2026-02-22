"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type SectionHeaderProps = {
  title: string;
  description: string;
  label?: string;
};

export function SectionHeader({ title, description, label }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.2, 0.8], [20, 0]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      {label ? (
        <motion.div
          className="section-label mb-5 sm:mb-6"
          style={{ opacity: descOpacity }}
        >
          {label}
        </motion.div>
      ) : null}
      <motion.h2
        className="font-display text-4xl font-normal italic sm:text-5xl lg:text-6xl xl:text-7xl"
        style={{ color: "var(--text)", y: titleY, opacity: titleOpacity }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="mt-4 h-px"
        style={{
          background: "linear-gradient(to right, var(--green), transparent)",
          opacity: 0.3,
          width: lineWidth,
        }}
      />
      <motion.p
        className="mt-4 max-w-xl text-base sm:mt-5 sm:text-lg"
        style={{ color: "var(--text-secondary)", opacity: descOpacity, y: descY }}
      >
        {description}
      </motion.p>
    </div>
  );
}
