"use client";

import { useEffect, useState } from "react";

import { AboutSection } from "./components/AboutSection";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { LinksSection } from "./components/LinksSection";
import { Navbar } from "./components/Navbar";
import { PrizesSection } from "./components/PrizesSection";
import { SiteFooter } from "./components/SiteFooter";
import { SponsorsSection } from "./components/SponsorsSection";
import { TeamSection } from "./components/TeamSection";
import { getCountdown, padCountdown } from "./lib/countdown";
import type { Countdown, CountdownItem } from "./types/site";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    setMounted(true);
    setCountdown(getCountdown());
  }, []);

  useEffect(() => {
    if (!mounted || countdown.isLive) {
      return;
    }

    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [mounted, countdown.isLive]);

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
    <div className="relative">
      <Navbar />

      {/* Hero — full viewport */}
      <div id="top">
        <HeroSection countdownItems={countdownItems} />
      </div>

      {/* Main content sections */}
      <main className="relative mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-20 pt-16 sm:gap-32 sm:px-6 sm:pb-32 sm:pt-24">
        {/* Decorative vertical line */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-32 w-px -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, var(--green), transparent)",
            opacity: 0.2,
          }}
        />

        <AboutSection />

        <div className="divider" />

        <PrizesSection />

        <div className="divider" />

        <SponsorsSection />

        <div className="divider" />

        <FaqSection />

        <div className="divider" />

        <TeamSection />

        <div className="divider" />

        <LinksSection />
      </main>

      <SiteFooter />
    </div>
  );
}
