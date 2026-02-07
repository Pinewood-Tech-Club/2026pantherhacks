import type {
  FaqItem,
  LinkItem,
  NavItem,
  PrizeItem,
  ScheduleItem,
  SocialItem,
  SponsorIcon,
  SponsorLarge,
  TeamMember,
} from "../types/site";

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "sponsors", label: "Sponsors" },
  { id: "prizes", label: "Prizes" },
  { id: "faq", label: "FAQ" },
  { id: "team", label: "Team" },
  { id: "links", label: "Links" },
];

export const SCHEDULE: ScheduleItem[] = [
  { time: "9:00 AM", title: "Check-In + Welcome" },
  { time: "10:00 AM", title: "Hacking Starts" },
  { time: "5:00 PM", title: "Project Submissions" },
  { time: "7:30 PM", title: "Demo + Judging" },
  { time: "9:00 PM", title: "Awards" },
];

export const LARGE_SPONSORS: SponsorLarge[] = [
  {
    name: "Acme Labs",
    tier: "title",
    summary: "Title sponsor supporting prizes, operations, and student grants.",
    href: "#",
    logo: "/sponsors/logos/acme-labs-wide.png",
  },
  {
    name: "Vertex Cloud",
    tier: "major",
    summary: "Compute credits, infra support, and mentor sessions.",
    href: "#",
    logo: "/sponsors/logos/vertex-cloud-wide.png",
  },
  {
    name: "Northline",
    tier: "major",
    summary: "Developer platform and API partnership support.",
    href: "#",
    logo: "/sponsors/logos/northline-wide.png",
  },
];

export const ICON_SPONSORS: SponsorIcon[] = [
  { name: "Studio Form", href: "#", icon: "/sponsors/icons/studio-form-icon.png" },
  { name: "Cloud Guild", href: "#", icon: "/sponsors/icons/cloud-guild-icon.png" },
  { name: "Campus Market", href: "#", icon: "/sponsors/icons/campus-market-icon.png" },
  { name: "Brightline Transit", href: "#", icon: "/sponsors/icons/brightline-transit-icon.png" },
  { name: "Panther Alumni", href: "#", icon: "/sponsors/icons/panther-alumni-icon.png" },
  { name: "Skyline Print", href: "#", icon: "/sponsors/icons/skyline-print-icon.png" },
];

export const PRIZES: PrizeItem[] = [
  {
    title: "1st Place",
    reward: "$1,000 + Trophy",
    description: "Best overall project — judged on idea, execution, and demo.",
  },
  {
    title: "2nd Place",
    reward: "$700",
    description: "Runner-up for best overall project.",
  },
  {
    title: "3rd Place",
    reward: "$500",
    description: "Third place overall.",
  },
  {
    title: "Most Creative",
    reward: "Special Award",
    description: "Wildest idea or most unexpected approach.",
  },
  {
    title: "Best Solo Hack",
    reward: "Special Award",
    description: "Best project built by one person.",
  },
  {
    title: "Best Use of Acme Labs API",
    reward: "Sponsor Prize",
    description: "Coolest use of Acme Labs tools in your project.",
  },
  {
    title: "Best Use of Vertex Cloud",
    reward: "Sponsor Prize",
    description: "Best use of Vertex Cloud infrastructure.",
  },
  {
    title: "Best Design + UX",
    reward: "Special Award",
    description: "Cleanest, most polished user experience.",
  },
  {
    title: "Community Impact",
    reward: "Special Award",
    description: "Project that could actually help real people.",
  },
];

export const FAQS: FaqItem[] = [
  { question: "Do I need prior coding experience?", answer: "Nope! All skill levels are welcome. We'll have mentors on hand all day to help you get started." },
  { question: "Is it free?", answer: "Yes — completely free. Registration, food, swag, and workshops are all included." },
  { question: "Can I work in a team?", answer: "Yes! Teams can have up to four people. You can come with a team or find one at the event." },
  { question: "What should I bring?", answer: "A laptop, charger, and student ID. We'll take care of the rest — food, WiFi, and a good time." },
  { question: "Will food be provided?", answer: "Yes! We'll have meals, snacks, and drinks throughout the day." },
  { question: "When are winners announced?", answer: "Winners are announced at the closing ceremony at 9:00 PM." },
  { question: "Who is eligible?", answer: "Any student ages 11 through 18 — middle school and high school. You don't have to go to Pinewood." },
  { question: "Where is the event?", answer: "Pinewood Upper Campus — 26800 Fremont Rd, Los Altos Hills, CA. Parking details will be shared before event day." },
];

export const TEAM: TeamMember[] = [
  { name: "Alex Chen", role: "Event Director", bio: "Runs the show.", initials: "AC" },
  { name: "Maya Patel", role: "Operations Lead", bio: "Keeps everything on track day-of.", initials: "MP" },
  { name: "Jordan Lee", role: "Sponsorship Lead", bio: "Gets us the funding and the mentors.", initials: "JL" },
  { name: "Sofia Nguyen", role: "Design Lead", bio: "Made this website look good.", initials: "SN" },
];

export const SOCIALS: SocialItem[] = [
  { name: "Instagram", value: "@pantherhacks", href: "#" },
  { name: "Discord", value: "Panther Hacks Server", href: "#" },
  { name: "X", value: "@pantherhacks", href: "#" },
  { name: "Email", value: "hello@pantherhacks.com", href: "mailto:hello@pantherhacks.com" },
];

export const LINKS: LinkItem[] = [
  { label: "Code of Conduct", href: "#" },
  { label: "Participant Guide", href: "#" },
  { label: "Volunteer Sign-Up", href: "#" },
  { label: "Mentor Interest Form", href: "#" },
  { label: "Sponsorship Packet", href: "#" },
];
