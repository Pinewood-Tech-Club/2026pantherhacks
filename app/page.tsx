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
      ? [{ label: "Status", value: "Live" }]
      : [
          { label: "Days", value: padCountdown(countdown.days) },
          { label: "Hours", value: padCountdown(countdown.hours) },
          { label: "Min", value: padCountdown(countdown.minutes) },
          { label: "Sec", value: padCountdown(countdown.seconds) },
        ];

  return (
    <div className="site-wrap">
      <Navbar />

      <main id="top" className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-24 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-32">
        <HeroSection countdownItems={countdownItems} />
        <AboutSection />
        <SponsorsSection />
        <PrizesSection />
        <FaqSection />
        <TeamSection />
        <LinksSection />
      </main>

      <SiteFooter />
    </div>
  );
}
