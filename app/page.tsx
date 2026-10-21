"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, useSyncExternalStore } from "react";

import { AboutSection } from "./components/AboutSection";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { LenisProvider } from "./components/LenisProvider";
import { LinksSection } from "./components/LinksSection";
import { Navbar } from "./components/Navbar";
import { PrizesSection } from "./components/PrizesSection";
import { SiteFooter } from "./components/SiteFooter";
import { SponsorsSection } from "./components/SponsorsSection";
import { TeamSection } from "./components/TeamSection";
import { getCountdown, padCountdown } from "./lib/countdown";
import type { Countdown, CountdownItem } from "./types/site";

const SERVER_COUNTDOWN: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isLive: false,
};

let countdownSnapshot: Countdown = SERVER_COUNTDOWN;

function subscribeNever() {
  return () => {};
}

function subscribeCountdown(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(timer);
}

function getCountdownSnapshot(): Countdown {
  const next = getCountdown();
  const prev = countdownSnapshot;
  if (
    prev.days === next.days &&
    prev.hours === next.hours &&
    prev.minutes === next.minutes &&
    prev.seconds === next.seconds &&
    prev.isLive === next.isLive
  ) {
    return prev;
  }
  countdownSnapshot = next;
  return next;
}

function getServerCountdownSnapshot(): Countdown {
  return SERVER_COUNTDOWN;
}

function getClientMounted() {
  return true;
}

function getServerMounted() {
  return false;
}

// Lazy load Game of Life canvas to avoid SSR issues
const GameOfLife = dynamic(
  () =>
    import("./components/GameOfLife").then((mod) => ({
      default: mod.GameOfLife,
    })),
  { ssr: false }
);

export default function Home() {
  const mounted = useSyncExternalStore(
    subscribeNever,
    getClientMounted,
    getServerMounted
  );
  const countdown = useSyncExternalStore(
    subscribeCountdown,
    getCountdownSnapshot,
    getServerCountdownSnapshot
  );
  const [interactiveMode, setInteractiveMode] = useState(false);

  const handleEasterEgg = useCallback(() => {
    setInteractiveMode(true);
    // Scroll to top and disable scrolling
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
  }, []);

  const handleExitInteractive = useCallback(() => {
    setInteractiveMode(false);
    document.body.style.overflow = "";
  }, []);

  const countdownItems: CountdownItem[] = !mounted
    ? [
        { label: "Days", value: "--" },
        { label: "Hours", value: "--" },
        { label: "Min", value: "--" },
        { label: "Sec", value: "--" },
      ]
    : countdown.isLive
      ? [{ label: "Status", value: "LIVE" }]
      : [
          { label: "Days", value: padCountdown(countdown.days) },
          { label: "Hours", value: padCountdown(countdown.hours) },
          { label: "Min", value: padCountdown(countdown.minutes) },
          { label: "Sec", value: padCountdown(countdown.seconds) },
        ];

  return (
    <LenisProvider>
      <div className="relative">
        {/* Conway's Game of Life background */}
        <GameOfLife
          interactive={interactiveMode}
          onExitInteractive={handleExitInteractive}
        />

        {/* All site content fades out in interactive mode */}
        <div
          style={{
            opacity: interactiveMode ? 0 : 1,
            pointerEvents: interactiveMode ? "none" : "auto",
            transition: "opacity 0.6s ease",
          }}
        >
          {/* Floating register button — appears on scroll */}
          <Navbar />

          {/* Hero — full viewport */}
          <div id="top">
            <HeroSection
              countdownItems={countdownItems}
              onEasterEgg={handleEasterEgg}
            />
          </div>

          {/* Main content sections */}
          <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-28 px-4 pb-24 pt-20 sm:gap-40 sm:px-6 sm:pb-36 sm:pt-28">
            {/* Decorative vertical line from hero to content */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-px -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, var(--green), transparent)",
                opacity: 0.15,
              }}
            />

            <AboutSection />
            <PrizesSection />
            <SponsorsSection />
            <FaqSection />
            <TeamSection />
            <LinksSection />
          </main>

          <SiteFooter />
        </div>
      </div>
    </LenisProvider>
  );
}
