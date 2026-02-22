"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { SCHEDULE } from "../data/site";
import { TiltCard } from "./TiltCard";

const STATS = [
  { number: "11–18", label: "Ages welcome" },
  { number: "4", label: "Max team size" },
  { number: "$0", label: "Cost to attend" },
  { number: "12h", label: "Of hacking" },
] as const;

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const bigTextY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="about" className="section-anchor" ref={sectionRef}>
      {/* Massive typographic statement */}
      <motion.div
        className="mb-16 sm:mb-24"
        style={{ y: bigTextY, opacity: bigTextOpacity }}
      >
        <div className="section-label mb-6">About</div>
        <h2
          className="font-display font-normal italic"
          style={{
            color: "var(--text)",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            lineHeight: 0.95,
          }}
        >
          One day.
          <br />
          One campus.
          <br />
          <span style={{ color: "var(--green)" }}>Infinite</span> possibilities.
        </h2>
      </motion.div>

      {/* Stats — 3D tilt cards */}
      <div className="mb-16 grid grid-cols-2 gap-3 sm:mb-20 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <TiltCard
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
          >
            <motion.div
              className="flex flex-col items-center py-7 sm:py-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="font-display text-3xl font-normal italic sm:text-5xl lg:text-6xl"
                style={{ color: "var(--green)" }}
              >
                {stat.number}
              </span>
              <span
                className="mt-2 text-[10px] font-semibold uppercase tracking-wider sm:text-xs"
                style={{ color: "var(--text-dim)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Description */}
      <motion.div
        className="mx-auto mb-16 max-w-3xl text-center sm:mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="text-lg leading-relaxed sm:text-xl lg:text-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          PantherHacks is a free, one-day hackathon run by the{" "}
          <span style={{ color: "var(--text)" }}>Pinewood Tech Club</span>. Open
          to students of all skill levels — whether you&apos;ve never written a
          line of code or you&apos;ve shipped apps.{" "}
          <span style={{ color: "var(--green)" }}>Build a project.</span> Demo it
          to judges. Compete for prizes. Make friends. Eat pizza.
        </p>
      </motion.div>

      {/* Schedule — horizontal scroll on mobile, grid on desktop */}
      <div>
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label mb-4">Timeline</div>
          <h3
            className="font-display text-3xl font-normal italic sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            The day at a glance.
          </h3>
        </motion.div>

        {/* Horizontal scroll container — mobile only */}
        <div className="horizontal-scroll-container lg:hidden">
          <div className="horizontal-scroll-track">
            {SCHEDULE.map((item, i) => (
              <motion.div
                key={item.time}
                className="horizontal-scroll-card flex shrink-0 flex-col justify-between rounded-2xl p-5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  width: "260px",
                  height: "140px",
                }}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: "var(--green)" }}
                >
                  {item.time}
                </span>
                <span
                  className="font-display text-xl font-normal italic"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: vertical timeline */}
        <div className="relative hidden lg:block">
          <motion.div
            className="absolute bottom-0 left-8 top-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--green), var(--green-dim), transparent)",
              opacity: 0.2,
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-2">
            {SCHEDULE.map((item, i) => (
              <motion.div
                key={item.time}
                className="group relative flex items-center gap-8 py-4 pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="absolute left-[1.625rem] h-3 w-3 rounded-full"
                  style={{
                    background: "var(--green)",
                    opacity: 0.6,
                    boxShadow: "0 0 12px rgba(45, 208, 122, 0.3)",
                  }}
                />
                <span
                  className="w-24 shrink-0 text-lg font-semibold tabular-nums"
                  style={{ color: "var(--green)" }}
                >
                  {item.time}
                </span>
                <span
                  className="font-display text-xl font-normal italic"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
