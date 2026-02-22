"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { TEAM } from "../data/site";
import { TiltCard } from "./TiltCard";

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="team" className="section-anchor" ref={sectionRef}>
      <div className="mb-10 sm:mb-14">
        <motion.div
          className="section-label mb-5 sm:mb-6"
          style={{ opacity: titleOpacity }}
        >
          People
        </motion.div>
        <motion.h2
          className="font-display font-normal italic"
          style={{
            color: "var(--text)",
            y: titleY,
            opacity: titleOpacity,
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            lineHeight: 0.95,
          }}
        >
          The <span style={{ color: "var(--green)" }}>team.</span>
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-base sm:mt-5 sm:text-lg"
          style={{ color: "var(--text-secondary)", opacity: titleOpacity }}
        >
          The students behind PantherHacks. All from Pinewood.
        </motion.p>
      </div>

      {/* Mobile: compact horizontal layout. Desktop: 3D tilt cards */}

      {/* Mobile layout — horizontal scroll */}
      <div className="horizontal-scroll-container sm:hidden">
        <div className="horizontal-scroll-track">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              className="flex shrink-0 items-center gap-3 rounded-xl p-3"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                width: "240px",
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Compact initials circle */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: "var(--green-glow)",
                  color: "var(--green)",
                  border: "1px solid var(--line-strong)",
                }}
              >
                {member.initials}
              </div>
              <div className="min-w-0">
                <h3
                  className="font-display text-base font-normal italic"
                  style={{ color: "var(--text)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--green)" }}
                >
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop layout — staggered 3D tilt cards */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member, i) => (
          <TiltCard
            key={member.name}
            className="group relative overflow-hidden rounded-2xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              marginTop: i % 2 === 1 ? "1.5rem" : "0",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Large decorative initial */}
              <div
                className="flex h-28 items-center justify-center overflow-hidden lg:h-36"
                style={{
                  background:
                    "linear-gradient(135deg, var(--green-glow), transparent)",
                }}
              >
                <span
                  className="font-display text-[6rem] font-normal italic leading-none transition-transform duration-700 group-hover:scale-110 lg:text-[8rem]"
                  style={{ color: "var(--green)", opacity: 0.08 }}
                >
                  {member.initials}
                </span>
              </div>

              <div className="p-5">
                <h3
                  className="font-display text-xl font-normal italic"
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
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {member.bio}
                </p>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
