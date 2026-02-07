import { ArrowUpRight, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { motion } from "motion/react";

import { LINKS, SOCIALS } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Instagram,
  Discord: MessageCircle,
  X: Twitter,
  Email: Mail,
};

export function LinksSection() {
  const { reveal, staggerContainer, staggerItem } = useMotionPresets();

  return (
    <motion.section id="links" className="section-anchor" {...reveal}>
      <SectionHeader
        title="Links & Socials"
        description="Follow us and find what you need."
      />

      <motion.div className="grid gap-3 md:grid-cols-2" {...staggerContainer}>
        <motion.article className="rounded-lg bg-white p-4 sm:p-5" {...staggerItem}>
          <h3 className="font-display text-xl font-semibold text-[color:var(--text)] sm:text-2xl">Socials</h3>
          <div className="mt-3 space-y-2">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-3 rounded-md bg-[color:var(--surface-soft)] px-3 py-2.5 sm:px-4"
                >
                  {Icon ? <Icon size={16} className="shrink-0 text-[color:var(--accent-strong)]" /> : null}
                  <span className="font-semibold text-[color:var(--text)]">{social.name}</span>
                  <span className="ml-auto text-xs text-[color:var(--muted)] sm:text-sm">{social.value}</span>
                </a>
              );
            })}
          </div>
        </motion.article>

        <motion.article className="rounded-lg bg-white p-4 sm:p-5" {...staggerItem}>
          <h3 className="font-display text-xl font-semibold text-[color:var(--text)] sm:text-2xl">Useful links</h3>
          <div className="mt-3 space-y-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex min-h-10 items-center justify-between rounded-md bg-[color:var(--surface-soft)] px-3 py-2.5 text-[color:var(--text)] sm:min-h-11 sm:px-4"
              >
                <span className="text-sm sm:text-base">{link.label}</span>
                <ArrowUpRight size={16} className="shrink-0 text-[color:var(--accent-strong)]" />
              </a>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </motion.section>
  );
}
