import { motion } from "motion/react";

import { TEAM } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

export function TeamSection() {
  const { reveal, staggerContainer, staggerItemWithHover } = useMotionPresets();

  return (
    <motion.section id="team" className="section-anchor" {...reveal}>
      <SectionHeader
        title="Team"
        description="The people behind PantherHacks. We're all students at Pinewood."
      />

      <motion.div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3" {...staggerContainer}>
        {TEAM.map((member) => (
          <motion.article key={member.name} className="rounded-lg bg-white p-4 sm:p-5" {...staggerItemWithHover}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent-strong)]">
                {member.initials}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[color:var(--text)] sm:text-xl">{member.name}</h3>
                <p className="text-xs font-semibold text-[color:var(--accent-strong)] sm:text-sm">{member.role}</p>
                <p className="mt-1 text-xs text-[color:var(--muted)] sm:mt-1.5 sm:text-sm">{member.bio}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
