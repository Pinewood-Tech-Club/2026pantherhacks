import Image from "next/image";
import { ExternalLink, Mail } from "lucide-react";
import { motion } from "motion/react";

import { ICON_SPONSORS, LARGE_SPONSORS } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

export function SponsorsSection() {
  const { reveal, staggerContainer, staggerItemWithHover } = useMotionPresets();

  const titleSponsor = LARGE_SPONSORS.find((s) => s.tier === "title");
  const majorSponsors = LARGE_SPONSORS.filter((s) => s.tier === "major");

  return (
    <section id="sponsors" className="section-anchor">
      <SectionHeader
        label="Partners"
        title="Sponsors"
        description="These organizations make PantherHacks possible."
      />

      <motion.div className="space-y-4" {...staggerContainer}>
        {/* Title sponsor — featured card */}
        {titleSponsor ? (
          <motion.a
            href={titleSponsor.href}
            className="group relative block overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
            }}
            {...staggerItemWithHover}
          >
            {/* Gold accent glow */}
            <div
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30"
              style={{ background: "var(--gold)", filter: "blur(100px)" }}
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <div
                className="flex h-20 shrink-0 items-center rounded-xl px-6 sm:w-60"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--line)" }}
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
                  style={{ color: "var(--gold)", background: "var(--gold-glow)", border: "1px solid rgba(226, 176, 74, 0.2)" }}
                >
                  Title Sponsor
                </span>
                <h3
                  className="mt-2 font-display text-3xl font-normal italic sm:text-4xl"
                  style={{ color: "var(--text)" }}
                >
                  {titleSponsor.name}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {titleSponsor.summary}
                </p>
              </div>
              <ExternalLink
                className="hidden shrink-0 opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                size={20}
                style={{ color: "var(--text-dim)" }}
              />
            </div>
          </motion.a>
        ) : null}

        {/* Major sponsors */}
        {majorSponsors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {majorSponsors.map((sponsor) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.href}
                className="group flex items-center gap-5 rounded-2xl p-5 sm:p-6"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
                {...staggerItemWithHover}
              >
                <div
                  className="flex h-16 w-24 shrink-0 items-center rounded-xl px-3"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--line)" }}
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
                  <p className="mt-0.5 text-sm line-clamp-1" style={{ color: "var(--text-secondary)" }}>
                    {sponsor.summary}
                  </p>
                </div>
                <ExternalLink
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  size={16}
                  style={{ color: "var(--text-dim)" }}
                />
              </motion.a>
            ))}
          </div>
        ) : null}

        {/* Icon sponsors */}
        {ICON_SPONSORS.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ICON_SPONSORS.map((sponsor) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.href}
                className="flex flex-col items-center gap-3 rounded-xl p-4 text-center"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                }}
                {...staggerItemWithHover}
              >
                <Image
                  src={sponsor.icon}
                  alt={`${sponsor.name} icon`}
                  width={72}
                  height={72}
                  className="h-11 w-11 rounded-lg object-cover"
                />
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {sponsor.name}
                </p>
              </motion.a>
            ))}
          </div>
        ) : null}
      </motion.div>

      <motion.p
        className="mt-6 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-dim)" }}
        {...reveal}
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
