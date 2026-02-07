import { motion } from "motion/react";

import { FAQS } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

export function FaqSection() {
  const { reveal, staggerContainer, staggerItemWithHover } = useMotionPresets();

  return (
    <motion.section id="faq" className="section-anchor" {...reveal}>
      <SectionHeader
        title="FAQ"
        description="Got questions? Here are the ones we hear most."
      />

      <motion.div className="grid gap-2.5 sm:gap-3 md:grid-cols-2" {...staggerContainer}>
        {FAQS.map((item) => (
          <motion.article
            key={item.question}
            className="rounded-lg bg-white p-4 sm:p-5"
            {...staggerItemWithHover}
          >
            <h3 className="font-display text-lg font-semibold text-[color:var(--text)] sm:text-xl">{item.question}</h3>
            <p className="mt-1.5 text-sm text-[color:var(--muted)] sm:mt-2 sm:text-base">{item.answer}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
