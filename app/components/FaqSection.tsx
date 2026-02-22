"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { FAQS } from "../data/site";

function FaqItem({
  question,
  answer,
  index,
  total,
}: {
  question: string;
  answer: string;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={ref}
      onClick={() => setOpen(!open)}
      className="group w-full text-left"
      style={{
        borderBottom: index < total - 1 ? "1px solid var(--line)" : "none",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex items-center gap-6 py-6 sm:py-8">
        {/* Number */}
        <span
          className="hidden w-12 shrink-0 font-display text-2xl italic sm:block"
          style={{ color: "var(--text-dim)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <h3
          className="flex-1 font-display text-xl font-normal italic transition-colors duration-300 sm:text-2xl lg:text-3xl"
          style={{ color: open ? "var(--green)" : "var(--text)" }}
        >
          {question}
        </h3>

        {/* Toggle indicator — morphing line */}
        <div className="relative h-8 w-8 shrink-0">
          <span
            className="absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--green)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 block h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--green)",
              transform: open ? "rotate(0deg)" : "rotate(90deg)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>

      {/* Answer — smooth reveal */}
      <div
        className="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pl-0 sm:pb-8 sm:pl-[4.5rem]">
            <div
              className="h-px w-16 mb-4"
              style={{
                background: "var(--green)",
                opacity: 0.3,
              }}
            />
            <p
              className="max-w-2xl text-base leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(-8px)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="faq" className="section-anchor" ref={sectionRef}>
      {/* Massive section title — editorial style */}
      <div className="mb-10 sm:mb-14">
        <motion.div
          className="section-label mb-5 sm:mb-6"
          style={{ opacity: titleOpacity }}
        >
          Questions
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
          Frequently
          <br />
          <span style={{ color: "var(--green)" }}>asked.</span>
        </motion.h2>
      </div>

      {/* Full-width accordion — no cards, just clean lines */}
      <div
        style={{ borderTop: "1px solid var(--line)" }}
      >
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            index={i}
            total={FAQS.length}
          />
        ))}
      </div>
    </section>
  );
}
