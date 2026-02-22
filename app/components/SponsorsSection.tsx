"use client";

import Image from "next/image";
import { ExternalLink, Mail } from "lucide-react";
import { motion } from "motion/react";

import { ICON_SPONSORS, LARGE_SPONSORS } from "../data/site";
import { SectionHeader } from "./SectionHeader";

export function SponsorsSection() {
  const titleSponsor = LARGE_SPONSORS.find((s) => s.tier === "title");
  const majorSponsors = LARGE_SPONSORS.filter((s) => s.tier === "major");

  // Double the icon sponsors for seamless marquee
  const marqueeItems = [...ICON_SPONSORS, ...ICON_SPONSORS];

  return (
    <section id="sponsors" className="section-anchor">
      <SectionHeader
        label="Partners"
        title="Sponsors"
        description="These organizations make PantherHacks possible."
      />

      <div className="space-y-5">
        {/* Title sponsor — cinematic featured card */}
        {titleSponsor ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
          <a
            href={titleSponsor.href}
            className="group relative block overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(219, 167, 62, 0.06), var(--surface))",
              border: "1px solid rgba(219, 167, 62, 0.15)",
            }}
          >
            {/* Gold accent glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 transition-opacity duration-700 group-hover:opacity-50"
              style={{ background: "var(--gold)", filter: "blur(100px)" }}
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <div
                className="flex h-20 shrink-0 items-center rounded-xl px-6 sm:w-60"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--line)",
                }}
              >
                <Image
                  src={titleSponsor.logo}
                  alt={`${titleSponsor.name} logo`}
                  width={900}
                  height={280}
                  className="h-12 w-full object-contain brightness-0 invert"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: "var(--gold)",
                    background: "var(--gold-glow)",
                    border: "1px solid rgba(226, 176, 74, 0.2)",
                  }}
                >
                  Title Sponsor
                </span>
                <h3
                  className="mt-2 font-display text-3xl font-normal italic sm:text-4xl"
                  style={{ color: "var(--text)" }}
                >
                  {titleSponsor.name}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {titleSponsor.summary}
                </p>
              </div>
              <ExternalLink
                className="hidden shrink-0 opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                size={20}
                style={{ color: "var(--text-dim)" }}
              />
            </div>
          </a>
          </motion.div>
        ) : null}

        {/* Major sponsors */}
        {majorSponsors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {majorSponsors.map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
              <a
                href={sponsor.href}
                className="group flex items-center gap-5 rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1 sm:p-6"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  className="flex h-16 w-24 shrink-0 items-center rounded-xl px-3"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={900}
                    height={280}
                    className="h-9 w-full object-contain brightness-0 invert"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className="font-display text-xl font-normal italic"
                    style={{ color: "var(--text)" }}
                  >
                    {sponsor.name}
                  </h3>
                  <p
                    className="mt-0.5 text-sm line-clamp-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {sponsor.summary}
                  </p>
                </div>
                <ExternalLink
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  size={16}
                  style={{ color: "var(--text-dim)" }}
                />
              </a>
              </motion.div>
            ))}
          </div>
        ) : null}

        {/* Icon sponsors — infinite marquee */}
        {ICON_SPONSORS.length > 0 ? (
          <motion.div
            className="overflow-hidden rounded-2xl py-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="mb-4 px-6 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-dim)" }}
            >
              Community Partners
            </p>
            <div className="relative">
              {/* Fade edges */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
                style={{
                  background:
                    "linear-gradient(to right, var(--surface), transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
                style={{
                  background:
                    "linear-gradient(to left, var(--surface), transparent)",
                }}
              />

              <div className="marquee-track">
                {marqueeItems.map((sponsor, i) => (
                  <a
                    key={`${sponsor.name}-${i}`}
                    href={sponsor.href}
                    className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-2"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    <Image
                      src={sponsor.icon}
                      alt={`${sponsor.name} icon`}
                      width={72}
                      height={72}
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                    <span className="whitespace-nowrap text-sm font-medium">
                      {sponsor.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>

      <motion.p
        className="mt-6 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Mail size={14} style={{ color: "var(--green)" }} />
        Sponsor inquiries:{" "}
        <a
          href="mailto:sponsors@pantherhacks.com"
          className="font-semibold hover:underline"
          style={{ color: "var(--green)" }}
        >
          sponsors@pantherhacks.com
        </a>
      </motion.p>
    </section>
  );
}
