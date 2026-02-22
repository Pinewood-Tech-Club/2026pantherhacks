"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start 0.95", "start 0.6"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <footer ref={footerRef} className="relative mt-16 overflow-hidden">
      {/* Big dramatic CTA before the footer */}
      <motion.div
        className="mx-auto max-w-6xl px-4 pb-20 text-center sm:px-6 sm:pb-28"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="font-display font-normal italic"
          style={{
            color: "var(--text)",
            fontSize: "clamp(2rem, 6vw, 5rem)",
            lineHeight: 1,
          }}
        >
          Ready to <span style={{ color: "var(--green)" }}>build?</span>
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-base sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Join hundreds of students for a day of hacking, learning, and fun.
        </p>
        <motion.a
          href="about:blank"
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-10 text-base font-semibold text-white sm:min-h-16 sm:px-12 sm:text-lg"
          style={{
            background: "var(--green)",
            boxShadow:
              "0 0 40px rgba(45, 208, 122, 0.2), 0 8px 30px rgba(0,0,0,0.3)",
          }}
          whileHover={{
            scale: 1.03,
            boxShadow:
              "0 0 60px rgba(45, 208, 122, 0.3), 0 8px 30px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          Register Now
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </motion.a>
      </motion.div>

      {/* Actual footer */}
      <div style={{ borderTop: "1px solid var(--line)" }}>
        <motion.div
          className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between"
          style={{ opacity, y }}
        >
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "var(--green)" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2H14V6H10V14H6V6H2V2Z" fill="white" />
              </svg>
            </div>
            <span
              className="text-sm font-semibold uppercase"
              style={{ color: "var(--text)", letterSpacing: "0.08em" }}
            >
              PantherHacks 2026
            </span>
          </div>

          {/* Info */}
          <div
            className="text-sm md:text-right"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>April 19, 2026 &middot; 9 AM – 9:30 PM PST</p>
            <a
              href="https://maps.google.com/?q=Pinewood+School,+26800+Fremont+Rd,+Los+Altos+Hills,+CA+94022"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-0.5 inline-flex items-center gap-1"
              style={{ color: "var(--text-dim)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--green)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-dim)")
              }
            >
              <MapPin size={13} />
              Pinewood Upper Campus
            </a>
          </div>
        </motion.div>

        <div
          className="mx-auto max-w-6xl px-4 pb-6 text-center text-xs sm:px-6"
          style={{ color: "var(--text-dim)" }}
        >
          Built with care by the Pinewood Tech Club
        </div>
      </div>
    </footer>
  );
}
