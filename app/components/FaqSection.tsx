"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { FAQS } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full rounded-xl p-5 text-left sm:p-6"
      style={{
        background: "var(--surface)",
        border: `1px solid ${open ? "var(--line-strong)" : "var(--line)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className="font-display text-lg font-normal italic sm:text-xl"
          style={{ color: "var(--text)" }}
        >
          {question}
        </h3>
        <span
          className="mt-1 shrink-0 text-lg leading-none transition-transform duration-200"
          style={{
            color: "var(--green)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p
            className="pt-3 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {answer}
          </p>
        </div>
      </div>
    </button>
  );
}

export function FaqSection() {
  const { staggerContainer, staggerItem } = useMotionPresets();

  return (
    <section id="faq" className="section-anchor">
      <SectionHeader
        label="Questions"
        title="FAQ"
        description="Got questions? Here are the ones we hear most."
      />

      <motion.div className="grid gap-3 md:grid-cols-2" {...staggerContainer}>
        {FAQS.map((item) => (
          <motion.div key={item.question} {...staggerItem}>
            <FaqItem question={item.question} answer={item.answer} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
