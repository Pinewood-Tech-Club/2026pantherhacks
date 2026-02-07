"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { NAV_ITEMS } from "../data/site";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div className="mx-auto max-w-6xl">
        <div className="floating-nav flex items-center justify-between rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5">
          <a href="#top" className="flex items-center">
            <Image
              src="/branding/pantherhacks-2026-wordmark.svg"
              alt="Panther Hacks 2026 logo"
              width={210}
              height={35}
              className="hidden sm:block"
            />
            <Image
              src="/branding/pantherhacks-icon.svg"
              alt="Panther Hacks icon"
              width={34}
              height={34}
              className="sm:hidden"
            />
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-3 py-2 text-sm text-[color:var(--text)] hover:bg-[color:#edf2ef] hover:text-[color:var(--text)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="about:blank"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden min-h-10 items-center justify-center gap-1.5 rounded-full bg-[color:var(--accent)] px-5 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)] xl:inline-flex"
            >
              Register
              <ArrowRight size={14} />
            </a>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:#edf2ef] text-[color:var(--accent)] xl:hidden"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="floating-nav mt-2 rounded-2xl p-3 xl:hidden"
            >
              <nav className="grid gap-0.5">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-[color:var(--text)] hover:bg-[color:#edf2ef]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href="about:blank"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-[color:var(--accent)] px-5 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)]"
              >
                Register
                <ArrowRight size={14} />
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
