import Image from "next/image";
import { ExternalLink, Mail } from "lucide-react";
import { motion } from "motion/react";

import { ICON_SPONSORS, LARGE_SPONSORS } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

export function SponsorsSection() {
  const { reveal, cardHover, staggerContainer, staggerItem } = useMotionPresets();

  const titleSponsor = LARGE_SPONSORS.find((s) => s.tier === "title");
  const majorSponsors = LARGE_SPONSORS.filter((s) => s.tier === "major");

  return (
    <motion.section id="sponsors" className="section-anchor" {...reveal}>
      <SectionHeader
        title="Sponsors"
        description="Thanks to these organizations for making PantherHacks happen."
      />

      <motion.div className="space-y-3" {...staggerContainer}>
        {titleSponsor ? (
          <motion.a
            href={titleSponsor.href}
            className="group relative block overflow-hidden rounded-xl bg-white p-5 sm:p-6"
            {...staggerItem}
            {...cardHover}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-16 shrink-0 items-center rounded-lg bg-[color:var(--surface-soft)] px-4 sm:h-20 sm:w-56">
                <Image
                  src={titleSponsor.logo}
                  alt={`${titleSponsor.name} logo`}
                  width={900}
                  height={280}
                  className="h-10 w-full object-contain sm:h-12"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[color:var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[color:var(--accent-strong)]">
                    Title Sponsor
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-2xl font-semibold text-[color:var(--text)] sm:text-3xl">
                  {titleSponsor.name}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{titleSponsor.summary}</p>
              </div>
              <ExternalLink className="hidden shrink-0 text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100 sm:block" size={18} />
            </div>
          </motion.a>
        ) : null}

        {majorSponsors.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {majorSponsors.map((sponsor) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.href}
                className="group flex items-center gap-4 rounded-xl bg-white p-4 sm:p-5"
                {...staggerItem}
                {...cardHover}
              >
                <div className="flex h-14 w-20 shrink-0 items-center rounded-lg bg-[color:var(--surface-soft)] px-2.5">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={900}
                    height={280}
                    className="h-8 w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold text-[color:var(--text)]">
                    {sponsor.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-[color:var(--muted)] line-clamp-1">{sponsor.summary}</p>
                </div>
                <ExternalLink className="shrink-0 text-[color:var(--muted)] opacity-0 transition-opacity group-hover:opacity-100" size={16} />
              </motion.a>
            ))}
          </div>
        ) : null}

        {ICON_SPONSORS.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ICON_SPONSORS.map((sponsor) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.href}
                className="flex items-center gap-3 rounded-xl bg-white p-3 sm:flex-col sm:items-start sm:gap-0 sm:p-4"
                {...staggerItem}
                {...cardHover}
              >
                <Image
                  src={sponsor.icon}
                  alt={`${sponsor.name} icon`}
                  width={72}
                  height={72}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover sm:h-11 sm:w-11"
                />
                <p className="text-sm font-medium text-[color:var(--text)] sm:mt-3">{sponsor.name}</p>
              </motion.a>
            ))}
          </div>
        ) : null}
      </motion.div>

      <p className="mt-4 flex items-center gap-1.5 text-sm text-[color:var(--muted)]">
        <Mail size={14} className="text-[color:var(--accent-strong)]" />
        Sponsor inquiries:{" "}
        <a href="mailto:sponsors@pantherhacks.com" className="font-semibold text-[color:var(--accent-strong)] hover:underline">
          sponsors@pantherhacks.com
        </a>
      </p>
    </motion.section>
  );
}
