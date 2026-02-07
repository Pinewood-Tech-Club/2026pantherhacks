import { motion } from "motion/react";

import { PRIZES } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

export function PrizesSection() {
  const { reveal, cardHover, staggerContainer, staggerItem } = useMotionPresets();

  return (
    <motion.section id="prizes" className="section-anchor" {...reveal}>
      <SectionHeader
        title="Prizes"
        description="Top teams take home cash prizes, and there are special awards for creativity, solo hackers, and more."
      />

      <motion.div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3" {...staggerContainer}>
        {PRIZES.map((prize) => (
          <motion.article key={prize.title} className="rounded-lg bg-white p-4 sm:p-5" {...staggerItem} {...cardHover}>
            <h3 className="font-display text-xl font-semibold text-[color:var(--text)] sm:text-2xl">{prize.title}</h3>
            <p className="mt-1.5 inline-block rounded-md bg-[color:var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[color:var(--accent-strong)] sm:mt-2 sm:px-3 sm:py-1 sm:text-sm">
              {prize.reward}
            </p>
            <p className="mt-2 text-sm text-[color:var(--muted)] sm:mt-3 sm:text-base">{prize.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
