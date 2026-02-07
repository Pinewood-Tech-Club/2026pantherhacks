import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "motion/react";

import type { CountdownItem } from "../types/site";
import { useMotionPresets } from "./useMotionPresets";

type HeroSectionProps = {
  countdownItems: CountdownItem[];
};

export function HeroSection({ countdownItems }: HeroSectionProps) {
  const { heroReveal, heroImageReveal } = useMotionPresets();

  return (
    <section className="section-anchor">
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <motion.div {...heroReveal} className="flex flex-col justify-between">
          <div>
            <a
              href="https://maps.google.com/?q=Pinewood+School,+26800+Fremont+Rd,+Los+Altos+Hills,+CA+94022"
              target="_blank"
              rel="noreferrer noopener"
              className="accent-chip gap-1.5 hover:bg-[color:var(--accent)] hover:text-white"
            >
              <MapPin size={13} />
              April 19, 2026 | Pinewood Upper Campus
            </a>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-[color:var(--text)] sm:text-5xl lg:text-[3.3rem]">
              Build something real in one day.
            </h1>
            <p className="mt-3 max-w-xl text-base text-[color:var(--muted)] sm:mt-4 sm:text-lg">
              A free hackathon for middle and high schoolers, run by the Pinewood Tech Club. All skill levels welcome — no experience required.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
            <a
              href="about:blank"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--accent)] px-6 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)]"
            >
              Register Now
              <ArrowRight size={15} />
            </a>
            <a
              href="#about"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--surface-soft)] px-6 text-sm font-semibold text-[color:var(--text)] hover:bg-[color:#e5ebe8]"
            >
              View Schedule
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={heroReveal.initial}
          animate={heroReveal.animate}
          transition={{ ...heroReveal.transition, delay: 0.04 }}
          className="relative min-h-[220px] overflow-hidden rounded-lg sm:min-h-[280px] lg:min-h-0"
        >
          <motion.div
            className="absolute inset-0"
            {...heroImageReveal}
            transition={{ ...heroImageReveal.transition, delay: 0.08 }}
          >
            <Image
              src="/images/hero-unsplash.jpg"
              alt="Students collaborating during a coding event"
              fill
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <div className="absolute bottom-3 left-3 right-3 rounded-md bg-white/70 p-2.5 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[color:var(--text)] sm:text-xs">Countdown</p>
            <div className={`mt-1.5 grid gap-1.5 sm:mt-2 sm:gap-2 ${countdownItems.length === 1 ? "grid-cols-1" : "grid-cols-4"}`}>
              {countdownItems.map((item) => (
                <div key={item.label} className="rounded-md px-1.5 py-1.5 text-center sm:px-2 sm:py-2">
                  <p className="metric-value font-display text-xl font-semibold text-[color:var(--accent)] sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-[color:var(--text)] sm:text-[11px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
