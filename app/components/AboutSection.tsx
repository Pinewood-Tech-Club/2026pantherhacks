import { CircleDollarSign, LifeBuoy, Users, UsersRound } from "lucide-react";
import { motion } from "motion/react";

import { SCHEDULE } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

const INFO_CARDS = [
  { icon: Users, label: "Who", value: "Ages 11-18, any skill level" },
  { icon: UsersRound, label: "Teams", value: "Up to 4 (or solo)" },
  { icon: CircleDollarSign, label: "Cost", value: "Free — food & swag included" },
  { icon: LifeBuoy, label: "Help", value: "Mentors + workshops all day" },
] as const;

export function AboutSection() {
  const { reveal, staggerContainer, staggerItemWithHover, slideLeft, slideRight } = useMotionPresets();

  return (
    <section id="about" className="section-anchor">
      <SectionHeader
        label="About"
        title="What is PantherHacks?"
        description="A one-day hackathon run by the Pinewood Tech Club. Open to students ages 11-18, all skill levels welcome."
      />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        {/* Info cards */}
        <motion.div {...slideLeft}>
          <div
            className="rounded-2xl p-5 sm:p-7"
            style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          >
            <h3
              className="font-display text-2xl font-normal italic sm:text-3xl"
              style={{ color: "var(--text)" }}
            >
              The rundown
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {INFO_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl px-4 py-3.5"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--line)" }}
                >
                  <card.icon size={18} style={{ color: "var(--green)" }} className="mb-2" />
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--green)" }}>
                    {card.label}
                  </p>
                  <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
              Build a project, demo it to judges, and compete for prizes. First time coding? No problem.
            </p>
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div {...slideRight}>
          <div
            className="rounded-2xl p-5 sm:p-7"
            style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          >
            <h3
              className="font-display text-2xl font-normal italic sm:text-3xl"
              style={{ color: "var(--text)" }}
            >
              Schedule
            </h3>
            <div className="mt-5 space-y-1">
              {SCHEDULE.map((item, i) => (
                <div
                  key={item.time}
                  className="group flex items-center gap-4 rounded-xl px-4 py-3.5"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--line)" }}
                >
                  <span
                    className="w-20 shrink-0 text-sm font-semibold tabular-nums"
                    style={{ color: "var(--green)" }}
                  >
                    {item.time}
                  </span>
                  <div
                    className="h-4 w-px"
                    style={{ background: "var(--line-strong)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
