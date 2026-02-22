import { motion } from "motion/react";

import { PRIZES } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

const PODIUM_STYLES = [
  { accent: "var(--gold)", bg: "var(--gold-glow)", border: "rgba(226, 176, 74, 0.2)" },
  { accent: "var(--text-secondary)", bg: "var(--green-glow)", border: "var(--line-strong)" },
  { accent: "var(--text-secondary)", bg: "var(--green-glow)", border: "var(--line-strong)" },
];

export function PrizesSection() {
  const { reveal, staggerContainer, staggerItemWithHover } = useMotionPresets();

  const topPrizes = PRIZES.slice(0, 3);
  const otherPrizes = PRIZES.slice(3);

  return (
    <section id="prizes" className="section-anchor">
      <SectionHeader
        label="Win"
        title="Prizes"
        description="Top teams take home cash prizes. Special awards for creativity, solo hackers, and more."
      />

      {/* Top 3 — large cards */}
      <motion.div className="grid gap-4 sm:gap-5 lg:grid-cols-3" {...staggerContainer}>
        {topPrizes.map((prize, i) => {
          const style = PODIUM_STYLES[i];
          return (
            <motion.article
              key={prize.title}
              className="relative overflow-hidden rounded-2xl p-6 sm:p-7"
              style={{
                background: "var(--surface)",
                border: `1px solid ${style.border}`,
              }}
              {...staggerItemWithHover}
            >
              {/* Rank number watermark */}
              <span
                className="pointer-events-none absolute -right-3 -top-6 font-display text-[8rem] font-normal italic leading-none select-none"
                style={{ color: style.accent, opacity: 0.06 }}
              >
                {i + 1}
              </span>

              <div className="relative">
                <h3
                  className="font-display text-2xl font-normal italic sm:text-3xl"
                  style={{ color: "var(--text)" }}
                >
                  {prize.title}
                </h3>
                <p
                  className="mt-3 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold"
                  style={{ color: style.accent, background: style.bg }}
                >
                  {prize.reward}
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {prize.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Other prizes — compact grid */}
      <motion.div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" {...staggerContainer}>
        {otherPrizes.map((prize) => (
          <motion.article
            key={prize.title}
            className="rounded-xl p-5"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
            {...staggerItemWithHover}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-normal italic" style={{ color: "var(--text)" }}>
                  {prize.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--green)" }}>
                  {prize.reward}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              {prize.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
