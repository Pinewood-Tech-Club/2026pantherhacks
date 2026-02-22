import { ArrowUpRight, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { motion } from "motion/react";

import { LINKS, SOCIALS } from "../data/site";
import { SectionHeader } from "./SectionHeader";
import { useMotionPresets } from "./useMotionPresets";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Instagram,
  Discord: MessageCircle,
  X: Twitter,
  Email: Mail,
};

export function LinksSection() {
  const { staggerContainer, staggerItem } = useMotionPresets();

  return (
    <section id="links" className="section-anchor">
      <SectionHeader
        label="Connect"
        title="Links & Socials"
        description="Follow us and find what you need."
      />

      <motion.div className="grid gap-4 md:grid-cols-2" {...staggerContainer}>
        {/* Socials */}
        <motion.div
          className="rounded-2xl p-5 sm:p-7"
          style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          {...staggerItem}
        >
          <h3
            className="font-display text-2xl font-normal italic"
            style={{ color: "var(--text)" }}
          >
            Socials
          </h3>
          <div className="mt-4 space-y-2">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--line)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--line-strong)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                >
                  {Icon ? <Icon size={16} style={{ color: "var(--green)" }} /> : null}
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {social.name}
                  </span>
                  <span className="ml-auto text-xs" style={{ color: "var(--text-dim)" }}>
                    {social.value}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="rounded-2xl p-5 sm:p-7"
          style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          {...staggerItem}
        >
          <h3
            className="font-display text-2xl font-normal italic"
            style={{ color: "var(--text)" }}
          >
            Useful links
          </h3>
          <div className="mt-4 space-y-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex min-h-11 items-center justify-between rounded-xl px-4 py-3"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--line)",
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--line-strong)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              >
                <span className="text-sm">{link.label}</span>
                <ArrowUpRight size={15} style={{ color: "var(--green)" }} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
