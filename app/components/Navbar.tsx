"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export function Navbar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [0, 1]);
  const y = useTransform(scrollY, [0, 600], [-20, 0]);

  return (
    <motion.div
      className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6"
      style={{ opacity, y }}
    >
      <a
        href="about:blank"
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md sm:px-6 sm:py-3"
        style={{
          background: "rgba(45, 208, 122, 0.9)",
          boxShadow:
            "0 0 30px rgba(45, 208, 122, 0.2), 0 4px 20px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(45, 208, 122, 1)";
          e.currentTarget.style.boxShadow =
            "0 0 40px rgba(45, 208, 122, 0.35), 0 4px 20px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(45, 208, 122, 0.9)";
          e.currentTarget.style.boxShadow =
            "0 0 30px rgba(45, 208, 122, 0.2), 0 4px 20px rgba(0,0,0,0.3)";
        }}
      >
        Register
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </motion.div>
  );
}
