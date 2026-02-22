import { motion } from "motion/react";

import { TEAM } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

export function TeamSection() {
  const { staggerContainer, staggerItemWithHover } = useMotionPresets();

  return (
    <section id="team" className="section-anchor">
      <SectionHeader
        label="People"
        title="The Team"
        description="The students behind PantherHacks. All from Pinewood."
      />

      <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...staggerContainer}>
        {TEAM.map((member) => (
          <motion.article
            key={member.name}
            className="rounded-2xl p-5 sm:p-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
            {...staggerItemWithHover}
          >
            {/* Initials avatar */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold"
              style={{
                background: "var(--green-glow)",
                color: "var(--green)",
                border: "1px solid var(--line-strong)",
              }}
            >
              {member.initials}
            </div>
            <h3
              className="mt-4 font-display text-xl font-normal italic"
              style={{ color: "var(--text)" }}
            >
              {member.name}
            </h3>
            <p
              className="mt-0.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--green)" }}
            >
              {member.role}
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              {member.bio}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
