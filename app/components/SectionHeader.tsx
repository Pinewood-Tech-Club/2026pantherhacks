import { motion } from "motion/react";
import { useMotionPresets } from "./useMotionPresets";

type SectionHeaderProps = {
  title: string;
  description: string;
  label?: string;
};

export function SectionHeader({ title, description, label }: SectionHeaderProps) {
  const { reveal } = useMotionPresets();

  return (
    <motion.div className="mb-10 sm:mb-14" {...reveal}>
      {label ? (
        <span
          className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] sm:mb-4"
          style={{
            color: "var(--green)",
            background: "var(--green-glow)",
            border: "1px solid var(--line-strong)",
          }}
        >
          {label}
        </span>
      ) : null}
      <h2
        className="font-display text-4xl font-normal italic sm:text-5xl lg:text-6xl"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h2>
      <p
        className="mt-3 max-w-2xl text-base sm:mt-4 sm:text-lg"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
    </motion.div>
  );
}
