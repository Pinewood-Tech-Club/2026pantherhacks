import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import type { CountdownItem } from "../types/site";
import { useMotionPresets } from "./useMotionPresets";

type HeroSectionProps = {
  countdownItems: CountdownItem[];
};

export function HeroSection({ countdownItems }: HeroSectionProps) {
  const { heroReveal, heroTitle } = useMotionPresets();

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-4 sm:px-6">
      {/* Background gradient mesh */}
      <div className="hero-gradient" />

      {/* Decorative glow orbs */}
      <div
        className="glow-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "10%",
          left: "-10%",
          background: "var(--green-glow-strong)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          bottom: "5%",
          right: "-5%",
          background: "var(--gold-glow)",
        }}
      />

      {/* Decorative grid lines */}
      <div className="grid-line-v" style={{ left: "25%" }} />
      <div className="grid-line-v" style={{ left: "50%" }} />
      <div className="grid-line-v" style={{ left: "75%" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl pt-24 sm:pt-32">
        {/* Date pill */}
        <motion.div {...heroReveal}>
          <a
            href="https://maps.google.com/?q=Pinewood+School,+26800+Fremont+Rd,+Los+Altos+Hills,+CA+94022"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm"
            style={{
              color: "var(--green)",
              background: "var(--green-glow)",
              border: "1px solid var(--line-strong)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--green)" }}
            />
            April 19, 2026 &middot; Pinewood Upper Campus
          </a>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-6 font-display text-5xl font-normal italic leading-[1.05] sm:mt-8 sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ color: "var(--text)" }}
          {...heroTitle}
        >
          Build something
          <br />
          <span style={{ color: "var(--green)" }}>real</span> in one day.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 max-w-lg text-base leading-relaxed sm:mt-7 sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
          initial={heroReveal.initial}
          animate={heroReveal.animate}
          transition={{ ...heroReveal.transition, delay: 0.3 }}
        >
          A free hackathon for middle &amp; high schoolers. No experience needed.
          Build a project, demo to judges, compete for prizes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          initial={heroReveal.initial}
          animate={heroReveal.animate}
          transition={{ ...heroReveal.transition, delay: 0.45 }}
        >
          <a
            href="about:blank"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold text-white sm:min-h-14 sm:px-9 sm:text-base"
            style={{ background: "var(--green)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-dim)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
          >
            Register Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#about"
            className="inline-flex min-h-12 items-center justify-center rounded-xl px-7 text-sm font-semibold sm:min-h-14 sm:px-9 sm:text-base"
            style={{
              color: "var(--text)",
              border: "1px solid var(--line-strong)",
              background: "var(--green-glow)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line-strong)")}
          >
            Learn More
          </a>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mt-14 sm:mt-20"
          initial={heroReveal.initial}
          animate={heroReveal.animate}
          transition={{ ...heroReveal.transition, delay: 0.6 }}
        >
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] sm:mb-4 sm:text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            Countdown
          </p>
          <div
            className={`inline-flex gap-3 sm:gap-4 ${countdownItems.length === 1 ? "" : ""}`}
          >
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-xl px-4 py-3 sm:px-6 sm:py-4"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                <span
                  className="metric-value font-display text-3xl font-normal italic sm:text-4xl"
                  style={{ color: "var(--green)" }}
                >
                  {item.value}
                </span>
                <span
                  className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] sm:text-xs"
                  style={{ color: "var(--text-dim)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div
          className="flex h-9 w-5 items-start justify-center rounded-full p-1"
          style={{ border: "1.5px solid var(--line-strong)" }}
        >
          <motion.div
            className="h-2 w-1 rounded-full"
            style={{ background: "var(--green)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
