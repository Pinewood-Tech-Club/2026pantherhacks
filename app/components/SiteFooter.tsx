import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-6 border-t border-[color:rgba(18,26,34,0.10)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/branding/pantherhacks-icon.svg"
            alt="Panther Hacks icon"
            width={36}
            height={36}
          />
        </div>

        <div className="text-sm text-[color:var(--muted)] md:text-right">
          <p>April 19, 2026 | 9:00 AM - 9:30 PM PST</p>
          <a
            href="https://maps.google.com/?q=Pinewood+School,+26800+Fremont+Rd,+Los+Altos+Hills,+CA+94022"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 hover:text-[color:var(--accent-strong)]"
          >
            <MapPin size={13} />
            Pinewood Upper Campus
          </a>
        </div>

        <a
          href="about:blank"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--accent)] px-6 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)]"
        >
          Register Now
          <ArrowRight size={15} />
        </a>
      </div>
    </footer>
  );
}
