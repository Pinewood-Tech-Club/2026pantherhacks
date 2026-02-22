"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import type { CountdownItem } from "../types/site";

type HeroSectionProps = {
  countdownItems: CountdownItem[];
  onEasterEgg?: () => void;
};

// Animate each word with staggered reveal
function AnimatedTitle({ onEasterEgg }: { onEasterEgg?: () => void }) {
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const line1 = ["Build", "something"];

  function handleRealClick() {
    clickCountRef.current++;
    // Reset counter if user stops clicking for 3 seconds
    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 3000);

    if (clickCountRef.current >= 10) {
      clickCountRef.current = 0;
      onEasterEgg?.();
    }
  }

  return (
    <h1
      className="mt-6 font-display font-normal italic leading-[0.92] sm:mt-8"
      style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
    >
      <span className="block overflow-hidden">
        {line1.map((word, i) => (
          <motion.span
            key={word}
            className="mr-[0.25em] inline-block"
            style={{ color: "var(--text)" }}
            initial={{ y: "110%", rotateX: -40 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{
              duration: 1,
              delay: 0.3 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden">
        <motion.span
          className="mr-[0.25em] inline-block cursor-pointer select-none"
          style={{ color: "var(--green)" }}
          initial={{ y: "110%", rotateX: -40 }}
          animate={{ y: "0%", rotateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={handleRealClick}
        >
          real
        </motion.span>
        <motion.span
          className="mr-[0.25em] inline-block"
          style={{ color: "var(--text)" }}
          initial={{ y: "110%", rotateX: -40 }}
          animate={{ y: "0%", rotateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.58,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          in one day.
        </motion.span>
      </span>
    </h1>
  );
}

export function HeroSection({ countdownItems, onEasterEgg }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const countdownY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Background gradient orbs */}
      <motion.div style={{ opacity: bgOpacity }}>
        <motion.div
          className="absolute left-[-20%] top-[10%] h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 208, 122, 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[-10%] h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(219, 167, 62, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -30, 15, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl pt-24 sm:pt-32"
        style={{ scale, y: titleY }}
      >
        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
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
            <motion.span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--green)" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            April 19, 2026 &middot; Pinewood Upper Campus
          </a>
        </motion.div>

        {/* Title with word-by-word reveal */}
        <AnimatedTitle onEasterEgg={onEasterEgg} />

        {/* Subtitle */}
        <motion.p
          className="mt-5 max-w-lg text-base leading-relaxed sm:mt-7 sm:text-lg"
          style={{ color: "var(--text-secondary)", y: subtitleY }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.6,
          }}
        >
          A free hackathon for middle &amp; high schoolers. No experience needed.
          Build a project, demo to judges, compete for prizes.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.75,
          }}
        >
          <motion.a
            href="about:blank"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold text-white sm:min-h-14 sm:px-9 sm:text-base"
            style={{
              background: "var(--green)",
              boxShadow: "0 0 30px rgba(45, 208, 122, 0.15)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 40px rgba(45, 208, 122, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Register Now
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.a>
          <a
            href="#about"
            className="inline-flex min-h-12 items-center justify-center rounded-xl px-7 text-sm font-semibold sm:min-h-14 sm:px-9 sm:text-base"
            style={{
              color: "var(--text)",
              border: "1px solid var(--line-strong)",
              background: "var(--green-glow)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--green)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--line-strong)")
            }
          >
            Learn More
          </a>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mt-14 sm:mt-20"
          style={{ y: countdownY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.9,
          }}
        >
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] sm:mb-4 sm:text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            Countdown
          </p>
          <div className="inline-flex gap-3 sm:gap-4">
            {countdownItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center rounded-xl px-4 py-3 sm:px-6 sm:py-4"
                style={{
                  background: "rgba(15, 22, 19, 0.8)",
                  border: "1px solid var(--line)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — animated vertical line */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.25em]"
          style={{ color: "var(--text-dim)" }}
        >
          Scroll
        </span>
        <div
          className="relative h-12 w-px overflow-hidden"
          style={{ background: "var(--line)" }}
        >
          <motion.div
            className="absolute left-0 top-0 w-full"
            style={{ background: "var(--green)", height: "50%" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
