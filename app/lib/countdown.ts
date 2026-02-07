import type { Countdown } from "../types/site";

export const EVENT_START = new Date("2026-04-19T09:00:00-08:00");

export function getCountdown(): Countdown {
  const delta = EVENT_START.getTime() - Date.now();

  if (delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  return {
    days: Math.floor(delta / (1000 * 60 * 60 * 24)),
    hours: Math.floor((delta / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((delta / (1000 * 60)) % 60),
    seconds: Math.floor((delta / 1000) % 60),
    isLive: false,
  };
}

export function padCountdown(value: number): string {
  return String(value).padStart(2, "0");
}
