"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { NAV_ITEMS } from "../data/site";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="floating-nav flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "var(--green)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2H14V6H10V14H6V6H2V2Z" fill="white" />
              </svg>
            </div>
            <span
              className="hidden text-sm font-semibold uppercase sm:block"
              style={{ color: "var(--text)", letterSpacing: "0.08em" }}
            >
              PantherHacks
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.background = "var(--green-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="about:blank"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden min-h-9 items-center justify-center gap-1.5 rounded-lg px-5 text-[13px] font-semibold text-white xl:inline-flex"
              style={{ background: "var(--green)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
            >
              Register
              <ArrowRight size={13} />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg xl:hidden"
              style={{ background: "var(--green-glow)" }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-[1.5px] w-4 rounded-full transition-transform duration-200"
                style={{
                  background: "var(--green)",
                  transform: menuOpen ? "translateY(2.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] w-4 rounded-full transition-transform duration-200"
                style={{
                  background: "var(--green)",
                  transform: menuOpen ? "translateY(-2.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="floating-nav mt-2 rounded-2xl p-2 xl:hidden"
            >
              <nav className="grid gap-0.5">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text)";
                      e.currentTarget.style.background = "var(--green-glow)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mx-2 my-1 h-px" style={{ background: "var(--line)" }} />
                <a
                  href="about:blank"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
                  style={{ background: "var(--green)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Register Now
                  <ArrowRight size={14} />
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
