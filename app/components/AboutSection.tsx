import { CircleDollarSign, LifeBuoy, Users, UsersRound } from "lucide-react";
import { motion } from "motion/react";

import { SCHEDULE } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

const INFO_CARDS = [
  { icon: Users, label: "Who", value: "Ages 11-18, any skill level" },
  { icon: UsersRound, label: "Teams", value: "Up to 4 (or solo)" },
  { icon: CircleDollarSign, label: "Cost", value: "Free — food and swag included" },
  { icon: LifeBuoy, label: "Help", value: "Mentors + workshops all day" },
] as const;

export function AboutSection() {
  const { reveal, cardHover, staggerContainer, staggerItem } = useMotionPresets();

  return (
    <motion.section id="about" className="section-anchor" {...reveal}>
      <SectionHeader
        title="About"
        description="PantherHacks is a one-day hackathon run by the Pinewood Tech Club — open to students ages 11-18, all skill levels."
      />

      <motion.div className="grid gap-3 sm:gap-4 lg:grid-cols-2" {...staggerContainer}>
        <motion.article className="rounded-lg bg-white p-4 sm:p-6" {...staggerItem} {...cardHover}>
          <h3 className="font-display text-xl font-semibold text-[color:var(--text)] sm:text-2xl">The rundown</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
            {INFO_CARDS.map((card) => (
              <div key={card.label} className="rounded-md bg-[color:var(--surface-soft)] px-3 py-2.5">
                <card.icon size={16} className="mb-1 text-[color:var(--accent-strong)]" />
                <p className="text-xs font-semibold text-[color:var(--accent-strong)] sm:text-sm">{card.label}</p>
                <p className="text-xs text-[color:var(--text)] sm:text-sm">{card.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[color:var(--muted)] sm:text-sm">
            Build a project, demo it to judges, and compete for prizes. First time coding? No problem.
          </p>
        </motion.article>

        <motion.article className="rounded-lg bg-white p-4 sm:p-6" {...staggerItem} {...cardHover}>
          <h3 className="font-display text-xl font-semibold text-[color:var(--text)] sm:text-2xl">Schedule</h3>
          <div className="mt-3 space-y-2">
            {SCHEDULE.map((item) => (
              <div key={item.time} className="rounded-md bg-[color:var(--surface-soft)] px-3 py-2.5">
                <p className="text-xs font-semibold text-[color:var(--accent-strong)] sm:text-sm">{item.time}</p>
                <p className="text-sm font-semibold text-[color:var(--text)] sm:text-base">{item.title}</p>
              </div>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </motion.section>
  );
}
