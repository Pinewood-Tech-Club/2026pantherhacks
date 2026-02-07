export type NavItem = {
  id: string;
  label: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
};

export type SponsorLarge = {
  name: string;
  summary: string;
  href: string;
  tier: "title" | "major";
  logo: string;
};

export type SponsorIcon = {
  name: string;
  href: string;
  icon: string;
};

export type PrizeItem = {
  title: string;
  reward: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
};

export type CountdownItem = {
  label: string;
  value: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type SocialItem = {
  name: string;
  value: string;
  href: string;
};
