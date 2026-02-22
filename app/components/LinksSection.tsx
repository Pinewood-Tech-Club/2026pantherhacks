"use client";

import {
  ArrowUpRight,
  Instagram,
  Mail,
  MessageCircle,
  Twitter,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { LINKS, SOCIALS } from "../data/site";

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>
> = {
  Instagram,
  Discord: MessageCircle,
  X: Twitter,
  Email: Mail,
};

export function LinksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="links" className="section-anchor" ref={sectionRef}>
      <div className="mb-10 sm:mb-14">
        <motion.div
          className="section-label mb-5 sm:mb-6"
          style={{ opacity: titleOpacity }}
        >
          Connect
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
          Get <span style={{ color: "var(--green)" }}>involved.</span>
        </motion.h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Socials — horizontal cards with icon emphasis */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {SOCIALS.map((social, i) => {
            const Icon = SOCIAL_ICONS[social.name];
            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
              <a
                href={social.href}
                className="group flex items-center gap-4 rounded-xl p-4 transition-transform duration-200 hover:translate-x-1.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "var(--green-glow)",
                    border: "1px solid var(--line-strong)",
                  }}
                >
                  {Icon ? (
                    <Icon size={18} style={{ color: "var(--green)" }} />
                  ) : null}
                </div>
                <div className="flex-1">
                  <span
                    className="block text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {social.name}
                  </span>
                  <span
                    className="block text-xs"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {social.value}
                  </span>
                </div>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 opacity-0 transition-all group-hover:opacity-100"
                  style={{ color: "var(--green)" }}
                />
              </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Links — clean list with animated underlines */}
        <motion.div
          className="rounded-2xl p-5 sm:p-7"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
          }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3
            className="mb-4 font-display text-2xl font-normal italic"
            style={{ color: "var(--text)" }}
          >
            Resources
          </h3>
          <div className="space-y-1">
            {LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={link.href}
                  className="group flex items-center justify-between py-3 transition-colors duration-200 hover:text-[var(--green)]"
                  style={{
                    borderBottom: i < LINKS.length - 1 ? "1px solid var(--line)" : "none",
                    color: "var(--text)",
                  }}
                >
                  <span className="text-sm">{link.label}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: "var(--green)" }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
