"use client";

import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { PRIZES } from "../data/site";
import { TiltCard } from "./TiltCard";

export function PrizesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showSpecialAwards, setShowSpecialAwards] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const topPrizes = PRIZES.slice(0, 3);
  const otherPrizes = PRIZES.slice(3);

  return (
    <section id="prizes" className="section-anchor" ref={sectionRef}>
      {/* Section header */}
      <div className="mb-12 sm:mb-16">
        <motion.div
          className="section-label mb-5 sm:mb-6"
          style={{ opacity: titleOpacity }}
        >
          Win
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
          Over{" "}
          <span style={{ color: "var(--gold)" }}>$2,200</span>
          <br />
          in prizes.
        </motion.h2>
      </div>

      {/* Grand prize — 3D tilt spotlight */}
      <TiltCard
        className="group relative mb-5 overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(219, 167, 62, 0.1), rgba(219, 167, 62, 0.02) 50%, var(--surface))",
          border: "1px solid rgba(219, 167, 62, 0.2)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background decorative 1 */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 font-display font-normal italic leading-none select-none"
            style={{
              color: "var(--gold)",
              opacity: 0.04,
              fontSize: "clamp(10rem, 25vw, 20rem)",
            }}
          >
            1
          </div>

          {/* Gold glow */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at 80% 30%, rgba(219, 167, 62, 0.15), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: "var(--gold)",
                  background: "var(--gold-glow)",
                  border: "1px solid rgba(219, 167, 62, 0.2)",
                }}
              >
                Grand Prize
              </span>
              <h3
                className="mt-3 font-display text-3xl font-normal italic sm:text-4xl lg:text-5xl"
                style={{ color: "var(--text)" }}
              >
                {topPrizes[0].title}
              </h3>
              <p
                className="mt-2 max-w-md text-sm sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {topPrizes[0].description}
              </p>
            </div>
            <div className="sm:text-right">
              <span
                className="font-display font-normal italic"
                style={{
                  color: "var(--gold)",
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  lineHeight: 1,
                }}
              >
                $1,000
              </span>
              <p
                className="mt-1 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--gold-dim)" }}
              >
                + Trophy
              </p>
            </div>
          </div>
        </motion.div>
      </TiltCard>

      {/* 2nd and 3rd */}
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {topPrizes.slice(1).map((prize, i) => (
          <TiltCard
            key={prize.title}
            className="group relative overflow-hidden rounded-2xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line-strong)",
            }}
          >
            <motion.div
              className="p-6 sm:p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="pointer-events-none absolute -right-3 -top-6 font-display text-[10rem] font-normal italic leading-none opacity-[0.03] select-none"
                style={{ color: "var(--text)" }}
              >
                {i + 2}
              </span>

              <div className="relative">
                <h3
                  className="font-display text-2xl font-normal italic sm:text-3xl"
                  style={{ color: "var(--text)" }}
                >
                  {prize.title}
                </h3>
                <p
                  className="mt-2 font-display text-2xl font-normal italic sm:text-3xl"
                  style={{ color: "var(--green)" }}
                >
                  {prize.reward}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {prize.description}
                </p>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Special awards — collapsible */}
      <motion.div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          className="flex w-full items-center justify-between p-5 text-left sm:p-6"
          onClick={() => setShowSpecialAwards(!showSpecialAwards)}
        >
          <div>
            <h3
              className="font-display text-xl font-normal italic sm:text-2xl"
              style={{ color: "var(--text)" }}
            >
              Special Awards
            </h3>
            <p
              className="mt-1 text-xs sm:text-sm"
              style={{ color: "var(--text-dim)" }}
            >
              {otherPrizes.length} additional prizes for creativity, design, and
              impact
            </p>
          </div>
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
            style={{
              border: `1px solid ${showSpecialAwards ? "var(--green)" : "var(--line-strong)"}`,
              background: showSpecialAwards ? "var(--green-glow)" : "transparent",
            }}
          >
            <ChevronDown
              size={16}
              style={{
                color: "var(--green)",
                transform: showSpecialAwards ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </button>

        <div
          className="grid"
          style={{
            gridTemplateRows: showSpecialAwards ? "1fr" : "0fr",
            transition:
              "grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="overflow-hidden">
            <div
              className="px-3 pb-3 sm:px-4 sm:pb-4"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              {otherPrizes.map((prize, i) => (
                <div
                  key={prize.title}
                  className="flex items-center justify-between px-3 py-3.5 sm:px-4 sm:py-4"
                  style={{
                    borderBottom:
                      i < otherPrizes.length - 1
                        ? "1px solid var(--line)"
                        : "none",
                    opacity: showSpecialAwards ? 1 : 0,
                    transform: showSpecialAwards
                      ? "translateY(0)"
                      : "translateY(-8px)",
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 * i}s`,
                  }}
                >
                  <div>
                    <h4
                      className="font-display text-sm font-normal italic sm:text-base"
                      style={{ color: "var(--text)" }}
                    >
                      {prize.title}
                    </h4>
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {prize.description}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-[10px] font-semibold uppercase tracking-wider sm:text-xs"
                    style={{ color: "var(--green)" }}
                  >
                    {prize.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
